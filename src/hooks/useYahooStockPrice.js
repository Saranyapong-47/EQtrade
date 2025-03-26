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
<<<<<<< HEAD
          setPrice(parseFloat(data.price).toFixed(4));
          //setPrice(data.price);
=======
          setPrice(data.price);
>>>>>>> 88436427f88b9f85e98852b1047a5df137fa681f
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
