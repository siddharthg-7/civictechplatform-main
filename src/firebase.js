import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBSW7CxE84tFYdCHYrE6z9k3CYGL8AyGIU",
  authDomain: "civic-36f85.firebaseapp.com",
  projectId: "civic-36f85",
  storageBucket: "civic-36f85.firebasestorage.app",
  messagingSenderId: "662626588580",
  appId: "1:662626588580:web:12df450ce091586e0d9331",
  measurementId: "G-VKQ76KG7N5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;

export { app, auth, db, storage, analytics };
