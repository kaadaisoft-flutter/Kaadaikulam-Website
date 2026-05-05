import {
    collection,
    query,
    orderBy,
    onSnapshot,
    doc,
    updateDoc,
    deleteDoc,
} from 'firebase/firestore';
import { db } from '../firebase';

const CONTACT_COLLECTION = 'contactMessages';

/**
 * Subscribe to contact messages from Firestore (real-time).
 * @param {function} callback - (messages) => void
 * @returns {function} Unsubscribe function
 */
export const subscribeContactMessages = (callback) => {
    const q = query(
        collection(db, CONTACT_COLLECTION),
        orderBy('createdAt', 'desc')
    );
    return onSnapshot(q, (snapshot) => {
        const items = snapshot.docs.map((d) => {
            const data = d.data();
            return {
                id: d.id,
                ...data,
                date: data.createdAt?.toDate?.()?.toISOString?.() ?? data.createdAt,
                createdAt: data.createdAt?.toDate?.()?.toISOString?.() ?? data.createdAt,
            };
        });
        callback(items);
    });
};

/**
 * Update contact message status (e.g. pending -> read).
 */
export const updateContactStatus = async (id, status) => {
    const docRef = doc(db, CONTACT_COLLECTION, id);
    await updateDoc(docRef, { status });
};

/**
 * Delete a contact message.
 */
export const deleteContactMessage = async (id) => {
    const docRef = doc(db, CONTACT_COLLECTION, id);
    await deleteDoc(docRef);
};
