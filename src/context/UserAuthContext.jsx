"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
  sendPasswordResetEmail,

} from "firebase/auth";

import { auth } from "@/app/firebase";
import { useRouter } from "next/navigation";

const userAuthContext = createContext(null);

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const router = useRouter();

 

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }





  async function signUp(email, password, fullName) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await updateProfile(user, { displayName: fullName });
      console.log("✅ SignUp Complete:", user);
      return user; // ส่งคืน user หลังจากอัปเดตชื่อ


    } catch (error) {
      console.error("Error signing up:", error);
      throw error;
    }
  }

  

  async function logOut() {
    try {
      await signOut(auth);
      setUser(null);
      router.push("/")
      console.log("✅ User Logged Out");
     
    } catch (error) {
      console.error("❌ Logout Error:", error);
    }
  }


  async function resetPassword(email) {
    try {
      await sendPasswordResetEmail(auth, email);
      console.log("📧 Password reset email sent to:", email);
      return { success: true, message: "📩 กรุณาตรวจสอบอีเมลของคุณ" };
    } catch (error) {
      console.error("❌ Reset Password Error:", error.message);
      return { success: false, message: error.message };
    }
  }


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      console.log("🔍 Auth State Changed:", currentuser);
      setUser(currentuser);
      
      if (!currentuser){
        router.push("/")
      }
    });

    return () => {
      unsubscribe();
    };
  }, [router]);

  return (
    <userAuthContext.Provider value={{ user, logIn, signUp, logOut, resetPassword }}>
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
