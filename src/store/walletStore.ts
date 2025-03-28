import { create } from "zustand";

interface Asset {
  symbol: string;
  quantity: number;
}
interface Wallet {
  balance: number;
  walletNumber: string;
  assets: Asset[]; 
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
        // เพิ่มข้อมูล assets ใน wallet
        set({
          wallet: {
            balance: data.balance,
            walletNumber: data.walletNumber,
            assets: data.assets || [], // หากไม่พบข้อมูล assets ให้ใช้ array ว่าง
          },
        });
      } else {
        console.warn("⚠️ Failed to refetch wallet:", data.error);
      }
    } catch (error) {
      console.error("❌ Error fetching wallet:", error);
    }
  },
}));
