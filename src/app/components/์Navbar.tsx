import React from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar1: React.FC = () => {
  return (
    <nav className="bg-[#0B091A] text-white p-4 shadow-lg h-0">
      <div className="container mx-auto flex justify-between items-center">
        {/* โลโก้ */}
        <Link href="/">
          <Image src="/Logo.svg" width={100} height={50} alt={""} /> 
        </Link>

        {/* ปุ่ม Login & Signup */}
        <div className="flex space-x-2">
          <button className="bg-black text-white px-4 py-2 rounded-full">login</button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-full">signup</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar1;
