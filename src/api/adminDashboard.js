// API para el panel admin (listar y actualizar stats del dashboard)

const VITE = (typeof import.meta !== "undefined" && import.meta.env) || {};
const RAW_BASE = (VITE.VITE_API_BASE || "").trim(); 


const BASE = RAW_BASE.replace(/\/$/, "");                 
const BASE_HAS_API = /\/api$/i.test(BASE);                

function buildUrl(pathUnderApi) {

  const prefix = BASE_HAS_API ? "" : "/api";
  const origin = BASE || ""; 
  return `${origin}${prefix}${pathUnderApi}`;
}

async function req(pathUnderApi, { method = "GET", body, headers = {} } = {}) {
  const url = buildUrl(pathUnderApi);

  const res = await fetch(url, {
    method,
    credentials: "include", // usa la cookie del login
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

  if (ct.includes("application/json")) {
    try { data = JSON.parse(raw); } catch { /* noop */ }
  }

  if (!res.ok) {
    const msg = (data && (data.message || data.error)) || raw || `HTTP ${res.status}`;
    throw new Error(msg);
  }


  return data && Object.prototype.hasOwnProperty.call(data, "data") ? data.data : (data ?? raw);
}

/** GET /api/dashboard  
export function fetchDashboard() {
  return req("/dashboard");
}

/** PUT /api/dashboard/ */
export function updateDashboardItem(slug, value) {
  if (!slug) throw new Error("slug requerido");
  const vNum = typeof value === "string" && value.trim() !== "" ? Number(value) : value;
  const payload = Number.isFinite(vNum) ? { value: vNum } : { value };
  return req(`/dashboard/${encodeURIComponent(slug)}`, {
    method: "PUT",
    body: payload,
  });
}
