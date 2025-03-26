// ✅ File: src/app/api/deposits/route.ts
import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import Deposit from "@/models/deposit";

export async function GET(req: Request) {
  try {
    // Connect to MongoDB
    await connectMongoDB();

    // Get userId from query string
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    // Fetch deposits by userId, sorted by createdAt descending
    const deposits = await Deposit.find({ userId }).sort({ createdAt: -1 });

    return NextResponse.json(deposits, { status: 200 });
  } catch (err) {
    console.error("[Deposit History API Error]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
