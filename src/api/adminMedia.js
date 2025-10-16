// src/api/adminMedia.js
export const API_BASE =
  import.meta?.env?.VITE_API_BASE || "http://localhost:5000/api";

// origen sin /api  -> p.ej. http://localhost:5000
export const API_ORIGIN = (() => {
  try { return new URL(API_BASE).origin; }
  catch { return API_BASE.replace(/\/api.*$/,""); }
})();

/** Convierte path relativo (/uploads/...) a URL absoluta del backend */
export function absUrl(p) {
  if (!p) return null;
  if (/^(https?:)?\/\//i.test(p)) return p;          // ya es absoluta
  return `${API_ORIGIN}${p.startsWith("/") ? p : `/${p}`}`;
}

/** Normaliza un AVISO para que traiga .imgSrc listo para <img> */
export function normalizeAviso(raw = {}) {
  const img = raw.imgurl ?? raw.imagen ?? raw.image_url ?? raw.img_url ?? null;
  return { ...raw, imgSrc: absUrl(img) };
}

/** Normaliza un TESTIMONIO para que traiga .imgSrc listo para <img> */
export function normalizeTestimonio(raw = {}) {
  const img = raw.imagenurl ?? raw.imagen_url ?? raw.img_url ?? raw.imageUrl ?? null;
  return { ...raw, imgSrc: absUrl(img) };
}
