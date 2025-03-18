import dotenv from "dotenv";
import { connectMongoDB } from "./mongodb.js"; // ✅ เรียกใช้ไฟล์เชื่อมต่อ DB
import Crypto from "./Cryptomodel.js";
import Art from "./Stockmodel.js";
import axios from "axios";
import Binance from "node-binance-api";
import yahooFinance from "yahoo-finance2";
import Stock from "./Stockmodel.js";

dotenv.config();
await connectMongoDB(); // ✅ เชื่อมต่อฐานข้อมูลเมื่อรันสคริปต์

const binance = new Binance().options({
    APIKEY: process.env.BINANCE_API_KEY,
    APISECRET: process.env.BINANCE_API_SECRET,
});

// 📌 ฟังก์ชันคำนวณ % การเปลี่ยนแปลง
function calculateChangePercentage(currentPrice, previousClose) {
    currentPrice = parseFloat(currentPrice);
    previousClose = parseFloat(previousClose);

    if (isNaN(currentPrice) || isNaN(previousClose) || previousClose === 0) return 0;
    return parseFloat(((currentPrice - previousClose) / previousClose * 100).toFixed(2));
}

// 📌 ฟังก์ชันอัปเดตราคาคริปโต
async function updateCryptoPrice(symbol) {
    try {
        const url = `https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}`;
        const response = await axios.get(url);
        const data = response.data;

        const percentChange = calculateChangePercentage(data.lastPrice, data.prevClosePrice);

        console.log(`💰 คริปโต ${symbol} | ราคา: ${data.lastPrice} USDT | เปลี่ยนแปลง: ${percentChange.toFixed(2)}%`);

        await Crypto.deleteOne({ symbol });
        await Crypto.create({
            symbol,
            price: parseFloat(data.lastPrice),
            high: parseFloat(data.highPrice),
            low: parseFloat(data.lowPrice),
            percentChange,
            currency: "USDT"
        });

    } catch (error) {
        console.error(`❌ Error updating Binance price for ${symbol}:`, error.message);
    }
}

// 📌 ฟังก์ชันอัปเดตราคาหุ้น
async function updateStockPrice(stockSymbol) {
    try {
        let formattedSymbol = stockSymbol.toUpperCase();

        const searchResult = await yahooFinance.search(formattedSymbol);
        if (searchResult.quotes.length > 0) {
            formattedSymbol = searchResult.quotes[0].symbol;
        }

        const stockData = await yahooFinance.quote(formattedSymbol);
        if (!stockData || !stockData.regularMarketPrice) {
            console.error(`❌ ไม่พบข้อมูลหุ้น: ${formattedSymbol}`);
            return;
        }

        const percentChange = calculateChangePercentage(stockData.regularMarketPrice, stockData.regularMarketPreviousClose);

        console.log(`📈 หุ้น ${formattedSymbol} | ราคา: ${stockData.regularMarketPrice} ${stockData.currency} | เปลี่ยนแปลง: ${percentChange.toFixed(2)}%`);

        await Stock.deleteOne({ symbol: formattedSymbol });
        await Stock.create({
            symbol: formattedSymbol,
            price: stockData.regularMarketPrice,
            high: stockData.regularMarketDayHigh,
            low: stockData.regularMarketDayLow,
            percentChange,
            currency: stockData.currency
        });

    } catch (error) {
        console.error(`❌ Error updating stock price for ${stockSymbol}:`, error.message);
    }
}

// 📌 อัปเดตราคาหุ้นทีละตัวแบบเรียลไทม์
async function updateStockPriceSequentially() {
    const stockSymbols = ["AAPL", "TSLA", "GOOGL", "AMZN", "MSFT", "NFLX", "PTT", "SCB"];

    for (const stockSymbol of stockSymbols) {
        await updateStockPrice(stockSymbol);
        await new Promise(resolve => setTimeout(resolve, 2000)); // เว้น 2 วินาทีต่อหุ้น
    }
}

// 📌 อ่าน Command Line Argument
const args = process.argv.slice(2);
const command = args[0];
const symbol = args[1];

// 📌 ใช้งานตามคำสั่งที่รับมา
if (!command) {
    console.log(`
    ❌ โปรดระบุคำสั่งให้ถูกต้อง ❌
    -----------------------------
    📌 วิธีใช้:
    node script.js price BTCUSDT   # ดูราคาคริปโต 1 ตัว
    node script.js stock AAPL      # ดูราคาหุ้น 1 ตัว
    node script.js stock-realtime   # ดูราคาหุ้นทั้งหมดทีละตัวแบบเรียลไทม์
    `);
    process.exit(0);
}

if (command === "price") {
    if (!symbol) {
        console.log("❌ โปรดระบุเหรียญ เช่น BTCUSDT");
        setInterval(() => updateCryptoPrice("BTCUSDT"), 10000);
    } else {
        updateCryptoPrice(symbol);
        setInterval(() => updateCryptoPrice(symbol), 10000);
    }

} else if (command === "stock") {
    if (!symbol) {
        console.log("❌ โปรดระบุหุ้น เช่น AAPL");
        setInterval(() => updateStockPrice("AAPL"), 10000);
    } else {
        updateStockPrice(symbol);
        setInterval(() => updateStockPrice(symbol), 10000);
    }

} else if (command === "stock-realtime") {
    console.log("📡 เริ่มดึงข้อมูลหุ้นแบบเรียลไทม์...");
    setInterval(() => updateStockPriceSequentially(), 60000); // ดึงทุก 60 วินาที

} else {
    console.log(`❌ คำสั่งไม่ถูกต้อง! ใช้ "price", "stock", หรือ "stock-realtime"`);
}
