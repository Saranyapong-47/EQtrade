"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaHome, FaChartLine, FaDollarSign, FaUniversity, FaUser, FaClock } from "react-icons/fa";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

export default function ChartLoggedIn() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("chart");
  const [isBuying, setIsBuying] = useState(true);

  // ข้อมูลธุรกรรม (ข้อมูลที่ขาดหายไป)
  const transactions = [
    { id: 1, icon: 'btc', amount: "0.00054 BTC", name: "Bitcoin", timeAgo: "2 mins ago" },
    { id: 2, icon: 'eth-red', amount: "0.12 ETH", name: "Ethereum", timeAgo: "5 mins ago" },
    { id: 3, icon: 'eth', amount: "0.06 ETH", name: "Ethereum", timeAgo: "10 mins ago" }
  ];

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
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 5,
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
      <main className="flex-1 p-6 bg-[#121220]">
        {/* Header with market flags */}
        <div className="flex justify-end mb-4">
          <div className="flex space-x-2">
            <button className="flex items-center space-x-2 bg-gray-700/50 px-3 py-2 rounded-full">
              <div className="w-6 h-6 rounded-full overflow-hidden flex items-center justify-center bg-purple-500">
                <span className="text-xs">$</span>
              </div>
              <span>หุ้นรัฐฯ</span>
            </button>
            <button className="flex items-center space-x-2 bg-gray-700/50 px-3 py-2 rounded-full">
              <div className="w-6 h-6 rounded-full overflow-hidden flex items-center justify-center bg-purple-500">
                <span className="text-xs">$</span>
              </div>
              <span>NASDAQ</span>
            </button>
          </div>
        </div>

        <div className="flex space-x-6">
          {/* Main Chart Container */}
          <div className="flex-1">
            {/* Chart Container */}
            <div className="bg-[#4A3F75] rounded-3xl p-8 mb-6">
              {/* ชื่อหุ้นและราคา */}
              <div className="mb-6">
                <h2 className="text-4xl font-bold text-purple-300">APPL</h2>
                <div className="flex items-baseline">
                  <p className="text-5xl font-bold">245.41</p>
                  <span className="text-lg ml-2">USD</span>
                  <span className="text-xl ml-4">≈</span>
                  <span className="text-xl ml-2">8,248.23</span>
                  <span className="text-lg ml-2">THB</span>
                </div>
                <div className="flex items-center space-x-2 text-green-300 text-sm mt-2">
                  <span className="w-2 h-2 bg-green-300 rounded-full"></span>
                  <span>Open</span>
                </div>
              </div>

              {/* กราฟ */}
              <div className="h-64 bg-transparent">
                <Line
                  data={data}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { display: false },
                    },
                    scales: {
                      x: {
                        grid: {
                          display: false,
                          drawBorder: false,
                        },
                        ticks: {
                          color: "rgba(255, 255, 255, 0.5)",
                        },
                      },
                      y: {
                        display: false,
                      },
                    },
                    elements: {
                      line: {
                        borderWidth: 2,
                      },
                      point: {
                        radius: 0,
                        hoverRadius: 6,
                      },
                    },
                  }}
                />
              </div>

              {/* Time Frames */}
              <div className="flex justify-center mt-4 space-x-4">
                <button className="px-3 py-1 rounded-lg bg-gray-800 text-white">1H</button>
                <button className="px-3 py-1 rounded-lg bg-purple-600 text-white">1D</button>
                <button className="px-3 py-1 rounded-lg bg-gray-800 text-white">1W</button>
                <button className="px-3 py-1 rounded-lg bg-gray-800 text-white">1M</button>
                <button className="px-3 py-1 rounded-lg bg-gray-800 text-white">1Y</button>
              </div>
            </div>

            {/* Transactions Section */}
            <div className="bg-[#4A3F75] rounded-3xl p-6">
              <div className="grid grid-cols-3 gap-4">
                {transactions.map((tx) => (
                  <div key={tx.id} className="bg-gray-800/70 rounded-xl p-4 flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        tx.icon === 'btc' ? 'bg-orange-500' : 
                        tx.icon === 'eth-red' ? 'bg-red-500' : 'bg-purple-500'
                      }`}>
                        {tx.icon === 'btc' && <span className="text-sm font-bold">₿</span>}
                        {tx.icon === 'eth-red' && <span className="text-sm font-bold">Ξ</span>}
                        {tx.icon === 'eth' && <span className="text-sm font-bold">Ξ</span>}
                      </div>
                      <div>
                        <p className="text-sm text-gray-300">{tx.amount}</p>
                        <p className="text-md">{tx.name}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <button className="border border-gray-600 text-gray-300 px-3 py-1 rounded-lg text-sm mb-2">
                        Details
                      </button>
                      <div className="flex items-center text-xs text-gray-400">
                        <FaClock className="mr-1" size={10} />
                        <span>{tx.timeAgo}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar ขวา */}
          <div className="w-90 bg-[#4A3F75] rounded-3xl p-4 h-full flex flex-col">
            {/* Account Balance */}
            <div className="mb-6">
              <div className="flex items-baseline justify-between">
                <p className="text-2xl font-bold">$55,698.48</p>
                <span className="text-green-400 font-normal text-sm">+1.2%</span>
              </div>
              <button className="w-full px-4 py-2 bg-green-500 text-white text-lg rounded-lg hover:bg-green-600 mt-4">
                Withdraw
              </button>
            </div>

            {/* Recent Activity */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Recent Activity</h3>
              <p className="text-gray-300 text-sm mb-2">Filter by:</p>
              <div className="flex space-x-2 text-sm">
                <div className="relative inline-block w-full">
                  <select className="bg-white text-black px-4 py-1 rounded-lg cursor-pointer focus:outline-none appearance-none w-full">
                    <option value="sent">Sent</option>
                    <option value="received">Received</option>
                    <option value="pending">Pending</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-black">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                    </svg>
                  </div>
                </div>
                <div className="relative inline-block w-full">
                  <select className="bg-white text-black px-4 py-1 rounded-lg cursor-pointer focus:outline-none appearance-none w-full">
                    <option value="currency">Currency</option>
                    <option value="usd">USD</option>
                    <option value="thb">THB</option>
                    <option value="btc">BTC</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-black">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Exchange */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Exchange</h3>
                <div className="relative bg-gray-200 rounded-full p-1 w-24 h-8">
                  <motion.div
                    className="absolute top-0 bottom-0 w-12 bg-white rounded-full shadow-md"
                    initial={{ x: isBuying ? 0 : 48 }}
                    animate={{ x: isBuying ? 0 : 48 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                  <div className="flex relative z-10">
                    <button 
                      className={`w-12 h-6 text-center text-sm rounded-full ${isBuying ? 'text-black font-medium' : 'text-gray-600'}`} 
                      onClick={() => setIsBuying(true)}
                    >
                      Buy
                    </button>
                    <button 
                      className={`w-12 h-6 text-center text-sm rounded-full ${!isBuying ? 'text-black font-medium' : 'text-gray-600'}`} 
                      onClick={() => setIsBuying(false)}
                    >
                      Sell
                    </button>
                  </div>
                </div>
              </div>

              {/* Crypto Selection */}
              <div className="space-y-4 mb-4">
                <div className="bg-gray-700/50 rounded-xl px-4 py-1 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="bg-orange-500 w-8 h-8 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">₿</span>
                    </div>
                    <span className="font-medium">BTC</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>0.005433</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>

                <div className="bg-gray-700/50 rounded-xl px-4 py-1 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="bg-green-500 w-8 h-8 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">฿</span>
                    </div>
                    <span className="font-medium">THB</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>34,0089.00</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Exchange Now Button */}
              <button className="w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium">
                Exchange Now
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}