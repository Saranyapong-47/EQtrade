import dotenv from "dotenv";
import { connectMongoDB } from "./mongodb.js"; // ✅ เรียกใช้ไฟล์เชื่อมต่อ DB
import Crypto from "./Cryptomodel.js";
import infoCrypto from "./Stockmodel.js";
import axios from "axios";
import Binance from "node-binance-api";
import StockName from "./StockName.js";

dotenv.config();
await connectMongoDB(); // ✅ เชื่อมต่อฐานข้อมูลเมื่อรันสคริปต์


const binance = new Binance().options({
    APIKEY: process.env.BINANCE_API_KEY,
    APISECRET: process.env.BINANCE_API_SECRET,
});

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



// 📌 ฟังก์ชันคำนวณ % การเปลี่ยนแปลง
function calculateChangePercentage(currentPrice, previousClose) {
    currentPrice = parseFloat(currentPrice);
    previousClose = parseFloat(previousClose);

    if (isNaN(currentPrice) || isNaN(previousClose) || previousClose === 0) return 0;
    return parseFloat(((currentPrice - previousClose) / previousClose * 100).toFixed(2));


    
}

async function updateAllCryptoPrices() {
    for (const symbol of StockName) {
        await updateCryptoPrice(symbol);
    }
}

// เรียกใช้ฟังก์ชัน
updateAllCryptoPrices();
