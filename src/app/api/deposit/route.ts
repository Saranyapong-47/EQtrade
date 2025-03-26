// src/app/api/deposit/route.ts
import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import Wallet from "@/models/Wallet";
import Deposit from "@/models/deposit";

export async function POST(req: Request) {
  try {
    await connectMongoDB();

    const { userId, amount, method } = await req.json(); 

    if (!userId || isNaN(amount)) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const wallet = await Wallet.findOne({ userId });

    if (!wallet) {
      return NextResponse.json({ error: "Wallet not found" }, { status: 404 });
    }

    await Deposit.create({
        userId,
        amount,
        method: method || "Unknown",
        walletNumber: wallet.walletNumber,
      });

    wallet.balance += amount;
    await wallet.save();

    return NextResponse.json({ balance: wallet.balance }, { status: 200 });
  } catch (err) {
    console.error("Deposit API Error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
