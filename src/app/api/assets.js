import { connectMongoDB } from "@/src/lib/mongodb"; 
import Asset from "@/src/models/Asset"; 

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await connectMongoDB();
      const assets = await Asset.find(); // Fetch assets
      res.status(200).json(assets);
    } catch (error) {
      console.error("Error fetching assets:", error);
      res.status(500).json({ message: "Error fetching assets", error });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
