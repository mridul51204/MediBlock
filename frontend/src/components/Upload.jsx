import React, { useState } from "react";
import { uploadFile, simulateBlockchainRecord } from "./app"; // ✅ import your centralized API

const Upload = () => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [cid, setCid] = useState("");
  const [txHash, setTxHash] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a file first!");

    setStatus("⏳ Uploading file...");

    try {
      // Step 1: Upload encrypted file to IPFS via backend
      const uploadData = await uploadFile(file);
      setCid(uploadData.cid);
      setStatus("✅ File uploaded, simulating blockchain...");

      // Step 2: Simulate blockchain entry
      const simulateData = await simulateBlockchainRecord(file.name, uploadData.cid);
      setTxHash(simulateData.record.txHash);
      setStatus("✅ Upload recorded on blockchain!");
    } catch (err) {
      setStatus("❌ Error: " + err.message);
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>📁 Upload Medical Report</h2>
      <form onSubmit={handleUpload}>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit">Upload</button>
      </form>
      {status && <p>{status}</p>}
      {cid && (
        <p>
          🌐 CID:{" "}
          <a
            href={`https://gateway.pinata.cloud/ipfs/${cid}`}
            target="_blank"
            rel="noreferrer"
          >
            {cid.slice(0, 30)}...
          </a>
        </p>
      )}
      {txHash && (
        <p>
          🔗 TxHash: {txHash.slice(0, 20)}...
        </p>
      )}
    </div>
  );
};

export default Upload;
