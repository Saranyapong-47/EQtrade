import mongoose from "mongoose";

const AssetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  icon: { type: String, required: true },
  currency: { type: String, required: true },
});

export default mongoose.models.Asset || mongoose.model("Asset", AssetSchema);
