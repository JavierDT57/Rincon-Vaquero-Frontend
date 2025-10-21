// src/api/testimonios.js
const RAW = (import.meta.env?.VITE_API_BASE?.trim() || (typeof window !== "undefined" ? window.location.origin : "")).replace(/\/$/, "");
let API_BASE = /\/api$/i.test(RAW) ? RAW : RAW + "/api";

// Origin útil para construir URLs absolutas 
export const API_ORIGIN = (() => {
  try { return new URL(API_BASE, window.location.href).origin; } catch { return ""; }
})();

// Helper fetch con credenciales
async function http(path, opts = {}) {
  const url = API_BASE + (path.startsWith("/") ? path : "/" + path);
  const init = { credentials: "include", ...opts };
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

// GET /testimonios
export async function fetchTestimonios() {
  return http("/testimonios");
}

// POST /testimonios  (archivo opcional)
export async function createTestimonio({ comentario, localidad, nombre, rating = 5, imagenFile = null, imgurl = "" }) {
  const r = Math.max(1, Math.min(5, parseInt(rating, 10) || 5));

 
  if (imagenFile instanceof File) {
    const fd = new FormData();
    fd.append("comentario", comentario);
    fd.append("localidad", localidad || "");
    fd.append("nombre", nombre || "");
    fd.append("rating", String(r));
    fd.append("imagenurl", imagenFile); 
    return http("/testimonios", { method: "POST", body: fd });
  }

 
  const payload = { comentario, localidad, nombre, rating: r };
  if (imgurl) { payload.imagenurl = imgurl; payload.imgurl = imgurl; }
  return http("/testimonios", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

// PUT /testimonios/:id (solo admin)
export async function updateTestimonio(id, { comentario, localidad, nombre, rating, imagenFile = null, imgurl = "" }) {
  // FormData para cambio de imagen
  const fd = new FormData();
  if (comentario != null) fd.append("comentario", comentario);
  if (localidad != null) fd.append("localidad", localidad);
  if (nombre != null) fd.append("nombre", nombre);
  if (rating != null) fd.append("rating", String(rating));
  if (imagenFile instanceof File) fd.append("imagenurl", imagenFile);
  if (imgurl) fd.append("imagenurl", imgurl);
  return http(`/testimonios/${id}`, { method: "PUT", body: fd });
}

// DELETE /testimonios/:id (solo admin)
export async function deleteTestimonio(id) {
  return http(`/testimonios/${id}`, { method: "DELETE" });
}
