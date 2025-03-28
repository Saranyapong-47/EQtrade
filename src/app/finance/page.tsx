"use client";

import Image from "next/image";
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
import { Card } from "@/components/ui/card";

import { useRouter } from "next/navigation";
import { depositMethods } from "@/data/Deposit";

export default function DepositOptions() {
  const router = useRouter();

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

        <div className="w-full max-w-[80%] lg:max-w-7xl mx-auto px-4 md:px-8 py-6">
          <h2 className="text-black text-[40px] font-bold mb-2">Deposit</h2>
          <p className="text-gray-700 font-semibold text-lg">
            All payment methods
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {depositMethods.map((method) => (
              <Card
                key={method.id}
                className=" p-6 w-full rounded-2xl flex justify-between items-center gap-4 text-black shadow-sm border border-gray-200 hover:shadow-md hover:bg-gray-100 transition-all text-left bg-white cursor-pointer"
                onClick={() => {
                  if (method.name === "Bank Transfer") {
                    router.push("/finance/BankTranfer");
                  }
                }}
              >
                <div className="mr-1">
                  <Image
                    src={method.icon}
                    alt={method.name}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-lg"
                    quality={100}
                    unoptimized={true}
                  />
                </div>

                <div className="flex flex-col justify-center flex-1">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    {method.name}{" "}
                  </h3>
                  <p className="text-gray-700 text-sm">
                    Time Processing {method.processingTime}
                  </p>
                  <p className="text-gray-700 text-sm"> Fee {method.fee}</p>
                  <p className="text-gray-700 text-sm">Limits {method.limit}</p>
                </div>

                {method.recommended && (
                  <span className="bg-green-100 text-green-800 text-[12px] font-normal px-2 py-1 rounded-full mb-10">
                    Recommended
                  </span>
                )}
              </Card>
            ))}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
