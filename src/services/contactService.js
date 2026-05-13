import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';

const CONTACT_COLLECTION = 'contactMessages';

/**
 * Submit a new contact message to Firestore.
 * @param {Object} messageData - { name, email, subject, message, phone }
 */
export const submitContactMessage = async (messageData) => {
  try {
    const docRef = await addDoc(collection(db, CONTACT_COLLECTION), {
      ...messageData,
      status: 'pending',
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
};
