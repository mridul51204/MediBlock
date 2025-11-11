import React, { useEffect, useState } from "react";
import { getRecords } from "../../components/app";

const DoctorDashboard = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    // later replace with API to get patient records
    const fetchData = async () => {
      try {
        const data = await getRecords();
        setRecords(data);
      } catch (err) {
        console.error("Fetch failed:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">
        👨‍⚕️ Doctor Dashboard
      </h1>
      <p className="text-gray-600 mb-8">
        View and access shared patient reports.
      </p>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-blue-700 text-white">
            <th className="p-2 border">Patient</th>
            <th className="p-2 border">File</th>
            <th className="p-2 border">Uploaded</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r) => (
            <tr key={r._id} className="text-center border">
              <td className="p-2">{r.userId || "Anonymous"}</td>
              <td className="p-2">
                <a
                  href={`https://gateway.pinata.cloud/ipfs/${r.cid}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline"
                >
                  {r.name}
                </a>
              </td>
              <td className="p-2">
                {new Date(r.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorDashboard;
