"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaPlus } from "react-icons/fa";
import { useUserAuth } from "../../context/UserAuthContext";
import ProtectedRoute from "@/app/api/auth/Protect/Protectedroute";

import Sidebar from "@/components/Sidebar/page";

export default function DashboardLoggedIn() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("home");

  const { logOut, user } = useUserAuth();
  console.log(user);

  const handleLogout = async () => {
    try {
      console.log("Logging out...")
      await logOut();
      router.replace("/");
      //window.location.href = "/"; // บังคับเปลี่ยนหน้า
    } catch (error) {
      console.log(error);
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
