"use client";

<<<<<<< HEAD
import { useEffect, useState } from "react";
=======
>>>>>>> 88436427f88b9f85e98852b1047a5df137fa681f
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
<<<<<<< HEAD
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
=======
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
>>>>>>> 88436427f88b9f85e98852b1047a5df137fa681f

import { MoveRight } from "lucide-react";
import CryptoPrice from "@/components/table/CryptoPrice";
import TransactionTable from "@/components/table/TransactionTable";
import { ChevronRight } from "lucide-react";

import { useFetchSymbols } from "@/components/chartTradingView/SymbolChart/symbolFetch";
import { useRouter } from "next/navigation";

<<<<<<< HEAD
import MiniChartItem from "@/components/chartTradingView/SymbolChart/MinichartItem";
import { resolveTradingViewSymbol } from "@/lib/handleSymbolClick";
import DepositHistory from "@/components/table/DepositHistory";

export default function Page() {
  const router = useRouter();
  const { symbols, loading } = useFetchSymbols(4);
  const [selectedType, setSelectedType] = useState<"crypto" | "stock" | null>(
    null
  );
  const [selectedTradingViewSymbol, setSelectedTradingViewSymbol] = useState<
    string | null
  >(null);

  useEffect(() => {
    const savedSymbol = sessionStorage.getItem("selectedSymbol");
    if (savedSymbol) {
      const resolved = resolveTradingViewSymbol(savedSymbol);
      if (resolved.tradingViewSymbol) {
        setSelectedType(resolved.type as "crypto" | "stock");
        setSelectedTradingViewSymbol(resolved.tradingViewSymbol);
        console.log("🌐 Loaded from session:", resolved.tradingViewSymbol);
      }
    }
  }, []);

  const handleMiniChartClick = (clickedSymbol: string) => {
    const result = resolveTradingViewSymbol(clickedSymbol);

    if (result.tradingViewSymbol) {
=======

import MiniChartItem from "@/components/chartTradingView/SymbolChart/MinichartItem";
import { resolveTradingViewSymbol}  from "@/lib/handleSymbolClick";


export default function Page() {
  const router = useRouter();
  const { symbols, loading, error } = useFetchSymbols(4);


  const handleMiniChartClick = (clickedSymbol: string) => {
    const result = resolveTradingViewSymbol(clickedSymbol);
  
    if (result.tradingViewSymbol) {

>>>>>>> 88436427f88b9f85e98852b1047a5df137fa681f
      console.log(`✅ ${result.type} matched: ${result.tradingViewSymbol}`);
    } else {
      console.warn("❌ Symbol not matched:", clickedSymbol);
    }
  };
<<<<<<< HEAD
=======
  

>>>>>>> 88436427f88b9f85e98852b1047a5df137fa681f

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
<<<<<<< HEAD
              symbols.map((symbol) => (
                <MiniChartItem
                  key={symbol}
                  symbol={symbol}
                  onClick={() => {
                    handleMiniChartClick(symbol);
                    router.push("/chart");
                    sessionStorage.setItem("selectedSymbol", symbol);
                  }}
                />
              ))
=======

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

>>>>>>> 88436427f88b9f85e98852b1047a5df137fa681f
            ) : (
              <p>No symbols available</p>
            )}
          </div>

          <div className="flex flex-row">
            <div className="pl-3 text-[24px] font-semibold">ACTIVITY</div>
<<<<<<< HEAD
=======
            <div className="flex ml-auto items-center mr-10">
              More Activity
              <MoveRight className=" ml-4 mt-1"></MoveRight>
            </div>
>>>>>>> 88436427f88b9f85e98852b1047a5df137fa681f
          </div>
          <div className="h-[320px] w-full rounded-xl bg-muted/50 ">
            <TransactionTable />
          </div>
          <div className="h-[210px] w-full mt-1 rounded-xl bg-muted/50">
<<<<<<< HEAD
            <DepositHistory />
=======
            <CryptoPrice />
>>>>>>> 88436427f88b9f85e98852b1047a5df137fa681f
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
