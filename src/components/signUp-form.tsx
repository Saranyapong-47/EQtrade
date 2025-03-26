"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  
} from "@/components/ui/alert-dialog";
import { AlertCircle,CheckCircle } from "lucide-react";

import { useUserAuth } from "@/context/UserAuthContext";



export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [open, setOpen] = useState(false);
  const { signUp } = useUserAuth();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleToggle = () => {
    setShowPassword(!showPassword);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(""); 
    setSuccess(""); 
    setOpen(false);

    if (!email.includes("@")) {
      setError("Invalid email format! Please include '@'.");
      setOpen(true);
      return;
    }

    if (!email.includes(".com")) {
      setError("Invalid email format! Please include '.com'.");
      setOpen(true);
      return;
    }

    if (password !== confirmPassword) {
      setError("Password do not match !");
      setOpen(true);
      return;
    }

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError("Please fill in all fields !");
      setOpen(true);
      return;
    }

    if (password.length < 6) {
      setError("Password should be at least 6 characters");
      setOpen(true);
      return;
    }

    try {
      const user = await signUp(email, password, `${firstName}`);

      console.log("✅ User registered:", user);

      setSuccess("🎉 Your account has been created successfully!");
      setOpen(true);

<<<<<<< HEAD
=======
     

    
>>>>>>> 88436427f88b9f85e98852b1047a5df137fa681f


      const res_verify = await fetch("http://localhost:3000/api/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const { user:verifiedUser } = await res_verify.json();

      if (verifiedUser) {
        setSuccess("");
        setError("Email already exists !");
        return;
      }

      const res = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({firstName, lastName, email, password,}),
      });

      const { user: registeredUser } = await res.json();

      if (registeredUser) {
        setSuccess("");
        setError("❌ Email already exists!");
        setOpen(true);
        return;
      }

      if (res.ok) {
        setError("");
        setSuccess("✅ Registration successful.");
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      } else {
        console.log("Error during registration failed.");
      }

      console.log("✅ Verifying email:", email);

      setTimeout(() => {
        router.push("/");
      }, 1500);




    } catch (error) {
      console.log("Error during registration", error);
    }
  };




  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Sigup</CardTitle>
          <CardDescription>
            Enter your email below to Sigup to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Firs Name</Label>
                <Input
                  type="text"
                  placeholder="John"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Last Name</Label>
                <Input
                  type="text"
                  placeholder="Doe"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="text"
                  name="dsjslkd;jfnwevnor"
                  autoComplete="off"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <div className="relative">
                  <Input
                    id="password1"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={handleToggle}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? (
                      <FaEyeSlash size={18} />
                    ) : (
                      <FaEye size={18} />
                    )}
                  </button>
                </div>
              </div>

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Confrim Password</Label>
                </div>
                <div className="relative">
                  <Input
                    id="password2"
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    autoComplete="off"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={handleToggle}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? (
                      <FaEyeSlash size={18} />
                    ) : (
                      <FaEye size={18} />
                    )}
                  </button>
                </div>
              </div>

              <Button className="w-full">Sign Up</Button>
            </div>

            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/" className="underline underline-offset-4">
                Singin
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className="max-w-sm">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              {error ? <AlertCircle className="h-5 w-5 text-red-500" /> : <CheckCircle className="h-5 w-5 text-green-500" />}
              {error ? "Error" : "Success"}
            </AlertDialogTitle>
            <AlertDialogDescription>{error ? error : success}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex justify-center">
            <AlertDialogAction onClick={() => setOpen(false)}>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
