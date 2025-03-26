import mongoose, { Schema } from "mongoose";

const DepositSchema = new Schema(
  {
    userId: { 
        type: String, 
        required: true 
    },
    amount: { 
        type: Number,
         required: true 
    },
    method: { 
        type: String, 
        required: true
     }, 
    walletNumber:{ 
        type: String 
     },
  },
  { timestamps: true }
);

const Deposit = mongoose.models.Deposit || mongoose.model("Deposit", DepositSchema);
export default Deposit;
