// models/Portfolio.ts
import mongoose from 'mongoose';

const AssetSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  symbol: { type: String, required: true },
  category: { type: String, enum: ['Stock', 'Crypto'], required: true },
  quantity: { type: Number, required: true },
  averageBuyPrice: { type: Number, required: true },
  updatedAt: { type: Date, default: Date.now },
});

const Asset = mongoose.models.Asset || mongoose.model('Asset', AssetSchema);

export default Asset;
