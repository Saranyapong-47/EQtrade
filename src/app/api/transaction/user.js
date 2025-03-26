// src/app/api/transaction/user/route.ts
import { connectMongoDB } from "@/lib/mongodb";
import Transaction from "@/models/Transaction";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  try {
    await connectMongoDB();

    const transactions = await Transaction.find({ userId }).sort({ createdAt: -1 });

    return NextResponse.json(transactions);
  } catch (err) {
    console.error("❌ Failed to fetch transactions:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
