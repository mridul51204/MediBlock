import React, { useEffect, useState } from "react";
import { getRecords } from "../../components/app"; // centralized API

const History = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const data = await getRecords();
        setRecords(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load records");
      } finally {
        setLoading(false);
      }
    };
    fetchRecords();
  }, []);

  if (loading) return <p style={{ textAlign: "center" }}>⏳ Loading records...</p>;
  if (error) return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;

  return (
    <div
      style={{
        padding: "2rem",
        maxWidth: "900px",
        margin: "0 auto",
        backgroundColor: "#f9fafb",
        borderRadius: "12px",
      }}
    >
      <h2 style={{ textAlign: "center", color: "#1e3a8a" }}>📜 Uploaded Record History</h2>

      {records.length === 0 ? (
        <p style={{ textAlign: "center", marginTop: "1rem" }}>
          No records uploaded yet.
        </p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "1.5rem",
            fontSize: "0.95rem",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#2563eb", color: "white" }}>
              <th style={cellStyle}>Name</th>
              <th style={cellStyle}>Note</th>
              <th style={cellStyle}>CID</th>
              <th style={cellStyle}>TxHash</th>
              <th style={cellStyle}>Uploaded</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r) => (
              <tr key={r._id} style={{ borderBottom: "1px solid #e5e7eb" }}>
                <td style={cellStyle}>{r.name}</td>
                <td style={cellStyle}>{r.note || "-"}</td>
                <td style={cellStyle}>
                  {r.cid ? (
                    <a
                      href={`https://gateway.pinata.cloud/ipfs/${r.cid}`}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: "#2563eb" }}
                    >
                      {r.cid.slice(0, 15)}...
                    </a>
                  ) : (
                    "-"
                  )}
                </td>
                <td style={cellStyle}>
                  {r.txHash ? `${r.txHash.slice(0, 15)}...` : "-"}
                </td>
                <td style={cellStyle}>
                  {new Date(r.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

// Shared table cell style
const cellStyle = {
  padding: "0.6rem 0.8rem",
  textAlign: "center",
};

export default History;
