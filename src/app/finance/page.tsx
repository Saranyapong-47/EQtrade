"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaHome, FaChartLine, FaDollarSign, FaUniversity, FaUser, FaSignInAlt } from "react-icons/fa";
import { BsQrCode } from "react-icons/bs";
import { FaBitcoin } from "react-icons/fa";
import { useUserAuth } from "../../context/UserAuthContext";

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

  const handleNavigation = (tab: string, path: string) => {
    setActiveTab(tab);
    router.push(path);
  };

  const handleSelectQRPayment = () => {
    router.push("/finance/TH_payment_Qr"); // นำไปที่หน้ากรอกจำนวนเงินก่อน
  };

  return (
    <div className="flex h-screen text-white ">
          {/* Sidebar */}
          <aside className="h-screen w-50 bg-[#151325] p-5 flex flex-col justify-center">
            {/* Logo */}
            <div
              className="flex justify-center  mb-8 cursor-pointer"
              onClick={() => router.push("/dashboard")}
            >
              <Image src="/logo.svg" alt="EQ" width={140} height={140} />
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
      <main className="flex-1 p-8 bg-bgcolor">
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
