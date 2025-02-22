"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaHome, FaChartLine, FaDollarSign, FaUniversity, FaUser } from "react-icons/fa";
import Image from "next/image";

export default function DepositPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(300); // 5 นาที (300 วินาที)

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [countdown]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${minutes}:${sec < 10 ? "0" : ""}${sec}`;
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 p-6 flex flex-col">
        <div className="flex items-center space-x-2 mb-8">
          <div className="bg-green-500 p-2 rounded-lg">
            <span className="text-black font-bold text-xl">G</span>
          </div>
          <h1 className="text-2xl font-bold">EQUITY</h1>
        </div>

        <nav className="flex flex-col space-y-4">
          <button className="flex items-center space-x-2 p-3 rounded-lg" onClick={() => router.push("/dashboard/loggedin")}>
            <FaHome />
            <span>Home</span>
          </button>
          <button className="flex items-center space-x-2 p-3 rounded-lg" onClick={() => router.push("/chart/loggedin")}>
            <FaChartLine />
            <span>Chart</span>
          </button>
          <button className="flex items-center space-x-2 p-3 rounded-lg" onClick={() => router.push("/asset/loggedin")}>
            <FaDollarSign />
            <span>Asset</span>
          </button>
          <button className="flex items-center space-x-2 p-3 rounded-lg bg-gray-700" onClick={() => router.push("/finance/loggedin")}>
            <FaUniversity />
            <span>Finance</span>
          </button>
        </nav>

        <div className="mt-auto flex items-center space-x-2 p-3 rounded-lg bg-gray-700">
          <FaUser />
          <span>Arin</span>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-gray-900 flex justify-center items-center">
        <div className="bg-gray-800 p-6 rounded-lg w-96 text-center">
          <h2 className="text-2xl font-bold mb-6">ฝากเงิน</h2>

          <h3 className="text-lg font-semibold mb-4">วิธีการชำระ:</h3>
          <div className="flex items-center space-x-4 bg-gray-700 p-3 rounded-lg justify-center">
            <Image src="/qrpas.png" alt="Thai QR Payments" width={50} height={50} />
            <span className="text-lg">Thai QR Payments</span>
          </div>

          {/* QR Code */}
          <div className="mt-6 flex justify-center">
            <Image src="/QR_CODE.png" alt="QR Code" width={200} height={200} />
          </div>

          <p className="text-gray-400 mt-4">
            หมดอายุใน: <span className="text-white font-bold">{formatTime(countdown)}</span>
          </p>

          {/* Buttons */}
          <div className="flex space-x-4 mt-6">
            <button 
              onClick={() => router.push("/finance/loggedin")} 
              className="w-1/2 bg-gray-600 py-2 rounded-md text-white hover:bg-gray-700 transition"
            >
              ยกเลิก
            </button>
            <button 
              className="w-1/2 bg-purple-600 py-2 rounded-md text-white hover:bg-purple-700 transition"
            >
              ดำเนินการฝาก
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
