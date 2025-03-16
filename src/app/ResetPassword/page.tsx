"use client";

import { useState } from "react";
import { useUserAuth } from "@/context/UserAuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import {
  AlertDialog,
  
  AlertDialogContent,
  AlertDialogDescription,

  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function ResetPassword() {
  const { resetPassword } = useUserAuth();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const router = useRouter();

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setSuccess("");

   

    if (!email.includes("@") || !email.includes(".")) {
      setError("❌ กรุณากรอกอีเมลให้ถูกต้อง");
      return;
    }


    try {
      const response = await resetPassword(email);

      if (response.success) {
        setSuccess("📩 Please Check Your Email");
        setTimeout(() => {
          router.push("/");
        }, 3000); // Redirect หลังจาก 3 วินาที
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError("❌ เกิดข้อผิดพลาดในการส่งอีเมล");
      console.error("Reset Password Error:", err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">🔑 Reset Password</h2>
      <form onSubmit={handleReset}>
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button type="submit" className="w-full mt-4">
          Send Reset Link
        </Button>
      </form>
      {message && <p className="mt-4 text-green-600">{message}</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}


      <AlertDialog open={success !== ""} onOpenChange={() => setSuccess("")}>
        <AlertDialogContent className="max-w-sm">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              ✅ Success
            </AlertDialogTitle>
            <AlertDialogDescription>{success}</AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    
    </div>
  );
}
