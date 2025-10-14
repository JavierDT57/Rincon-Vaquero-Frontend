// src/api/testimonios.js
const RAW =
  (typeof import.meta !== "undefined" &&
    import.meta.env &&
    import.meta.env.VITE_API_BASE?.trim()) ||
  (typeof window !== "undefined" ? `${window.location.origin}/api` : "/api");

// Asegura que termine en /api
let API_BASE = String(RAW).replace(/\/$/, "");
if (!/\/api$/i.test(API_BASE)) API_BASE = `${API_BASE}/api`;

// Origin útil para construir URLs absolutas
const API_ORIGIN = (() => {
  try { return new URL(API_BASE, window.location.href).origin; } catch { return ""; }
})();

async function http(path, opts = {}) {
  const url = `${API_BASE}${path}`;
  const res = await fetch(url, opts);
  const ct = res.headers.get("content-type") || "";
  const data = ct.includes("application/json")
    ? await res.json().catch(() => null)
    : await res.text().catch(() => null);
  if (!res.ok) {
    const msg = (data && (data.message || data.error)) || `Error ${res.status} en ${url}`;
    const err = new Error(msg);
    err.status = res.status; err.data = data;
    throw err;
  }
  return data;
}

export function fetchTestimonios() {
  return http("/testimonios", { method: "GET" });
}

// POST con archivo en el campo **imagenurl** (como tu Postman)
export function createTestimonio({ comentario, localidad, nombre, rating, imagenFile, imgurl } = {}) {
  const r = Math.max(1, Math.min(5, parseInt(rating ?? 5, 10) || 5));

  if (imagenFile instanceof File) {
    const fd = new FormData();
    if (comentario != null) fd.append("comentario", comentario);
    if (localidad != null) fd.append("localidad", localidad);
    if (nombre != null)     fd.append("nombre", nombre);
    fd.append("rating", String(r));
    if (imagenFile)         fd.append("imagenurl", imagenFile); // ← nombre exacto del backend
    return http("/testimonios", { method: "POST", body: fd });
  }

  // Sin archivo: se permite mandar URL/string
  const payload = { comentario, localidad, nombre, rating: r };
  if (imgurl) { payload.imagenurl = imgurl; payload.imgurl = imgurl; }
  return http("/testimonios", {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export { API_ORIGIN };
