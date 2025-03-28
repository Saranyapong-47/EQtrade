// lib/updatePortfolio.js (แบบ JS ล้วน)
import Asset from "@/models/asset";

export const updatePortfolio = async (data) => {
  const { userId, symbol, category, price, quantity, type } = data;
  const existing = await Asset.findOne({ userId, symbol });

  if (type === 'buy') {
    if (!existing) {
      await Asset.create({
        userId,
        symbol,
        category,
        quantity,
        averageBuyPrice: price,
      });
    } else {
      const newQty = existing.quantity + quantity;
      const newAvgPrice =
        (existing.quantity * existing.averageBuyPrice + quantity * price) / newQty;

      existing.quantity = newQty;
      existing.averageBuyPrice = newAvgPrice;
      existing.updatedAt = new Date();
      await existing.save();
    }
  }

  if (type === 'sell' && existing) {
    if (existing.quantity < quantity) {
      throw new Error("Cannot sell more than you own.");
    }

    existing.quantity -= quantity;
    existing.updatedAt = new Date();
    if (existing.quantity <= 0) {
      await existing.deleteOne();
    } else {
      await existing.save();
    }
  }
};
