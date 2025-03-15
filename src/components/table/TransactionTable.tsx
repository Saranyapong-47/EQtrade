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
      icon: "/Bitcoin.png",
      title: "Bitcoin Purchased",
      amount: "0.3 BTC",
      total: "$10.00",
      status: "Done",
      statusClass: "text-green-500 font-bold",
      date: "February 14, 2021",
    },
    {
      icon: "/Bitcoin.png",
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
            <tr className="text-left bg-opacity-10 bg-white uppercase text-sm">
              <th className="px-6 py-4 font-medium text-[12px] w-1/3">
                Transactions
              </th>
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
      </div>
    </div>
  );
}
