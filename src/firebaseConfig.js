import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCr6ezbQ1Q3TY_whR-OKd26d7KRu-Dpo9w",
  authDomain: "water-footprint-53ad3.firebaseapp.com",
  projectId: "water-footprint-53ad3",
  storageBucket: "water-footprint-53ad3.firebasestorage.app",
  messagingSenderId: "307575075521",
  appId: "1:307575075521:web:f50f151e6803a00cfd9a40",
  measurementId: "G-P8QG3Q8K4L"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);