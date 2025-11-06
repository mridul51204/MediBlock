import express from "express";
import cors from "cors";
import multer from "multer";
import morgan from "morgan";

const app = express();
const PORT = process.env.PORT || 4000;

// basic middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "5mb" }));
app.use(morgan("dev"));

// in-memory store for demo (we'll add MongoDB next)
const records = [];

app.get("/health", (_req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

app.get("/records", (_req, res) => {
  const sorted = [...records].sort((a, b) => b.createdAt - a.createdAt);
  res.json(sorted);
});

app.post("/records", (req, res) => {
  const { name, note } = req.body || {};
  if (!name || typeof name !== "string") {
    return res.status(400).json({ error: "name is required" });
  }
  const rec = {
    id: String(Date.now()),
    name,
    note: note || "",
    createdAt: Date.now()
  };
  records.push(rec);
  res.status(201).json(rec);
});

const upload = multer({ storage: multer.memoryStorage() });
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "file is required" });
  // Next step: pin to IPFS. For now, just echo metadata.
  res.json({
    filename: req.file.originalname,
    size: req.file.size,
    mimetype: req.file.mimetype
  });
});

app.get("/", (_req, res) => res.send("MediBlock backend alive"));
app.use((req, res) => res.status(404).json({ error: "Not found", path: req.path }));

app.listen(PORT, () => {
  console.log(`Backend running on :${PORT}`);
});
