"use client";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AuthPage() {
  const router = useRouter();

  const handleSubmitSignin = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("Invalid email or password !");
        return;
      }

      router.replace("dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  const [isLogin, setIsLogin] = useState(true);

  const [showPassword, setShowPassword] = useState(false);

  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  return (
    <div className="relative flex justify-center items-center h-screen  bg-bgcolor">
      <div
        className="absolute top-6 left-6 cursor-pointer"
        onClick={() => router.push("/")}
      >
        <Image src="/logo.svg" alt="EQ" width={110} height={110} />
      </div>

      {/* ปุ่มสลับ Login / Signup (มุมขวาบน) */}
      <div className="absolute top-6 right-6">
        <div className="flex bg-gray-800 p-1 rounded-full">
          <button
            className={`w-24 py-2 rounded-full text-white font-semibold transition ${
              isLogin ? "bg-gray-600" : "bg-transparent"
            }`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`w-24 py-2 rounded-full text-white font-semibold transition ${
              !isLogin ? "bg-gray-600" : "bg-transparent"
            }`}
            onClick={() => router.push("/signup")}
          >
            Signup
          </button>
        </div>
      </div>

      {/* แอนิเมชัน Login */}
      <AnimatePresence mode="wait">
        {isLogin && (
          <motion.div
            key="login"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-900 p-6 rounded-lg shadow-lg w-96"
          >
            <h2 className="text-2xl font-bold text-center text-white mb-4">
              Log in
            </h2>
            <form className="space-y-4" onSubmit={handleSubmitSignin}>
              <div className="bg-red-500 text-white text-sm p-2 rounded-md text-center">
                {error}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Email
                </label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="w-full px-4 py-2 border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Your password
                </label>
                <div className="relative">
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? "text" : "password"}
                    className="w-full px-4 py-2 border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "🙈 Hide" : "👁 Show"}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
              >
                Log in
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
