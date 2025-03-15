"use client";
import { useEffect, useRef } from "react";

export default function TradingViewChart() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.onload = () => {
      if (window.TradingView) {
        new window.TradingView.widget({
          autosize: true,
          symbol: "NASDAQ:TSLA", // เลือกคู่เทรดที่ต้องการ
          interval: "1", // Timeframe (1m, 5m, 1D ฯลฯ)
          timezone: "Etc/UTC",
          theme: "light",
          style: "1",
          locale: "en",
          enable_publishing: false,
          hide_side_toolbar: true,
          allow_symbol_change: true,
          withdateranges: true,
          container_id: "tradingview_chart",
        });
      }
    };
    if (containerRef.current) {
      containerRef.current.appendChild(script);
    }
  }, []);

  return (
    <div
      id="tradingview_chart"
      ref={containerRef}
      className="w-full h-full rounded-xl"
    />
  );
}