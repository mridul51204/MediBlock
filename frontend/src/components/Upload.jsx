import React, { useState } from "react";
import { uploadFile, simulateBlockchainRecord } from "./app"; // ✅ API functions centralized in app.jsx

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
      // Step 1️⃣ Upload encrypted file via backend
      const uploadData = await uploadFile(file);
      setCid(uploadData.cid);
      setStatus("✅ File uploaded successfully. Simulating blockchain...");

      // Step 2️⃣ Register simulated blockchain record
      const simulateData = await simulateBlockchainRecord(file.name, uploadData.cid);
      setTxHash(simulateData.record.txHash);
      setStatus("✅ File recorded on blockchain!");
    } catch (err) {
      console.error(err);
      setStatus("❌ Upload failed: " + err.message);
    }
  };

  return (
    <div
      style={{
        padding: "2rem",
        textAlign: "center",
        backgroundColor: "#f9fafb",
        borderRadius: "12px",
        maxWidth: "600px",
        margin: "2rem auto",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ color: "#1e3a8a", fontWeight: "600" }}>📁 Upload Medical Record</h2>

      <form onSubmit={handleUpload} style={{ marginTop: "1rem" }}>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
          style={{ marginBottom: "1rem" }}
        />
        <br />
        <button
          type="submit"
          style={{
            backgroundColor: "#2563eb",
            color: "white",
            padding: "0.6rem 1.5rem",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "500",
          }}
        >
          Upload
        </button>
      </form>

      {status && <p style={{ marginTop: "1rem" }}>{status}</p>}

      {cid && (
        <p>
          🌐 <strong>IPFS CID:</strong>{" "}
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
          🔗 <strong>TxHash:</strong> {txHash.slice(0, 20)}...
        </p>
      )}
    </div>
  );
};

export default Upload;
