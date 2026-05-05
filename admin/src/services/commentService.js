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
        collection(db, COMMENTS_COLLECTION),
        orderBy('createdAt', 'desc')
    );
    return onSnapshot(q, (snapshot) => {
        const items = snapshot.docs.map((docSnap) => ({
            id: docSnap.id,
            ...docSnap.data(),
        }));
        callback(items);
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
