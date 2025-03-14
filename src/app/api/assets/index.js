import { connectMongoDB } from "@/lib/mongodb";  // Ensure MongoDB connection
import Asset from "@/models/Asset";  // Import the Asset model

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await connectMongoDB();  // Make sure MongoDB is connected

      // Create a new asset from the request body
      const { name, amount, currency, userId } = req.body;  // Assuming you send these in the request body
      const newAsset = new Asset({
        name,
        amount,
        currency,
        userId,
      });

      // Save the new asset to the database
      await newAsset.save();
      res.status(201).json(newAsset);  // Respond with the created asset

    } catch (error) {
      console.error("Error creating asset:", error);
      res.status(500).json({ message: "Error creating asset", error });
    }
  } else {
    // Handle unsupported HTTP methods
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
