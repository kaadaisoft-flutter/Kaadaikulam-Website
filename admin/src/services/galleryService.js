import {
    collection,
    doc,
    addDoc,
    deleteDoc,
    onSnapshot,
    query,
    orderBy,
    serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase';
import { uploadToCloudinary, deleteFromCloudinary } from './cloudinaryService';

const GALLERY_COLLECTION = 'gallery';

/**
 * Add a gallery item to Firestore (metadata only, for YouTube or after file upload).
 */
export const addGalleryItem = async (item) => {
    const docRef = await addDoc(collection(db, GALLERY_COLLECTION), {
        ...item,
        createdAt: serverTimestamp(),
    });
    return { id: docRef.id, ...item };
};

/**
 * Upload file to Cloudinary, then add gallery item to Firestore.
 * Stores cloudinaryPublicId and cloudinaryResourceType for delete.
 */
export const uploadGalleryMedia = async (file, metadata) => {
    const { url, publicId, resourceType } = await uploadToCloudinary(file);
    const item = {
        title: metadata.title,
        category: metadata.category,
        type: metadata.type,
        thumbnail: url,
        fullUrl: url,
        cloudinaryPublicId: publicId,
        cloudinaryResourceType: resourceType,
    };
    const docRef = await addDoc(collection(db, GALLERY_COLLECTION), {
        ...item,
        createdAt: serverTimestamp(),
    });
    return { id: docRef.id, ...item };
};

/**
 * Subscribe to gallery items (real-time).
 */
export const subscribeGallery = (callback) => {
    const q = query(
        collection(db, GALLERY_COLLECTION),
        orderBy('createdAt', 'desc')
    );
    return onSnapshot(q, (snapshot) => {
        const items = snapshot.docs.map((docSnap) => {
            const d = docSnap.data();
            const createdAt = d.createdAt?.toDate?.();
            return {
                id: docSnap.id,
                ...d,
                date: createdAt ? createdAt.toISOString() : d.date,
            };
        });
        callback(items);
    });
};

/**
 * Delete a gallery item. Deletes from Cloudinary (if applicable) then Firestore.
 * Uses VITE_CLOUDINARY_API_KEY/SECRET from env. Move to backend when possible.
 */
export const deleteGalleryItem = async (id, item = {}) => {
    const { cloudinaryPublicId, cloudinaryResourceType } = item;

    if (cloudinaryPublicId) {
        await deleteFromCloudinary(cloudinaryPublicId, cloudinaryResourceType || 'image');
    }

    await deleteDoc(doc(db, GALLERY_COLLECTION, id));
};
