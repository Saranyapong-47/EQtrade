import { fetchBinancePrice } from './binanceAPI.js';


export async function calculateCryptoProfitLoss(trades, symbol) {
    const currentPrice = await fetchBinancePrice(symbol); // ดึงราคาปัจจุบัน
    if (!currentPrice) {
        console.log("❌ ไม่สามารถดึงราคาปัจจุบันได้");
        return;
    }

    let totalInvestment = 0;  // ต้นทุนรวม
    let totalRevenue = 0;     // รายได้จากการขาย
    let totalQuantity = 0;    // จำนวนเหรียญที่ถืออยู่

    trades.forEach(trade => {
        const { type, price, quantity } = trade;

        if (type === 'buy') {
            totalInvestment += price * quantity;
            totalQuantity += quantity;
        } else if (type === 'sell') {
            totalRevenue += price * quantity;
            totalQuantity -= quantity;
        }
    });

    const totalCurrentValue = totalQuantity * currentPrice; // มูลค่าปัจจุบันของเหรียญที่เหลือ
    const netProfitLoss = totalRevenue + totalCurrentValue - totalInvestment;

    return {
        symbol,  // ชื่อเหรียญ 
        totalInvestment,  //คำนวณต้นทุน
        totalRevenue, // คำนวณรายได้จากการขาย
        totalCurrentValue, //หามูลค่าที่เหลือของเหรียญที่ถืออยู่
        netProfitLoss, //คำนวณกำไรหรือขาดทุน
        totalQuantity,  // เหรียญที่เหลือ
        currentPrice // ราคาปัจจุบันของเหรียญ
    };
}
