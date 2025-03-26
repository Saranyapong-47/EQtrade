"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
  fetchSignInMethodsForEmail,
} from "firebase/auth";

import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { doc, setDoc } from "firebase/firestore"; // ✅ เพิ่มการ import
import { db } from "@/lib/firebase"; // ✅ Import 
<<<<<<< HEAD
import { generateWalletNumber } from "@/utils/generateWalletNumber";
=======
>>>>>>> 88436427f88b9f85e98852b1047a5df137fa681f

const userAuthContext = createContext(null);

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const db = getFirestore();

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

<<<<<<< HEAD
  
async function signUp(email, password, fullName) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // ✅ 1. สร้าง walletNumber
      const walletNumber = generateWalletNumber();
  
      // ✅ 2. สร้าง Wallet บน MongoDB
      await fetch("/api/wallet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.uid,
          walletNumber,
        }),
      });
  
      // ✅ 3. อัปเดตชื่อแสดงใน Firebase
      await updateProfile(user, { displayName: fullName });
  
      return user;
  
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        throw new Error("📧 อีเมลนี้ถูกใช้งานแล้ว กรุณาเข้าสู่ระบบหรือใช้อีเมลอื่น");
      }
  
      console.error("❌ Sign-up error:", error);
=======
  async function signUp(email, password, fullName) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        email: email,
        uid: user.uid
      });
  

      await updateProfile(user, { displayName: fullName });
      return user; // ส่งคืน user หลังจากอัปเดตชื่อ
    } catch (error) {
      console.error("Error signing up:", error);
>>>>>>> 88436427f88b9f85e98852b1047a5df137fa681f
      throw error;
    }
  }

  async function logOut() {
    try {
      await signOut(auth);
      setUser(null);
      router.push("/");
      console.log("✅ User Logged Out");
    } catch (error) {
      console.error("❌ Logout Error:", error);
    }
  }

  async function checkEmailExistsInFirestore(email) {
    try {
      const usersRef = collection(db, "users"); // ✅ ดึงข้อมูลจาก Collection "users"
      const q = query(usersRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);
  
      return !querySnapshot.empty; // ✅ คืนค่า true ถ้ามีอีเมลอยู่
    } catch (error) {
      console.error("❌ Error checking email in Firestore:", error);
      return false;
    }
  }

  async function checkEmailExistsInFirestore(email) {
    try {
      console.log("🔍 Checking email in Firestore:", email); // ✅ Debugging
  
      const usersRef = collection(db, "users"); // ✅ ดึง Collection "users"
      const q = query(usersRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);
  
      const emailExists = !querySnapshot.empty; // ✅ คืนค่า `true` ถ้ามีอีเมลอยู่
      console.log("✅ Email exists:", emailExists);
      
      return emailExists; 
    } catch (error) {
      console.error("❌ Error checking email in Firestore:", error);
      return false;
    }
  }

  async function resetPassword(email) {
    console.log("🔍 resetPassword() called with email:", email);
  
    try {
      const emailExists = await checkEmailExistsInFirestore(email); // ✅ เรียกแค่ครั้งเดียว
      console.log("🔍 Email Exists in Firestore:", emailExists);
  
      if (!emailExists) {
        return { success: false, message: "❌ This email does not exist in the system." };
      }
  
      await sendPasswordResetEmail(auth, email);
      console.log("📧 Password reset email sent to:", email);
      return { success: true, message: "📩 Please check your email." };
    } catch (error) {
      console.error("❌ Reset Password Error:", error.code, "-", error.message);
      return { success: false, message: error.message };
    }
  }
  

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      
      setUser(currentuser);

      if (!currentuser) {
        router.push("/");
      }
    });

    return () => {
      unsubscribe();
    };
  }, [router]);

  return (
    <userAuthContext.Provider
      value={{ user, logIn, signUp, logOut, resetPassword, checkEmailExistsInFirestore }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
