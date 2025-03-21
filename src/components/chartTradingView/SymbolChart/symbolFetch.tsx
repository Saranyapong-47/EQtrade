// hooks/useFetchSymbols.ts
import { useState, useEffect, useCallback } from "react";

export function useFetchSymbols(limit: number) {
  const [symbols, setSymbols] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSymbols = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://scanner.tradingview.com/crypto/scan");

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response:", data);

      const symbolsList = data.data.map((item: any) => item.s) || [];

      if (symbolsList.length > 0) {
        const shuffled = symbolsList.sort(() => 0.5 - Math.random()).slice(0, limit);
        setSymbols(shuffled);
      } else {
        console.warn("No symbols found in API response.");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error fetching symbols:", error.message);
        setError(error.message);
      } else {
        console.error("Unknown error fetching symbols");
        setError("Unknown error");
      }
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchSymbols();
  }, [fetchSymbols]);

  return { symbols, loading, error };
}
