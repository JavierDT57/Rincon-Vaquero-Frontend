// src/api/avisos.js
const RAW = (import.meta.env?.VITE_API_BASE || window.location.origin).replace(/\/$/, "");
let API_BASE = /\/api$/i.test(RAW) ? RAW : RAW + "/api";

// Fetch helper con credenciales 
async function http(path, opts = {}) {
  const url = API_BASE + (path.startsWith("/") ? path : "/" + path);
  const init = {
    credentials: "include",
    ...opts,
  };
 
  if (!(init.body instanceof FormData)) {
    init.headers = { Accept: "application/json", ...(init.headers || {}) };
  }
  const res = await fetch(url, init);
  const ct = res.headers.get("content-type") || "";
  const data = ct.includes("application/json") ? await res.json().catch(() => null) : await res.text().catch(() => null);
  if (!res.ok) {
    const msg = (data && (data.message || data.error)) || `Error ${res.status} en ${url}`;
    const err = new Error(msg);
    err.status = res.status; err.data = data;
    throw err;
  }
  return data;
}

// GET /avisos
export async function fetchAvisos() {
  return http("/avisos");
}

// POST /avisos 
export async function createAviso({ titulo, texto, imagen = null }) {
  const fd = new FormData();
  fd.append("titulo", titulo);
  fd.append("texto", texto);
  if (imagen instanceof File) fd.append("imagen", imagen); // debe coincidir con multer.single('imagen')
  return http("/avisos", { method: "POST", body: fd });
}

// PUT /avisos/:id 
export async function updateAviso(id, { titulo, texto, imagen = null }) {
  
  const fd = new FormData();
  if (titulo != null) fd.append("titulo", titulo);
  if (texto != null) fd.append("texto", texto);
  if (imagen instanceof File) fd.append("imagen", imagen);
  return http(`/avisos/${id}`, { method: "PUT", body: fd });
}

// DELETE /avisos/:id
export async function deleteAviso(id) {
  return http(`/avisos/${id}`, { method: "DELETE" });
}
