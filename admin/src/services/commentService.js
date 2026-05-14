import {
    collection,
    doc,
    updateDoc,
    deleteDoc,
    onSnapshot,
    query,
    orderBy,
    serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase';

const COMMENTS_COLLECTION = 'blogComments';

/**
 * Subscribe to blog comments (real-time).
 */
export const subscribeComments = (callback) => {
    const q = query(
        collection(db, COMMENTS_COLLECTION)
    );
    return onSnapshot(q, (snapshot) => {
        const items = snapshot.docs.map((docSnap) => ({
            id: docSnap.id,
            ...docSnap.data(),
        }));
        
        // Sort in memory to avoid composite index requirement with status filter
        const sortedItems = items.sort((a, b) => {
            const dateA = a.createdAt?.toDate?.() || new Date(a.createdAt || 0);
            const dateB = b.createdAt?.toDate?.() || new Date(b.createdAt || 0);
            return dateB - dateA;
        });

        callback(sortedItems);
    });
};

/**
 * Update comment status (approve/reject).
 */
export const updateCommentStatus = async (id, status) => {
    const docRef = doc(db, COMMENTS_COLLECTION, id);
    await updateDoc(docRef, {
        status,
        updatedAt: serverTimestamp(),
    });
};

/**
 * Delete a comment.
 */
export const deleteComment = async (id) => {
    await deleteDoc(doc(db, COMMENTS_COLLECTION, id));
};
