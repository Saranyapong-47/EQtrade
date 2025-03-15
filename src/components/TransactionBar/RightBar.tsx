import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { WalletCard } from "@/components/ui/Wallet";
import { useState } from "react";

export default function RightBar() {
  const [transactionType, setTransactionType] = useState<"buy" | "sell">("buy");
  const [currency, setCurrency] = useState<"USD" | "THB" | "Shares">("THB");
  const [amount, setAmount] = useState<number | "">(0);

  const handleQuickAmount = (percent: number) => {
    setAmount(parseFloat(((balance * percent) / 100).toFixed(2)));
  };

  const balance = 50000;
  return (
    <div>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          $55,698.48 <span className="text-lg text-[#008000] ">+1.2%</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="">
        <div>
          <div className="text-lg font-semibold">
            Transaction
            <div className="flex gap-2">
              <Button
                className={`mt-1 w-30 transition-all ${
                  transactionType === "buy"
                    ? "bg-[#28A745] text-white border border-[#28A745] hover:bg-[#289328]"
                    : "bg-white text-black border border-gray-300 hover:bg-white"
                }`}
                onClick={() => setTransactionType("buy")}
              >
                Buy
              </Button>

              <Button
                className={`mt-1 w-30 transition-all ${
                  transactionType === "sell"
                    ? "bg-red-600 text-white border border-red-600 hover:bg-red-600"
                    : "bg-white text-black border border-gray-300 hover:bg-white"
                }`}
                onClick={() => setTransactionType("sell")}
              >
                Sell
              </Button>
            </div>
          </div>

          <div className="text-lg font-semibold mt-2">
            Amount
            <div className="flex gap-2">
              {["USD", "THB", "Shares"].map((unit) => (
                <Button
                  key={unit}
                  className={`mt-1 w-20 transition-all shadow-sm ${
                    currency === unit
                      ? "bg-[#30A0E0] text-white border border-[#CBD5E0] hover:bg-[#006BBB]"
                      : "bg-white text-black border border-gray-300 hover:bg-white"
                  }`}
                  onClick={() => setCurrency(unit as "USD" | "THB" | "Shares")}
                >
                  {unit}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            {[25, 50, 75, 100].map((percent) => (
              <Button
                key={percent}
                className="w-1/4 text-sm bg-white text-black border border-gray-300 hover:bg-gray-200"
                onClick={() => handleQuickAmount(percent)}
              >
                {percent}%
              </Button>
            ))}
          </div>

          <div className="flex items-center gap-2 mt-4">
            <Image
              src="/Bitcoin.svg"
              alt="Bitcoin"
              width={40}
              height={40}
            ></Image>

            <div className="relative flex items-center w-full ">
              <Input
                type="number"
                placeholder="0"
                value={amount === 0 ? "" : amount}
                onChange={(e) => {
                  const value = e.target.value;

                  if (value === "0") {
                    setAmount("");
                  } else {
                    setAmount(value === "" ? "" : parseFloat(value));
                  }
                }}
                className="text-black placeholder:text-gray-400 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />

              <span className="absolute right-3 text-gray-400">{currency}</span>
            </div>
          </div>
          <span className="flex flex-col items-end text-sm text-gray-500 mt-1">
            Fee: 0.2% ({((Number(amount) * 0.2) / 100).toFixed(2)} {currency})
          </span>

          <div className="flex justify-center ">
            <Button
              className={`w-1/2 mt-4 py-2 rounded-md text-white transition  ${
                transactionType === "buy"
                  ? "bg-[#28A745] hover:bg-[#289328]"
                  : "bg-red-600 hover:bg-red-700"
              }`}
            >
              {transactionType === "buy" ? "Buy" : "Sell"}
            </Button>
          </div>
        </div>
        <div className="mt-6">
          <WalletCard />
        </div>
      </CardContent>
    </div>
  );
}
