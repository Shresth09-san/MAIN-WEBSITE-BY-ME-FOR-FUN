import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyD8noeh_wleAwEqnqiisQLl9QfmY7kY1rk",
  authDomain: "doit-b2f00.firebaseapp.com",
  projectId: "doit-b2f00",
  storageBucket: "doit-b2f00.firebasestorage.app",
  messagingSenderId: "525770196733",
  appId: "1:525770196733:web:48fbcb2ea253842df4a094",
  measurementId: "G-4TDZZLFQPE"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
