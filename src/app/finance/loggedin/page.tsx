"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaHome, FaChartLine, FaDollarSign, FaUniversity, FaUser } from "react-icons/fa";
import { BsQrCode } from "react-icons/bs";
import { FaBitcoin } from "react-icons/fa";

export default function FinanceLoggedIn() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("finance");

  const handleNavigation = (tab: string, path: string) => {
    setActiveTab(tab);
    router.push(path);
  };

  const handleSelectQRPayment = () => {
    router.push("/finance/deposit-amount"); // นำไปที่หน้ากรอกจำนวนเงินก่อน
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
          <button className={`flex items-center space-x-2 p-3 rounded-lg ${activeTab === "home" ? "bg-gray-700" : ""}`} onClick={() => handleNavigation("home", "/dashboard/loggedin")}>
            <FaHome />
            <span>Home</span>
          </button>
          <button className={`flex items-center space-x-2 p-3 rounded-lg ${activeTab === "chart" ? "bg-gray-700" : ""}`} onClick={() => handleNavigation("chart", "/chart/loggedin")}>
            <FaChartLine />
            <span>Chart</span>
          </button>
          <button className={`flex items-center space-x-2 p-3 rounded-lg ${activeTab === "asset" ? "bg-gray-700" : ""}`} onClick={() => handleNavigation("asset", "/asset/loggedin")}>
            <FaDollarSign />
            <span>Asset</span>
          </button>
          <button className={`flex items-center space-x-2 p-3 rounded-lg bg-gray-700`} onClick={() => handleNavigation("finance", "/finance/loggedin")}>
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
      <main className="flex-1 p-8 bg-gray-900">
        <h2 className="text-2xl font-bold mb-6">ฝากเงิน</h2>

        {/* Deposit Options */}
        <div className="flex space-x-6">
          {/* Thai QR Payments */}
          <button 
            className="bg-gray-800 p-6 rounded-lg flex items-center space-x-4 w-80 hover:bg-gray-700 transition"
            onClick={handleSelectQRPayment} // นำไปที่หน้ากรอกจำนวนเงิน
          >
            <Image src="/QRPAS.png" alt="Thai QR Payments" width={50} height={50} />
            <div>
              <h3 className="text-lg font-bold">Thai QR Payments</h3>
              <p className="text-sm text-gray-400">ค่าธรรมเนียม 0%</p>
              <p className="text-sm text-gray-400">วงเงินไม่เกิน <span className="text-white">100,000 บาท</span></p>
            </div>
          </button>

          {/* Bitcoin (BTC) */}
          <div className="bg-gray-800 p-6 rounded-lg flex items-center space-x-4 w-80">
            <FaBitcoin className="text-4xl text-yellow-400" />
            <div>
              <h3 className="text-lg font-bold">Bitcoin (BTC)</h3>
              <p className="text-sm text-gray-400">ค่าธรรมเนียม 0%</p>
              <p className="text-sm text-gray-400">วงเงินไม่เกิน <span className="text-white">200,000 USD</span></p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
