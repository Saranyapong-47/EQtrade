import fs from 'fs';
import { fetchCryptoData } from './services/cryptoAPI.js';

async function main() {
    // โหลดรายชื่อเหรียญจากไฟล์ JSON
    const cryptoList = JSON.parse(fs.readFileSync('./data/crypto_gecko.json'));

    // ดึงข้อมูลจาก CoinGecko API
    const coinIds = cryptoList.map(coin => coin.id);
    const cryptoData = await fetchCryptoData(coinIds);

    // แสดงผลข้อมูล
    console.log("📊 ข้อมูลเหรียญคริปโตจาก CoinGecko:");
    cryptoData.forEach(coin => {
        console.log(`🪙 ${coin.name} (${coin.symbol})`);
        console.log(`📌 โลโก้: ${coin.logo}`);
        console.log(`📉 เปลี่ยนแปลง 24 ชม.: ${coin.priceChange.toFixed(2)}%`);
        
        console.log("------------------------------------------------");
    });
}

// เรียกใช้โปรแกรม
main();
