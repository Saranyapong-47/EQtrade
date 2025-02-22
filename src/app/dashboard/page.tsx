"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaHome, FaChartLine, FaDollarSign, FaUniversity, FaSignInAlt } from "react-icons/fa";

export default function Dashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("home");
  
  // ผู้ใช้ยังไม่ได้ล็อกอิน: จะแสดงปุ่ม Login
  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 p-6 flex flex-col">
        {/* Logo */}
        <div className="flex items-center space-x-2 mb-8">
          <div className="bg-green-500 p-2 rounded-lg">
            <span className="text-black font-bold text-xl">G</span>
          </div>
          <h1 className="text-2xl font-bold">EQUITY</h1>
        </div>
        {/* Menu */}
        <nav className="flex flex-col space-y-4">
          <button
            className={`flex items-center space-x-2 p-3 rounded-lg ${activeTab === "home" ? "bg-gray-700" : ""}`}
            onClick={() => {
              setActiveTab("home");
              router.push("/dashboard");
            }}
          >
            <FaHome />
            <span>Home</span>
          </button>
          <button
            className={`flex items-center space-x-2 p-3 rounded-lg ${activeTab === "chart" ? "bg-gray-700" : ""}`}
            onClick={() => {
              setActiveTab("chart");
              router.push("/chart");
            }}
          >
            <FaChartLine />
            <span>Chart</span>
          </button>
          <button
            className={`flex items-center space-x-2 p-3 rounded-lg ${activeTab === "asset" ? "bg-gray-700" : ""}`}
            onClick={() => {
              setActiveTab("asset");
              router.push("/asset");
            }}
          >
            <FaDollarSign />
            <span>Asset</span>
          </button>
          <button
            className={`flex items-center space-x-2 p-3 rounded-lg ${activeTab === "finance" ? "bg-gray-700" : ""}`}
            onClick={() => {
              setActiveTab("finance");
              router.push("/finance");
            }}
          >
            <FaUniversity />
            <span>Finance</span>
          </button>
        </nav>
        {/* Login Button */}
        <div className="mt-auto">
          <Link href="/login">
            <button className="w-full flex items-center justify-center space-x-2 p-3 rounded-lg bg-blue-600 font-semibold shadow-lg transition hover:bg-blue-700">
              <FaSignInAlt />
              <span>Login</span>
            </button>
          </Link>
        </div>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-8 bg-gray-900">
        <h2 className="text-xl font-bold mb-4">DASHBOARD</h2>
        <p>นี่คือหน้า Dashboard สำหรับผู้ใช้ที่ยังไม่ได้ล็อกอิน</p>
      </main>
    </div>
  );
}
