"use client";
import { useUserAuth } from "../../context/UserAuthContext";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  FaHome,
  FaChartLine,
  FaDollarSign,
  FaUniversity,
  FaUser,
  FaBitcoin,
  FaLandmark,
  FaMoneyBillWave,
  FaChartPie,
  FaCoins,
  FaSignInAlt,
} from "react-icons/fa";

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

  const handleNavigation = (tab: string, path: string) => {
    setActiveTab(tab);
    router.push(path);
  };

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
  );
}
