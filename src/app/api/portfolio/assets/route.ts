import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json(
      { error: "Missing userId parameter" },
      { status: 400 }
    );
  }

  // TODO: ดึงข้อมูลจริงจากฐานข้อมูล (MongoDB / Firestore)
  // เบื้องต้น mock data ก่อนเพื่อให้ Frontend ใช้งานได้ทันที

  const mockAssets = [
    {
      id: 1,
      name: "US Stock",
      amount: 12000, // ควรคำนวณจาก transaction จริง
      icon: "/assets/gold.svg",
    },
    {
      id: 2,
      name: "Crypto",
      amount: 12000, // ควรคำนวณจาก transaction จริง
      icon: "/assets/crypto.svg",
    },
  ];

  return NextResponse.json({ assets: mockAssets });
}
