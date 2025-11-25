// src/api/config.js

// Accedemos a las env de Vite de forma segura
const VITE = (typeof import.meta !== "undefined" && import.meta.env) || {};

/**
 * BACKEND BASE
 * - En dev:  .env.development -> VITE_API_BASE=http://localhost:5000
 * - En prod: Render env       -> VITE_API_BASE=https://api.rinconvaquero.org
 */
const RAW =
  (VITE.VITE_API_BASE && VITE.VITE_API_BASE.trim()) ||
  (typeof window !== "undefined" && window.location?.origin) ||
  "http://localhost:5000";

// Origen del backend SIN slash final, SIN /api
export const API_ORIGIN = String(RAW).replace(/\/+$/, "");

// Base para las rutas REST: https://api.rinconvaquero.org/api
export const API_BASE = `${API_ORIGIN}/api`;


export function apiUrl(path = "") {
  const p = String(path || "");
  if (!p) return API_BASE;
  return `${API_BASE}${p.startsWith("/") ? p : `/${p}`}`;
}


export function absUrl(p) {
  if (!p || typeof p !== "string") return null;
  if (/^(https?:)?\/\//i.test(p)) return p; // ya es absoluta
  const path = p.startsWith("/") ? p : `/${p}`;
  return `${API_ORIGIN}${path}`;
}
