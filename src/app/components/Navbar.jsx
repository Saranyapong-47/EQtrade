"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="relative flex justify-center items-center h-screen bg-gradient-to-br from-black to-blue-900">
      {/* Logo */}
      <div className="absolute top-6 left-6 text-white text-lg font-bold">
        <span className="text-3xl">EQ</span>
      </div>
      {/* Add closing div tag */}
      <div className="absolute top-6 right-6">
        <div className="flex bg-gray-800 p-1 rounded-full">
          <button
            className={`w-24 py-2 rounded-full text-white font-semibold transition ${
              !isLogin ? "bg-gray-600" : "bg-transparent"
            }`}
            onClick={() => router.push("/login")}
          >
            Login
          </button>
          <button
            className={`w-24 py-2 rounded-full text-white font-semibold transition ${
              isLogin ? "bg-gray-600" : "bg-transparent"
            }`}
            onClick={() => router.push("/signup")}
          >
            Signup
          </button>
        </div>
      </div>
    </div>
  );
}
