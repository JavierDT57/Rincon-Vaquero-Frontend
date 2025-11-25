// src/api/users.js
import { apiUrl } from "./config";

/**
 * Helper principal para peticiones JSON con cookies (JWT en cookie httpOnly)
 */
async function request(
  path,
  { method = "GET", body, headers = {}, query } = {}
) {
  // URL completa tipo: https://api.rinconvaquero.org/api/users/...
  const url = new URL(apiUrl(path), window.location.href);

  if (query) {
    Object.entries(query).forEach(([k, v]) => {
      if (v != null) url.searchParams.append(k, String(v));
    });
  }

  const init = {
    method,
    mode: "cors",
    credentials: "include", // importante para manejar la cookie
    headers: {
      Accept: "application/json",
      ...headers,
    },
  };

  if (body !== undefined) {
    init.headers["Content-Type"] = "application/json";
    init.body = JSON.stringify(body);
  }

  const res = await fetch(url.toString(), init);

  let data = null;
  try {
    data = await res.json();
  } catch (_) {
    data = null;
  }

  if (!res.ok) {
    const msg =
      (data && (data.mensaje || data.error || data.message)) ||
      `Error ${res.status}`;
    throw new Error(msg);
  }

  return data?.data ?? data;
}

/**
 * Helper para endpoints tipo POST directo sin necesidad de `apiUrl` manual.
 */
async function jsonPost(path, body) {
  const url = apiUrl(path);

  const res = await fetch(url, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const msg = data?.message || data?.error || "Error en la petición";
    throw new Error(msg);
  }

  return data;
}

/* -------------------------------------------------------------------------- */
/*                                  AUTH                                      */
/* -------------------------------------------------------------------------- */

export function registerUser(payload) {
  return request("/users/register", { method: "POST", body: payload });
}

export function loginUser(payload) {
  return request("/users/login", { method: "POST", body: payload });
}

export function logoutUser() {
  return request("/users/logout", { method: "POST" });
}

export function me() {
  return request("/users/me");
}

/* ------------------------- Password Reset Flow ----------------------------- */

export function requestPasswordReset({ email }) {
  return jsonPost("/users/recover/request", { email });
}

export function verifyPasswordToken({ email, token }) {
  return jsonPost("/users/recover/verify", { email, token });
}

export function confirmPasswordReset({
  email,
  token,
  newPassword,
  confirmPassword,
}) {
  return jsonPost("/users/recover/confirm", {
    email,
    token,
    newPassword,
    confirmPassword,
  });
}

/* -------------------------------------------------------------------------- */
/*                         ADMIN: Gestión de usuarios                         */
/* -------------------------------------------------------------------------- */

export function fetchUsers() {
  return request("/users");
}

export function fetchUserById(id) {
  return request(`/users/${id}`);
}

export function updateUser(id, { nombre, apellidos }) {
  return request(`/users/${id}`, {
    method: "PUT",
    body: { nombre, apellidos },
  });
}

export function suspendUser(id) {
  return request(`/users/${id}`, { method: "DELETE" });
}

export function deleteUserHard(id) {
  return request(`/users/${id}?hard=true`, { method: "DELETE" });
}
