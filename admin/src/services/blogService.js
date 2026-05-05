import {
    collection,
    doc,
    addDoc,
    updateDoc,
    deleteDoc,
    onSnapshot,
    query,
    orderBy,
    serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase';

const BLOG_COLLECTION = 'blogs';

/**
 * Subscribe to blog posts (real-time).
 */
export const subscribeBlogs = (callback) => {
    const q = query(
        collection(db, BLOG_COLLECTION),
        orderBy('publishDate', 'desc')
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
 * Save or Update a blog post.
 */
export const saveBlog = async (id, data) => {
    const now = serverTimestamp();
    const blogData = {
        ...data,
        updatedAt: now,
    };

    if (!id) {
        blogData.createdAt = now;
    }

    if (blogData.status === 'Published' && !blogData.publishDate) {
        blogData.publishDate = now;
    }

    if (id) {
        // Update
        const docRef = doc(db, BLOG_COLLECTION, id);
        await updateDoc(docRef, blogData);
        return { id, ...blogData };
    } else {
        // Add
        const docRef = await addDoc(collection(db, BLOG_COLLECTION), blogData);
        return { id: docRef.id, ...blogData };
    }
};

/**
 * Delete a blog post.
 */
export const deleteBlog = async (id) => {
    await deleteDoc(doc(db, BLOG_COLLECTION, id));
};
