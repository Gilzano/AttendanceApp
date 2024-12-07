const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const PORT = 3001;

const db = new sqlite3.Database('./attendance.db');

// יצירת טבלאות
db.run(`CREATE TABLE IF NOT EXISTS lectures (
  id TEXT PRIMARY KEY,
  title TEXT,
  date TEXT,
  start_time TEXT,
  end_time TEXT,
  qr_code TEXT
)`);

app.use(cors());
app.use(express.json());

// API להוספת הרצאה
app.post('/lectures', (req, res) => {
  const { title, date, startTime, endTime } = req.body;
  const qrCode = Math.random().toString(36).substring(7);
  
  const stmt = db.prepare('INSERT INTO lectures VALUES (?,?,?,?,?,?)');
  stmt.run(qrCode, title, date, startTime, endTime, qrCode);
  stmt.finalize();
  
  res.json({ success: true, qrCode });
});

app.listen(PORT, () => {
  console.log(`שרת רץ ב-http://localhost:${PORT}`);
});