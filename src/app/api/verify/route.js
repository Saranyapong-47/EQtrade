import { NextResponse } from "next/server";
import { connectMongoDB } from "@lib/mongodb";
import User from "@models/user";

export async function POST(req) {
  try {

    await connectMongoDB();
  
    const { email } = await req.json();
    const user = await User.findOne({ email }).select("_id");
    console.log("User: ", user);

    return NextResponse.json({ user });

  } catch (error) {
    console.error("❌ API Error:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
