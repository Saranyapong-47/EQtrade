"use client";
import { useEffect, useRef, useState } from "react";

<<<<<<< HEAD
=======


>>>>>>> 88436427f88b9f85e98852b1047a5df137fa681f
declare global {
  interface Window {
    TradingView?: any;
  }
}

interface TradingViewChartProps {
  symbol?: string;
}

export default function TradingViewChart({ symbol = "BTCUSDT" }: TradingViewChartProps) {
<<<<<<< HEAD
=======
=======
export default function TradingViewChart({  symbol = "BTCUSD"  }: TradingViewChartProps) {

>>>>>>> 88436427f88b9f85e98852b1047a5df137fa681f
  const containerRef = useRef<HTMLDivElement>(null);
  const [scriptReady, setScriptReady] = useState(false);

  // Load TradingView script
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

  // Load widget after script and DOM ready
  useEffect(() => {
<<<<<<< HEAD
=======

>>>>>>> 88436427f88b9f85e98852b1047a5df137fa681f
    if (!scriptReady || !containerRef.current) return;

    const loadWidget = () => {
      if (!containerRef.current) return;

      containerRef.current.innerHTML = `<div id="tradingview_container" class="w-full h-full"></div>`;

      const tryLoad = () => {
        if (window.TradingView?.widget && document.getElementById("tradingview_container")) {
          new window.TradingView.widget({
            autosize: true,
            symbol,
<<<<<<< HEAD
=======
=======
    if (!scriptReady || !window.TradingView || !containerRef.current) return;
    


    const loadWidget = () => {
      containerRef.current!.innerHTML = `<div id="tradingview_container" class="w-full h-full"></div>`;

      requestAnimationFrame(() => {
        if (document.getElementById("tradingview_container")) {
          new window.TradingView.widget({
            autosize: true,
            symbol: symbol,
>>>>>>> 88436427f88b9f85e98852b1047a5df137fa681f
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
        } else {
          // Retry loading after delay
          setTimeout(tryLoad, 100);
        }
      };

      requestAnimationFrame(tryLoad);
    };

<<<<<<< HEAD
=======

        }
      });
    };

    // delay load for safety
>>>>>>> 88436427f88b9f85e98852b1047a5df137fa681f
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
