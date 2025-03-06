"use client";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function SignupPage() {
  const [isLogin, setIsLogin] = useState(true);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const router = useRouter();

  const handleToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Password do not match !");
      return;
    }

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError("Please fill in all fields !");
      return;
    }

    try {
      const res_verify = await fetch("http://localhost:3000/api/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const { user } = await res_verify.json();

      if (user) {
        setSuccess("");
        setError("Email already exists !");
        return;
      }

      const res = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
      });

      if (res.ok) {
        setError("");
        setSuccess("Registration successful.");
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      } else {
        console.log("Error during registration failed.");
      }
    } catch (error) {
      console.log("Error during registration", error);
    }
  };

  return (
    <div className="relative flex justify-center items-center h-screen bg-bgcolor">
      <div
        className="absolute top-6 left-6 cursor-pointer"
        onClick={() => router.push("/")}
      >
        <Image src="/logo.svg" alt="EQ" width={110} height={110} />
      </div>

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
            onClick={() => setIsLogin(true)}
          >
            Signup
          </button>
        </div>
      </div>

      {/* แอนิเมชัน Signup */}
      <motion.div
        key="signup"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-900 p-6 rounded-lg shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold text-center text-white mb-4">
          Sign up
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-500 text-white text-sm p-2 rounded-md text-center">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-500 text-white text-sm p-2 rounded-md text-center">
              {success}
            </div>
          )}

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-300 my-1 ">
                First Name
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                className="w-full px-4 py-2 border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 my-1">
                Last Name
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
                className="w-full px-4 py-2 border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 my-1">
              Email
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-300 my-1">
              Your password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-2 border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
              ></input>
              <button
                type="button"
                onClick={handleToggle}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>
          </div>

          {/* Confirm Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-300 my-1">
              Confirm Your Password
            </label>
            <div className="relative">
            <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-2 border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
              ></input>
              <button
                type="button"
                onClick={handleToggle}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>
          </div>

          <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
            Create an Account
          </button>
        </form>
      </motion.div>
    </div>
  );
}
