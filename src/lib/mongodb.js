// lib/mongodb.js
import mongoose from "mongoose";

let cached = global.mongoose; // Caching the mongoose instance

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in .env file");
}

export const connectMongoDB = async () => {
  if (cached.conn) {
    console.log("Reusing existing MongoDB connection"); // Debug: ตรวจสอบการเชื่อมต่อ
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    cached.promise = mongoose.connect(process.env.MONGODB_URI, opts).then((mongooseInstance) => {
      console.log("Connected to MongoDB"); // Debug: ตรวจสอบการเชื่อมต่อ
      return mongooseInstance;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};
