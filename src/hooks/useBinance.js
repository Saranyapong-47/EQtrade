import { useEffect, useRef, useState } from "react";

export function useBinanceTradePrice(symbol) {
  const [price, setPrice] = useState(null);
  const wsRef = useRef(null);

  useEffect(() => {
    if (wsRef.current) {
      wsRef.current.close();
    }

    if (!symbol) return;

    wsRef.current = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol}@trade`);

    wsRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setPrice(parseFloat(data.p).toFixed(4));
    };

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [symbol]);

  return price;
}
