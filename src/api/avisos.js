// TODO: cuando tengas backend, rellena estas URLs:
const API_BASE = import.meta.env.VITE_API_BASE || ""; // p.ej. "https://api.tu-dominio.com"
const ENDPOINTS = {
  list:  "/avisos",        // GET
  create:"/avisos",        // POST
  update:(id)=>`/avisos/${id}`, // PUT/PATCH
  delete:(id)=>`/avisos/${id}`, // DELETE
};

// MOCK local por ahora:
const mockAvisos = [
  {
    id: crypto.randomUUID(),
    titulo: "Corte de agua programado",
    texto:
      "El próximo viernes habrá corte de agua de 8:00 a 16:00 por mantenimiento. Recomendamos almacenar lo necesario y cerrar bien las llaves para evitar fugas. Gracias por su comprensión.",
    imagenUrl:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1600&auto=format&fit=crop",
    fecha: new Date().toISOString(),
  },
  {
    id: crypto.randomUUID(),
    titulo: "Asamblea general",
    texto:
      "Se convoca a toda la comunidad a la asamblea general del domingo a las 10:00 en el auditorio. Se revisarán temas de seguridad, presupuesto y actividades culturales.",
    imagenUrl:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1600&auto=format&fit=crop",
    fecha: new Date(Date.now() - 1 * 86400000).toISOString(),
  },
  {
    id: crypto.randomUUID(),
    titulo: "Clases de baile gratuitas",
    texto:
      "Este mes habrá clases de baile los sábados a las 18:00 en la explanada. ¡Trae agua y ropa cómoda! Nivel principiante a intermedio.",
    imagenUrl:
      "https://images.unsplash.com/photo-1515165562835-c3b8c3a01ab0?q=80&w=1600&auto=format&fit=crop",
    fecha: new Date(Date.now() - 2 * 86400000).toISOString(),
  },
];

// GET /avisos
export async function fetchAvisos() {
  // Ejemplo real:
  // const res = await fetch(API_BASE + ENDPOINTS.list, { credentials: "include" });
  // if (!res.ok) throw new Error("Error al cargar avisos");
  // return await res.json();

  // Mock:
  await new Promise((r) => setTimeout(r, 150));
  return [...mockAvisos];
}

// POST /avisos
export async function createAviso(payload) {
  // Ejemplo real:
  // const res = await fetch(API_BASE + ENDPOINTS.create, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   credentials: "include",
  //   body: JSON.stringify(payload),
  // });
  // if (!res.ok) throw new Error("Error al crear aviso");
  // return await res.json();

  // Mock:
  await new Promise((r) => setTimeout(r, 150));
  return { ok: true };
}

// Opcional (cuando tengas backend):
export async function updateAviso(id, payload) { /* ... */ }
export async function deleteAviso(id) { /* ... */ }
