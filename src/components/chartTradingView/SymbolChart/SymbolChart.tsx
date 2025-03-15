"use client";
import { useEffect, useRef,} from "react";

export default function TradingViewMiniChart({ symbol }: { symbol: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isLoadedRef = useRef(false);

  useEffect(() => {

    isLoadedRef.current = false;
    
    if (!symbol || isLoadedRef.current) return;
    isLoadedRef.current = true;

    if (containerRef.current) {
      containerRef.current.innerHTML = ""; // ล้างค่าเก่าก่อนเพิ่มใหม่
    }

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js";
    script.async = true;
    script.innerHTML = `
    {
      "symbol": "${symbol}",
      "width": "100%",
      "height": 220,
      "locale": "en",
      "dateRange": "12M",
      "colorTheme": "light",
      "isTransparent": false,
      "autosize": true,
      "largeChartUrl": "",
      "chartOnly": false
    }`;

    if (containerRef.current) {
      containerRef.current.appendChild(script);
    }
  }, [symbol]);

  return (
    <div className="tradingview-widget-container" ref={containerRef}>
      <div className="tradingview-widget-container__widget" />
    </div>
  );
}
