// src/api/avisos.js
// Base declarada (tu caso): VITE_API_BASE=http://localhost:5000
// Si no hay env, usa window.location.origin
const RAW = (import.meta.env.VITE_API_BASE || window.location.origin).replace(/\/$/, "");

// Parseamos para separar origen y path base
const urlObj = new URL(RAW);
const ORIGIN = `${urlObj.protocol}//${urlObj.host}`;
const BASE_PATH = urlObj.pathname.replace(/\/$/, ""); // p.ej: "" | "/api" | "/api/v1"

// Si la base YA tiene /api o /api/v1, probamos solo esa.
// Si no, probamos "", "/api", "/api/v1" automáticamente.
const CANDIDATE_PREFIXES =
  BASE_PATH && BASE_PATH !== "/"
    ? [BASE_PATH]
    : ["", "/api", "/api/v1"];

let RESOLVED_PREFIX = null;

async function tryRequest(path, init = {}) {
  const prefixes = RESOLVED_PREFIX ? [RESOLVED_PREFIX] : CANDIDATE_PREFIXES;
  let lastErr;

  for (const pref of prefixes) {
    const url = `${ORIGIN}${pref}${path.startsWith("/") ? "" : "/"}${path}`;
    try {
      // Nota: agrega credentials si usas cookies/sesiones
      const res = await fetch(url, { ...init /*, credentials: "include" */ });
      // Si no es 404, cacheamos y usamos ese prefijo de ahora en adelante
      if (res.status !== 404) {
        RESOLVED_PREFIX = pref;
        console.debug("[avisos] OK", res.status, url);
        return res;
      }
      console.warn("[avisos] 404", url);
      lastErr = new Error(`404 ${url}`);
    } catch (e) {
      console.error("[avisos] red", url, e);
      lastErr = e;
    }
  }
  throw lastErr || new Error("No se encontró un endpoint válido para /avisos");
}

async function handle(res) {
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(body || `HTTP ${res.status} en ${res.url}`);
  }
  try { return await res.json(); } catch { return { ok: true }; }
}

/** GET /avisos */
export async function fetchAvisos() {
  const res = await tryRequest("/avisos");
  return handle(res);
}

/** POST /avisos (imagen opcional) */
export async function createAviso({ titulo, texto, imagen = null }) {
  const fd = new FormData();
  fd.append("titulo", titulo);
  fd.append("texto", texto);
  if (imagen instanceof File) fd.append("imagen", imagen); // ← nombre común en multer.single('imagen')
  // si tu backend espera OTRO nombre (p.ej. 'imagenurl'), cámbialo AQUÍ.

  const res = await tryRequest("/avisos", { method: "POST", body: fd });
  return handle(res);
}

// Opcionales
export async function updateAviso(id, payload) {
  const res = await tryRequest(`/avisos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handle(res);
}
export async function deleteAviso(id) {
  const res = await tryRequest(`/avisos/${id}`, { method: "DELETE" });
  return handle(res);
}
