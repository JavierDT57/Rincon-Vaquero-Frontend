// src/api/users.js
const RAW_BASE =
  (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_API_BASE) ||
  (typeof process !== "undefined" && process.env && process.env.REACT_APP_API_BASE) ||
  ""; // usa proxy si está vacío

function joinUrl(base, path) {
  if (!base) return path;
  const b = String(base).replace(/\/+$/, "");
  const p = String(path).startsWith("/") ? path : `/${path}`;
  if (b.endsWith("/api") && p.startsWith("/api")) return b + p.replace(/^\/api/, "");
  return b + p;
}

async function request(path, { method = "GET", body, headers = {}, query } = {}) {
  const url = new URL(joinUrl(RAW_BASE, path), window.location.href);
  if (query) Object.entries(query).forEach(([k, v]) => v != null && url.searchParams.append(k, String(v)));

  const init = {
    method,
    mode: "cors",
    credentials: "include",            
    headers: { Accept: "application/json", ...headers },
  };
  if (body !== undefined) {
    init.headers["Content-Type"] = "application/json";
    init.body = JSON.stringify(body);
  }

  const res = await fetch(url.toString(), init);

  let data = null;
  try { data = await res.json(); } catch {}

  if (!res.ok) {
    const msg = (data && (data.mensaje || data.error || data.message)) || `Error ${res.status}`;
    throw new Error(msg);
  }
  return data && Object.prototype.hasOwnProperty.call(data, "data") ? data.data : data;
}

/* --------- AUTH */
export function registerUser(payload) {
  return request("/api/users/register", { method: "POST", body: payload });
}
export function loginUser(payload) {
  return request("/api/users/login", { method: "POST", body: payload });
}
export function recoverPassword(payload) {
  return request("/api/users/recover-password", { method: "POST", body: payload });
}
export function createAdmin(payload) {
  return request("/api/users/create-admin", { method: "POST", body: payload });
}
export function logoutUser() {
  return request("/api/users/logout", { method: "POST" });
}
export function me() {
  return request("/api/users/me", { method: "GET" });
}

/* --------- ADMIN: usuarios --------- */
export function fetchUsers() {
  return request("/api/users");
}
export function fetchUserById(id) {
  return request(`/api/users/${id}`);
}
export function updateUser(id, { nombre, apellidos }) {
  return request(`/api/users/${id}`, { method: "PUT", body: { nombre, apellidos } });
}
export function suspendUser(id) {
  return request(`/api/users/${id}`, { method: "DELETE" });
}
export function deleteUserHard(id) {
  return request(`/api/users/${id}?hard=true`, { method: "DELETE" });
}
