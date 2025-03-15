"use client";

import { useEffect, useState } from "react";

export default function ThailandTime() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Bangkok",
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second:"2-digit",
        hour12: true,
      };

      const formattedDate = new Intl.DateTimeFormat("en-GB", options)
        .format(now)
        .replace(",", ""); // ✅ ลบ `,` ออก

      // ✅ แยกข้อมูลจาก formattedDate
      const parts = formattedDate.split(" ");
      if (parts.length < 5) return; // ป้องกัน error

      const datePart = `${parts[0]} ${parts[1]} ${parts[2]}`; // 15 Mar 2025
      const timePart = `${parts[3]} ${parts[4].toUpperCase()}`; // 02:23 AM

      setTime(`${datePart} - ${timePart}`);
    };

    updateTime(); // อัปเดตเวลาทันทีตอนโหลด
    const interval = setInterval(updateTime, 1000); // อัปเดตทุก 1 วินาที

    return () => clearInterval(interval); // เคลียร์ interval เมื่อ component ถูก unmount
  }, []);

  return <p className="text-sm text-gray-400">{time}</p>;
}
