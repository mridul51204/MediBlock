// frontend/src/components/app.jsx
const API_BASE = "https://mediblock-backend.onrender.com";

// ===== Auth helpers =====
export async function registerUser(name, email, password, role = "patient") {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password, role }),
  });
  if (!res.ok) throw new Error("Registration failed");
  const data = await res.json();
  localStorage.setItem("token", data.token);
  return data;
}

export async function loginUser(email, password) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error("Login failed");
  const data = await res.json();
  localStorage.setItem("token", data.token);
  return data;
}

export function logoutUser() {
  localStorage.removeItem("token");
}

export function authHeader() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// ===== Upload / Records =====
export async function uploadFile(file) {
  const form = new FormData();
  form.append("file", file);
  const res = await fetch(`${API_BASE}/upload`, {
    method: "POST",
    headers: { ...authHeader() },
    body: form,
  });
  if (!res.ok) throw new Error("Upload failed");
  return res.json();
}

export async function simulateBlockchainRecord(name, cid) {
  const res = await fetch(`${API_BASE}/records/simulate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
    },
    body: JSON.stringify({ name, note: "Blockchain record", cid }),
  });
  if (!res.ok) throw new Error("Simulation failed");
  return res.json();
}

export async function getRecords() {
  const res = await fetch(`${API_BASE}/records`, {
    headers: { ...authHeader() },
  });
  if (!res.ok) throw new Error("Fetch failed");
  return res.json();
}
