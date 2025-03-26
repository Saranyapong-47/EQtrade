import { NextResponse } from "next/server";
<<<<<<< HEAD
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import Wallet from "@/models/Wallet";
import bcrypt from "bcryptjs";
import { generateWalletNumber } from "@/utils/generateWalletNumber";

export async function POST(req) {
  try {
    const { firstName, lastName, email, password,uid } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    const existing = await User.findOne({ email });

    await connectMongoDB();

    if (existing) {
        return NextResponse.json({ message: "Email already registered" }, { status: 409 });
      }

  
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await Wallet.create({
      userId: newUser._id,
      walletNumber: generateWalletNumber(),
      balance: 0,
    });

    return NextResponse.json({ message: "User Registered Successfully" }, { status: 201 });

  } catch (error) {
    console.error("❌ Register Error:", error);
    return NextResponse.json({ message: "An error occurred during registration" }, { status: 500 });
  }
=======
import { connectMongoDB } from "@lib/mongodb";
import  User  from "@models/user";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try {
        const { firstName,lastName,email, password } = await req.json();
        const hashedPassword = await bcrypt.hash(password, 10);
        
        await connectMongoDB();
        await User.create ({firstName, lastName,  email, password: hashedPassword});

        return NextResponse.json({message :"User Registered Successfully"}, {status: 201});

    } catch (error) {
        console.error(error);
        return NextResponse.json({message :"An Error Occured while registrating The User"}, {status: 500});
    }
>>>>>>> 88436427f88b9f85e98852b1047a5df137fa681f
}
