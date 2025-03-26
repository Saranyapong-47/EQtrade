import mongoose, { Schema } from "mongoose";

const TransactionSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    symbol: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["buy", "sell"],
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    assetType: {
      type: String,
      enum: ["crypto", "stock"],
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "completed",
    },
  },
  { timestamps: true }
);

const Transaction =
  mongoose.models.Transaction || mongoose.model("Transaction", TransactionSchema);

export default Transaction;
