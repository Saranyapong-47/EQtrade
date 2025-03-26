// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCLLAFRO6hWOp2_ajBrVV0tXTXClhay3rs",
  authDomain: "auth-nextjs-dd8e0.firebaseapp.com",
  projectId: "auth-nextjs-dd8e0",
  storageBucket: "auth-nextjs-dd8e0.apppot.app",
  messagingSenderId: "351127573072",
  appId: "1:351127573072:web:79c6583c848f7ab4dbf755",
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); 