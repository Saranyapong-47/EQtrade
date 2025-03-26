import React, { useState, useEffect } from "react";
<<<<<<< HEAD
=======
import { Bar } from 'react-chartjs-2';
>>>>>>> 88436427f88b9f85e98852b1047a5df137fa681f
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

  const saveTransactionToDB = async (transaction: Transaction) => {
    try {
      const response = await fetch('http://localhost:3000/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transaction),
      });
  
      if (!response.ok) {
        throw new Error('Failed to save transaction');
      }
  
      const data = await response.json();
      console.log('Transaction saved to MongoDB:', data);
    } catch (error) {
      console.error('Error saving transaction:', error);
    }
  };
  
  // ฟังก์ชันการซื้อหุ้น
  const buyStock = () => {
    const stockPrice = stocks[selectedStock].price;
    const totalCost = stockPrice * selectedQuantity;
  
    if (selectedQuantity > 0) {
      if (userBalance >= totalCost) {
        setUserBalance(userBalance - totalCost);
        setUserStocks({ ...userStocks, [selectedStock]: userStocks[selectedStock] + selectedQuantity });
  
        const newTransaction: Transaction = {
          action: "Buy",
          stock: stocks[selectedStock].name,
          quantity: selectedQuantity,
          price: stockPrice,
          total: totalCost,
        };
  
        setTransactionHistory([...transactionHistory, newTransaction]);
  
        // ⬇️ ส่งไป MongoDB
        saveTransactionToDB(newTransaction);
  
        alert(`Bought ${selectedQuantity} shares of ${stocks[selectedStock].name} for $${totalCost}`);
      } else {
        alert("Not enough funds to buy the stock.");
      }
    } else {
      alert("Please enter a valid quantity.");
    }
  };
  

  const sellStock = () => {
    const stockPrice = stocks[selectedSellStock].price;
    const totalSale = stockPrice * selectedSellQuantity;
  
    if (selectedSellQuantity > 0 && selectedSellQuantity <= userStocks[selectedSellStock]) {
      setUserBalance(userBalance + totalSale);
      setUserStocks({ ...userStocks, [selectedSellStock]: userStocks[selectedSellStock] - selectedSellQuantity });
  
      const newTransaction: Transaction = {
        action: "Sell",
        stock: stocks[selectedSellStock].name,
        quantity: selectedSellQuantity,
        price: stockPrice,
        total: totalSale,
      };
  
      setTransactionHistory([...transactionHistory, newTransaction]);
  
      // ⬇ ส่งไป MongoDB
      saveTransactionToDB(newTransaction);
  
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

  
 

  

  
};

export default App;
