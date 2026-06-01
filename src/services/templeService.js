import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/config";

const TEMPLES_COLLECTION = "temples";

const PREFERRED_ORDER = [
    "sri-kariyakali-amman-temple",
    "sri-angalamman-temple",
    "sri-pushpavaneswara-swamy-temple",
    "sri-damodara-perumal-temple"
];

const DEFAULT_TEMPLES = [
    { id: "sri-kariyakali-amman-temple", name: "Arulmigu Kariyakali Amman Temple", nameTa: "அருள்மிகு கரியகாளியம்மன்" },
    { id: "sri-angalamman-temple", name: "Arultharum Angalamman Temple", nameTa: "அருள்தரும் அங்காளம்மன்" },
    { id: "sri-pushpavaneswara-swamy-temple", name: "Arultharum Bagampriyal Udanamar Arulmigu Pushpavaneswara Swamy Temple", nameTa: "அருள்தரும் பாகம்பிரியாள் உடனமர் அருள்மிகு புஷ்பவனேஸ்வர சுவாமி" },
    { id: "sri-damodara-perumal-temple", name: "Sri Alamelu Mangai Lakshmi Sametha Sri Damodara Perumal Temple", nameTa: "ஸ்ரீ அலமேலு மங்கை லக்ஷ்மி சமேத ஸ்ரீ தாமோதர பெருமாள்" }
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
            const list = freshSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            return list.sort((a, b) => PREFERRED_ORDER.indexOf(a.id) - PREFERRED_ORDER.indexOf(b.id));
        }
        const list = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        return list.sort((a, b) => PREFERRED_ORDER.indexOf(a.id) - PREFERRED_ORDER.indexOf(b.id));
    } catch (error) {
        console.error("Error fetching temples: ", error);
        throw error;
    }
};
