// src/api/tienda.js
import { apiUrl, absUrl } from "./config";

// Base para este módulo
const BASE_URL = apiUrl("/tienda");

/**
 * Wrapper con credenciales + manejo de errores
 */
async function authFetch(path, options = {}) {
  const url = `${BASE_URL}${path}`;
  const res = await fetch(url, {
    credentials: "include",
    ...options,
  });

  const text = await res.text();
  let data = null;

  try {
    data = text ? JSON.parse(text) : null;
  } catch (_) {
    data = null;
  }

  if (!res.ok) {
    const msg =
      (data && (data.error || data.message)) ||
      `Error ${res.status}`;
    const err = new Error(msg);
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return data;
}

/**
 * Normalizador de productos
 */
function normalizeProduct(raw) {
  if (!raw || typeof raw !== "object") return null;

  const imagenUrl =
    raw.imagenurl ??
    raw.imgurl ??
    raw.imagen ??
    raw.image ??
    null;

  return {
    id: raw.id ?? raw._id ?? null,
    userId: raw.userId ?? raw.usuarioId ?? null,
    owner: raw.owner ?? raw.usuarioNombre ?? "Vendedor",

    name: raw.nombre ?? raw.name ?? "",
    image: absUrl(imagenUrl),

    price: Number(raw.precio ?? raw.price ?? 0),
    category: raw.categoria ?? raw.category ?? "",
    stock: Number(raw.stock ?? raw.existencias ?? 0),
    location: raw.ubicacion ?? raw.location ?? "",

    telefono: raw.telefono ?? "",
    status: raw.status ?? raw.estado ?? "",
  };
}

/**
 * Convierte un producto a FormData para enviar archivos
 */
function productToFormData(product) {
  const fd = new FormData();

  fd.append("nombre", product.name ?? "");
  fd.append("precio", String(product.price ?? ""));
  fd.append("categoria", product.category ?? "");
  fd.append("stock", String(product.stock ?? ""));
  fd.append("ubicacion", product.location ?? "");

  if (product.telefono) {
    fd.append("telefono", product.telefono);
  }

  if (product.imageFile instanceof File) {
    fd.append("imagen", product.imageFile);
  }

  return fd;
}

/* -------------------------------------------------------------------------- */
/*                                 ENDPOINTS                                  */
/* -------------------------------------------------------------------------- */

/** GET /api/tienda */
export async function fetchPublicProducts() {
  const json = await authFetch("", { method: "GET" });

  const list =
    Array.isArray(json?.data) ? json.data :
    Array.isArray(json) ? json :
    [];

  return list.map(normalizeProduct).filter(Boolean);
}

/** GET /api/tienda/mis */
export async function fetchMyProducts() {
  const json = await authFetch("/mis", { method: "GET" });

  const list =
    Array.isArray(json?.data) ? json.data :
    Array.isArray(json) ? json :
    [];

  return list.map(normalizeProduct).filter(Boolean);
}

/** GET /api/tienda/:id */
export async function fetchProductById(id) {
  const json = await authFetch(`/${id}`, { method: "GET" });
  const raw = json?.data ?? json;
  return normalizeProduct(raw);
}

/** POST /api/tienda */
export async function createProduct(product) {
  const formData = productToFormData(product);

  const json = await authFetch("", {
    method: "POST",
    body: formData,
  });

  const raw = json?.data ?? json?.product ?? json;
  return normalizeProduct(raw);
}

/** PUT /api/tienda/:id */
export async function updateProduct(id, product) {
  const formData = productToFormData(product);

  const json = await authFetch(`/${id}`, {
    method: "PUT",
    body: formData,
  });

  const raw = json?.data ?? json?.product ?? json;
  return normalizeProduct(raw);
}

/** DELETE /api/tienda/:id */
export async function deleteProduct(id) {
  return authFetch(`/${id}`, {
    method: "DELETE",
  });
}
