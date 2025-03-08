"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  FaHome,
  FaChartLine,
  FaDollarSign,
  FaUniversity,
  FaUser,
  FaSignInAlt,
} from "react-icons/fa";


import { useUserAuth } from "../../../context/UserAuthContext";
import { set } from "mongoose";


export default function DepositAmountPage() {
  const router = useRouter();
  const [amount, setAmount] = useState("");

  const { logOut, user } = useUserAuth();
  const [activeTab, setActiveTab] = useState("finance");
  const [error, setError] = useState("");

  const handleNavigation = (tab: string, path: string) => {
    setActiveTab(tab);
    router.push(path);
  };

  const handleLogout = async () => {
    try {
      await logOut();
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const handleProceed = (e) => {
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
    <div className="flex h-screen text-white ">
           {/* Sidebar */}
           <aside className="h-screen w-50 bg-bgsidebar p-5 flex flex-col justify-center">
             {/* Logo */}
             <div className="flex justify-center  mb-8 cursor-pointer" onClick={() => router.push("/dashboard")}>
               <Image src="/logo.svg" alt="EQ" width={140}  height={140} />
             </div>
   
             {/* Menu */}
             <nav className="flex flex-col space-y-4">
               {[
                 {
                   tab: "home",
                   icon: <FaHome />,
                   text: "Home",
                   path: "/dashboard",
                 },
                 {
                   tab: "chart",
                   icon: <FaChartLine />,
                   text: "Chart",
                   path: "/chart",
                 },
                 {
                   tab: "asset",
                   icon: <FaDollarSign />,
                   text: "Asset",
                   path: "/asset",
                 },
                 {
                   tab: "finance",
                   icon: <FaUniversity />,
                   text: "Finance",
                   path: "/finance",
                 },
               ].map(({ tab, icon, text, path }) => (
                 <button
                   key={tab}
                   className={`flex items-center space-x-2 p-3 rounded-lg ${
                     activeTab === tab ? "bg-gray-700" : ""
                   }`}
                   onClick={() => handleNavigation(tab, path)}
                 >
                   {icon}
                   <span>{text}</span>
                 </button>
               ))}
             </nav>
   
             {/* User Profile */}
             <div className="mt-auto flex items-center space-x-2 p-3 rounded-lg bg-gray-700">
               <FaUser />
               <span>{user?.displayName || "Guest"}</span>
             </div>
   
             <div className="mt-1 flex items-center space-x-2 p-3 rounded-lg bg-gray-700">
               <button
                 className="flex items-center space-x-2"
                 onClick={handleLogout}
               >
                 <FaSignInAlt />
                 <span>Logout</span>
               </button>
             </div>
           </aside>
   

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
