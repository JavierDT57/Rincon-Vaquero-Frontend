// src/api/testimonios.js
import { apiUrl, absUrl } from "./config";


/**
 * Helper fetch con credenciales + JSON auto
 */
async function http(path, opts = {}) {
  const url = apiUrl(path);
  
  const init = {
    credentials: "include",
    ...opts,
  };

  if (!(init.body instanceof FormData)) {
    init.headers = { 
      Accept: "application/json",
      ...(init.headers || {}) 
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
/*                                    GET                                     */
/* -------------------------------------------------------------------------- */

export async function fetchTestimonios() {
  return http("/testimonios");
}

/* -------------------------------------------------------------------------- */
/*                                   CREATE                                   */
/* -------------------------------------------------------------------------- */

export async function createTestimonio({
  comentario,
  localidad,
  nombre,
  rating = 5,
  imagenFile = null,
  imgurl = "",
}) {
  const r = Math.max(1, Math.min(5, Number(rating) || 5));

  // Si hay archivo -> usar FormData
  if (imagenFile instanceof File) {
    const fd = new FormData();
    fd.append("comentario", comentario);
    fd.append("localidad", localidad || "");
    fd.append("nombre", nombre || "");
    fd.append("rating", String(r));
    fd.append("imagenurl", imagenFile); 
    return http("/testimonios", { method: "POST", body: fd });
  }

  // Si NO hay archivo -> JSON
  const payload = { comentario, localidad, nombre, rating: r };
  if (imgurl) {
    payload.imagenurl = imgurl;
    payload.imgurl = imgurl;
  }

  return http("/testimonios", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

/* -------------------------------------------------------------------------- */
/*                                   UPDATE                                   */
/* -------------------------------------------------------------------------- */

export async function updateTestimonio(
  id,
  { comentario, localidad, nombre, rating, imagenFile = null, imgurl = "" }
) {

  // Si se envía un archivo -> FormData
  const fd = new FormData();
  if (comentario != null) fd.append("comentario", comentario);
  if (localidad != null) fd.append("localidad", localidad);
  if (nombre != null) fd.append("nombre", nombre);
  if (rating != null) fd.append("rating", String(rating));

  if (imagenFile instanceof File) {
    fd.append("imagenurl", imagenFile);
  } else if (imgurl) {
    fd.append("imagenurl", imgurl);
  }

  return http(`/testimonios/${id}`, { method: "PUT", body: fd });
}

/* -------------------------------------------------------------------------- */
/*                                   DELETE                                   */
/* -------------------------------------------------------------------------- */

export async function deleteTestimonio(id) {
  return http(`/testimonios/${id}`, { method: "DELETE" });
}
