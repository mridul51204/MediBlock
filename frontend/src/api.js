// ✅ Central API setup
const API_BASE_URL = "https://mediblock-backend.onrender.com"; // your Render link

export async function uploadFile(file) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_BASE_URL}/upload`, {
    method: "POST",
    body: formData,
  });
  return res.json();
}

export async function getRecords() {
  const res = await fetch(`${API_BASE_URL}/records`);
  return res.json();
}

export async function addRecord(data) {
  const res = await fetch(`${API_BASE_URL}/records`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}
