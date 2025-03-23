import mongoose from "mongoose";

const cryptoSchema = new mongoose.Schema(
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

const Crypto = mongoose.models.Crypto || mongoose.model("Crypto", cryptoSchema);
export default Crypto;
