import mongoose from "mongoose";

export const connectMongoDB = async () => {
  try {
<<<<<<< HEAD
    if (mongoose.connection.readyState === 0) { // ถ้ายังไม่ได้เชื่อมต่อ
      console.log("Connecting to MongoDB...");
=======
    if (mongoose.connection.readyState === 0) {
>>>>>>> 88436427f88b9f85e98852b1047a5df137fa681f
      await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
<<<<<<< HEAD
      console.log("Connected to MongoDB"); // แจ้งเมื่อเชื่อมต่อสำเร็จ
    } else {
      console.log("Already connected to MongoDB");
=======
      console.log("Connected to MongoDB");
>>>>>>> 88436427f88b9f85e98852b1047a5df137fa681f
    }
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
<<<<<<< HEAD
};

connectMongoDB(); // เรียกใช้งานเมื่อโปรแกรมเริ่มทำงาน
=======
};
>>>>>>> 88436427f88b9f85e98852b1047a5df137fa681f
