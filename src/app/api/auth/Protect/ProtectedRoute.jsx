"use client"

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useUserAuth } from "@context/UserAuthContext";

function ProtectedRoute({ children }) {
    const {user} = useUserAuth();
    const router = useRouter();

    useEffect(() => {
        if(!user){
            return router.replace("/login")
        }
    },[user,router])

  return children;
  
}
export default ProtectedRoute