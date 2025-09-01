// src/api/users.js
const API_BASE =
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_BASE) ||
  (typeof process !== 'undefined' && process.env && process.env.REACT_APP_API_BASE) ||
  '';

const BASE = API_BASE ? API_BASE.replace(/\/$/, '') : '';

async function request(path, { method = 'GET', body, headers = {} } = {}) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json', ...headers },
    body: body ? JSON.stringify(body) : undefined,
  });

  let data = null;
  try { data = await res.json(); } catch (_) {}

  if (!res.ok) {
    const msg = (data && (data.mensaje || data.error)) || `Error ${res.status}`;
    throw new Error(msg);
  }
  return data;
}

export function registerUser(payload) {
  return request('/api/users/register', { method: 'POST', body: payload });
}

export function loginUser(payload) {
  return request('/api/users/login', { method: 'POST', body: payload });
}

export function recoverPassword(payload) {
  return request('/api/users/recover-password', { method: 'POST', body: payload });
}

export function createAdmin(payload) {
  return request('/api/users/create-admin', { method: 'POST', body: payload });
}
