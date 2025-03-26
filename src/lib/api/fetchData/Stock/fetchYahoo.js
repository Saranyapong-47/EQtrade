import dotenv from "dotenv";
import { connectMongoDB } from "./mongodb.js"; // ✅ เรียกใช้ไฟล์เชื่อมต่อ DB
import Crypto from "./Cryptomodel.js";
import infoCrypto from "./Stockmodel.js";
import axios from "axios";
import Stock from "./Stockmodel.js";

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
