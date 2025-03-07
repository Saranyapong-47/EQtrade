require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

const app = express();
app.use(cors());
app.use(express.json());

// เชื่อมต่อ Database SQLite
const db = new sqlite3.Database("./transactions.db", (err) => {
  if (err) console.error("Database Error:", err);
  console.log("Connected to SQLite Database");
});

// สร้างตารางธุรกรรม
db.run(`
  CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    amount REAL,
    method TEXT,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// API ฝากเงิน
app.post("/api/deposit", (req, res) => {
  const { amount, method } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({ error: "จำนวนเงินไม่ถูกต้อง" });
  }

  db.run(
    "INSERT INTO transactions (amount, method, status) VALUES (?, ?, 'pending')",
    [amount, method],
    function (err) {
      if (err) return res.status(500).json({ error: "Database error" });

      res.json({ transactionId: this.lastID, message: "สร้างธุรกรรมสำเร็จ" });
    }
  );
});

// API เช็คสถานะธุรกรรม
app.get("/api/transaction/:id", (req, res) => {
  const transactionId = req.params.id;

  db.get("SELECT * FROM transactions WHERE id = ?", [transactionId], (err, row) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (!row) return res.status(404).json({ error: "Transaction not found" });

    res.json(row);
  });
});

// API อัปเดตสถานะเป็น "completed"
app.post("/api/confirm/:id", (req, res) => {
  const transactionId = req.params.id;
  db.run("UPDATE transactions SET status = 'completed' WHERE id = ?", [transactionId], function (err) {
    if (err) return res.status(500).json({ error: "Database error" });

    res.json({ message: "ฝากเงินสำเร็จ", transactionId });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
