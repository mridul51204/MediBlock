import mongoose from "mongoose";

const RecordSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    note: { type: String, default: "" },
    cid: { type: String, index: true },
    key: { type: String }, // hex (demo only)
    iv: { type: String }   // hex (demo only)
  },
  { timestamps: true }
);

export default mongoose.models.Record || mongoose.model("Record", RecordSchema);
