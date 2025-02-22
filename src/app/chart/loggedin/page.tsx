"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaHome, FaChartLine, FaDollarSign, FaUniversity, FaUser } from "react-icons/fa";

export default function ChartLoggedIn() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("chart");

  const handleNavigation = (tab: string, path: string) => {
    setActiveTab(tab);
    router.push(path);
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <aside className="w-64 bg-gray-800 p-6 flex flex-col">
        <div className="flex items-center space-x-2 mb-8">
          <div className="bg-green-500 p-2 rounded-lg">
            <span className="text-black font-bold text-xl">G</span>
          </div>
          <h1 className="text-2xl font-bold">EQUITY</h1>
        </div>
        <nav className="flex flex-col space-y-4">
          <button
            className={`flex items-center space-x-2 p-3 rounded-lg ${activeTab === "home" ? "bg-gray-700" : ""}`}
            onClick={() => handleNavigation("home", "/dashboard/loggedin")}
          >
            <FaHome />
            <span>Home</span>
          </button>
          <button
            className={`flex items-center space-x-2 p-3 rounded-lg ${activeTab === "chart" ? "bg-gray-700" : ""}`}
            onClick={() => handleNavigation("chart", "/chart/loggedin")}
          >
            <FaChartLine />
            <span>Chart</span>
          </button>
          <button
            className={`flex items-center space-x-2 p-3 rounded-lg ${activeTab === "asset" ? "bg-gray-700" : ""}`}
            onClick={() => handleNavigation("asset", "/asset/loggedin")}
          >
            <FaDollarSign />
            <span>Asset</span>
          </button>
          <button
            className={`flex items-center space-x-2 p-3 rounded-lg ${activeTab === "finance" ? "bg-gray-700" : ""}`}
            onClick={() => handleNavigation("finance", "/finance/loggedin")}
          >
            <FaUniversity />
            <span>Finance</span>
          </button>
        </nav>
        <div className="mt-auto flex items-center space-x-2 p-3 rounded-lg bg-gray-700">
          <FaUser />
          <span>Arin</span>
        </div>
      </aside>
      <main className="flex-1 p-8 bg-gray-900">
        <h2 className="text-xl font-bold mb-4">CHART (Logged In)</h2>
        <p>นี่คือหน้า Chart หลังจากล็อกอินแล้ว</p>
      </main>
    </div>
  );
}
