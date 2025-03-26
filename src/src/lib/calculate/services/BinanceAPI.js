import fetch from 'node-fetch';

export async function fetchBinancePrice(symbol) {
    const url = `https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return parseFloat(data.price); // แปลงราคาเป็นตัวเลข
    } catch (error) {
        console.error("❌ Error fetching Binance price:", error);
        return null;
    }
}
