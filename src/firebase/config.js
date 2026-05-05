import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Explicitly import to ensure registration
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBC3riqNemVoIlw8Mq7pZlXdZxPHpyZeoo",
  authDomain: "kaadai-web.firebaseapp.com",
  projectId: "kaadai-web",
  storageBucket: "kaadai-web.firebasestorage.app",
  messagingSenderId: "604023019557",
  appId: "1:604023019557:web:ca1cd10f1e2ae2190747cc",
  measurementId: "G-C0SNXEXW2B"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, db, auth, storage };
export default app;
