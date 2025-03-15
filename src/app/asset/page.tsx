import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { MoveRight } from "lucide-react";
import CryptoPrice from "@/components/table/CryptoPrice";
import TransactionTable from "@/components/table/TransactionTable";
import { ChevronRight } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { WalletCard } from "@/components/ui/Wallet";

import ThailandTime from "@/components/Time/RealTime";

export default function Page() {
  const totalAsset = 4765893.12;
  const lastUpdated = "15 Mar 2025 - 02:23 AM";

  const assets = [
    { id: 1, name: "Cash", amount: 953178.62, icon: "/assets/bank.svg" },
    { id: 2, name: "US Stock", amount: 1906357.25, icon: "/assets/gold.svg" },
    { id: 3, name: "GOLD", amount: 714883.97, icon: "/assets/money.svg" },
    {
      id: 4,
      name: "Muntual Fund",
      amount: 1191473.28,
      icon: "/assets/stock.svg",
    },
  ];

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
                  <BreadcrumbLink href="/dashboard">Asset</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="w-full max-w-[80%] lg:max-w-7xl mx-auto px-4 md:px-8 py-6">
          <div className="font-bold text-[40px] mb-2">Total Assets</div>
          <main className="flex flex-col gap-4 p-6">
            {/* รวมสินทรัพย์ทั้งหมด */}
            <Card className="w-full h-[90px] bg-white p-4 rounded-lg text-black flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold">My Assests</h2>

                <div className="flex items-center gap-2 text-gray-400">
                  {/* <p className="text-sm">{lastUpdated}</p>*/}
                  <ThailandTime />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full w-6 h-6 flex items-center justify-center"
                  >
                    <RotateCw
                      size={10}
                      className="text-gray-400 hover:text-white transition"
                    />
                  </Button>

                  <p></p>
                </div>
              </div>

              <p className="flex text-3xl font-bold mt-2">
                {totalAsset.toLocaleString()}{" "}
                <span className="text-gray-400 text-[20px] ml-3 mt-1">THB</span>
              </p>
            </Card>

            <div>
              <div className="font-bold text-[24px]">My Account</div>

              <div className="flex flex-wrap gap-4">
                <div className=" w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
                  <WalletCard />
                </div>
                <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
                  <WalletCard />
                </div>
              </div>
            </div>

            <Button
              variant="outline"
              className="inline-flex items-center justify-center my-3 rounded-full border-spacing-1.5 border-black text-black px-4 py-1 text-sm font-semibold w-fit hover:bg-black/10 transition-all"
            >
              Asset Types
            </Button>

            {/* รายการสินทรัพย์ */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {assets.map((asset) => (
                <Card
                  key={asset.id}
                  className="flex justify-between items-center h-20  p-4 rounded-2xltext-black shadow-sm border border-gray-200 hover:shadow-md hover:bg-gray-100 transition-all text-left bg-white"
                >
                  <div className="flex items-center gap-2">
                    <Image
                      src={asset.icon}
                      alt={asset.name}
                      width={36}
                      height={36}
                    />
                    <span className="font-semibold">{asset.name}</span>
                  </div>
                  <p className="text-xl font-bold text-right">
                    {asset.amount.toLocaleString()}{" "}
                    <span className="text-gray-400 text-[16px]">THB</span>
                  </p>
                </Card>
              ))}
            </section>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
