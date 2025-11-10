import React, { useState, useEffect } from "react";
import { uploadFile, getRecords } from "../api";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  // fetch existing records when component mounts
  useEffect(() => {
    getRecords().then(setRecords);
  }, []);

  async function handleUpload(e) {
    e.preventDefault();
    if (!file) return alert("Please select a file first!");
    setLoading(true);

    try {
      const res = await uploadFile(file);
      alert(`✅ Uploaded to IPFS!\nCID: ${res.cid}`);
      setRecords((prev) => [res, ...prev]);
    } catch (err) {
      console.error(err);
      alert("❌ Upload failed. Check console for details.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 max-w-xl mx-auto text-center">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">
        MediBlock File Upload
      </h2>

      <form onSubmit={handleUpload}>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-4 border p-2 w-full rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>

      <h3 className="mt-6 text-lg font-semibold">Uploaded Records</h3>
      <ul className="text-left mt-2">
        {records.map((r, i) => (
          <li key={i} className="border-b py-2">
            <b>{r.name}</b>
            <br />
            <a
              href={`https://gateway.pinata.cloud/ipfs/${r.cid}`}
              target="_blank"
              rel="noreferrer"
              className="text-blue-500 underline"
            >
              View Encrypted File
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
