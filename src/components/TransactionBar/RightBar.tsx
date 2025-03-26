<<<<<<< HEAD
"use client";
=======

"use client";
=======
import { useState, useEffect, useRef } from "react";

>>>>>>> 88436427f88b9f85e98852b1047a5df137fa681f

import { useState, useEffect } from "react";
import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
<<<<<<< HEAD
import  WalletCard  from "@/components/ui/Wallet";

import { CryptoName } from "@/data/Crypto";
=======
import { WalletCard } from "@/components/ui/Wallet";

import { CryptoName } from "@/data/Crypto";
import { StockName } from "@/data/Stock";
import { useBinanceTradePrice } from "@/hooks/useBinance";
import { FindIcon } from "@/lib/FindIcon";
>>>>>>> 88436427f88b9f85e98852b1047a5df137fa681f

import { useBinanceTradePrice } from "@/hooks/useBinance";
import { useYahooStockPrice } from "@/hooks/useYahooStockPrice";
import { FindIcon } from "@/lib/FindIcon";

<<<<<<< HEAD
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useWallet } from "@/hooks/useWallet";
import { useWalletStore } from "@/store/walletStore";


interface RightBarProps {
  symbol: string; // TradingView Symbol เช่น "BINANCE:BTCUSDT" หรือ "NASDAQ:AAPL"
=======
interface RightBarProps {

  symbol: string; // TradingView Symbol เช่น "BINANCE:BTCUSDT" หรือ "NASDAQ:AAPL"
=======
  symbol: string; //  รับ TradingView Symbol จาก `Page.tsx`

>>>>>>> 88436427f88b9f85e98852b1047a5df137fa681f
}

export default function RightBar({ symbol }: RightBarProps) {
  const [transactionType, setTransactionType] = useState<"buy" | "sell">("buy");
<<<<<<< HEAD
  const [currency, setCurrency] = useState<"USD" | "Shares">("USD");
  const [amount, setAmount] = useState<number | "">(0);
  const [cryptoName, setCryptoName] = useState<string | null>(null);
  const [cryptoIcon, setCryptoIcon] = useState<string | null>(null);

  const [userId, setUserId] = useState<string | null>(null);

  const { refetchWallet } = useWalletStore();


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });

    return () => unsubscribe();
  }, []);

=======
  const [currency, setCurrency] = useState<"USD" | "THB" | "Shares">("THB");
  const [amount, setAmount] = useState<number | "">(0);
  const [cryptoName, setCryptoName] = useState<string | null>(null);

  const [cryptoIcon, setCryptoIcon] = useState<string | null>(null);

>>>>>>> 88436427f88b9f85e98852b1047a5df137fa681f
  // 🔁 แปลง symbol ให้แมตช์ได้
  const normalizedSymbol = symbol.toUpperCase();
  const fallbackSymbol = normalizedSymbol.endsWith("USD")
    ? normalizedSymbol + "T"
    : normalizedSymbol;

  const matchedCrypto = CryptoName.find((crypto) =>
    crypto.tradingViewSymbol.toUpperCase().includes(fallbackSymbol)
  );

  const binanceSymbol = matchedCrypto?.binanceSymbol ?? "";
  const isCrypto = Boolean(matchedCrypto);

  const cryptoPrice = useBinanceTradePrice(binanceSymbol);
  const stockPrice = useYahooStockPrice(symbol);

  useEffect(() => {
    console.log("📥 [YahooHook] symbol received:", symbol);
    // ...
  }, [symbol]);

  // 🔍 icon + name
  useEffect(() => {
    const result = FindIcon(symbol);
    setCryptoName(result.name);
    setCryptoIcon(result.icon);
  }, [symbol]);
<<<<<<< HEAD
=======
=======

  const [cryptoIcon, setCryptoIcon] = useState<string | null>(null);

  const binanceSymbol =
    CryptoName.find((crypto) => crypto.tradingViewSymbol === symbol)
      ?.binanceSymbol || symbol;

  const cryptoPrice = useBinanceTradePrice(binanceSymbol);

  useEffect(() => {
    const { name, icon } = FindIcon(symbol);
    setCryptoName(name);
    setCryptoIcon(icon);
  }, [symbol]);
  
  
  

>>>>>>> 88436427f88b9f85e98852b1047a5df137fa681f

  const handleQuickAmount = (percent: number) => {
    const balance = 50000;
    setAmount(parseFloat(((balance * percent) / 100).toFixed(2)));
  };

