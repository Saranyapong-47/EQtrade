import { useEffect, useState, useCallback } from "react";
import { useCurrentUser } from "./useCurrentUser";
import { getAuth } from "firebase/auth";
import { generateWalletNumber } from "@/utils/generateWalletNumber"; 

interface WalletData {
  balance: number;
  walletNumber: string;
}

export function useWallet(): {
  wallet: WalletData | null;
  refetchWallet: () => void;
} {
  const userId = useCurrentUser();
  const [wallet, setWallet] = useState<WalletData | null>(null);

  const fetchWallet = useCallback(async () => {
    if (!userId) return;

    try {
      const res = await fetch(`/api/wallet?userId=${userId}`);
      const data = await res.json();

      if (res.ok) {
        setWallet({
          balance: data.balance,
          walletNumber: data.walletNumber,
        });
      } else if (res.status === 404) {
        console.log("🆕 Wallet not found, creating one...");

        const createRes = await fetch("/api/wallet", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId,
            walletNumber: generateWalletNumber(),
          }),
        });

        const created = await createRes.json();

        if (createRes.ok) {
          setWallet({
            balance: created.balance,
            walletNumber: created.walletNumber,
          });
        } else {
          console.warn("⚠️ Failed to create wallet:", created.error);
        }
      } else {
        console.warn("⚠️ Wallet error:", data.error);
      }
    } catch (err) {
      console.error("❌ Wallet fetch error:", err);
    }
  }, [userId]);

  useEffect(() => {
    if (!userId) {
      setWallet(null); // ✅ เคลียร์เมื่อ logout
      return;
    }

    if (wallet === null) {
      fetchWallet();
    }
  }, [userId, wallet, fetchWallet]);

  return { wallet, refetchWallet: fetchWallet };
}
