"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaHome, FaChartLine, FaDollarSign, FaUniversity, FaUser, FaSignInAlt } from "react-icons/fa";

export default function Chart() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("chart");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // ก่อน login

  const handleNavigation = (tab: string, path: string) => {
    setActiveTab(tab);
    router.push(path);
  };

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
            className={`flex items-center space-x-2 p-3 rounded-lg ${
              activeTab === "home" ? "bg-gray-700" : ""
            }`}
            onClick={() => handleNavigation("home", "/dashboard")}
          >
            <FaHome />
            <span>Home</span>
          </button>
          <button
            className={`flex items-center space-x-2 p-3 rounded-lg ${
              activeTab === "chart" ? "bg-gray-700" : ""
            }`}
            onClick={() => handleNavigation("chart", "/chart")}
          >
            <FaChartLine />
            <span>Chart</span>
          </button>
          <button
            className={`flex items-center space-x-2 p-3 rounded-lg ${
              activeTab === "asset" ? "bg-gray-700" : ""
            }`}
            onClick={() => handleNavigation("asset", "/asset")}
          >
            <FaDollarSign />
            <span>Asset</span>
          </button>
          <button
            className={`flex items-center space-x-2 p-3 rounded-lg ${
              activeTab === "finance" ? "bg-gray-700" : ""
            }`}
            onClick={() => handleNavigation("finance", "/finance")}
          >
            <FaUniversity />
            <span>Finance</span>
          </button>
        </nav>

        {/* Login Button or User Profile */}
        <div className="mt-auto">
          {isLoggedIn ? (
            <div className="flex items-center space-x-2 p-3 rounded-lg bg-gray-700">
              <FaUser />
              <span>Arin</span>
            </div>
          ) : (
            <Link href="/login">
              <button className="w-full flex items-center justify-center space-x-2 p-3 rounded-lg bg-blue-600 text-white font-semibold shadow-lg transition hover:bg-blue-700">
                <FaSignInAlt />
                <span>Login</span>
              </button>
            </Link>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-gray-900">
        <h2 className="text-xl font-bold mb-4">CHART</h2>
        {/* เนื้อหาของหน้า Chart */}
        <p>นี่คือเนื้อหาสำหรับหน้า Chart ก่อนเข้าสู่ระบบ (ก่อน login)</p>
      </main>
    </div>
  );
}
