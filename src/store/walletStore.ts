import { create } from "zustand";

interface Wallet {
  balance: number;
  walletNumber: string;
}

interface WalletStore {
  wallet: Wallet | null;
  setWallet: (wallet: Wallet) => void;
  refetchWallet: (userId: string) => Promise<void>;
}

export const useWalletStore = create<WalletStore>((set) => ({
  wallet: null,

  setWallet: (wallet) => set({ wallet }),

  refetchWallet: async (userId: string) => {
    try {
      const res = await fetch(`/api/wallet?userId=${userId}`);
      const data = await res.json();

      if (res.ok) {
        set({ wallet: { balance: data.balance, walletNumber: data.walletNumber } });
      } else {
        console.warn("⚠️ Failed to refetch wallet:", data.error);
      }
    } catch (error) {
      console.error("❌ Error fetching wallet:", error);
    }
  },
}));
