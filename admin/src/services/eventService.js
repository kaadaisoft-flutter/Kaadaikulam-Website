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

const EVENT_COLLECTION = 'events';

/**
 * Subscribe to all events (real-time) — admin sees all statuses.
 */
export const subscribeEvents = (callback) => {
    const q = query(
        collection(db, EVENT_COLLECTION),
        orderBy('eventDate', 'desc')
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
 * Save or Update an event.
 */
export const saveEvent = async (id, data, imageFile) => {
    const now = serverTimestamp();
    const eventData = {
        ...data,
        updatedAt: now,
    };

    if (!id) {
        eventData.createdAt = now;
    }

    // Handle Image Upload if a new file is provided
    if (imageFile) {
        // Delete old image if updating
        if (id) {
            const oldDoc = await getDoc(doc(db, EVENT_COLLECTION, id));
            const oldData = oldDoc.data();
            if (oldData?.cloudinaryPublicId) {
                try {
                    await deleteFromCloudinary(oldData.cloudinaryPublicId);
                } catch (err) {
                    console.warn('Failed to delete old event image from Cloudinary:', err);
                }
            }
        }

        const { url, publicId } = await uploadToCloudinary(imageFile, { 
            preset: 'events', 
            folder: 'events' 
        });
        eventData.image = url;
        eventData.cloudinaryPublicId = publicId;
    }

    if (id) {
        const docRef = doc(db, EVENT_COLLECTION, id);
        await updateDoc(docRef, eventData);
        return { id, ...eventData };
    } else {
        const docRef = await addDoc(collection(db, EVENT_COLLECTION), eventData);
        return { id: docRef.id, ...eventData };
    }
};

/**
 * Delete an event.
 */
export const deleteEvent = async (id) => {
    // Delete image from Cloudinary first
    const docRef = doc(db, EVENT_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.cloudinaryPublicId) {
            try {
                await deleteFromCloudinary(data.cloudinaryPublicId);
            } catch (err) {
                console.warn('Failed to delete event image from Cloudinary:', err);
            }
        }
    }
    await deleteDoc(docRef);
};
