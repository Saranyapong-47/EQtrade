"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaBitcoin } from "react-icons/fa";
import { useUserAuth } from "../../context/UserAuthContext";
import Sidebar from "@/components/Sidebar/page";
import ProtectedRoute from "../api/auth/Protect/Protectedroute";
export default function FinanceLoggedIn() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("finance");

  const { logOut, user } = useUserAuth();

  const handleLogout = async () => {
    try {
      await logOut();
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectQRPayment = () => {
    router.push("/finance/TH_payment_Qr"); // นำไปที่หน้ากรอกจำนวนเงินก่อน
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
        <main className="flex-1 p-8 bg-bgcolor">
          <h2 className="text-2xl font-bold mb-6">ฝากเงิน</h2>

          {/* Deposit Options */}
          <div className="flex space-x-6">
            {/* Thai QR Payments */}
            <div
              className="bg-gray-800 p-6 rounded-lg flex items-center space-x-4 w-80 hover:bg-gray-700 transition cursor-pointer"
              onClick={handleSelectQRPayment} // นำไปที่หน้ากรอกจำนวนเงิน
            >
              <Image
                src="/QRPAS.png"
                alt="Thai QR Payments"
                width={50}
                height={50}
              />
              <div>
                <h3 className="text-lg font-bold">Thai QR Payments</h3>
                <p className="text-sm text-gray-400">ค่าธรรมเนียม 0%</p>
                <p className="text-sm text-gray-400">
                  วงเงินไม่เกิน <span className="text-white">100,000 บาท</span>
                </p>
              </div>
            </div>

            {/* Bitcoin (BTC) */}
            <div className="bg-gray-800 p-6 rounded-lg flex items-center space-x-4 w-80 hover:bg-gray-700 transition cursor-pointer">
              <FaBitcoin className="text-4xl text-yellow-400" />
              
              
              
              <div className="flex flex-col justify-center">
                <h3 className="text-lg font-bold">Bitcoin (BTC)</h3>
                <p className="text-sm text-gray-400">ค่าธรรมเนียม 0%</p>
                <p className="text-sm text-gray-400">
                  วงเงินไม่เกิน <span className="text-white">200,000 USD</span>
                </p>
              </div>


            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
