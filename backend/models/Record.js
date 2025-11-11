// backend/models/Record.js
import mongoose from "mongoose";

const RecordSchema = new mongoose.Schema({
  name: { type: String, required: true },
  note: { type: String },
  cid: { type: String },
  key: { type: String },
  iv: { type: String },
  txHash: { type: String },            // simulated or real blockchain tx
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Record", RecordSchema);
