// src/containers/Testimonios/TestimoniosContainer.jsx
import { useEffect, useState } from "react";
import { fetchTestimonios, createTestimonio } from "../../api/testimonios.js";
import TestimonioCard from "../../components/molecules/TestimonioCard.jsx";
import TestimonioCardList from "../../components/molecules/TestimonioCardList.jsx";
import TestimoniosModal from "../../components/organisms/Home/Testimonios/TestimoniosModal.jsx";

const backendOrigin = (() => {
  try {
    const base = import.meta.env?.VITE_API_BASE?.trim() || "";
    return base ? new URL(base, window.location.href).origin : window.location.origin;
  } catch {
    return (typeof window !== "undefined" && window.location?.origin) || "";
  }
})();

const absUrl = (p) => {
  if (!p || typeof p !== "string") return null;
  if (/^https?:\/\//i.test(p)) return p;
  return `${backendOrigin}${p.startsWith("/") ? p : `/${p}`}`;
};

const safeId = () =>
  `testi_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

function normalizeTestimonio(raw) {
  try {
    if (!raw || typeof raw !== "object") return null;

    let imagenUrl =
      raw.imagenUrl ??
      raw.imagenurl ??
      raw.img_url ??
      raw.imgurl ??
      raw.imageUrl ??
      raw.image ??
      null;

    imagenUrl = absUrl(imagenUrl);

    return {
      id: raw.id ?? raw._id ?? safeId(),
      comentario: String(raw.comentario ?? raw.texto ?? raw.descripcion ?? "").trim(),
      localidad: String(raw.localidad ?? "").trim(),
      nombre: String(raw.nombre ?? "").trim(),
      rating: parseInt(raw.rating ?? 5, 10) || 5,
      imagenUrl,
      fecha: raw.fecha ?? raw.createdAt ?? raw.created_at ?? new Date().toISOString(),
    };
  } catch (e) {
    console.error("normalizeTestimonio falló:", raw, e);
    return null;
  }
}

export default function TestimoniosContainer() {
  const [items, setItems] = useState([]);
  const [layout, setLayout] = useState("grid"); // grid | list
  const [expanded, setExpanded] = useState(new Set());

  // Modal state
  const [isOpen, setIsOpen] = useState(false);
  const [formNombre, setFormNombre] = useState("");
  const [formLocalidad, setFormLocalidad] = useState("");
  const [formComentario, setFormComentario] = useState("");
  const [formRating, setFormRating] = useState(5);
  const [formFile, setFormFile] = useState(null);
  const [formPreview, setFormPreview] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchTestimonios();
        const list = Array.isArray(data) ? data : Array.isArray(data?.data) ? data.data : [];
        setItems(list.map(normalizeTestimonio).filter(Boolean));
      } catch (err) {
        console.error("Error al cargar testimonios:", err);
      }
    })();
  }, []);

  const toggleExpand = (id) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    setFormNombre("");
    setFormLocalidad("");
    setFormComentario("");
    setFormRating(5);
    setFormFile(null);
    setFormPreview("");
  };

  const onFileChange = (e) => {
    const f = e.target.files?.[0] || null;
    setFormFile(f);
    setFormPreview(f ? URL.createObjectURL(f) : "");
  };

  async function onSubmit(ev) {
    ev.preventDefault();

    const nombre = formNombre.trim();
    const comentario = formComentario.trim();
    const localidad = formLocalidad.trim();
    const rating = Math.max(1, Math.min(5, parseInt(formRating, 10) || 5));

    if (!nombre || !comentario) {
      alert("Nombre y comentario son obligatorios.");
      return;
    }

    // Optimista
    const tmp = normalizeTestimonio({
      nombre,
      comentario,
      localidad,
      rating,
      imagenurl: formPreview || null,
      fecha: new Date().toISOString(),
      id: safeId(),
    });
    setItems((prev) => [tmp, ...prev]);

    try {
      await createTestimonio({
        comentario,
        localidad,
        nombre,
        rating,
        imagenFile: formFile,
      });

      const data = await fetchTestimonios();
      const list = Array.isArray(data) ? data : Array.isArray(data?.data) ? data.data : [];
      setItems(list.map(normalizeTestimonio).filter(Boolean));

      closeModal();
    } catch (err) {
      console.error("No se pudo crear el testimonio:", err);
      alert(err.message || "No se pudo crear el testimonio.");
      setItems((prev) => prev.filter((t) => t.id !== tmp.id));
    }
  }

  const normalized = items.filter(Boolean);
  const grid = layout === "grid";

  return (
    <>
      {/* Header simple con botón */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Testimonios</h2>
          <p className="text-sm text-slate-600">Comparte tu experiencia con la comunidad.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setLayout(grid ? "list" : "grid")}
            className="rounded-xl bg-slate-100 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
          >
            {grid ? "Vista lista" : "Vista cuadricula"}
          </button>
          <button
            onClick={openModal}
            className="rounded-xl bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow hover:opacity-90 active:translate-y-px"
          >
            Compartir experiencia
          </button>
        </div>
      </div>

      <div className="mt-6">
        {grid ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {normalized.map((t) => (
              <TestimonioCard
                key={t.id}
                testimonio={t}
                expanded={expanded.has(t.id)}
                onToggle={() => toggleExpand(t.id)}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {normalized.map((t) => (
              <TestimonioCardList
                key={t.id}
                testimonio={t}
                expanded={expanded.has(t.id)}
                onToggle={() => toggleExpand(t.id)}
              />
            ))}
          </div>
        )}
      </div>

      <TestimoniosModal
        isOpen={isOpen}
        onClose={closeModal}
        onSubmit={onSubmit}
        formNombre={formNombre}
        setFormNombre={setFormNombre}
        formLocalidad={formLocalidad}
        setFormLocalidad={setFormLocalidad}
        formComentario={formComentario}
        setFormComentario={setFormComentario}
        formRating={formRating}
        setFormRating={setFormRating}
        onFileChange={onFileChange}
        formPreview={formPreview}
      />
    </>
  );
}
