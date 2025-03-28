import { connectMongoDB } from "@/lib/mongodb";
import Asset from "@/models/asset";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  await connectMongoDB();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  try {
    const assets = await Asset.find({ userId });
    return NextResponse.json(assets);  // ส่งกลับเป็น JSON
  } catch (error) {
    console.error('Error fetching assets:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
