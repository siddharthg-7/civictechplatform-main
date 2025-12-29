import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAAQp7cYyBInwFS_127kSe34rzUUUgsl4k",
    authDomain: "civic-3c011.firebaseapp.com",
    projectId: "civic-3c011",
    storageBucket: "civic-3c011.firebasestorage.app",
    messagingSenderId: "732793044244",
    appId: "1:732793044244:web:90e1b76c3b9e0fe0629601",
    measurementId: "G-30TCRN86FW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;

export { app, auth, db, storage, analytics };
