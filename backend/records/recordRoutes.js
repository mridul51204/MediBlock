// backend/records/recordRoutes.js
import express from "express";
import crypto from "crypto";
import Record from "../models/Record.js";

const router = express.Router();

// Simulate blockchain transaction
router.post("/simulate", async (req, res) => {
  try {
    const { name, note, cid } = req.body;
    if (!name || !cid) return res.status(400).json({ error: "Missing name or CID" });

    const fakeTxHash = "0x" + crypto.randomBytes(32).toString("hex");
    const timestamp = new Date().toISOString();

    const newRecord = await Record.create({
      name,
      note,
      cid,
      txHash: fakeTxHash,
      createdAt: timestamp,
    });

    res.json({
      success: true,
      message: "Simulated blockchain record created",
      record: newRecord,
    });
  } catch (err) {
    console.error("Simulate error:", err.message);
    res.status(500).json({ error: "failed_to_save_record" });
  }
});

// Get all stored records
router.get("/", async (_req, res) => {
  try {
    const records = await Record.find().sort({ createdAt: -1 });
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: "fetch_failed", details: err.message });
  }
});

export default router;
