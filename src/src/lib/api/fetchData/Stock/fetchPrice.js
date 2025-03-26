import axios from 'axios';
import dotenv from 'dotenv';
import StockName from './StockName.js';

// โหลดค่าตัวแปรจาก .env
dotenv.config();

// ฟังก์ชันดึงข้อมูลราคาคริปโตแบบเรียลไทม์จาก Binance
async function getRealTimeCryptoPrice(symbol) {
    try {
        // กำหนด URL สำหรับดึงข้อมูลราคาคริปโตจาก Binance
        const url = `https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`;

        // ส่งคำขอไปยัง Binance API
        const response = await axios.get(url);
        const data = response.data;

        // แสดงผลลัพธ์ราคาคริปโต
        const price = parseFloat(data.price).toFixed(2);
        console.log(`Price :  ${symbol}: ${price} USDT`);
        
        return data;  // คืนค่าข้อมูลราคาคริปโต
    } catch (error) {
        console.error('Error Fetch Data:', error.message);
    }
}

async function getMultipleCryptoPrices(symbols) {
    for (const symbol of symbols) {
        await getRealTimeCryptoPrice(symbol);  // เรียกฟังก์ชันสำหรับแต่ละเหรียญ
    }
}


const fetchPrices = async () => {
    try {
        console.log('Start Fetching...');
        await getMultipleCryptoPrices(StockName);
    } catch (error) {
        console.error('Error Fetching Crypto:', error.message);
    }
};


setInterval(fetchPrices, 5000);

// เรียกใช้ฟังก์ชันดึงข้อมูลราคาคริปโตครั้งแรก
fetchPrices();

