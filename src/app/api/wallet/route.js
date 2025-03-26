// ✅ 2. API: /api/wallet/route.js
import { NextResponse } from "next/server";
import Wallet from "@/models/Wallet";
import { connectMongoDB } from "@/lib/mongodb";

export async function GET(req) {
  await connectMongoDB();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  console.log("📥 GET /api/wallet for userId:", userId);

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  const wallet = await Wallet.findOne({ userId });
  console.log("🔍 Wallet found:", wallet);

  if (!wallet) {
    return NextResponse.json({ error: "Wallet not found" }, { status: 404 });
  }

  return NextResponse.json(wallet);
}

export async function POST(req) {
  await connectMongoDB();
  const body = await req.json();
  const { userId, walletNumber } = body;

  console.log("📥 POST /api/wallet with:", body);

  if (!userId || !walletNumber) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const existing = await Wallet.findOne({ userId });
  console.log("🔍 Existing wallet:", existing);

  if (existing) {
    return NextResponse.json(existing, { status: 200 }); // ✅ return ซ้ำแบบปลอดภัย
  }

  const newWallet = await Wallet.create({
    userId,
    walletNumber,
    balance: 100000,
  });

  console.log("✅ New wallet created:", newWallet);

  return NextResponse.json(newWallet, { status: 201 });
}

export async function PATCH(req) {
  await connectMongoDB();
  const body = await req.json();
  const { userId, amount, action } = body;

  console.log("🔧 PATCH /api/wallet with:", body);

  if (!userId || !amount || !action) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const wallet = await Wallet.findOne({ userId });
  if (!wallet) {
    return NextResponse.json({ error: "Wallet not found" }, { status: 404 });
  }

  if (action === "add") {
    wallet.balance += amount;
  } else if (action === "subtract") {
    if (wallet.balance < amount) {
      console.warn("💸 Not enough balance:", wallet.balance, "<", amount);
      return NextResponse.json({ error: "Insufficient balance" }, { status: 400 });
    }
    wallet.balance -= amount;
  }
  

  await wallet.save();
  console.log("💾 Wallet updated:", wallet);
  return NextResponse.json(wallet);
}
