import { useEffect, useRef, useState } from "react";
import yahooFinance from "yahoo-finance2";

export default function StockLivePrice({ symbol }: { symbol: string }) {
  const [price, setPrice] = useState<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const result = await yahooFinance.quote(symbol);
        if (result?.regularMarketPrice) {
          setPrice(result.regularMarketPrice.toFixed(2));
          console.log(`📈 ${symbol} = ${result.regularMarketPrice}`);
        } else {
          console.warn(`⚠️ ไม่พบราคาของ ${symbol}`);
        }
      } catch (err) {
        console.error("❌ Error fetching stock price:", err);
      }
    };

    fetchPrice(); // ดึงครั้งแรกทันที
    intervalRef.current = setInterval(fetchPrice, 5000); // ดึงทุก 5 วิ

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [symbol]);

  return (
    <div>
      <h2>{symbol}</h2>
      <p>ราคาล่าสุด: {price ? `$${price}` : "กำลังโหลด..."}</p>
    </div>
  );
}
