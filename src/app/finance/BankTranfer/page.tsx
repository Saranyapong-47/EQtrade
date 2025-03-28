"use client";

import { useState, useEffect } from "react";
import { AppSidebar } from "@/components/ui/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { ChevronRight } from "lucide-react";
import { Card} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import * as React from "react";
import { PaymentMethodSelect } from "@/components/SelectMethod/SelectMethod";
import { SelectAccount } from "@/components/SelectMethod/SelectAccount";
import { useWallet } from "@/hooks/useWallet";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function DepositOptions() {
  const router = useRouter();

  const [amount, setAmount] = useState("");

  const [error, setError] = useState("");
  
  const { wallet, refetchWallet } = useWallet();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [method] = useState("Bank Transfer");


  


  useEffect(() => {
    let lastUid: string | null = null;


    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user?.uid !== lastUid) {
        lastUid = user?.uid || null;
        setAmount("");
        setError("");
      }
    });
    
    return () => unsubscribe();
  }, []);
  

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);


    const currentUser = auth.currentUser;
    if (!currentUser) {
      alert("กรุณาเข้าสู่ระบบก่อนทำรายการ");
      setIsSubmitting(false);
      return;
    }
  
    const userId = currentUser.uid;
  
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      setError("กรุณากรอกจำนวนเงินที่ถูกต้อง");
      setIsSubmitting(false);
      return;
    }
    try {
      const res = await fetch("/api/deposit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          amount: Number(amount),
          method,
        }),
      });
  
      const data = await res.json();
  
      if (res.ok) {
        alert(`✅ ฝากเงินสำเร็จ! ยอดใหม่: $${data.balance.toLocaleString()}`);
        setAmount(""); // ✅ reset form
        refetchWallet();
      } else {
        alert(`❌ ${data.error}`);
      }
    } catch (err) {
      console.error("❌ ฝากเงินล้มเหลว:", err);
    }
    
  setIsSubmitting(false);
  };


  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <ChevronRight strokeWidth={1} className="opacity-75" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/dashboard">Finance</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-col justify-center items-center mt-10">
          <Card className="w-full max-w-md h-auto p-4 shadow-lg rounded-xl bg-white">
            <div className="flex flex-col justify-center items-center">
              <h2 className="text-black text-4xl font-bold mb-2 text-center">
                Deposit
              </h2>

              <div className="mt-1 justify-center">
                

                <div className="mt-5">
                  <label className="block text-gray-700 mb-2 text-left">
                    Payment Method
                  </label>
                  <PaymentMethodSelect />
                </div>

                <div className="mt-5">
                  <label className="block text-gray-700  text-left ">
                    To Account
                  </label>
                  <SelectAccount />
                </div>

                <div className="mt-5">
                  <label className="block text-gray-700  text-left ">
                    Amount
                  </label>

                  <div className="relative">
                    <Input
                      type="number"
                      className="text-black text-lg w-[250px] outline-none  rounded-lg appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    ></Input>
                    <span className="absolute right-4 top-2/4 transform -translate-y-2/4 text-gray-400">
                      USD
                    </span>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-between mt-5">
                <Button
                  onClick={() => router.push("/finance")}
                  className="w-1/2 bg-gray-600 py-2 rounded-md text-white hover:bg-gray-700 transition mr-2"
                >
                  Cancle
                </Button>

                <Button
                  onClick={handleSubmit}
                  className="w-1/2 bg-[#30A0E0] py-2 rounded-md text-white hover:bg-[#006BBB] transition ml-2"
                >
                  Submit
                </Button>
              </div>
            </div>
          </Card>

          <Card className="w-full max-w-md h-auto p-4 mt-8 shadow-lg rounded-xl bg-white">
            <div className="">
              <div className="font-semibold text-[24px]">Terms</div>

              <div className="text-gray-500 mt-2">
                Average payment time <span className="font-semibold text-black opacity-100">Instant</span>
              </div>

              <div className="text-gray-500 mt-1">
                Fee <span className="font-semibold text-black opacity-100">0%</span>
              </div>
            </div>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

