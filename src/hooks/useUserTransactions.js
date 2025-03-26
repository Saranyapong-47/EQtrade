import { useEffect, useState } from "react";

export function useUserTransactions(userId) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    const fetchTransactions = async () => {
      try {
        const res = await fetch(`/api/transaction?userId=${userId}`);
        const data = await res.json();
        setTransactions(data);
      } catch (err) {
        console.error("❌ Failed to fetch transactions", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, [userId]);

  return { transactions, loading };
}
