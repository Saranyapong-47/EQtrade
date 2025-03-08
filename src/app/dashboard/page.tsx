"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaHome,
  FaChartLine,
  FaDollarSign,
  FaUniversity,
  FaUser,
  FaPlus,
  FaSignInAlt,
} from "react-icons/fa";
import { useUserAuth } from "../../context/UserAuthContext";
import ProtectedRoute from "@/app/api/auth/Protect/Protectedroute";

export default function DashboardLoggedIn() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("home");

  const { logOut, user } = useUserAuth();
  console.log(user);

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

  return (
    <ProtectedRoute>
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

        {/* Menu */}

        {/* Main Content */}
        <main className="flex-1 p-8 bg-bgcolor">
          {/* Assets Section */}
          <section className="mb-8">
            <h3 className="text-lg font-bold">ASSETS</h3>
            <div className="grid grid-cols-3 gap-4 mt-4">
              {/* Bitcoin */}
              <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-6 rounded-lg shadow-lg">
                <h4 className="text-sm">Bitcoin</h4>
                <p className="text-3xl font-bold">$1,820</p>
                <p className="text-green-400">Profit +2.87%</p>
                <p className="text-red-400">Loss -0.17%</p>
              </div>
              {/* Ethereum */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h4 className="text-sm">Ethereum</h4>
                <p className="text-3xl font-bold">$1,100</p>
                <p className="text-green-400">Profit +2.87%</p>
                <p className="text-red-400">Loss -0.17%</p>
              </div>
              {/* New Asset */}
              <div className="bg-gray-800 p-6 flex items-center justify-center rounded-lg shadow-lg cursor-pointer hover:bg-gray-700">
                <FaPlus className="text-2xl text-gray-500" />
              </div>
            </div>
          </section>

          {/* Activity Section */}
          <section className="mb-8">
            <h3 className="text-lg font-bold">ACTIVITY</h3>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-gray-400">
                    <th className="pb-3">Transactions</th>
                    <th className="pb-3">Amount</th>
                    <th className="pb-3">Total</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      type: "Ethereum Purchased",
                      amount: "0.0154 ETH",
                      total: "$10.00",
                      status: "Pending",
                      date: "Feb 21, 2021",
                    },
                    {
                      type: "Bitcoin Purchased",
                      amount: "0.3 BTC",
                      total: "$10.00",
                      status: "Done",
                      date: "Feb 14, 2021",
                    },
                    {
                      type: "Bitcoin Purchased",
                      amount: "0.025 BTC",
                      total: "$10.00",
                      status: "Done",
                      date: "Jan 14, 2021",
                    },
                  ].map(({ type, amount, total, status, date }, index) => (
                    <tr key={index} className="border-t border-gray-700">
                      <td className="py-3">{type}</td>
                      <td className="py-3">{amount}</td>
                      <td className="py-3">{total}</td>
                      <td
                        className={`py-3 ${
                          status === "Done"
                            ? "text-green-400"
                            : "text-yellow-400"
                        }`}
                      >
                        {status}
                      </td>
                      <td className="py-3">{date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Cryptocurrency Price Section */}
          <section>
            <h3 className="text-lg font-bold">Cryptocurrency</h3>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex justify-between">
              <div>
                <p className="text-sm text-gray-400">Updated 5 seconds ago</p>
                <h4 className="text-xl font-bold">BITCOIN</h4>
              </div>
              <div className="text-right">
                <p className="text-red-400">↓ 2.64%</p>
                <p className="text-2xl font-bold">$12,729</p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </ProtectedRoute>
  );
}
