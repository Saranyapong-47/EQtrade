import { CryptoName } from "@/data/Crypto";
import { StockName } from "@/data/Stock";

export function FindIcon(symbol) {
  const crypto = CryptoName.find(
    (c) =>
      c.tradingViewSymbol === symbol ||
      c.binanceSymbol === symbol ||
      c.value.toUpperCase() === symbol.toUpperCase()
  );

  const stock = StockName.find(
    (s) =>
      s.tradingViewSymbol === symbol ||
      s.binanceSymbol === symbol ||
      s.value.toUpperCase() === symbol.toUpperCase()
  );

  return {
    name: (crypto && crypto.name) || (stock && stock.name) || null,
    icon: (crypto && crypto.icon) || (stock && stock.icon) || "/Bitcoin.svg",
  };
}
