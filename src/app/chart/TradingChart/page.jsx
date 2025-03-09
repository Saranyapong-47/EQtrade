// TradingViewWidget.jsx
"use client";
import React, { useEffect, useRef, memo } from "react";

function TradingViewWidget() {
  const container = useRef();

  useEffect(() => {

    if (container.current.querySelector("script")){
      return;
    }

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
        {
          "autosize": true,
          "symbol": "NASDAQ:AAPL",
          "interval": "D",
          "timezone": "Etc/UTC",
          "theme": "dark",
          "style": "1",
          "locale": "en",
          "withdateranges": true,
          "allow_symbol_change": true,
          "calendar": false,
          "width": "100%",
          "height": "100%",
          "support_host": "https://www.tradingview.com"
        }`;
    container.current.appendChild(script);
  }, []);

  return (
    <div className="w-[99%] h-[67vh] flex justify-center items-center ">
    <div
      className="tradingview-widget-container w-full h-full flex justify-center items-center"
      ref={container}
    >
      <div className="tradingview-widget-container__widget w-full h-full"></div>
    </div>
    </div>
  );
}

export default memo(TradingViewWidget);
