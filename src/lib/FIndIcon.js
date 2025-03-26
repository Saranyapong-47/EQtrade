import { CryptoName } from "@/data/Crypto";
import { StockName } from "@/data/Stock";

export function FindIcon(symbol) {
  const normalized = symbol.toUpperCase().replace("BINANCE:", "");

  const crypto = CryptoName.find((c) =>
    c.tradingViewSymbol.toUpperCase().replace("BINANCE:", "") === normalized
  );

  if (crypto) {
    return { name: crypto.name, icon: crypto.icon };
  }

  const stock = StockName.find((s) =>
    s.tradingViewSymbol.toUpperCase() === normalized
  );

  if (stock) {
    return { name: stock.name, icon: stock.icon };
  }

  return {
    name: "Unknown Asset",
    icon: "/Bitcoin.svg", // fallback
  };
}
