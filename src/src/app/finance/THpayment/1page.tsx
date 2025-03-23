"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ProtectedRoute from "@/app/api/auth/Protect/Protectedroute";
import Sidebar from "@/components/Sidebar/page";


import { useUserAuth } from "../../../context/UserAuthContext";


export default function DepositAmountPage() {
  const router = useRouter();
  const [amount, setAmount] = useState("");

  const { logOut, user } = useUserAuth();
  const [activeTab, setActiveTab] = useState("finance");
  const [error, setError] = useState("");

  const handleLogout = async () => {
    try {
      await logOut();
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const handleProceed = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const numericAmount = parseFloat(amount);
      if (!Number.isNaN(numericAmount) && numericAmount >= 100) {
        setError("");
        router.push(`/finance/deposit?amount=${amount}`); // ส่งค่าจำนวนเงินไปหน้า QR
      }else{
        setError("กรุณาใส่จำนวนเงิน (ขั้นต่ำ 100 บาท)")
      }
    } catch (error) {
      console.log(error);
      setError("Error");
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
      <main className="flex-1 p-8 bg-bgcolor flex justify-center items-center">
        <div className="bg-gray-800 p-5 rounded-lg w-96 text-left">
          <h2 className="text-2xl font-bold mb-2.5">ฝากเงิน</h2>
          {error && (
            <div className="bg-red-500 text-white text-sm  p-1.5 rounded-md my-1 text-center">
              {error}
            </div>
          )}

          {/* Payment Method */}
          <h3 className="text-lg font-medium my-2 ">วิธีการชำระเงิน</h3>
          <div className="flex items-center space-x-4 bg-gray-700 p-3 rounded-lg">
            <Image
              src="/QRPAS.png"
              alt="Thai QR Payments"
              width={40}
              height={40}
            />
            <span className="text-lg font-medium">Thai QR Payments</span>
          </div>

          {/* Input Field */}
          <div className="mt-4">
            <label className="block text-gray-400 mb-2 text-left">
              จำนวนเงินฝาก
            </label>
            <div className="flex items-center bg-gray-700 p-3 rounded-lg">
              <input
                type="number"
                className="bg-transparent text-white text-lg w-full outline-none"
                placeholder="จำนวนเงินขั้นต่ำ 100 บาท"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <span className="ml-2 text-gray-400">THB</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex space-x-4 mt-6">
            <button
              onClick={() => router.push("/finance")}
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
    </ProtectedRoute>
  );
}
