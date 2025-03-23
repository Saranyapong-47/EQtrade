"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaHome, FaChartLine, FaDollarSign, FaUniversity, FaUser, FaSignInAlt } from "react-icons/fa";

const Sidebar = ({ activeTab, setActiveTab, handleLogout, user }) => {
  const router = useRouter();

  const menuItems = [
    { tab: "home", icon: <FaHome />, text: "Home", route: "/dashboard" },
    { tab: "chart", icon: <FaChartLine />, text: "Chart", route: "/chart" },
    { tab: "asset", icon: <FaDollarSign />, text: "Asset", route: "/asset" },
    { tab: "finance", icon: <FaUniversity />, text: "Finance", route: "/finance" },
  ];

  const handleNavigation = (tab, route) => {
    setActiveTab(tab);
    router.push(route);
  };

  return (
    <aside className="h-screen w-[200px] bg-bgsidebar p-5 flex flex-col justify-center text-white">
      {/* โลโก้ */}
      <div className="flex justify-center mb-8 cursor-pointer" onClick={() => router.push("/dashboard")}>
        <Image src="/logo.svg" alt="EQ" width={140} height={140} />
      </div>

      {/* เมนู */}
      <nav className="flex flex-col space-y-4">
        {menuItems.map(({ tab, icon, text, route }) => (
          <button
            key={tab}
            className={`flex items-center space-x-2 p-3 rounded-lg ${activeTab === tab ? "bg-gray-700" : ""}`}
            onClick={() => handleNavigation(tab, route)}
          >
            {icon}
            <span>{text}</span>
          </button>
        ))}
      </nav>

      {/* โปรไฟล์ผู้ใช้ */}
      <div className="mt-auto flex items-center space-x-2 p-3 rounded-lg bg-gray-700">
        <FaUser />
        <span>{user?.displayName || "Guest"}</span>
      </div>

      {/* ปุ่มออกจากระบบ */}
      <div className="mt-1 flex items-center space-x-2 p-3 rounded-lg bg-gray-700">
        <button className="flex items-center space-x-2" onClick={handleLogout}>
          <FaSignInAlt />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
