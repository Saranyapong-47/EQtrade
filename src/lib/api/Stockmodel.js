import mongoose from "mongoose";

const stockSchema = new mongoose.Schema(
    {
        symbol: { type: String, required: true, unique: true },
        price: { type: Number, required: true },
        high: { type: Number },
        low: { type: Number },
        percentChange: { type: Number },
        currency: { type: String, required: true },
    },
    { timestamps: true }
);

const Art = mongoose.models.Stock || mongoose.model("Art", stockSchema);
export default Art;
