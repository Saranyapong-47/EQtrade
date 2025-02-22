"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaHome, FaChartLine, FaDollarSign, FaUniversity, FaUser } from "react-icons/fa";
import { BsQrCode } from "react-icons/bs";

export default function DepositAmountPage() {
  const router = useRouter();
  const [amount, setAmount] = useState("");

  const handleProceed = () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert("กรุณากรอกจำนวนเงินที่ถูกต้อง");
      return;
    }
    router.push(`/finance/deposit?amount=${amount}`); // ส่งค่าจำนวนเงินไปหน้า QR
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
        <div className="bg-gray-800 p-6 rounded-lg w-96 text-left">
          <h2 className="text-2xl font-bold mb-6">ฝากเงิน</h2>

          {/* Payment Method */}
          <h3 className="text-lg font-semibold mb-2">วิธีการชำระ:</h3>
          <div className="flex items-center space-x-4 bg-gray-700 p-3 rounded-lg">
            <Image src="/QRPAS.png" alt="Thai QR Payments" width={40} height={40} />
            <span className="text-lg font-medium">Thai QR Payments</span>
          </div>

          {/* Input Field */}
          <div className="mt-4">
            <label className="block text-gray-400 mb-2 text-left">จำนวนเงินฝาก</label>
            <div className="flex items-center bg-gray-700 p-3 rounded-lg">
              <input
                type="number"
                className="bg-transparent text-white text-lg w-full outline-none"
                placeholder="min 100"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <span className="ml-2 text-gray-400">THB</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex space-x-4 mt-6">
            <button 
              onClick={() => router.push("/finance/loggedin")} 
              className="w-1/2 bg-gray-600 py-2 rounded-md text-white hover:bg-gray-700 transition"
            >
              ยกเลิก
            </button>
            <button 
              onClick={handleProceed} 
              className="w-1/2 bg-purple-600 py-2 rounded-md text-white hover:bg-purple-700 transition"
            >
              ดำเนินการต่อ
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
