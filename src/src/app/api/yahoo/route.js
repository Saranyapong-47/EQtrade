export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const symbol = searchParams.get("symbol");

  if (!symbol) {
    return new Response(JSON.stringify({ error: "Symbol is required" }), {
      status: 400,
    });
  }

  const cleanSymbol = symbol
    .replace("NASDAQ:", "")
    .replace("NYSE:", "")
    .toUpperCase();

  try {
    const response = await fetch(
      `https://query1.finance.yahoo.com/v8/finance/chart/${cleanSymbol}?interval=1d`
    );
    const data = await response.json();
    const price = data.chart?.result?.[0]?.meta?.regularMarketPrice;

    return new Response(JSON.stringify({ price }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Yahoo API error:", err);
    return new Response(JSON.stringify({ error: "Fetch failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
