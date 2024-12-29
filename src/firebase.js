import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBBzMK5oAu4fs2M0_rHi36qZmch31CF7Jk",
  authDomain: "event-management-50ac9.firebaseapp.com",
  projectId: "event-management-50ac9",
  storageBucket: "event-management-50ac9.firebasestorage.app",
  messagingSenderId: "382875970554",
  appId: "1:382875970554:web:bacc993d58e09e54b29243",
  measurementId: "G-Z4Q4795B1F"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };