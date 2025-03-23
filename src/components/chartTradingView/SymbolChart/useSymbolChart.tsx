"use client";
import { useRouter } from "next/navigation";
import TradingViewMiniChart from "./TradingViewMiniChart";

interface MiniChartCardProps {
  symbol: string;
}

export default function useSymbolChart() {

    
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
                {loading ? (
                  <p>Loading...</p>
                ) : symbols && symbols.length > 0 ? (
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
  )
}