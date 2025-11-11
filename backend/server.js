// backend/server.js

import express from "express";
import cors from "cors";
import multer from "multer";
import morgan from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";
import recordRoutes from "./records/recordRoutes.js";
import authRoutes from "./routes/authRoutes.js";



import Record from "./models/Record.js";
import { encryptBuffer } from "./utils/encrypt.js";
import { pinToIPFS } from "./utils/pinata.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;
const JSON_LIMIT = process.env.JSON_LIMIT || "10mb";
const CORS_ORIGIN = process.env.CORS_ORIGIN || "*";
const MONGO_URI = process.env.MONGODB_URI || "";
const PINATA_JWT = process.env.PINATA_JWT || "";

// ---------- Middleware ----------
app.use(
  cors({
    origin:
      CORS_ORIGIN === "*"
        ? true
        : [CORS_ORIGIN, "http://localhost:3000", "http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json({ limit: JSON_LIMIT }));
app.use((req, _res, next) => {
  req.headers["cache-control"] = "no-store";
  next();
});
app.use(morgan("dev"));

// ---------- Database Connection ----------
if (MONGO_URI) {
  mongoose
    .connect(MONGO_URI, { dbName: "mediblock" })
    .then(() => console.log("✅ MongoDB connected"))
    .catch((e) => console.error("MongoDB connection error:", e.message));
} else {
  console.warn("⚠️  MONGODB_URI not set. Records won't persist.");
}

// ---------- Health Check ----------
app.get("/healthz", async (_req, res) => {
  res.json({
    ok: true,
    mongo: mongoose.connection.readyState === 1,
    time: new Date().toISOString(),
    version: "phase2B-1.0.0",
  });
});

// ---------- Register Routes ----------
app.use("/records", recordRoutes);
app.use("/auth", authRoutes);


// ---------- Records Create (metadata-only) ----------
app.post("/records", async (req, res) => {
  try {
    const { name, note } = req.body || {};
    if (!name) return res.status(400).json({ error: "name_required" });

    const rec = MONGO_URI
      ? await Record.create({ name, note })
      : { name, note, createdAt: Date.now(), _id: "dev" };

    res.status(201).json(rec);
  } catch (err) {
    console.error("POST /records error:", err);
    res.status(500).json({ error: "failed_to_save_record" });
  }
});

// ---------- Upload (multipart form, field 'file') ----------
const upload = multer({ storage: multer.memoryStorage() });

app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "file_required" });

    const { originalname, buffer } = req.file;

    // Encrypt the uploaded file
    const { encrypted, key, iv, tag } = encryptBuffer(buffer);
    const encName = `${originalname}.enc`;

    // Combine encrypted data and tag
    const payload = Buffer.concat([encrypted, Buffer.from(tag, "hex")]);

    // Upload to Pinata (IPFS)
    const pin = await pinToIPFS(payload, encName, PINATA_JWT);
    if (!pin.cid) throw new Error("Pinata did not return a CID");

    // Save metadata to MongoDB
    let saved = null;
    if (MONGO_URI) {
      saved = await Record.create({
        name: originalname,
        note: "Encrypted upload",
        cid: pin.cid,
        key,
        iv,
      });
    }

    return res.json({
      ok: true,
      cid: pin.cid,
      gateway: `https://gateway.pinata.cloud/ipfs/${pin.cid}`,
      id: saved?._id || null,
    });
  } catch (err) {
    console.error("POST /upload error:", err);
    res.status(500).json({ error: "upload_failed", details: err.message });
  }
});

// ---------- Root + 404 ----------
app.get("/", (_req, res) => res.send("🚀 MediBlock Backend (Phase-2B Simulated Blockchain)"));
app.use((req, res) =>
  res.status(404).json({ error: "Not found", path: req.path })
);

// ---------- Start Server ----------
app.listen(PORT, () => {
  console.log(`🚀 Backend running on 0.0.0.0:${PORT}`);
});
