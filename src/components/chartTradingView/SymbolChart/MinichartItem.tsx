"use client";

import TradingViewMiniChart from "./SymbolChart";
import { useCallback } from "react";

interface MiniChartItemProps {
  symbol: string;
  onClick: (symbol: string) => void;
}

export default function MiniChartItem({ symbol, onClick }: MiniChartItemProps) {
  const handleClick = useCallback(() => {
    onClick(symbol);
  }, [symbol, onClick]);

  return (
    <div
      className="h-[200px] w-full rounded-xl bg-muted/75 items-center justify-center cursor-pointer hover:shadow-lg hover:scale-[1.02] transition"
      onClick={handleClick}
    >
      <div className="pointer-events-none">
        <TradingViewMiniChart symbol={symbol} />
      </div>
    </div>
  );
}
