"use client";

import { useState } from "react";
import { useUserAuth } from "@/context/UserAuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function ResetPassword() {
  const { resetPassword } = useUserAuth();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");
  const [open, setOpen] = useState(false);
  const [dialogType, setDialogType] = useState("");
  const [dialogMessage, setDialogMessage] = useState("");

  const router = useRouter();

  const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("🔍 handleReset() called");
    console.log("🔍 Email entered:", email);

    setMessage("");
    setError("");
    setSuccess("");

    setOpen(false);
    setDialogType("");
    setDialogMessage("");

    if (!email.includes("@") || !email.includes(".")) {
      setDialogType("error");
      setDialogMessage("❌ กรุณากรอกอีเมลให้ถูกต้อง");
      setOpen(true);
      return;
    }

    try {
      const response = await resetPassword(email);
      console.log("🔍 Reset Password Response:", response);

      if (response.success) {
        setDialogType("success");
        setDialogMessage(response.message);
      } else {
        setDialogType("error");
        setDialogMessage(response.message);
      }

      setOpen(true);

      if (response.success) {
        setTimeout(() => {
          router.push("/");
        }, 3000);
      }
    } catch (err) {
      setError("❌ Error Seding Email.");
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

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className="max-w-sm">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              {dialogType === "error" ? "❌ Error" : "✅ Success"}
            </AlertDialogTitle>
            <AlertDialogDescription>{dialogMessage}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex justify-center">
            <AlertDialogAction onClick={() => setOpen(false)}>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
