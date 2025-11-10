import express from "express";
import cors from "cors";
import multer from "multer";
import morgan from "morgan";
import mongoose from "mongoose";
import { encryptFile } from "./utils/encrypt.js";
import { pinToIPFS } from "./utils/pinata.js";

const app = express();
const PORT = process.env.PORT || 10000;
const MONGO_URI = process.env.MONGODB_URI;
const PINATA_JWT = process.env.PINATA_JWT;

// Middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "10mb" }));
app.use(morgan("dev"));

// ---------- Connect MongoDB ----------
if (!MONGO_URI) {
  console.error("❌ MONGODB_URI not found in environment variables");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI, { dbName: "mediblock" })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });

// ---------- Define Record Schema ----------
const recordSchema = new mongoose.Schema(
  {
    name: String,
    note: String,
    cid: String,
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

const Record = mongoose.model("Record", recordSchema);

// ---------- Routes ----------

// Health check
app.get("/health", (_req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// Fetch records
app.get("/records", async (_req, res) => {
  const data = await Record.find().sort({ createdAt: -1 }).lean();
  res.json(data);
});

// Add record manually
app.post("/records", async (req, res) => {
  try {
    const { name, note } = req.body;
    if (!name) return res.status(400).json({ error: "name required" });
    const record = await Record.create({ name, note });
    res.status(201).json(record);
  } catch (err) {
    console.error("Record error:", err.message);
    res.status(500).json({ error: "failed to save record" });
  }
});

// Upload and pin file
const upload = multer({ storage: multer.memoryStorage() });

app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "file required" });

    // Encrypt file
    const { encryptedData, key, iv } = encryptFile(req.file.buffer);

    // Upload to IPFS (Pinata)
    const pinRes = await pinToIPFS(encryptedData, req.file.originalname, PINATA_JWT);
    const cid = pinRes.IpfsHash;

    // Save metadata in MongoDB
    const record = await Record.create({
      name: req.file.originalname,
      note: "Encrypted file uploaded to IPFS",
      cid,
    });

    res.status(201).json({
      message: "File uploaded successfully",
      cid,
      recordId: record._id,
      encryptionKey: key,
      iv,
    });
  } catch (err) {
    console.error("Upload error:", err.message);
    res.status(500).json({ error: "upload_failed", details: err.message });
  }
});

// Default + 404
app.get("/", (_req, res) => res.send("MediBlock backend alive"));
app.use((req, res) => res.status(404).json({ error: "Not found", path: req.path }));

// Start server
app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));
