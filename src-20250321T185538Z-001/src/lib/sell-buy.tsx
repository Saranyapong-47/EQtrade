import React, { useState, useEffect } from "react";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the necessary components in Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Stock {
  name: string;
  price: number;
}

interface Transaction {
  action: string;
  stock: string;
  quantity: number;
  price: number;
  total: number;
}

const App: React.FC = () => {
  // ข้อมูลผู้ใช้
  const [userBalance, setUserBalance] = useState<number>(1000000000);
  const [userStocks, setUserStocks] = useState<{ [key: string]: number }>({ AAPL: 0, GOOGL: 0, AMZN: 0 });
  const [transactionHistory, setTransactionHistory] = useState<Transaction[]>([]);
  const [selectedStock, setSelectedStock] = useState<string>("AAPL");
  const [selectedQuantity, setSelectedQuantity] = useState<number>(0);
  const [selectedSellStock, setSelectedSellStock] = useState<string>("AAPL");
  const [selectedSellQuantity, setSelectedSellQuantity] = useState<number>(0);

  const stocks: { [key: string]: Stock } = {
    AAPL: { name: "Apple", price: 150 },
    GOOGL: { name: "Google", price: 2800 },
    AMZN: { name: "Amazon", price: 3500 },
  };

  // การอัปเดต UI
  const updateUI = () => {
    let totalStocksOwned = 0;
    Object.keys(userStocks).forEach(stock => {
      totalStocksOwned += userStocks[stock];
    });

    return totalStocksOwned;
  };

  // ฟังก์ชันการซื้อหุ้น
  const buyStock = () => {
    const stockPrice = stocks[selectedStock].price;
    const totalCost = stockPrice * selectedQuantity;

    if (selectedQuantity > 0) {
      if (userBalance >= totalCost) {
        setUserBalance(userBalance - totalCost);
        setUserStocks({ ...userStocks, [selectedStock]: userStocks[selectedStock] + selectedQuantity });

        // บันทึกการซื้อขายในประวัติ
        setTransactionHistory([
          ...transactionHistory,
          {
            action: "Buy",
            stock: stocks[selectedStock].name,
            quantity: selectedQuantity,
            price: stockPrice,
            total: totalCost,
          },
        ]);
        alert(`Bought ${selectedQuantity} shares of ${stocks[selectedStock].name} for $${totalCost}`);
      } else {
        alert("Not enough funds to buy the stock.");
      }
    } else {
      alert("Please enter a valid quantity.");
    }
  };

  // ฟังก์ชันการขายหุ้น
  const sellStock = () => {
    const stockPrice = stocks[selectedSellStock].price;
    const totalSale = stockPrice * selectedSellQuantity;

    if (selectedSellQuantity > 0 && selectedSellQuantity <= userStocks[selectedSellStock]) {
      setUserBalance(userBalance + totalSale);
      setUserStocks({ ...userStocks, [selectedSellStock]: userStocks[selectedSellStock] - selectedSellQuantity });

      // บันทึกการขายในประวัติ
      setTransactionHistory([
        ...transactionHistory,
        {
          action: "Sell",
          stock: stocks[selectedSellStock].name,
          quantity: selectedSellQuantity,
          price: stockPrice,
          total: totalSale,
        },
      ]);
      alert(`Sold ${selectedSellQuantity} shares of ${stocks[selectedSellStock].name} for $${totalSale}`);
    } else {
      alert("You don't have enough stocks to sell.");
    }
  };

  // อัปเดตตัวเลือกหุ้นที่สามารถขาย
  const updateSellStockSelector = () => {
    const availableStocks = Object.keys(userStocks).filter(stock => userStocks[stock] > 0);
    return availableStocks;
  };

  // การแสดงกราฟราคาหุ้น
 

  

  
};

export default App;
