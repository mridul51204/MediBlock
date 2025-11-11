import mongoose from "mongoose";

const recordSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true }, // NEW
    name: { type: String, required: true },
    note: { type: String },
    cid: { type: String },
    key: { type: String },
    iv: { type: String },
    txHash: { type: String }, // for real/simulated blockchain
  },
  { timestamps: true }
);

export default mongoose.model("Record", recordSchema);
