import fs from 'fs';
import { calculateCryptoProfitLoss } from './services/profitLoss.js';

const symbol = "BTCUSDT"; 

const rawData = fs.readFileSync('./data/transactions.json');
const trades = JSON.parse(rawData);

calculateCryptoProfitLoss(trades, symbol).then(result => {
    console.log("📊 ผลลัพธ์การคำนวณกำไร-ขาดทุน:");
    console.log(result);
});
