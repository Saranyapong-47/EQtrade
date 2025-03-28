"use client";

import { Card } from "@/components/ui/card";
import Image from "next/image";
import { PortfolioItem } from "@/hooks/usePortfolio";
import { StockName } from "@/data/Stock";
import { CryptoName } from "@/data/Crypto";

const AllAssetMeta = [...StockName, ...CryptoName];

interface AssetRowProps {
  title: string;
  items: PortfolioItem[];
}

export const AssetRow = ({ title, items }: AssetRowProps) => {
  return (
    <>
      <p className="font-bold text-xl mt-6 mb-2">{title}</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => {
          const meta = AllAssetMeta.find(
            (m) => m.tradingViewSymbol === item.symbol
          );

          return (
            <Card
              key={item.symbol}
              className="flex justify-between items-center h-20 p-4 rounded-2xl text-black shadow-sm border border-gray-200 hover:shadow-md hover:bg-gray-100 transition-all bg-white dark:bg-zinc-900 dark:text-white"
            >
              <div className="flex items-center gap-3">
                <Image
                  src={meta?.icon || "/fallback-icon.svg"}
                  alt={meta?.name || item.symbol}
                  width={36}
                  height={36}
                  priority
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/fallback-icon.svg";
                  }}
                />
                <div   className="max-w-[150px] overflow-hidden">
                  <p className="font-semibold truncate">{meta?.name || item.symbol}</p>
                  <p className="text-sm text-gray-500">{item.category}</p>
                </div>
              </div>
              <div className="text-right font-bold text-lg text-gray-700 dark:text-white">
                {item.quantity.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}
              </div>
            </Card>
          );
        })}
      </div>
    </>
  );
};