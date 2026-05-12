import {
    collection,
    onSnapshot,
    query,
    orderBy,
    where,
} from 'firebase/firestore';
import { db } from '../firebase/config';

const EVENT_COLLECTION = 'events';

/**
 * Subscribe to Published events only (real-time) — for public frontend.
 * Note: Filtering in memory to avoid needing a manual composite index in Firestore.
 */
export const subscribeEvents = (callback) => {
    const q = query(
        collection(db, EVENT_COLLECTION),
        orderBy('eventDate', 'desc')
    );
    return onSnapshot(q, (snapshot) => {
        const items = snapshot.docs
            .map((docSnap) => ({
                id: docSnap.id,
                ...docSnap.data(),
            }))
            .filter(item => item.status === 'Published');
        callback(items);
    });
};
