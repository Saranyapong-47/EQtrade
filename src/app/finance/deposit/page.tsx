"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FaHome,
  FaChartLine,
  FaDollarSign,
  FaUniversity,
  FaUser,
  FaSignInAlt,
} from "react-icons/fa";
import Image from "next/image";

import { useUserAuth } from "@/context/UserAuthContext";

export default function DepositPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(300); // 5 นาที (300 วินาที)
  const [activeTab, setActiveTab] = useState("finance");
  const { logOut, user } = useUserAuth();

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



  return (
    <div className="flex h-screen text-white ">
      {/* Sidebar */}
      <aside className="h-screen w-50 bg-bgsidebar p-5 flex flex-col justify-center">
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
      <main className="flex-1 p-8 bg-gray-900 flex justify-center items-center">
        <div className="bg-gray-800 p-6 rounded-lg w-96 text-center">
          <h2 className="text-2xl font-bold mb-6">ฝากเงิน</h2>

          <h3 className="text-lg font-semibold mb-4">วิธีการชำระ:</h3>
          <div className="flex items-center space-x-4 bg-gray-700 p-3 rounded-lg justify-center">
            <Image
              src="/qrpas.png"
              alt="Thai QR Payments"
              width={50}
              height={50}
            />
            <span className="text-lg">Thai QR Payments</span>
          </div>

          {/* QR Code */}
          <div className="mt-6 flex justify-center">
            <Image src="/QR_CODE.png" alt="QR Code" width={200} height={200} />
          </div>

          <p className="text-gray-400 mt-4">
            หมดอายุใน:{" "}
            <span className="text-white font-bold">
              {formatTime(countdown)}
            </span>
          </p>

          {/* Buttons */}
          <div className="flex space-x-4 mt-6">
            <button
              onClick={() => router.push("/finance/loggedin")}
              className="w-1/2 bg-gray-600 py-2 rounded-md text-white hover:bg-gray-700 transition"
            >
              ยกเลิก
            </button>
            <button className="w-1/2 bg-purple-600 py-2 rounded-md text-white hover:bg-purple-700 transition">
              ดำเนินการฝาก
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
