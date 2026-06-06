import {
    collection,
    doc,
    getDoc,
    addDoc,
    updateDoc,
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
 * Save or Update a gallery item (metadata and optional file upload).
 */
export const saveGalleryItem = async (id, data, file, thumbnailFile) => {
    const now = serverTimestamp();
    const itemData = {
        ...data,
        updatedAt: now,
    };

    if (!id) {
        itemData.createdAt = now;
    }

    // Handle Cloudinary upload for custom thumbnail if provided
    if (thumbnailFile) {
        // Delete old thumbnail if updating
        if (id) {
            try {
                const oldDoc = await getDoc(doc(db, GALLERY_COLLECTION, id));
                const oldData = oldDoc.data();
                if (oldData?.cloudinaryThumbnailPublicId) {
                    await deleteFromCloudinary(oldData.cloudinaryThumbnailPublicId, 'image');
                }
            } catch (err) {
                console.warn('Failed to delete old thumbnail from Cloudinary during save:', err);
            }
        }

        const { url, publicId } = await uploadToCloudinary(thumbnailFile);
        itemData.thumbnail = url;
        itemData.imageUrl = url;
        itemData.cloudinaryThumbnailPublicId = publicId;
    }

    // Handle Cloudinary upload if a main file is provided
    if (file) {
        // Delete old asset if updating
        if (id) {
            try {
                const oldDoc = await getDoc(doc(db, GALLERY_COLLECTION, id));
                const oldData = oldDoc.data();
                if (oldData?.cloudinaryPublicId) {
                    await deleteFromCloudinary(oldData.cloudinaryPublicId, oldData.cloudinaryResourceType || 'image');
                }
            } catch (err) {
                console.warn('Failed to delete old asset from Cloudinary during save:', err);
            }
        }

        const { url, publicId, resourceType } = await uploadToCloudinary(file);
        itemData.fullUrl = url;
        if (!thumbnailFile) {
            itemData.imageUrl = url;
            itemData.thumbnail = url;
        }
        itemData.cloudinaryPublicId = publicId;
        itemData.cloudinaryResourceType = resourceType;
    }

    if (id) {
        const docRef = doc(db, GALLERY_COLLECTION, id);
        await updateDoc(docRef, itemData);
        return { id, ...itemData };
    } else {
        const docRef = await addDoc(collection(db, GALLERY_COLLECTION), itemData);
        return { id: docRef.id, ...itemData };
    }
};

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
 */
export const uploadGalleryMedia = async (file, metadata) => {
    const { url, publicId, resourceType } = await uploadToCloudinary(file);
    const item = {
        title: metadata.title,
        description: metadata.description || '',
        category: metadata.category,
        templeName: metadata.templeName || '',
        type: metadata.type,
        thumbnail: url,
        fullUrl: url,
        imageUrl: url,
        featured: metadata.featured || false,
        published: metadata.published !== undefined ? metadata.published : true,
        uploadedBy: metadata.uploadedBy || '',
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
                date: createdAt ? createdAt.toISOString() : (d.date || new Date().toISOString()),
            };
        });
        callback(items);
    });
};

/**
 * Delete a gallery item. Deletes from Cloudinary (if applicable) then Firestore.
 */
export const deleteGalleryItem = async (id, item = {}) => {
    const { cloudinaryPublicId, cloudinaryResourceType, cloudinaryThumbnailPublicId } = item;

    if (cloudinaryPublicId) {
        try {
            await deleteFromCloudinary(cloudinaryPublicId, cloudinaryResourceType || 'image');
        } catch (err) {
            console.warn('Cloudinary delete failed, proceeding with Firestore deletion:', err.message);
        }
    }

    if (cloudinaryThumbnailPublicId) {
        try {
            await deleteFromCloudinary(cloudinaryThumbnailPublicId, 'image');
        } catch (err) {
            console.warn('Cloudinary thumbnail delete failed:', err.message);
        }
    }

    await deleteDoc(doc(db, GALLERY_COLLECTION, id));
};
