"use client"; // Add this line to indicate this is a client-side component

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  FaHome,
  FaChartLine,
  FaDollarSign,
  FaUniversity,
  FaUser,
  FaSignInAlt,
} from "react-icons/fa";
import Image from "next/image";

import { useUserAuth } from "@/context/UserAuthContext";

export default function DepositPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { logOut, user } = useUserAuth(); // ดึง logOut มาใช้จาก context
  const [countdown, setCountdown] = useState(300); // 5 นาที (300 วินาที)
  const [activeTab, setActiveTab] = useState("finance");
  const [verificationCode, setVerificationCode] = useState("");
  const [codeError, setCodeError] = useState(""); // ลบการแสดงข้อความผิดพลาดเกี่ยวกับ OTP
  const [sentCode, setSentCode] = useState(""); // เก็บ OTP ที่ส่งไป

  // รับค่าจาก URL
  const amount = searchParams.get("amount");
  const receivedSentCode = searchParams.get("sentCode");

  useEffect(() => {
    if (receivedSentCode) {
      setSentCode(receivedSentCode); // ตั้งค่า sentCode จาก query parameter
    }
  }, [receivedSentCode]);

  useEffect(() => {
    if (!user) {
      router.push("/login"); // ถ้าผู้ใช้ไม่ได้ล็อกอิน จะถูกนำทางไปยังหน้า login
    }
  }, [user, router, receivedSentCode]);

  useEffect(() => {
    if (countdown <= 0) {
      router.push("/finance"); // Automatically redirect to /finance when time is up
      return;
    }
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown, router]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${minutes}:${sec.toString().padStart(2, "0")}`;
  };

  const handleVerifyCode = async () => {
    console.log("Sent Code:", sentCode); // Debug: ดูค่าของ sentCode
    console.log("Verification Code:", verificationCode); // Debug: ดูค่าของ verificationCode

    if (verificationCode !== sentCode) {
      setCodeError("Invalid verification code"); // ถ้า OTP ไม่ตรงกัน
      return;
    }

    try {
      const response = await fetch('/api/assets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: parseFloat(amount), userId: user.email }), // Ensure the payload is correct
      });

      if (response.ok) {
        alert("อัปเดตสินทรัพย์รวมสำเร็จ!");
        router.push("/finance");
      } else {
        const errorData = await response.json().catch(() => null); // Handle non-JSON responses
        console.error("Unexpected response:", errorData || response.statusText);
        if (response.status === 404) {
          alert("เกิดข้อผิดพลาด: API ไม่พบ (Not Found)");
        } else {
          alert("เกิดข้อผิดพลาด: ไม่สามารถอัปเดตสินทรัพย์รวมได้");
        }
      }
    } catch (error) {
      console.error("Error during API call:", error);
      alert("เกิดข้อผิดพลาดบางอย่าง");
    }
  };

  // เพิ่มฟังก์ชัน handleNavigation สำหรับการนำทาง
  const handleNavigation = (tab: string, path: string) => {
    setActiveTab(tab);
    router.push(path);
  };

  return (
    <div className="flex h-screen text-white">
      {/* Sidebar */}
      <aside className="h-screen w-50 bg-bgsidebar p-5 flex flex-col justify-center">
        {/* Logo */}
        <div
          className="flex justify-center mb-8 cursor-pointer"
          onClick={() => router.push("/dashboard")}
        >
          <Image src="/logo.svg" alt="EQ" width={140} height={140} />
        </div>

        {/* Menu */}
        <nav className="flex flex-col space-y-4">
          {[{ tab: "home", icon: <FaHome />, text: "Home", path: "/dashboard" },
            { tab: "chart", icon: <FaChartLine />, text: "Chart", path: "/chart" },
            { tab: "asset", icon: <FaDollarSign />, text: "Asset", path: "/asset" },
            { tab: "finance", icon: <FaUniversity />, text: "Finance", path: "/finance" }]
            .map(({ tab, icon, text, path }) => (
              <button
                key={tab}
                className={`flex items-center space-x-2 p-3 rounded-lg ${activeTab === tab ? "bg-gray-700" : ""}`}
                onClick={() => handleNavigation(tab, path)} // เรียกใช้ handleNavigation
              >
                {icon}
                <span>{text}</span>
              </button>
            ))}
        </nav>

        {/* User Profile */}
        <div className="mt-auto flex items-center space-x-2 p-3 rounded-lg bg-gray-700">
          <FaUser />
          <span>{user?.displayName || "Guest"}</span>
        </div>

        <div className="mt-1 flex items-center space-x-2 p-3 rounded-lg bg-gray-700">
          <button className="flex items-center space-x-2" onClick={logOut}> {/* ใช้ logOut จาก context */}
            <FaSignInAlt />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-bgcolor flex justify-center items-center">
        <div className="bg-gray-800 p-6 rounded-lg w-96 text-center">
          <h2 className="text-2xl font-bold mb-4">ฝากเงิน</h2>

          {/* Payment Method */}
          <h3 className="text-lg font-semibold mb-2">วิธีการชำระ:</h3>
          <div className="flex items-center space-x-4 bg-gray-700 p-3 rounded-lg justify-center">
            <Image src="/qrpas.png" alt="Thai QR Payments" width={50} height={50} />
            <span className="text-lg">Thai QR Payments</span>
          </div>

          {/* Display Amount Passed from Previous Page */}
          <div className="mt-4 text-center">
            <p className="text-lg text-gray-400">จำนวนเงินที่ต้องชำระ:</p>
            <p className="text-2xl font-bold text-white">{amount} THB</p>
          </div>

          {/* QR Code */}
          <div className="mt-6 flex justify-center">
            <Image src="/QR_CODE.png" alt="QR Code" width={200} height={200} />
          </div>

          {/* Countdown */}
          <p className="text-gray-400 mt-4" aria-live="polite">
            หมดอายุใน:{" "}
            <span className="text-white font-bold">{formatTime(countdown)}</span>
          </p>

          {/* Verification Code Input */}
          <div className="mt-4">
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="Enter verification code"
              className="w-full px-4 py-2 border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {codeError && <p className="text-red-500 mt-2">{codeError}</p>}
          </div>

          {/* Buttons */}
          <div className="flex space-x-4 mt-6">
            <button
              onClick={() => router.push("/finance")}
              className="w-1/2 bg-gray-600 py-2 rounded-md text-white hover:bg-gray-700 transition"
            >
              ยกเลิก
            </button>
            <button
              onClick={handleVerifyCode}
              className="w-1/2 bg-purple-600 py-2 rounded-md text-white hover:bg-purple-700 transition"
            >
              ดำเนินการฝาก
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
