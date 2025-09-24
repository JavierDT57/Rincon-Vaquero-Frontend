import { useEffect, useMemo, useState } from "react";
import AvisosHeader from "../../components/organisms/Avisos/AvisosHeader.jsx";
import AvisosModal from "../../components/organisms/Avisos/AvisosModal.jsx";
import AvisoCard from "../../components/molecules/AvisoCard.jsx";
import AvisoCardList from "../../components/molecules/AvisoCardList.jsx";
import { fetchAvisos, createAviso /*, updateAviso, deleteAviso*/ } from "../../api/avisos.js";

export default function AvisosContainer() {
  // Estado principal
  const [avisos, setAvisos] = useState([]);
  const [layout, setLayout] = useState("grid"); // "grid" | "list"
  const [expanded, setExpanded] = useState(new Set());

  // Modal crear
  const [isOpen, setIsOpen] = useState(false);
  const [formTitulo, setFormTitulo] = useState("");
  const [formTexto, setFormTexto] = useState("");
  const [formImagenFile, setFormImagenFile] = useState(null);
  const [formPreview, setFormPreview] = useState("");

  // Carga inicial (mock por ahora; luego apuntas a tus endpoints)
  useEffect(() => {
    let mounted = true;
    fetchAvisos().then((data) => {
      if (mounted) setAvisos(data);
    }).catch(console.error);
    return () => { mounted = false; };
  }, []);

  // Header bg (constante memorizada)
  const headerBg = useMemo(
    () => "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500",
    []
  );

  // Handlers UI
  const toggleLayout = () => setLayout((l) => (l === "grid" ? "list" : "grid"));
  const toggleExpand = (id) => {
    setExpanded((prev) => {
      const copy = new Set(prev);
      copy.has(id) ? copy.delete(id) : copy.add(id);
      return copy;
    });
  };

  // Modal
  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    setFormTitulo("");
    setFormTexto("");
    setFormImagenFile(null);
    setFormPreview("");
  };
  const onFileChange = (file) => {
    setFormImagenFile(file || null);
    setFormPreview(file ? URL.createObjectURL(file) : "");
  };

  // Crear aviso (local + hook para API real)
  const onSubmitNuevoAviso = async (e) => {
    e.preventDefault();
    const payload = {
      titulo: formTitulo.trim(),
      texto: formTexto.trim(),
      imagenUrl: formPreview || "",
    };
    if (!payload.titulo || !payload.texto) return;

    // 1) Optimista local
    const nuevoLocal = {
      id: crypto.randomUUID(),
      titulo: payload.titulo,
      texto: payload.texto,
      imagenUrl: payload.imagenUrl,
      fecha: new Date().toISOString(),
    };
    setAvisos((prev) => [nuevoLocal, ...prev]);
    closeModal();

    // 2) Cuando tengas endpoint:
    try {
      // await createAviso(payload); // descomenta al tener API
    } catch (err) {
      console.error(err);
      // rollback si hace falta
    }
  };

  return (
    <div className="bg-white text-slate-900 rounded-2xl ring-1 ring-black/5 overflow-hidden">
      <AvisosHeader
        headerBg={headerBg}
        layout={layout}
        onToggleLayout={toggleLayout}
        onOpenModal={openModal}
        total={avisos.length}
      />

      <section className="px-4 sm:px-6 lg:px-8 py-8">
        {layout === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-stretch gap-6">
            {avisos.map((a) => (
              <AvisoCard
                key={a.id}
                aviso={a}
                expanded={expanded.has(a.id)}
                onToggle={() => toggleExpand(a.id)}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {avisos.map((a) => (
              <AvisoCardList
                key={a.id}
                aviso={a}
                expanded={expanded.has(a.id)}
                onToggle={() => toggleExpand(a.id)}
              />
            ))}
          </div>
        )}
      </section>

      <AvisosModal
        isOpen={isOpen}
        onClose={closeModal}
        onSubmit={onSubmitNuevoAviso}
        formTitulo={formTitulo}
        setFormTitulo={setFormTitulo}
        formTexto={formTexto}
        setFormTexto={setFormTexto}
        onFileChange={onFileChange}
        formPreview={formPreview}
      />
    </div>
  );
}
