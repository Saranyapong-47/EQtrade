import mongoose from 'mongoose';

const assetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'THB' },
  userId: { type: String, required: true }, // ใช้ email เป็น userId
}, { timestamps: true });

const Asset = mongoose.models.Asset || mongoose.model('Asset', assetSchema);

export default Asset;
