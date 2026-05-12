import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';

/**
 * Upload a file to Firebase Storage and return the download URL.
 * @param {File} file - The file to upload.
 * @param {string} path - The path in storage (e.g. 'events/image.webp').
 * @returns {Promise<string>} - The download URL.
 */
export const uploadFile = async (file, path) => {
    if (!file) return null;
    const storageRef = ref(storage, path);
    const snapshot = await uploadBytes(storageRef, file);
    return await getDownloadURL(snapshot.ref);
};
