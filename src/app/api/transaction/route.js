// ✅ 3. Update API /api/transaction/route.js
import { NextResponse } from "next/server"; // ✅ เพิ่มบรรทัดนี้
import { connectMongoDB } from "@/lib/mongodb";
import Transaction from "@/models/Transaction"; 
import { updatePortfolio } from "@/lib/updatePortfolio";

export async function GET(req) {
  await connectMongoDB();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  const transactions = await Transaction.find({ userId }).sort({ createdAt: -1 });
  return NextResponse.json(transactions);
}


export async function POST(req) {
  try {
    await connectMongoDB();
    const body = await req.json();
    const { userId, symbol, type, quantity, price, assetType } = body;

    if (!userId || !symbol || !type || !quantity || !price || !assetType) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const total = quantity * price;

    // ✅ หักเงินจาก wallet ถ้าเป็นการซื้อ
    if (type === "buy") {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/wallet`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          amount: total,
          action: "subtract",
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        return NextResponse.json({ error: result.error }, { status: res.status });
      }
    }

    // ✅ เพิ่มเงินถ้าเป็น "sell"
    if (type === "sell") {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/wallet`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          amount: total,
          action: "add",
        }),
      });
    }

    const newTransaction = await Transaction.create({
      userId,
      symbol,
      type,
      quantity,
      price,
      total : price * quantity,
      assetType,
      status: "completed",
    });

    const category = assetType.toLowerCase() === 'crypto' ? 'Crypto' : 'Stock';


     // ✅ อัปเดต portfolio
     await updatePortfolio({
      userId,
      symbol,
      category, // ต้องเป็น 'Stock' หรือ 'Crypto'
      price,
      quantity,
      type,
    });

    console.log("New transaction:", newTransaction);

    return NextResponse.json(newTransaction, { status: 201 });
  } catch (err) {
    console.error("❌ Transaction Error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
