import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDKvAnAI2Ch7uxy9xnUIY_2T_R5Hxskxmc",
  authDomain: "mathic-aadb3.firebaseapp.com",
  projectId: "mathic-aadb3",
  storageBucket: "mathic-aadb3.firebasestorage.app",
  messagingSenderId: "582693686528",
  appId: "1:582693686528:web:188900a6a29f4748dfb7e5"
};

// Инициализируем Firebase
const app = initializeApp(firebaseConfig);

// Auth — для входа через Google
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Firestore — база данных
export const db = getFirestore(app);