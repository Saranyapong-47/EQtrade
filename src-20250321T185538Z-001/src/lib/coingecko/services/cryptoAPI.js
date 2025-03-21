import axios from 'axios';

/**
 * ดึงข้อมูลคริปโตจาก CoinGecko API
 * @param {Array} coinIds - รายชื่อเหรียญที่ต้องการดึงข้อมูล
 * @returns {Array} - ข้อมูลเหรียญ
 */
export async function fetchCryptoData(coinIds) {
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinIds.join(",")}&order=market_cap_desc`;
    
    try {
        const response = await axios.get(url);
        return response.data.map(coin => ({
            id: coin.id,
            symbol: coin.symbol.toUpperCase(),
            name: coin.name,
            price: coin.current_price,
            logo: coin.image,
            priceChange: coin.price_change_percentage_24h
        }));
    } catch (error) {
        console.error("❌ ไม่สามารถดึงข้อมูลจาก CoinGecko:", error);
        return [];
    }
}
