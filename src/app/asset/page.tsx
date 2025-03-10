"use client";
import { useUserAuth } from "../../context/UserAuthContext";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { FaBitcoin, FaLandmark, FaChartPie, FaCoins } from "react-icons/fa";

import Sidebar from "@/components/Sidebar/page";
import ProtectedRoute from "../api/auth/Protect/Protectedroute";

export default function MyAssetsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("asset");
  const [currentTime, setCurrentTime] = useState("");
  const { logOut, user } = useUserAuth();

  const handleLogout = async () => {
    try {
      await logOut();
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const formattedDate = now.toLocaleDateString("th-TH", {
        year: "2-digit",
        month: "long",
        day: "numeric",
      });
      const formattedTime = now.toLocaleTimeString("th-TH", {
        hour: "2-digit",
        minute: "2-digit",
      });
      setCurrentTime(`${formattedDate} - ${formattedTime}`);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 60000);

    return () => clearInterval(interval);
  }, []);

  

  const assets = [
    {
      id: 1,
      name: "เงินสด",
      amount: 953178.62,
      icon: <FaBitcoin className="text-green-400 text-3xl" />,
      currency: "THB",
    },
    {
      id: 2,
      name: "ทองคำ",
      amount: 714883.97,
      icon: <FaCoins className="text-yellow-400 text-3xl" />,
      currency: "THB",
    },
    {
      id: 3,
      name: "หุ้น",
      amount: 1906357.25,
      icon: <FaChartPie className="text-purple-400 text-3xl" />,
      currency: "THB",
    },
    {
      id: 4,
      name: "กองทุนรวม",
      amount: 1191473.28,
      icon: <FaLandmark className="text-blue-400 text-3xl" />,
      currency: "THB",
    },
  ];

  const totalAssets = assets
    .reduce((sum, asset) => sum + asset.amount, 0)
    .toLocaleString("th-TH", { minimumFractionDigits: 2 });

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
        <h2 className="text-2xl font-bold mb-6">สินทรัพย์ของฉัน</h2>

        {/* การ์ดสินทรัพย์รวมทั้งหมด */}
        <div className="bg-gray-800 p-6 rounded-lg w-full mb-6 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold mb-2">สินทรัพย์รวมทั้งหมด</h3>
            <p className="text-gray-400 text-sm">อัปเดตล่าสุด: {currentTime}</p>
          </div>
          <p className="text-4xl font-bold text-white">
            {totalAssets} <span className="text-gray-400 text-lg">THB</span>
          </p>
        </div>

        {/* รายการสินทรัพย์ */}
        <div className="grid grid-cols-2 gap-6">
          {assets.map((asset) => (
            <div
              key={asset.id}
              className="bg-gray-800 p-6 rounded-lg flex items-center justify-between"
            >
              <div className="flex items-center space-x-4">
                {asset.icon}
                <h4 className="text-lg font-bold">{asset.name}</h4>
              </div>
              <p className="text-2xl font-semibold">
                {asset.amount.toLocaleString("th-TH", {
                  minimumFractionDigits: 2,
                })}{" "}
                <span className="text-gray-400 text-lg">{asset.currency}</span>
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
    </ProtectedRoute>
  );
}
