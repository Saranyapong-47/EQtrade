"use client";

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
} from "@/components/ui/sidebar";

import { MoveRight } from "lucide-react";
import CryptoPrice from "@/components/table/CryptoPrice";
import TransactionTable from "@/components/table/TransactionTable";
import { ChevronRight } from "lucide-react";

import { useFetchSymbols } from "@/components/chartTradingView/SymbolChart/symbolFetch";
import { useRouter } from "next/navigation";


import MiniChartItem from "@/components/chartTradingView/SymbolChart/MinichartItem";
import { resolveTradingViewSymbol}  from "@/lib/handleSymbolClick";


export default function Page() {
  const router = useRouter();
  const { symbols, loading, error } = useFetchSymbols(4);


  const handleMiniChartClick = (clickedSymbol: string) => {
    const result = resolveTradingViewSymbol(clickedSymbol);
  
    if (result.tradingViewSymbol) {

      console.log(`✅ ${result.type} matched: ${result.tradingViewSymbol}`);
    } else {
      console.warn("❌ Symbol not matched:", clickedSymbol);
    }
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
                  <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="flex flex-row">
            <div className="pl-3 text-[24px] font-semibold">ASSETS</div>
            <div className="flex ml-auto items-center mr-10">
              More Assets
              <MoveRight className=" ml-4 mt-1"></MoveRight>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
            {loading ? (
              <p>Loading...</p>
            ) : symbols && symbols.length > 0 ? (

             symbols.map((symbol) => (
                           <MiniChartItem
                             key={symbol}
                             symbol={symbol}
                             onClick={() => {
                              handleMiniChartClick(symbol);
                              router.push(`/chart?symbol=${encodeURIComponent(symbol)}`);
                            }}
                           />
                         ))  
=======
              symbols.map((symbol) => (
                <div
                  key={symbol}
                  className="h-[200px] w-full rounded-xl bg-muted/75 items-center justify-center cursor-pointer hover:shadow-lg hover:scale-[1.02] transition"
                  onClick={() => {
                    console.log("clicked:", symbol);
                    router.push("/chart");
                  }}
                >
                  <div className="pointer-events-none">
                    <TradingViewMiniChart symbol={symbol} />
                  </div>
                </div>
              ))

            ) : (
              <p>No symbols available</p>
            )}
          </div>

          <div className="flex flex-row">
            <div className="pl-3 text-[24px] font-semibold">ACTIVITY</div>
            <div className="flex ml-auto items-center mr-10">
              More Activity
              <MoveRight className=" ml-4 mt-1"></MoveRight>
            </div>
          </div>
          <div className="h-[320px] w-full rounded-xl bg-muted/50 ">
            <TransactionTable />
          </div>
          <div className="h-[210px] w-full mt-1 rounded-xl bg-muted/50">
            <CryptoPrice />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
