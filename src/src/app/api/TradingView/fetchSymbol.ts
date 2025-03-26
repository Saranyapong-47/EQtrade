// src/app/api/TradingView/fetchSymbol.ts
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = await fetch("https://scanner.tradingview.com/america/scan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        symbols: { tickers: [], query: { types: [] } },
        columns: ["name", "close", "market_cap_basic", "volume"],
        sort: { column: "volume", order: "desc" },
        filter: [{ column: "market_cap_basic", operation: "nempty" }]
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching TradingView data:", error);
    return NextResponse.json({ message: "Failed to fetch TradingView data" }, { status: 500 });
  }
}
