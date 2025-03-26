import Image from "next/image";
import { MoveDown } from "lucide-react";

export default function CryptoPrice() {
  const transactions = [
    {
      icon: "/ethereum.png",
      title: "Ethereum Purchased",
      update: "0.0154 ETH",
      change: "2.64 %",
      price: "Pending",
      statusClass: "text-yellow-500",
    },
    {
      icon: "/Bitcoin.svg",
      title: "Bitcoin Purchased",
      update: "0.3 BTC",
      change: "3.65 %",
      price: "Pending",
      statusClass: "text-yellow-500",
    },
  ];

  return (
    <div className="w-full h-full flex flex-1">
      <div className=" rounded-lg shadow-lg overflow-hidden">
        <table className="w-full table-fixed ">
          {/* Table Header */}
          <thead>
            <tr className="text-left bg-opacity-10 bg-white uppercase text-sm">
              <th className="px-6 py-4 font-medium text-[12px] w-1/3">
                Cryptocurrency
              </th>
              <th className="px-6 py-4 font-medium text-[12px] w-1/6">
                Updated
              </th>
              <th className="px-6 py-4 font-medium text-[12px] w-1/6">
                Change
              </th>
              <th className="px-6 py-4 font-medium text-[12px] w-1/6">Price</th>
            </tr>
          </thead>

          {/* Table Body */}

          <tbody>
            {transactions.map((tx, index) => (
              <tr key={index} className="border-t border-transparent">
                <td className="px-6 py-5 text-left flex items-center gap-3">
                  <Image
                    src={tx.icon}
                    alt={tx.title}
                    width={32}
                    height={32}
                    priority
                  />
                  {tx.title}
                </td>
                <td className="px-6 py-4">{tx.update}</td>
                <td className="px-6 py-4 flex justify-center items-center gap-2">
                  <MoveDown className="text-red-500 w-4 h-4" />
                 <span>{tx.change}</span>
                </td>
                <td className={`px-6 py-4 ${tx.statusClass}`}>{tx.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
