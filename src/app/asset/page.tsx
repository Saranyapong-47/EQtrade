"use client";
import { useUserAuth } from "../../context/UserAuthContext";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import {
  FaHome,
  FaChartLine,
  FaDollarSign,
  FaUniversity,
  FaUser,
  FaSignInAlt,
  FaBitcoin
} from "react-icons/fa";

export default function MyAssetsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("asset");
  const [currentTime, setCurrentTime] = useState("");
  const { logOut, user } = useUserAuth();
  const [assets, setAssets] = useState([]);
  const [totalAssets, setTotalAssets] = useState(0);

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

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await axios.get('/api/assets');
        console.log("Fetched assets:", response.data);

        const total = response.data.find(asset => asset.name === "Total Assets" && asset.userId === user.email)?.amount || 0;
        setTotalAssets(total);

        setAssets(response.data);
      } catch (error) {
        console.error("Failed to fetch assets:", error.response?.data || error.message);
      }
    };
    fetchAssets();
  }, [user.email]); // เพิ่ม dependency user.email

  const handleNavigation = (tab: string, path: string) => {
    setActiveTab(tab);
    router.push(path);
  };

  return (
    <div className="flex h-screen text-white">
      {/* Sidebar */}
      <aside className="h-screen w-50 bg-[#151325] p-5 flex flex-col justify-center">
        <div className="flex justify-center mb-8 cursor-pointer" onClick={() => router.push("/dashboard")}>
          <Image src="/logo.svg" alt="EQ" width={140} height={140} />
        </div>
        <nav className="flex flex-col space-y-4">
          {[{ tab: "home", icon: <FaHome />, text: "Home", path: "/dashboard" },
          { tab: "chart", icon: <FaChartLine />, text: "Chart", path: "/chart" },
          { tab: "asset", icon: <FaDollarSign />, text: "Asset", path: "/asset" },
          { tab: "finance", icon: <FaUniversity />, text: "Finance", path: "/finance" }]
            .map(({ tab, icon, text, path }) => (
              <button key={tab} className={`flex items-center space-x-2 p-3 rounded-lg ${activeTab === tab ? "bg-gray-700" : ""}`} onClick={() => handleNavigation(tab, path)}>
                {icon}
                <span>{text}</span>
              </button>
            ))}
        </nav>
        <div className="mt-auto flex items-center space-x-2 p-3 rounded-lg bg-gray-700">
          <FaUser />
          <span>{user?.displayName || "Guest"}</span>
        </div>
        <div className="mt-1 flex items-center space-x-2 p-3 rounded-lg bg-gray-700">
          <button className="flex items-center space-x-2" onClick={handleLogout}>
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
            {totalAssets.toLocaleString("th-TH", { minimumFractionDigits: 2 })} <span className="text-gray-400 text-lg">THB</span>
          </p>
        </div>

        {/* รายการสินทรัพย์ */}
        <div className="grid grid-cols-2 gap-6">
          {assets.map((asset) => (
            <div key={asset._id} className="bg-gray-800 p-6 rounded-lg flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <FaBitcoin className="text-green-400 text-3xl" />
                <h4 className="text-lg font-bold">{asset.name}</h4>
              </div>
              <p className="text-2xl font-semibold">
                {asset.amount.toLocaleString("th-TH", { minimumFractionDigits: 2 })}{" "}
                <span className="text-gray-400 text-lg">{asset.currency}</span>
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
