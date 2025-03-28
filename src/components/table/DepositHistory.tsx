"use client";
import { useEffect, useState } from "react";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { ArrowDownCircle } from "lucide-react";

interface Deposit {
  amount: number;
  method: string;
  createdAt: string;
}

export default function DepositHistory() {
  const userId = useCurrentUser();
  const [deposits, setDeposits] = useState<Deposit[]>([]);

  useEffect(() => {
    if (!userId) return;

    const fetchDeposits = async () => {
      const res = await fetch(`/api/deposits?userId=${userId}`);
      const data = await res.json();
      if (res.ok) setDeposits(data);
    };

    fetchDeposits();
  }, [userId]);

  return (
    <div className="w-full h-full flex flex-1">
      <div className="rounded-lg shadow-lg overflow-hidden w-full max-h-[320px] overflow-y-auto">
        <table className="w-full table-fixed ">
          <thead className="sticky top-0 z-10 bg-gray-50">
            <tr className=" text-left uppercase text-sm border-b border-gray-300">
              <th className="px-6 py-4 font-medium text-[12px] w-1/3">TRANSACTION</th>
              <th className="px-6 py-4 font-medium text-[12px]">Method</th>
              <th className="px-6 py-4 font-medium text-[12px]">Amount</th>
              <th className="px-6 py-4 font-medium text-[12px]">Date</th>
            </tr>
          </thead>
          <tbody>
            {deposits
              .slice()
              .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
              .map((item, i) => (
                <tr key={i} className=" hover:bg-gray-50 transition">
                  <td className="px-6 py-4 flex items-center gap-3">
                  <ArrowDownCircle className="text-green-500" />
                    <span className="font-medium text-sm">Deposit</span>
                  </td>
                  <td className="px-6 py-4 capitalize">{item.method}</td>
                  <td className="px-6 py-4">${item.amount.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    {new Date(item.createdAt).toLocaleDateString()}{" "}
                    {new Date(item.createdAt).toLocaleTimeString()}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {deposits.length === 0 && (
          <div className="p-4 text-center text-gray-500">No deposit records</div>
        )}
      </div>
    </div>
  );
}