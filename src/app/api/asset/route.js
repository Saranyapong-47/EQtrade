import { connectMongoDB } from "@lib/mongodb";
import Asset from "@models/asset";

export async function GET(req) {
  try {
    await connectMongoDB();
    const assets = await Asset.find({});
    return new Response(JSON.stringify(assets), { status: 200 });
  } catch (error) {
    console.error("Error fetching assets:", error);
    return new Response(JSON.stringify({ message: "Error fetching assets" }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectMongoDB();
    const { name, amount } = await req.json();

    if (!name || !amount) {
      return new Response(JSON.stringify({ message: "Invalid data" }), { status: 400 });
    }

    let asset = await Asset.findOne({ name });
    if (!asset) {
      asset = new Asset({ name, amount, icon: "/default-icon.svg", currency: "THB" });
      await asset.save();
    } else {
      asset.amount += amount; // Ensure this line updates the amount
      await asset.save();
    }

    return new Response(JSON.stringify({ message: "Asset updated successfully" }), { status: 200 });
  } catch (error) {
    console.error("Error updating asset:", error);
    return new Response(JSON.stringify({ message: "Error updating asset" }), { status: 500 });
  }
}
