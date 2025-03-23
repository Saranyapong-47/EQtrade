import { CryptoName } from "@/data/Crypto";
import { StockName } from "@/data/Stock";

export function resolveTradingViewSymbol(clickedSymbol) {
  const normalized = clickedSymbol.toUpperCase();
  const cryptoFallback = normalized.endsWith("USD") ? normalized + "T" : normalized;

  const crypto = CryptoName.find((c) =>
    c.tradingViewSymbol.toUpperCase().includes(cryptoFallback)
  );

  const stock = StockName.find((s) =>
    s.tradingViewSymbol.toUpperCase().includes(normalized)
  );

  if (crypto) {
    return {
      type: "crypto",
      tradingViewSymbol: crypto.tradingViewSymbol,
    };
  } else if (stock) {
    return {
      type: "stock",
      tradingViewSymbol: stock.tradingViewSymbol,
    };
  } else {
    return {
      type: null,
      tradingViewSymbol: null,
    };
  }
}
