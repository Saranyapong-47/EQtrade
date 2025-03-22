// hooks/useFetchSymbols.ts
import { useState, useEffect } from "react";
import { stockSymbols } from "@/data/StockSymbol";  // ปรับ path ให้ตรงกับโปรเจกต์
import { cryptoSymbols } from "@/data/CryptoSymbol"; // ปรับ path ให้ตรงกับโปรเจกต์

export function useFetchSymbols(limit: number) {
  const [symbols, setSymbols] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const allSymbols = [...stockSymbols, ...cryptoSymbols];
      const shuffled = allSymbols.sort(() => 0.5 - Math.random()).slice(0, limit);
      setSymbols(shuffled);
    } catch (err: any) {
      setError("Failed to load symbols.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [limit]);

  return { symbols, loading, error };
}
