"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/login"); // เมื่อโหลดหน้าแรก ให้เปลี่ยนไปที่ /login
  }, []);

  return null; // ไม่ต้องแสดงอะไร
}
