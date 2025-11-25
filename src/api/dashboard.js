// src/api/dashboard.js
import { apiUrl } from "./config";

export async function getDashboardComputed() {
  // URL final: https://api.rinconvaquero.org/api/dashboard/computed
  const url = apiUrl("/dashboard/computed");

  const res = await fetch(url, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  const ct = res.headers.get("content-type") || "";
  const raw = await res.text(); // solo una lectura

  // Si Render envía HTML → error (ej. 404 → index.html)
  if (!ct.includes("application/json")) {
    throw new Error(
      `No-JSON (${res.status}) desde ${url}: ${raw.slice(0, 200)}...`
    );
  }

  let json;
  try {
    json = JSON.parse(raw);
  } catch (e) {
    throw new Error(`JSON inválido al parsear /dashboard/computed: ${String(e)}`);
  }

  if (!json.ok) {
    throw new Error(json.error || "Error desconocido en /dashboard/computed");
  }

  return json.data; // { charts, derivados, porcentajes, textos }
}
