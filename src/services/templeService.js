import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/config";

const TEMPLES_COLLECTION = "temples";

const DEFAULT_TEMPLES = [
    { id: "sri-angalamman-temple", name: "Sri Angalamman Temple", nameTa: "ஸ்ரீ அருள்மிகு அங்காளம்மன் கோவில்" },
    { id: "sri-pushpavaneswara-swamy-temple", name: "Sri Pushpavaneswara Swamy Temple", nameTa: "ஸ்ரீ புஷ்பவனேசுவர சுவாமி திருக்கோயில்" },
    { id: "sri-kariyakali-amman-temple", name: "Sri Kariyakali Amman Temple", nameTa: "ஸ்ரீ கரியகாளியம்மன் திருக்கோவில்" },
    { id: "sri-damodara-perumal-temple", name: "Sri Damodara Perumal Temple", nameTa: "ஸ்ரீ தாமோதர பெருமாள் திருக்கோயில்" }
];

/**
 * Fetch all temples from Firestore. If the collection is empty, seeds default temples.
 */
export const getTemples = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, TEMPLES_COLLECTION));
        if (querySnapshot.empty) {
            console.log("Temples collection is empty. Seeding default temples...");
            for (const temple of DEFAULT_TEMPLES) {
                const { id, ...data } = temple;
                await setDoc(doc(db, TEMPLES_COLLECTION, id), data);
            }
            // Fetch again after seeding
            const freshSnapshot = await getDocs(collection(db, TEMPLES_COLLECTION));
            return freshSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        }
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error("Error fetching temples: ", error);
        throw error;
    }
};
