const base =
  import.meta?.env?.VITE_API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:10000";

export const API = (p) => `${base}${p.startsWith("/") ? p : `/${p}`}`;

// examples:
export const listRecords = () => fetch(API("/records")).then(r => r.json());
export const createRecord = (data) =>
  fetch(API("/records"), { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
    .then(r => r.json());
export const uploadFile = (file) => {
  const fd = new FormData();
  fd.append("file", file);
  return fetch(API("/upload"), { method: "POST", body: fd }).then(r => r.json());
};
