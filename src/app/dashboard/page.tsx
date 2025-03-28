"use client";

import { useEffect, useState } from "react";
import { AppSidebar } from "@/components/ui/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { MoveRight } from "lucide-react";
import TransactionTable from "@/components/table/TransactionTable";
import { ChevronRight } from "lucide-react";

import { useFetchSymbols } from "@/components/chartTradingView/SymbolChart/symbolFetch";
import { useRouter } from "next/navigation";

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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pl-2">
            {loading ? (
              <p>Loading...</p>
            ) : symbols && symbols.length > 0 ? (
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
            ) : (
              <p>No symbols available</p>
            )}
          </div>

          <div className="flex flex-row">
            <div className="pl-3 text-[24px] font-semibold">ACTIVITY</div>
          </div>
          <div className="h-[320px] w-full rounded-xl bg-muted/50">
            <TransactionTable />
          </div>
          <div className="flex flex-row">
            <div className="pl-3 text-[24px] font-semibold">FINANCE HISTORY</div>
          </div>
          <div className="h-[210px] w-full mt-1 rounded-xl bg-muted/50">
            <DepositHistory />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
