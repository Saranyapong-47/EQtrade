import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req) {
  const { email } = await req.json();
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Gmail ของคุณที่ตั้งใน .env
      pass: process.env.EMAIL_PASS, // App Password ของ Gmail
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'รหัส OTP สำหรับการฝากเงิน',
    text: `รหัส OTP ของคุณคือ: ${otp}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true, otp });
  } catch (error) {
    console.error("Error sending OTP:", error.message); // Log error message
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
