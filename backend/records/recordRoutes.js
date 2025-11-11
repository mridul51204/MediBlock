// backend/routes/recordRoutes.js
const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const Record = require("../models/Record");

// ✅ Simulate blockchain transaction logging
router.post("/simulate", async (req, res) => {
  try {
    const { name, note, cid } = req.body;
    if (!name || !cid) {
      return res.status(400).json({ error: "Missing name or CID" });
    }

    // Generate fake blockchain transaction hash
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
      message: "Simulated blockchain record created successfully",
      record: newRecord,
    });
  } catch (err) {
    console.error("Simulate error:", err);
    res.status(500).json({ error: "failed_to_save_record" });
  }
});

// ✅ Get all stored records
router.get("/", async (req, res) => {
  try {
    const records = await Record.find().sort({ createdAt: -1 });
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: "fetch_failed", details: err.message });
  }
});

module.exports = router;
