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
<<<<<<< HEAD
      setPrice(parseFloat(data.p).toFixed(4));
=======
      setPrice(parseFloat(data.p).toFixed(2));
>>>>>>> 88436427f88b9f85e98852b1047a5df137fa681f
    };

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [symbol]);

  return price;
}
