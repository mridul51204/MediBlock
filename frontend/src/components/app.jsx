// Centralized backend API functions
const API_BASE_URL = "https://mediblock-backend.onrender.com"; // your Render backend URL

// 1️⃣ Upload file to backend (Pinata + encryption)
export async function uploadFile(file) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_BASE_URL}/upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("File upload failed");
  return res.json();
}

// 2️⃣ Simulate blockchain record (Phase 2)
export async function simulateBlockchainRecord(name, cid) {
  const res = await fetch(`${API_BASE_URL}/records/simulate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      note: "Blockchain record after upload",
      cid,
    }),
  });

  if (!res.ok) throw new Error("Blockchain record simulation failed");
  return res.json();
}

// 3️⃣ Fetch all records (for dashboard / history display)
export async function getRecords() {
  const res = await fetch(`${API_BASE_URL}/records`);
  if (!res.ok) throw new Error("Failed to fetch records");
  return res.json();
}
