import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";

const DONATIONS_COLLECTION = "donations";

export const addDonation = async (donationData) => {
  try {
    const docRef = await addDoc(collection(db, DONATIONS_COLLECTION), {
      ...donationData,
      status: "pending",
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding donation: ", error);
    throw error;
  }
};
