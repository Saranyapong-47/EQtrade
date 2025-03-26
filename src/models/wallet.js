import mongoose from "mongoose";

const WalletSchema = new mongoose.Schema(
  {
    userId: { 
      type: String, 
      required: true, 
      unique: true 
    },
    balance: { 
      type: Number, 
      default: 100000 
    },
    walletNumber: { 
      type: String, 
      required: true 
    },
    createdAt: { 
      type: Date, 
      default: Date.now
     },
  },
  { collection: "wallets" }
);

const Wallet = mongoose.models.Wallet || mongoose.model("Wallet", WalletSchema);
export default Wallet;
