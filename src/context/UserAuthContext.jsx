"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,

} from "firebase/auth";

import { auth } from "../app/firebase";
import { useRouter } from "next/navigation";

const userAuthContext = createContext(null);

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const router = useRouter();

 

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function signUp(email, password, fullName) {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        return updateProfile(user, {
          displayName: fullName,
        }).then(() => {
          console.log("✅ SignUp Complete:", user);
          return user;   // ส่งคืน user หลังจากอัปเดตชื่อ
        });
      })
      .catch((error) => {
        console.error("Error signing up:", error);
        throw error;
      });
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
    <userAuthContext.Provider value={{ user, logIn, signUp, logOut }}>
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
