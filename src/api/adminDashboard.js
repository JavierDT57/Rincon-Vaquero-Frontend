// src/api/adminDashboard.js
import { apiUrl } from "./config";

/**
 * Helper para peticiones JSON con cookies
 */
async function req(
  pathUnderApi,
  { method = "GET", body, headers = {} } = {}
) {
  // Construimos la URL final:
  // apiUrl("/dashboard") → http://localhost:5000/api/dashboard
  // apiUrl("/dashboard") → https://api.rinconvaquero.org/api/dashboard
  const url = apiUrl(pathUnderApi);

  const res = await fetch(url, {
    method,
    credentials: "include",
    headers: {
      Accept: "application/json",
      ...(body ? { "Content-Type": "application/json" } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const ct = res.headers.get("content-type") || "";
  const raw = await res.text();
  let data = null;

  // Intentar JSON si corresponde
  if (ct.includes("application/json")) {
    try {
      data = JSON.parse(raw);
    } catch {
      /* ignore */
    }
  }

  // Manejo de error
  if (!res.ok) {
    const msg =
      (data && (data.message || data.error)) || raw || `HTTP ${res.status}`;
    throw new Error(msg);
  }

  // El backend puede responder { ok, data } o un array directamente
  return data && Object.prototype.hasOwnProperty.call(data, "data")
    ? data.data
    : data ?? raw;
}

/**
 * GET /api/dashboard
 * Devuelve todos los items del dashboard
 */
export function fetchDashboard() {
  return req("/dashboard");
}

/**
 * PUT /api/dashboard/:slug
 * Body: { value }
 */
export function updateDashboardItem(slug, value) {
  if (!slug) throw new Error("slug requerido");

  const num =
    typeof value === "string" && value.trim() !== ""
      ? Number(value)
      : value;

  const payload = Number.isFinite(num) ? { value: num } : { value };

  return req(`/dashboard/${encodeURIComponent(slug)}`, {
    method: "PUT",
    body: payload,
  });
}
