import { useEffect, useState } from "react";

export function useYahooStockPrice(symbol) {
  const [price, setPrice] = useState(null);

  useEffect(() => {
    if (!symbol) return;

    const fetchPrice = async () => {
      try {
        const res = await fetch(`/api/yahoo?symbol=${encodeURIComponent(symbol)}`);
        const data = await res.json();

        if (data.price) {
          setPrice(data.price);
        } else {
          console.warn("No price in response:", data);
          setPrice(null);
        }
      } catch (err) {
        console.error("❌ Yahoo fetch (API route) error:", err);
        setPrice(null);
      }
    };

    fetchPrice();
  }, [symbol]);

  return price;
}
