"use client";
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
import { RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import WalletCard from "@/components/ui/Wallet";
import ThailandTime from "@/components/Time/RealTime";
import { useWallet } from "@/hooks/useWallet";
import { useState, useEffect, useCallback } from "react";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { usePortfolio } from "@/hooks/usePortfolio";
import { StockName } from "@/data/Stock";
import { CryptoName } from "@/data/Crypto";
import { AssetRow } from "@/components/ui/AssetRow";


interface Asset {
  id: number;
  name: string;
  amount: number;
  icon: string;
}

export default function Page() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const userId = useCurrentUser();
  const { portfolio, loading } = usePortfolio(userId);

  const AllAssetMeta = [...StockName, ...CryptoName];

  const cryptoAssets = portfolio.filter((item) => item.category === "Crypto");
  const stockAssets = portfolio.filter((item) => item.category === "Stock");

  // เพิ่มประเภทให้กับ `portfolio` หากไม่ได้ระบุ
  interface PortfolioItem {
    category: string;
    // other properties...
  }

  const findAssetMeta = (symbol: string) => {
    return AllAssetMeta.find((item) => item.tradingViewSymbol === symbol);
  };

  const fetchAssetsData = useCallback(async () => {
    if (!userId) return;

    try {
      const res = await fetch(`/api/portfolio?userId=${userId}`);
      const data = await res.json();

      if (res.ok) {
        setAssets(data.assets);
      } else {
        console.error("Error fetching assets:", data.error);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  }, [userId]);

  useEffect(() => {
    fetchAssetsData();
  }, [fetchAssetsData]); // ใช้ fetchAssetsData ใน dependency array

  const { wallet } = useWallet();
  useEffect(() => {
    if (wallet) console.log("💳 [WalletCard] wallet:", wallet);
  }, [wallet]);

  const handleRefresh = () => {
    fetchAssetsData();
  };

  const AssetCard = ({ asset }: { asset: Asset }) => {
    return (
      <Card className="flex flex-col items-start justify-between p-4 border rounded-lg shadow-md hover:shadow-xl transition-all w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
        <div className="flex items-center gap-4 mb-4">
          {/* โลโก้ */}
          <Image src={asset.logoUrl} alt={asset.name} width={40} height={40} />
          {/* ชื่อและข้อมูลสินทรัพย์ */}
          <div className="text-left">
            <p className="text-lg font-semibold truncate">{asset.name}</p>
            <p className="text-sm text-gray-500">{asset.symbol}</p>
          </div>
        </div>
        
        <div className="flex flex-col items-start">
          {/* จำนวนสินทรัพย์ */}
          <p className="text-2xl font-bold">{asset.quantity}</p>
          <p className="text-sm text-gray-400">Units</p>
        </div>
      </Card>
    );
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
            <Card className="w-full h-[90px] bg-white p-4 rounded-lg text-black flex justify-between items-center shadow-md">
              <div>
                <h2 className="text-lg font-semibold">My Assets</h2>

                <div className="flex items-center gap-2 text-gray-400">
                  <ThailandTime />
                  <Button
                    onClick={handleRefresh}
                    variant="ghost"
                    size="icon"
                    className="rounded-full w-6 h-6 flex items-center justify-center"
                  >
                    <RotateCw
                      size={10}
                      className="text-gray-400 hover:text-white transition"
                    />
                  </Button>
                </div>
              </div>

              <p className="flex text-3xl font-bold mt-2">
                {typeof wallet?.balance === "number"
                  ? `$${wallet.balance.toLocaleString()}`
                  : "Loading..."}
                <span className="text-gray-400 text-[20px] ml-3 mt-1">USD</span>
              </p>
            </Card>

            <div>
              <div className="font-bold text-[24px] mb-4">My Account</div>

              <div className="flex flex-wrap gap-4">
                <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
                  <WalletCard />
                </div>
              </div>
            </div>

            <Button
              variant="outline"
              className="inline-flex items-center justify-center mt-3 rounded-full border-spacing-1.5 border-black text-black px-4 py-1 text-sm font-semibold w-fit hover:bg-black/10 transition-all"
            >
              Asset Types
            </Button>

            {/* รายการสินทรัพย์ */}
            <section>
              {loading ? (
                <p>Loading assets...</p>
              ) : portfolio.length === 0 ? (
                <p className="text-gray-400">No Assets</p>
              ) : (
                <>
                  <AssetRow title="Crypto" items={cryptoAssets} />
                  <AssetRow title="Stock" items={stockAssets} />
                </>
              )}
            </section>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}