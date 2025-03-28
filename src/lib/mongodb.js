import mongoose from "mongoose";

export const connectMongoDB = async () => {
  try {
    if (mongoose.connection.readyState === 0) { // ถ้ายังไม่ได้เชื่อมต่อ
      console.log("Connecting to MongoDB...");
      await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Connected to MongoDB"); // แจ้งเมื่อเชื่อมต่อสำเร็จ
    } else {
      console.log("Already connected to MongoDB");
    }
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

