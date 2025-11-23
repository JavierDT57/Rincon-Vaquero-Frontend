import { useEffect, useState } from "react";
import AvisosHeader from "../../components/organisms/Avisos/AvisosHeader.jsx";
import AvisosModal from "../../components/organisms/Avisos/AvisosModal.jsx";
import AvisoCard from "../../components/molecules/AvisoCard.jsx";
import AvisoCardList from "../../components/molecules/AvisoCardList.jsx";
import { fetchAvisos, createAviso } from "../../api/avisos.js";

export default function AvisosContainer() {
  // Estado principal
  const [avisos, setAvisos] = useState([]);
  const [layout, setLayout] = useState("grid");
  const [expanded, setExpanded] = useState(new Set());

  // Modal
  const [isOpen, setIsOpen] = useState(false);
  const [formTitulo, setFormTitulo] = useState("");
  const [formTexto, setFormTexto] = useState("");
  const [formImagenFile, setFormImagenFile] = useState(null);
  const [formPreview, setFormPreview] = useState("");

  // Mensajes para Playwright
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Helper
  const asArray = (resp) => {
    if (Array.isArray(resp)) return resp;
    if (Array.isArray(resp?.data)) return resp.data;
    return [];
  };

  // Cargar avisos
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await fetchAvisos();
        if (mounted) setAvisos(asArray(data));
      } catch (err) {
        console.error("Error cargando avisos:", err);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // Handlers
  const toggleLayout = () =>
    setLayout((l) => (l === "grid" ? "list" : "grid"));

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

  // Crear aviso (optimista + POST real + refresh)
  const onSubmitNuevoAviso = async (e) => {
    e.preventDefault();

    const titulo = formTitulo.trim();
    const texto = formTexto.trim();

    // Validación
    if (!titulo || !texto) {
      setErrorMsg("Todos los campos son obligatorios.");
      setSuccessMsg("");
      return;
    }

    // Limpia mensajes anteriores
    setSuccessMsg("");
    setErrorMsg("");

    // Optimista local
    const tempId =
      crypto?.randomUUID?.() ||
      Math.random().toString(36).slice(2);

    const nuevoLocal = {
      id: tempId,
      titulo,
      texto,
      imagenUrl: formPreview || "",
      fecha: new Date().toISOString(),
    };

    setAvisos((prev) => [nuevoLocal, ...prev]);

    try {
      // POST real
      await createAviso({ titulo, texto, imagen: formImagenFile });

      // Refrescar desde BD
      const data = await fetchAvisos();
      setAvisos(asArray(data));

      // Mensaje éxito
      setSuccessMsg("Aviso creado correctamente.");
      setErrorMsg("");

      // Limpiar modal
      closeModal();
    } catch (err) {
      console.error(err);
      setErrorMsg("No se pudo publicar el aviso.");
      setSuccessMsg("");

      // Rollback optimista
      setAvisos((prev) =>
        prev.filter((a) => a.id !== tempId)
      );
    }
  };

  return (
    <>
      <AvisosHeader
        layout={layout}
        onToggleLayout={toggleLayout}
        onOpenModal={openModal}
        total={avisos.length}
      />

      <div className="container mx-auto px-4 pb-12">
        <div className="bg-white text-slate-900 rounded-2xl ring-1 ring-black/5">
          <section className="px-4 sm:px-6 lg:px-8 py-8">
            {layout === "grid" ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {avisos.map((a) => (
                  <AvisoCard key={a.id || a._id} aviso={a} />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {avisos.map((a) => (
                  <AvisoCardList
                    key={a.id || a._id}
                    aviso={a}
                    expanded={expanded.has(a.id || a._id)}
                    onToggle={() =>
                      toggleExpand(a.id || a._id)
                    }
                  />
                ))}
              </div>
            )}
          </section>
        </div>

        {/* MODAL */}
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

        {/* MENSAJES PARA PLAYWRIGHT */}
        {successMsg && (
          <div
            data-testid="aviso-success"
            className="mt-6 p-3 bg-green-100 border border-green-300 text-green-700 rounded-xl"
          >
            {successMsg}
          </div>
        )}

        {errorMsg && (
          <div
            data-testid="aviso-error"
            className="mt-6 p-3 bg-red-100 border border-red-300 text-red-700 rounded-xl"
          >
            {errorMsg}
          </div>
        )}
      </div>
    </>
  );
}
