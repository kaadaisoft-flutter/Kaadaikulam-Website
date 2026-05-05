import {
    collection,
    query,
    orderBy,
    onSnapshot,
    doc,
    updateDoc,
} from 'firebase/firestore';
import { db } from '../firebase';

const DONATIONS_COLLECTION = 'donations';

/**
 * Subscribe to donations from Firestore (real-time).
 * @param {function} callback - (donations) => void, donations = [{ id, ...doc }]
 * @returns {function} Unsubscribe function
 */
export const subscribeDonations = (callback) => {
    const q = query(
        collection(db, DONATIONS_COLLECTION),
        orderBy('createdAt', 'desc')
    );
    return onSnapshot(q, (snapshot) => {
        const items = snapshot.docs.map((d) => ({
            id: d.id,
            ...d.data(),
            createdAt: d.data().createdAt?.toDate?.()?.toISOString?.() ?? d.data().createdAt,
        }));
        callback(items);
    });
};

/**
 * Update donation status (e.g. pending -> approved/rejected).
 */
export const updateDonationStatus = async (id, status) => {
    const docRef = doc(db, DONATIONS_COLLECTION, id);
    await updateDoc(docRef, { status });
};
