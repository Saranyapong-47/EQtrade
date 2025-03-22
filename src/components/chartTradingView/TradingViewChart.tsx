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

export default function TradingViewChart({  symbol = "BTCUSD"  }: TradingViewChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scriptReady, setScriptReady] = useState(false);

  useEffect(() => {
    const existingScript = document.getElementById("tradingview-script");

    if (!existingScript) {
      const script = document.createElement("script");
      script.id = "tradingview-script";
      script.src = "https://s3.tradingview.com/tv.js";
      script.async = true;
      script.onload = () => setScriptReady(true);
      document.body.appendChild(script);
    } else {
      setScriptReady(true);
    }
  }, []);

  useEffect(() => {
    if (!scriptReady || !window.TradingView || !containerRef.current) return;
    


    const loadWidget = () => {
      containerRef.current!.innerHTML = `<div id="tradingview_container" class="w-full h-full"></div>`;

      requestAnimationFrame(() => {
        if (document.getElementById("tradingview_container")) {
          new window.TradingView.widget({
            autosize: true,
            symbol: symbol,
            interval: "D",
            timezone: "Etc/UTC",
            theme: "light",
            style: "1",
            locale: "en",
            container_id: "tradingview_container",
            hide_top_toolbar: false,
            hide_side_toolbar: false,
            allow_symbol_change: false,
          });
        }
      });
    };

    // delay load for safety
    const timeout = setTimeout(loadWidget, 100);

    return () => {
      clearTimeout(timeout);
      if (containerRef.current) {
        containerRef.current.innerHTML = `<div id="tradingview_container" class="w-full h-full"></div>`;
      }
    };
  }, [scriptReady, symbol]);

  return (
    <div className="w-full h-full">
      <div ref={containerRef} className="w-full h-[600px]">
        <div id="tradingview_container" className="w-full h-full" />
      </div>
    </div>
  );
}
