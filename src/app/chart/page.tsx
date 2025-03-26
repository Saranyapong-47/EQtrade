"use client";

import { useState, useEffect } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import LightweightChart from "@/components/chartTradingView/TradingViewChart";
import { useFetchSymbols } from "@/components/chartTradingView/SymbolChart/symbolFetch";
import { Card } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import RightBar from "@/components/TransactionBar/RightBar";

import { CryptoName } from "@/data/Crypto";
import { SelectSymbolSwitcher } from "@/components/SelectSymbolSwitcher/SelectSymbolSwitcher";
import MiniChartItem from "@/components/chartTradingView/SymbolChart/MinichartItem";
import { resolveTradingViewSymbol } from "@/lib/handleSymbolClick";

export default function Page() {
  useEffect(() => {
    const savedSymbol = sessionStorage.getItem("selectedSymbol");
    if (savedSymbol) {
      const resolved = resolveTradingViewSymbol(savedSymbol);
      if (resolved.tradingViewSymbol) {
        setSelectedTradingViewSymbol(resolved.tradingViewSymbol);
        setSelectedType(resolved.type as "crypto" | "stock");
      }
    }
  }, []);

  const [selectedTradingViewSymbol, setSelectedTradingViewSymbol] =
    useState<string>(CryptoName[0].tradingViewSymbol);
  const [selectedType, setSelectedType] = useState<"crypto" | "stock">(
    "crypto"
  );

  const { symbols, loading } = useFetchSymbols(4);

  const handleMiniChartClick = (clickedSymbol: string) => {
    const result = resolveTradingViewSymbol(clickedSymbol);

    if (result.tradingViewSymbol) {
      setSelectedType(result.type as "crypto" | "stock");
      setSelectedTradingViewSymbol(result.tradingViewSymbol);
      console.log(`✅ ${result.type} matched: ${result.tradingViewSymbol}`);
    } else {
      console.warn("❌ Symbol not matched:", clickedSymbol);
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="ml-0">
        <header className="flex h-10 items-center gap-2 px-4 mt-6">
          <ChevronRight strokeWidth={1} className="opacity-75" />
          <Separator orientation="vertical" className="mr-2 h-5" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:flex items-center gap-2">
                <BreadcrumbLink href="/chart">Chart</BreadcrumbLink>
                <div className="ml-10 text-black font-semibold text-[16px]">
                  <SelectSymbolSwitcher
                    value={selectedTradingViewSymbol}
                    type={selectedType}
                    onChange={(symbol) => setSelectedTradingViewSymbol(symbol)}
                    onTypeChange={(type) => setSelectedType(type)}
                  />
                </div>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <div className="flex gap-4 p-4 mx-8">
          <div className="h-[600px] flex-1 rounded-xl bg-muted/75 items-center justify-center">
            <LightweightChart symbol={selectedTradingViewSymbol} />
          </div>

          <Card className="h-[600px] w-[20%] rounded-xl bg-muted/75 ">
            <RightBar symbol={selectedTradingViewSymbol} />
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
          {loading ? (
            <p>Loading...</p>
          ) : symbols && symbols.length > 0 ? (
            symbols.map((symbol) => (
              <MiniChartItem
                key={symbol}
                symbol={symbol}
                onClick={handleMiniChartClick}
              />
            ))
          ) : (
            <p>No symbols available</p>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