<<<<<<< HEAD
  const handleTransactionSubmit = async () => {
    const price = isCrypto ? cryptoPrice : stockPrice;
    const quantity = Number(amount);

    console.log("💸 Submitting transaction:", {
      userId,
      symbol,
      transactionType,
      quantity,
      price,
      total: quantity * price,
    });

    if (!userId) {
      alert("⛔ กรุณาเข้าสู่ระบบก่อนทำรายการ");
      return;
    }

    if (!price || !quantity) {
      alert("⛔ กรุณาใส่จำนวน และตรวจสอบราคาล่าสุด");
      return;
    }

    let calculatedQuantity = 0;
    let calculatedTotal = 0;

    if (currency === "Shares") {
      calculatedQuantity = Number(amount); // ซื้อ x หน่วย
      calculatedTotal = price * calculatedQuantity;
    } else if (currency === "USD") {
      calculatedQuantity = Number(amount) / price;
      calculatedTotal = Number(amount); // สมมติว่า THB = USD เพื่อความง่าย (หรือคุณจะคูณ rate ก็ได้)
    }

    const fee = (calculatedTotal * 0.2) / 100;
    const totalWithFee = calculatedTotal + fee;

    const transactionData = {
      userId,
      symbol,
      type: transactionType,
      quantity: calculatedQuantity,
      price,
      assetType: isCrypto ? "crypto" : "stock",
      amount: totalWithFee,
    };

    try {
      const res = await fetch("/api/transaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transactionData),
      });

      const result = await res.json();

      if (!res.ok) {
        alert(`🔴 Failed: ${result.error}`);
        return;
      }

      refetchWallet(userId);
      setAmount(0);
      alert("🟢 Transaction completed!");
    } catch (err) {
      console.error("❌ API Error:", err);
      alert("⛔ Network Error");
    }
  };

  return (
    <div>
      <CardHeader>
        <CardTitle className="text-2xl text-left font-bold">
          <p className="mb-1">{cryptoName}</p>
          {isCrypto
            ? binanceSymbol && cryptoPrice
              ? `$${cryptoPrice}`
              : "Loading..."
            : stockPrice !== null
            ? `$${stockPrice}`
            : "Loading (Yahoo)..."}
=======
  return (
    <div>
      <CardHeader>

        <CardTitle className="text-2xl text-left font-bold">
          <p className="mb-1">{cryptoName}</p>
          {isCrypto ? (
            binanceSymbol && cryptoPrice ? `$${cryptoPrice}` : "Loading..."
          ) : stockPrice !== null ? (
            `$${stockPrice}`
          ) : (
            "Loading (Yahoo)..."
          )}
=======
        <CardTitle className="text-2xl text-left font-bold ">
          <p className="mb-1">{cryptoName}</p>$
          {cryptoPrice ? cryptoPrice : "กำลังโหลด..."}{" "}
          <span className="text-lg text-[#008000] ">+1.2%</span>

>>>>>>> 88436427f88b9f85e98852b1047a5df137fa681f
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div>
          <div className="text-lg font-semibold">
            Transaction
            <div className="flex gap-2">
              <Button
                className={`mt-1 w-30 ${
                  transactionType === "buy"
                    ? "bg-[#28A745] text-white border border-[#28A745] hover:bg-[#289328]"
                    : "bg-white text-black border border-gray-300 hover:bg-white"
                }`}
                onClick={() => setTransactionType("buy")}
              >
                Buy
              </Button>
              <Button
                className={`mt-1 w-30 ${
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
<<<<<<< HEAD
              {["USD", "Shares"].map((unit) => (
=======
              {["USD", "THB", "Shares"].map((unit) => (
>>>>>>> 88436427f88b9f85e98852b1047a5df137fa681f
                <Button
                  key={unit}
                  className={`mt-1 w-20 ${
                    currency === unit
                      ? "bg-[#30A0E0] text-white border border-[#CBD5E0] hover:bg-[#006BBB]"
                      : "bg-white text-black border border-gray-300 hover:bg-white"
                  }`}
<<<<<<< HEAD
                  onClick={() => setCurrency(unit as "USD" | "Shares")}
=======
                  onClick={() => setCurrency(unit as "USD" | "THB" | "Shares")}
>>>>>>> 88436427f88b9f85e98852b1047a5df137fa681f
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
              src={cryptoIcon || "/Bitcoin.svg"}
              alt={cryptoName || "Asset"}
              width={30}
              height={30}
            />
            <div className="relative flex items-center w-full ">
              <Input
                type="number"
                placeholder="0"
                value={amount === 0 ? "" : amount}
                onChange={(e) => {
                  const value = e.target.value;
<<<<<<< HEAD
                  setAmount(
                    value === "" || value === "0" ? "" : parseFloat(value)
                  );
=======
                  setAmount(value === "" || value === "0" ? "" : parseFloat(value));
>>>>>>> 88436427f88b9f85e98852b1047a5df137fa681f
                }}
                className="text-black placeholder:text-gray-400 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
              <span className="absolute right-3 text-gray-400">{currency}</span>
            </div>
          </div>

          <span className="flex flex-col items-end text-sm text-gray-500 mt-1">
            Fee: 0.2% ({((Number(amount) * 0.2) / 100).toFixed(2)} {currency})
          </span>

          <div className="flex justify-center">
            <Button
<<<<<<< HEAD
              onClick={handleTransactionSubmit}
              className={`w-1/2 mt-2 py-2 rounded-md text-white transition ${
=======

              className={`w-1/2 mt-2 py-2 rounded-md text-white transition ${

              className={`w-1/2 mt-2 py-2 rounded-md text-white transition  ${

>>>>>>> 88436427f88b9f85e98852b1047a5df137fa681f
                transactionType === "buy"
                  ? "bg-[#28A745] hover:bg-[#289328]"
                  : "bg-red-600 hover:bg-red-700"
              }`}
            >
              {transactionType === "buy" ? "Buy" : "Sell"}
            </Button>
          </div>
        </div>

        <div className="mt-3">
<<<<<<< HEAD
        <WalletCard />
=======
          <WalletCard />
>>>>>>> 88436427f88b9f85e98852b1047a5df137fa681f
        </div>
      </CardContent>
    </div>
  );
}
