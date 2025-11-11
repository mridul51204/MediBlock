import React, { useState } from "react";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [cid, setCid] = useState("");
  const [txHash, setTxHash] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    setStatus("⏳ Uploading file to MediBlock backend...");

    try {
      // 1️⃣ Upload encrypted file to IPFS via backend
      const formData = new FormData();
      formData.append("file", file);

      const uploadRes = await fetch(
        "https://mediblock-backend.onrender.com/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const uploadData = await uploadRes.json();
      if (!uploadRes.ok || !uploadData.cid)
        throw new Error("Upload failed: " + (uploadData.error || "unknown"));

      setCid(uploadData.cid);
      setStatus("✅ File uploaded! Registering on blockchain...");

      // 2️⃣ Simulate blockchain record
      const simulateRes = await fetch(
        "https://mediblock-backend.onrender.com/records/simulate",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: file.name,
            note: "Blockchain record after upload",
            cid: uploadData.cid,
          }),
        }
      );

      const simulateData = await simulateRes.json();
      if (!simulateRes.ok || !simulateData.success)
        throw new Error("Blockchain record failed");

      setTxHash(simulateData.record.txHash);
      setStatus("✅ Record stored on blockchain!");
    } catch (err) {
      console.error(err);
      setStatus("❌ Error: " + err.message);
    }
  };

  return (
    <div className="upload-container" style={{ padding: "2rem", textAlign: "center" }}>
      <h2>📁 Upload Medical Record</h2>

      <form onSubmit={handleUpload}>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
          style={{ marginTop: "1rem" }}
        />
        <br />
        <button
          type="submit"
          style={{
            marginTop: "1rem",
            padding: "0.6rem 1.2rem",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
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
          🔗 <strong>Blockchain TxHash:</strong> {txHash.slice(0, 20)}...
        </p>
      )}
    </div>
  );
};

export default Upload;
