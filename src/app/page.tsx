//rafce

import Image from "next/image";
import Link from "next/link";
import Rectangle from "@components/Square";
import Navbar1 from "@components/์Navbar";


export default function Home() {
  return (
    <div className="bg-darkPurple min-h-screen">
  
    <Navbar1 />

    <div className="bg-darkPurple min-h-screen">

      <div className="flex items-center justify-center h-screen mt-">
        <Rectangle width={440} height={400} color="#333333" borderRadius={20} />
      </div>
    </div>
    </div>
  );
}
