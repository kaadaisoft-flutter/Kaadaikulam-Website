import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";

const GALLERY_COLLECTION = "gallery";

/**
 * Subscribe to published gallery items (real-time).
 * Filters out unpublished items in memory to avoid index requirement.
 */
export const subscribeGalleryItems = (callback) => {
    const q = query(
        collection(db, GALLERY_COLLECTION),
        orderBy("createdAt", "desc")
    );
    return onSnapshot(q, (snapshot) => {
        const items = snapshot.docs
            .map(doc => {
                const d = doc.data();
                const createdAt = d.createdAt?.toDate?.();
                return {
                    id: doc.id,
                    ...d,
                    date: createdAt ? createdAt.toISOString() : (d.date || new Date().toISOString())
                };
            })
            .filter(item => item.published !== false);
        callback(items);
    }, (error) => {
        console.error("Error subscribing to gallery: ", error);
    });
};
