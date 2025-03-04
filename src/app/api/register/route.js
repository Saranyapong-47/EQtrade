import { NextResponse } from "next/server";
import { connectMongoDB } from "@lib/mongodb";
import  User  from "@models/user";
import bcrypt from "bcrypt";

export async function POST(req) {
    try {
        const { firstName,lastName,email, password } = await req.json();
        const hashedPassword = await bcrypt.hash(password, 10);

        await connectMongoDB();
        await User.create ({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });

        return NextResponse.json({message :"User Registered Successfully"}, {status: 201});

    } catch (error) {
        return NextResponse.json({message :"An Error Occured while registrating The User"}, {status: 500});
    }
}
