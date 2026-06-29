import {
    collection,
    doc,
    addDoc,
    setDoc,
    deleteDoc,
    onSnapshot,
    query,
    orderBy,
    serverTimestamp,
} from 'firebase/firestore';
import { db, auth } from '../firebase';
import { deleteFromCloudinary } from './cloudinaryService';

const TRASH_COLLECTION = 'trash';

/**
 * Move an item to trash. Copies data and deletes original document.
 */
export const moveToTrash = async (originalCollection, id, docData) => {
    // Exclude the id field from the stored data if it exists
    const { id: _, ...cleanData } = docData;

    const trashItem = {
        originalCollection,
        originalId: id,
        deletedAt: serverTimestamp(),
        deletedBy: auth.currentUser?.email || 'admin',
        data: cleanData,
    };

    // 1. Add copy to trash
    await addDoc(collection(db, TRASH_COLLECTION), trashItem);

    // 2. Delete original
    await deleteDoc(doc(db, originalCollection, id));
};

/**
 * Restore an item from trash back to its original collection.
 */
export const restoreFromTrash = async (trashId, item) => {
    const { originalCollection, originalId, data } = item;

    // 1. Restore to original collection using the original ID
    await setDoc(doc(db, originalCollection, originalId), data);

    // 2. Remove from trash
    await deleteDoc(doc(db, TRASH_COLLECTION, trashId));
};

/**
 * Delete an item permanently from trash, cleaning up Cloudinary assets if present.
 */
export const permanentlyDeleteFromTrash = async (trashId, item) => {
    const { data } = item;

    if (data) {
        // Clean up Cloudinary assets
        const { cloudinaryPublicId, cloudinaryResourceType, cloudinaryThumbnailPublicId } = data;

        if (cloudinaryPublicId) {
            try {
                await deleteFromCloudinary(cloudinaryPublicId, cloudinaryResourceType || 'image');
            } catch (err) {
                console.warn('Failed to delete asset from Cloudinary:', err);
            }
        }

        if (cloudinaryThumbnailPublicId) {
            try {
                await deleteFromCloudinary(cloudinaryThumbnailPublicId, 'image');
            } catch (err) {
                console.warn('Failed to delete thumbnail from Cloudinary:', err);
            }
        }
    }

    // Delete from trash
    await deleteDoc(doc(db, TRASH_COLLECTION, trashId));
};

/**
 * Empty the trash by permanently deleting all listed items.
 */
export const emptyTrash = async (items) => {
    const promises = items.map((item) => permanentlyDeleteFromTrash(item.id, item));
    await Promise.all(promises);
};

/**
 * Subscribe to trash items real-time.
 */
export const subscribeTrash = (callback) => {
    const q = query(
        collection(db, TRASH_COLLECTION),
        orderBy('deletedAt', 'desc')
    );
    return onSnapshot(q, (snapshot) => {
        const items = snapshot.docs.map((docSnap) => {
            const d = docSnap.data();
            const deletedAt = d.deletedAt?.toDate?.();
            return {
                id: docSnap.id,
                ...d,
                deletedAt: deletedAt ? deletedAt.toISOString() : new Date().toISOString(),
            };
        });
        callback(items);
    });
};
