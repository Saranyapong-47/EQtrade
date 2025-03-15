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
  SidebarTrigger,
} from "@/components/ui/sidebar";
import LightweightChart from "@/components/chartTradingView/TradingViewChart";

import TradingViewMiniChart from "@/components/chartTradingView/SymbolChart/SymbolChart";
import { useFetchSymbols } from "@/components/chartTradingView/SymbolChart/symbolFetch";
import {Card} from "@/components/ui/card";

import { ChevronRight } from "lucide-react";
import RightBar from "@/components/TransactionBar/RightBar";


export default function Page() {
  const { symbols, loading, error } = useFetchSymbols(4);

  console.log("Fetched symbols:", symbols); // ✅ Log Symbols
  console.log("Loading status:", loading); // ✅ Log Loading State
  console.log("Error:", error); // ✅ Log Error

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="ml-0">
        <header className="flex h-10  shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4 mt-6">
            <ChevronRight strokeWidth={1} className="opacity-75" />
            {/*<SidebarTrigger className="-ml-1" />*/}
            <Separator orientation="vertical" className="mr-2 h-5" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/chart">Chart</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex gap-4 p-4 ">
          <div className=" h-[600px] flex-1 rounded-xl bg-muted/75 items-center justify-center">
            <LightweightChart />
          </div>

          <Card className="h-[600px] w-[20%] rounded-xl bg-muted/75 ">
            <RightBar />
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
          {loading ? (
            <p>Loading...</p>
          ) : symbols && symbols.length > 0 ? (
            symbols.map((symbol) => (
              <div
                key={symbol}
                className="h-[220px] w-full rounded-xl bg-muted/75 items-center justify-center"
              >
                <TradingViewMiniChart symbol={symbol} />
              </div>
            ))
          ) : (
            <p>No symbols available</p>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
