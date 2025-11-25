// src/api/avisos.js
import { apiUrl } from "./config";

/**
 * Helper fetch con cookies + manejo de JSON
 */
async function http(path, opts = {}) {
  const url = apiUrl(path); // → https://api.rinconvaquero.org/api/avisos
  const init = {
    credentials: "include",
    ...opts,
  };

  if (!(init.body instanceof FormData)) {
    init.headers = {
      Accept: "application/json",
      ...(init.headers || {}),
    };
  }

  const res = await fetch(url, init);
  const ct = res.headers.get("content-type") || "";

  const data = ct.includes("application/json")
    ? await res.json().catch(() => null)
    : await res.text().catch(() => null);

  if (!res.ok) {
    const msg =
      (data && (data.message || data.error)) ||
      `Error ${res.status} en ${url}`;
    const err = new Error(msg);
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return data;
}

/* -------------------------------------------------------------------------- */
/*                                  ENDPOINTS                                 */
/* -------------------------------------------------------------------------- */

/** GET /api/avisos */
export async function fetchAvisos() {
  return http("/avisos");
}

/** POST /api/avisos  (con archivo opcional) */
export async function createAviso({ titulo, texto, imagen = null }) {
  const fd = new FormData();
  fd.append("titulo", titulo);
  fd.append("texto", texto);

  if (imagen instanceof File) {
    fd.append("imagen", imagen); // multer.single("imagen")
  }

  return http("/avisos", {
    method: "POST",
    body: fd,
  });
}

/** PUT /api/avisos/:id */
export async function updateAviso(id, { titulo, texto, imagen = null }) {
  const fd = new FormData();
  if (titulo != null) fd.append("titulo", titulo);
  if (texto != null) fd.append("texto", texto);
  if (imagen instanceof File) fd.append("imagen", imagen);

  return http(`/avisos/${id}`, {
    method: "PUT",
    body: fd,
  });
}

/** DELETE /api/avisos/:id */
export async function deleteAviso(id) {
  return http(`/avisos/${id}`, { method: "DELETE" });
}
