"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaHome, FaChartLine, FaDollarSign, FaUniversity, FaUser } from "react-icons/fa";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

export default function ChartLoggedIn() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("chart");
  const [isBuying, setIsBuying] = useState(true);

  const handleNavigation = (tab: string, path: string) => {
    setActiveTab(tab);
    router.push(path);
  };

  // ข้อมูลกราฟหุ้น
  const data = {
    labels: ["11:00", "11:03", "11:06", "11:09", "11:12", "11:15", "11:18"],
    datasets: [
      {
        data: [230, 240, 235, 250, 245, 260, 255],
        borderColor: "#00ff00",
        backgroundColor: "rgba(0, 255, 0, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar เมนูซ้าย */}
      <aside className="w-64 bg-gray-800 p-6 flex flex-col">
        <div className="flex items-center space-x-2 mb-8">
          <div className="bg-green-500 p-2 rounded-lg">
            <span className="text-black font-bold text-xl">G</span>
          </div>
          <h1 className="text-2xl font-bold">EQUITY</h1>
        </div>

        {/* เมนู Sidebar */}
        <nav className="flex flex-col space-y-4">
          {[
            { name: "Home", icon: <FaHome />, path: "/dashboard/loggedin" },
            { name: "Chart", icon: <FaChartLine />, path: "/chart/loggedin" },
            { name: "Asset", icon: <FaDollarSign />, path: "/asset/loggedin" },
            { name: "Finance", icon: <FaUniversity />, path: "/finance/loggedin" },
          ].map((item) => (
            <button
              key={item.name}
              className={`flex items-center space-x-2 p-3 rounded-lg ${
                activeTab === item.name.toLowerCase() ? "bg-gray-700" : ""
              }`}
              onClick={() => handleNavigation(item.name.toLowerCase(), item.path)}
            >
              {item.icon}
              <span>{item.name}</span>
            </button>
          ))}
        </nav>

        {/* โปรไฟล์ผู้ใช้ */}
        <div className="mt-auto flex items-center space-x-2 p-3 rounded-lg bg-gray-700">
          <FaUser />
          <span>Arin</span>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-7 bg-gray-900 overflow-y-auto flex ">
        {/* กราฟหุ้น */}
        <div className="p-4 bg-gray-700 rounded-xl text-white shadow-lg w-2/3">
          {/* ชื่อหุ้นและราคา */}
          <div className="mb-2">
            <h2 className="text-3xl font-bold text-gray-300">APPL</h2>
            <p className="text-4xl font-bold">245.41 <span className="text-lg">USD</span></p>
            <p className="text-lg text-gray-300">≈ 8,248.23 THB</p>
            <div className="flex items-center space-x-2 text-green-300 text-sm mt-1">
              <span className="w-2 h-2 bg-green-300 rounded-full"></span>
              <span>Open</span>
            </div>
          </div>

          {/* กราฟ */}
          <div className="bg-transparent">
            <Line
              data={data}
              options={{
                plugins: {
                  legend: { display: false },
                },
              }}
            />
          </div>
        </div>

        {/* Sidebar ขวา */}
        <div className="w-1/5 p-4 bg-[#4A3F75] rounded-xl shadow-lg ml-auto h-full">
          {/* Account Balance */}
          <p className="text-2xl font-bold">
            $55,698.48 <span className="text-green-400 font-normal text-sm">+1.2%</span>
          </p>
          <button className="w-full px-4 py-3 bg-green-500 text-white text-lg rounded-lg hover:bg-green-600 mx-auto block mt-5">
            Withdraw
          </button>

          {/* Recent Activity */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Recent Activity</h3>
            <p className="text-gray-300 text-sm mb-2">Filter by:</p>
            <div className="flex space-x-2 text-sm">
              <select className="bg-white text-black px-3 py-2 rounded-lg cursor-pointer focus:outline-none">
                <option value="sent">Sent</option>
                <option value="received">Received</option>
                <option value="pending">Pending</option>
              </select>
              <select className="bg-white text-black px-3 py-2 rounded-lg cursor-pointer focus:outline-none">
                <option value="currency">Currency</option>
                <option value="usd">USD</option>
                <option value="thb">THB</option>
                <option value="btc">BTC</option>
              </select>
            </div>
          </div>

          {/* Toggle Switch Buy/Sell */}
          <div className="mt-6 flex items-center justify-between">
            <h3 className="text-lg font-semibold mb-2">Exchange</h3>
            <div className="relative flex bg-gray-300 rounded-full p-0.5 w-24">
              <motion.div
                className="absolute top-0 bottom-0 w-12 bg-white rounded-full shadow-md"
                initial={{ x: isBuying ? 0 : 48 }}
                animate={{ x: isBuying ? 0 : 48 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
              <button className="w-12 text-center text-sm rounded-full z-10 text-black" onClick={() => setIsBuying(true)}>
                Buy
              </button>
              <button className="w-12 text-center text-sm rounded-full z-10 text-black" onClick={() => setIsBuying(false)}>
                Sell
              </button>
            </div>
          </div>

          {/* Exchange Now */}
          <button className="w-full mt-4 bg-red-600 py-2 text-white rounded-lg hover:bg-red-700">
            Exchange Now
          </button>
        </div>
      </main>
    </div>
  );
}
