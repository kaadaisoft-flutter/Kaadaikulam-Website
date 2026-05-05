import { 
    collection, 
    addDoc, 
    getDocs, 
    updateDoc, 
    deleteDoc, 
    doc, 
    query, 
    orderBy, 
    where,
    onSnapshot,
    serverTimestamp 
} from "firebase/firestore";
import { db } from "../firebase/config";

const BLOGS_COLLECTION = "blogs";

/**
 * Add a new blog post
 * @param {Object} data - { title, content, image }
 */
export const addBlog = async (data) => {
    try {
        const docRef = await addDoc(collection(db, BLOGS_COLLECTION), {
            ...data,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });
        return { id: docRef.id, ...data };
    } catch (error) {
        console.error("Error adding blog: ", error);
        throw error;
    }
};

/**
 * Get all blogs (one-time fetch)
 */
export const getBlogs = async () => {
    try {
        const q = query(collection(db, BLOGS_COLLECTION), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error("Error getting blogs: ", error);
        throw error;
    }
};

/**
 * Subscribe to real-time blog updates
 * @param {Function} callback - Function called with fresh data
 */
export const subscribeBlogs = (callback) => {
    const q = query(collection(db, BLOGS_COLLECTION), orderBy("createdAt", "desc"));
    return onSnapshot(q, (snapshot) => {
        const blogs = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        callback(blogs);
    }, (error) => {
        console.error("Error subscribing to blogs: ", error);
    });
};

/**
 * Update a blog post
 * @param {string} id 
 * @param {Object} data 
 */
export const updateBlog = async (id, data) => {
    try {
        const blogDoc = doc(db, BLOGS_COLLECTION, id);
        await updateDoc(blogDoc, {
            ...data,
            updatedAt: serverTimestamp()
        });
        return { id, ...data };
    } catch (error) {
        console.error("Error updating blog: ", error);
        throw error;
    }
};

/**
 * Delete a blog post
 * @param {string} id 
 */
export const deleteBlog = async (id) => {
    try {
        const blogDoc = doc(db, BLOGS_COLLECTION, id);
        await deleteDoc(blogDoc);
        return id;
    } catch (error) {
        console.error("Error deleting blog: ", error);
        throw error;
    }
};

/**
 * Add a comment to a blog post
 */
export const addComment = async (blogId, data) => {
    try {
        const docRef = await addDoc(collection(db, "comments"), {
            blogId,
            ...data,
            createdAt: serverTimestamp(),
            status: "approved" // Auto-approve for now
        });
        return { id: docRef.id, ...data };
    } catch (error) {
        console.error("Error adding comment: ", error);
        throw error;
    }
};

/**
 * Subscribe to comments for a blog post
 */
export const subscribeComments = (blogId, callback) => {
    const q = query(
        collection(db, "comments"), 
        where("blogId", "==", blogId),
        orderBy("createdAt", "desc")
    );
    return onSnapshot(q, (snapshot) => {
        const comments = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        callback(comments);
    }, (error) => {
        console.error("Error subscribing to comments: ", error);
    });
};
