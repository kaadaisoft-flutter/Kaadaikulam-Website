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

import { uploadFile } from '../utils/uploadUtils';

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
        const fileName = `${Date.now()}_${imageFile.name}`;
        const uploadPath = `events/${fileName}`;
        const downloadUrl = await uploadFile(imageFile, uploadPath);
        eventData.image = downloadUrl;
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
    await deleteDoc(doc(db, EVENT_COLLECTION, id));
};
