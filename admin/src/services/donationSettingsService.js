import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { uploadToCloudinary, deleteFromCloudinary } from './cloudinaryService';

const DONATION_SETTINGS_DOC = 'donationSettings';
const SETTINGS_ID = 'config';

const TEXT_FIELDS = ['bankName', 'accountName', 'accountNumber', 'ifscCode', 'branch', 'upiId'];

/**
 * Get donation settings from Firestore.
 */
export const getDonationSettings = async () => {
    const docRef = doc(db, DONATION_SETTINGS_DOC, SETTINGS_ID);
    const snap = await getDoc(docRef);
    return snap.exists() ? snap.data() : null;
};

/**
 * Save donation settings to Firestore.
 * - Only updates fields that have changed (partial update).
 * - Image: if qrFile provided → upload new, delete old from Cloudinary, update qrImageUrl & cloudinaryPublicId.
 *         if no qrFile → keep existing image (no Cloudinary calls).
 */
export const saveDonationSettings = async (settings, qrFile = null) => {
    const current = await getDonationSettings();
    const updates = {};

    // Only include changed text fields
    for (const field of TEXT_FIELDS) {
        const newVal = settings[field] ?? '';
        const oldVal = current?.[field] ?? '';
        if (newVal !== oldVal) {
            updates[field] = newVal;
        }
    }

    // Image: only if new file selected
    if (qrFile) {
        if (current?.cloudinaryPublicId) {
            try {
                await deleteFromCloudinary(current.cloudinaryPublicId, 'image');
            } catch (err) {
                console.warn('Could not delete old QR from Cloudinary:', err);
            }
        }
        const { url, publicId } = await uploadToCloudinary(qrFile, {
            preset: 'qr',
            folder: 'donation/qr',
        });
        updates.qrImageUrl = url;
        updates.cloudinaryPublicId = publicId;
    }

    const docRef = doc(db, DONATION_SETTINGS_DOC, SETTINGS_ID);

    if (Object.keys(updates).length === 0) {
        return current;
    }

    if (!current) {
        // First-time create: full document
        const fullPayload = {
            bankName: settings.bankName || '',
            accountName: settings.accountName || '',
            accountNumber: settings.accountNumber || '',
            ifscCode: settings.ifscCode || '',
            branch: settings.branch || '',
            upiId: settings.upiId || '',
            qrImageUrl: updates.qrImageUrl ?? null,
            cloudinaryPublicId: updates.cloudinaryPublicId ?? null,
        };
        await setDoc(docRef, fullPayload);
        return fullPayload;
    }

    await updateDoc(docRef, updates);
    return { ...current, ...updates };
};
