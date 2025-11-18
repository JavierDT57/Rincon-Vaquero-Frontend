// src/api/tienda.js
const API = import.meta.env.VITE_API_BASE;   // http://localhost:5000
const BASE_URL = `${API}/api/tienda`;          // http://localhost:5000/api/tienda

async function authFetch(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
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
    throw err;
  }

  return data;
}

/* Normalizar */
function normalizeProduct(raw) {
  return {
    id: raw.id,
    userId: raw.userId ?? raw.usuarioId ?? null,
    owner: raw.owner ?? raw.usuarioNombre ?? "Vendedor",

    name: raw.nombre ?? raw.name ?? "",
    image: raw.imagenurl ? `${API}${raw.imagenurl}` : "",

    price: Number(raw.precio ?? raw.price ?? 0),
    category: raw.categoria ?? raw.category ?? "",
    stock: Number(raw.stock ?? raw.existencias ?? 0),
    location: raw.ubicacion ?? raw.location ?? "",
    status: raw.status ?? raw.estado ?? "",
  };
}


function productToFormData(product) {
  const fd = new FormData();

  fd.append("nombre", product.name ?? "");
  fd.append("precio", String(product.price ?? ""));
  fd.append("categoria", product.category ?? "");
  fd.append("stock", String(product.stock ?? ""));
  fd.append("ubicacion", product.location ?? "");


  if (product.imageFile instanceof File) {
    fd.append("imagen", product.imageFile);
  }


  return fd;
}

/* GET /api/tienda */
export async function fetchPublicProducts() {
  const json = await authFetch("", { method: "GET" });

  // Soportamos varios formatos por si cambias algo en el back
  const list = Array.isArray(json?.data)
    ? json.data
    : Array.isArray(json)
    ? json
    : [];

  return list.map(normalizeProduct).filter(Boolean);
}

/* GET /api/tienda/mis */
export async function fetchMyProducts() {
  const json = await authFetch("/mis", { method: "GET" });

  const list = Array.isArray(json?.data)
    ? json.data
    : Array.isArray(json)
    ? json
    : [];

  return list.map(normalizeProduct).filter(Boolean);
}

/* GET /api/tienda/:id */
export async function fetchProductById(id) {
  const json = await authFetch(`/${id}`, { method: "GET" });
  const raw = json?.data ?? json;
  return normalizeProduct(raw);
}

/* POST /api/tienda */
export async function createProduct(product) {
  const formData = productToFormData(product);

  const json = await authFetch("", {
    method: "POST",
    body: formData, 
  });

  const raw = json?.data ?? json?.product ?? json;
  return normalizeProduct(raw);
}

/* PUT /api/tienda/:id */
export async function updateProduct(id, product) {
  const formData = productToFormData(product);

  const json = await authFetch(`/${id}`, {
    method: "PUT",
    body: formData,
  });

  const raw = json?.data ?? json?.product ?? json;
  return normalizeProduct(raw);
}

/* DELETE /api/tienda/:id */
export async function deleteProduct(id) {
  const json = await authFetch(`/${id}`, {
    method: "DELETE",
  });
  return json;
}
