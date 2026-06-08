import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";

const DONATION_SETTINGS_DOC = "donationSettings";
const SETTINGS_ID = "config";

export const getDonationSettings = async () => {
  try {
    const docRef = doc(db, DONATION_SETTINGS_DOC, SETTINGS_ID);
    const snap = await getDoc(docRef);
    return snap.exists() ? snap.data() : null;
  } catch (error) {
    console.error("Error getting donation settings: ", error);
    throw error;
  }
};
