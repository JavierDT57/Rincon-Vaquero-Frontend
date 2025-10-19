export async function getDashboardComputed() {
  const base = import.meta.env?.VITE_API_BASE || "";
  const url = `${base}/api/dashboard/computed`;

  const res = await fetch(url, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  const ct = res.headers.get("content-type") || "";
  const raw = await res.text();             // lee una sola vez

  if (!ct.includes("application/json")) {
    // ← Aquí verás si está llegando HTML (index.html/404)
    throw new Error(`No-JSON (${res.status}) desde ${url}: ${raw.slice(0,200)}...`);
  }

  let json;
  try { json = JSON.parse(raw); }
  catch (e) { throw new Error(`JSON inválido: ${String(e)}`); }

  if (!json.ok) throw new Error(json.error || "Error en API");
  return json.data; // { charts, derivados, porcentajes, textos }
}
