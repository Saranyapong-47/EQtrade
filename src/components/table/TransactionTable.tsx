<<<<<<< HEAD
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { FindIcon } from "@/lib/FindIcon";
import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";

interface Transaction {
  _id: string;
  type: "buy" | "sell";
  symbol: string;
  quantity: number;
  price: number;
  total: number;
  createdAt: string;
}

export default function TransactionTable() {
  const userId = useCurrentUser();
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!userId) return;
      try {
        const res = await fetch(`/api/transaction?userId=${userId}`);
        const data = await res.json();
        setTransactions(data);
      } catch (err) {
        console.error("❌ Failed to fetch transactions", err);
      }
    };

    fetchTransactions();
  }, [userId]);

  return (
    <div className="w-full h-full flex flex-1">
      <div className="rounded-lg shadow-lg overflow-hidden w-full max-h-[320px] overflow-y-auto">
        <table className="w-full table-fixed">
          <thead className="sticky top-0 z-10 bg-gray-50">
=======
import Image from "next/image";

export default function TransactionTable() {
  const transactions = [
    {
      icon: "/ethereum.png",
      title: "Ethereum Purchased",
      amount: "0.0154 ETH",
      total: "$10.00",
      status: "Pending",
      statusClass: "text-yellow-500",
      date: "February 21, 2021",
    },
    {
      icon: "/Bitcoin.svg",
      title: "Bitcoin Purchased",
      amount: "0.3 BTC",
      total: "$10.00",
      status: "Done",
      statusClass: "text-green-500 font-bold",
      date: "February 14, 2021",
    },
    {
      icon: "/Bitcoin.svg",
      title: "Bitcoin Purchased",
      amount: "0.025 BTC",
      total: "$10.00",
      status: "Done",
      statusClass: "text-green-500 font-bold",
      date: "January 14, 2021",
    },

    {
        icon: "/ethereum.png",
        title: "Bitcoin Purchased",
        amount: "0.015 BTC",
        total: "$10.00",
        status: "Pending",
        statusClass: "text-yellow-500",
        date: "January 14, 2021",
      },
  ];

  return (
    <div className="w-full h-full flex flex-1">
      <div className=" rounded-lg shadow-lg overflow-hidden">
        <table className="w-full table-fixed">
          {/* Table Header */}
          <thead>
>>>>>>> 88436427f88b9f85e98852b1047a5df137fa681f
            <tr className="text-left bg-opacity-10 bg-white uppercase text-sm">
              <th className="px-6 py-4 font-medium text-[12px] w-1/3">
                Transactions
              </th>
<<<<<<< HEAD
              <th className="px-6 py-4 font-medium text-[12px]">Type</th>
              <th className="px-6 py-4 font-medium text-[12px]">Amount</th>
              <th className="px-6 py-4 font-medium text-[12px]">Total</th>
              <th className="px-6 py-4 font-medium text-[12px]">Status</th>
              <th className="px-6 py-4 font-medium text-[12px]">Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions
              .slice()
              .sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
              )
              .map((tx) => (
                <tr key={tx._id} className="border-t border-gray-200">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <Image
                      src={FindIcon(tx.symbol).icon}
                      alt={FindIcon(tx.symbol).name}
                      width={32}
                      height={32}
                    />
                    {tx.symbol}
                  </td>

                  <td className="px-6 py-4 gap-2">
                    {tx.type === "buy" ? (
                      <ArrowDownCircle className="text-green-500 w-5 h-5" />
                    ) : (
                      <ArrowUpCircle className="text-red-500 w-5 h-5" />
                    )}
                    <span className="capitalize">{tx.type}</span>
                  </td>

                  <td className="px-6 py-4">{tx.quantity}</td>
                  <td className="px-6 py-4">${tx.total.toFixed(2)}</td>
                  <td
                    className={`px-6 py-4 ${
                      tx.status === "completed"
                        ? "text-green-500"
                        : "text-yellow-500"
                    }`}
                  >
                    {tx.status || "pending"}
                  </td>

                  <td className="px-6 py-4">
                    {new Date(tx.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {transactions.length === 0 && (
          <div className="p-4 text-center text-gray-500">No trading items</div>
        )}
=======
              <th className="px-6 py-4 font-medium text-[12px] ">Amount</th>
              <th className="px-6 py-4 font-medium text-[12px w-1/6">Total</th>
              <th className="px-6 py-4 font-medium text-[12px] w-1/6">
                Status
              </th>
              <th className="px-6 py-4 font-medium text-[12px] w-1/6">Date</th>
            </tr>
          </thead>

          {/* Table Body */}

          <tbody>
            {transactions.map((tx, index) => (
              <tr key={index} className="border-t border-transparent">
                <td className="px-6 py-4 text-left flex items-center gap-3">
                  <Image
                    src={tx.icon}
                    alt={tx.title}
                    width={32}
                    height={32}
                    priority
                  />
                  {tx.title}
                </td>
                <td className="px-6 py-4">{tx.amount}</td>
                <td className="px-6 py-4">{tx.total}</td>
                <td className={`px-6 py-4 ${tx.statusClass}`}>{tx.status}</td>
                <td className="px-6 py-4">{tx.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
>>>>>>> 88436427f88b9f85e98852b1047a5df137fa681f
      </div>
    </div>
  );
}
