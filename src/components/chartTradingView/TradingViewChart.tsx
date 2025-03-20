"use client";
import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    TradingView?: any;
  }
}

interface TradingViewChartProps {
  symbol: string;
}

export default function TradingViewChart({ symbol }: TradingViewChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    if (!document.getElementById("tradingview-script")) {
      console.log("📥 Loading TradingView Script...");

      const script = document.createElement("script");
      script.id = "tradingview-script";
      script.src = "https://s3.tradingview.com/tv.js";
      script.async = true;
      script.onload = () => {
        console.log("✅ TradingView Script Loaded");
        setScriptLoaded(true); // ✅ อัปเดตว่า Script โหลดเสร็จแล้ว
      };

      document.body.appendChild(script);
    } else {
      console.log("✅ TradingView Script Already Loaded");
      setScriptLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!scriptLoaded || !window.TradingView) {
      console.warn("⚠️ TradingView is not ready yet...");
      return;
    }

    if (!containerRef.current) {
      console.error("❌ Container for TradingView Chart is missing!");
      return;
    }

    console.log(`📈 Loading TradingView Chart for: ${symbol}`);

    // ✅ ล้าง Widget เก่า ก่อนโหลดใหม่
    containerRef.current.innerHTML = `<div id="tradingview_container" class="w-full h-full"></div>`;

    setTimeout(() => {
      const containerElement = document.getElementById("tradingview_container");
      if (containerElement) {
        new window.TradingView.widget({
          autosize: true,
          symbol: symbol,
          interval: "D",
          timezone: "Etc/UTC",
          theme: "light",
          style: "1",
          locale: "en",
          container_id: "tradingview_container", // ✅ ใช้ ID ที่มีจริง
          hide_top_toolbar: false,
          hide_side_toolbar: false,
          allow_symbol_change: false,
        });
      } else {
        console.error("🚨 TradingView container is still missing!");
      }
    }, 500); // ✅ รอให้ DOM พร้อมก่อนโหลด Widget

    return () => {
      console.log("🚪 Cleaning up TradingView Chart...");
      if (containerRef.current) {
        containerRef.current.innerHTML = `<div id="tradingview_container" class="w-full h-full"></div>`;
      }
    };
  }, [scriptLoaded, symbol]);

  return (
    <div className="w-full h-full">
      <div ref={containerRef} className="w-full h-[600px]">
        <div id="tradingview_container" className="w-full h-full" />
      </div>
    </div>
  );
}
