// server.js
require('dotenv').config(); // ตรวจสอบว่ามีการโหลด .env
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// โหลด .env สำหรับการตั้งค่าคอนฟิก
dotenv.config();

// สร้าง Express app
const app = express();
app.use(express.json());
app.use(cors());

// เชื่อมต่อ MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Error connecting to MongoDB:', err));

// สร้าง Schema สำหรับสินทรัพย์
const assetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'THB' },
  icon: { type: String },  // คุณสามารถเก็บ icon ในรูปแบบของ string (เช่น 'FaBitcoin')
});

const Asset = mongoose.model('Asset', assetSchema);

// API สำหรับดึงข้อมูลสินทรัพย์ทั้งหมด
app.get('/api/assets', async (req, res) => {
  try {
    const assets = await Asset.find();  // ดึงข้อมูลสินทรัพย์ทั้งหมดจาก MongoDB
    res.status(200).json(assets);  // ส่งข้อมูลสินทรัพย์กลับไป
  } catch (err) {
    console.error("Error fetching assets:", err.message);
    res.status(500).json({ message: "Failed to fetch assets", error: err.message });
  }
});

// API สำหรับเพิ่มสินทรัพย์ใหม่
app.post('/api/assets', async (req, res) => {
  const { name, amount, currency, icon } = req.body;

  try {
    const newAsset = new Asset({ name, amount, currency, icon });
    await newAsset.save();  // บันทึกสินทรัพย์ใหม่ลงในฐานข้อมูล
    res.status(201).json(newAsset);  // ส่งสินทรัพย์ที่สร้างเสร็จแล้วกลับไป
  } catch (err) {
    res.status(500).json({ message: 'Failed to add asset', error: err });
  }
});

// ตั้งค่าเซิร์ฟเวอร์ให้ทำงานที่พอร์ต 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
