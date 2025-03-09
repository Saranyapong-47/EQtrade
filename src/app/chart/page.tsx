"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaClock } from "react-icons/fa";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { useUserAuth } from "../../context/UserAuthContext";
import Sidebar from "@/components/Sidebar/page";
import ProtectedRoute from "@/app/api/auth/Protect/Protectedroute";
import TradingViewWidget from "@/app/chart/TradingChart/page";

export default function ChartLoggedIn() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("chart");
  const [isBuying, setIsBuying] = useState(true);

  const { logOut, user } = useUserAuth();

  const handleLogout = async () => {
    try {
      await logOut();
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ProtectedRoute>
      <div className="flex h-screen text-white ">
        {/* Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          handleLogout={handleLogout}
          user={user}
        />

        {/* Main Content */}
        <main className="flex-1 p-6 bg-bgcolor h-screen overflow-y-auto scrollbar-hide">
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

          <div className="flex space-x-6 ">
            {/* Main Chart Container */}
            <div className="flex-1 w-full min-h-[500px] max-h-[500px] items-center">
              {/* Chart Container */}
              <div className="bg-[#110E22]/80 backdrop-blur-lg rounded-3xl p-4 mb-4 w-full min-h-[500px] max-h-[500px] flex flex-col justify-center items-center overflow-hidden">
                {/* กราฟ */}
                <div className="w-full h-full justify-center items-center">
                  <TradingViewWidget />
                </div>
              </div>
            </div>

         
            {/* Sidebar ขวา */}
            <div className="w-90 bg-[#110E22] rounded-3xl p-4 mb-6 h-full min-h-[500px] flex flex-col">
              {/* Account Balance */}
              <div className="mb-6">
                <div className="flex items-baseline justify-between">
                  <p className="text-2xl font-bold">$55,698.48</p>
                  <span className="text-green-400 font-normal text-sm">
                    +1.2%
                  </span>
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
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
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
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
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
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                    />
                    <div className="flex relative z-10">
                      <button
                        className={`w-12 h-6 text-center text-sm rounded-full ${
                          isBuying ? "text-black font-medium" : "text-gray-600"
                        }`}
                        onClick={() => setIsBuying(true)}
                      >
                        Buy
                      </button>
                      <button
                        className={`w-12 h-6 text-center text-sm rounded-full ${
                          !isBuying ? "text-black font-medium" : "text-gray-600"
                        }`}
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
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
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
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
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

          {/*Bottom Tab */}
          <div className="mt-1 bg-[#110E22] rounded-3xl p-6">
            <div className="grid grid-cols-3 gap-4">
              {/* ข้อมูลธุรกรรม */}
              {[
                {
                  id: 1,
                  icon: "btc",
                  amount: "0.00054 BTC",
                  name: "Bitcoin",
                  timeAgo: "2 mins ago",
                },
                {
                  id: 2,
                  icon: "eth-red",
                  amount: "0.12 ETH",
                  name: "Ethereum",
                  timeAgo: "5 mins ago",
                },
                {
                  id: 3,
                  icon: "eth",
                  amount: "0.06 ETH",
                  name: "Ethereum",
                  timeAgo: "10 mins ago",
                },
              ].map((tx) => (
                <div
                  key={tx.id}
                  className="bg-gray-800/70 rounded-xl p-4 flex items-start justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        tx.icon === "btc"
                          ? "bg-orange-500"
                          : tx.icon === "eth-red"
                          ? "bg-red-500"
                          : "bg-purple-500"
                      }`}
                    >
                      {tx.icon === "btc" && (
                        <span className="text-sm font-bold">₿</span>
                      )}
                      {tx.icon === "eth-red" && (
                        <span className="text-sm font-bold">Ξ</span>
                      )}
                      {tx.icon === "eth" && (
                        <span className="text-sm font-bold">Ξ</span>
                      )}
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
        </main>
      </div>
    </ProtectedRoute>
  );
}
