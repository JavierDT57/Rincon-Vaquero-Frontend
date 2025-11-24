import React, { useEffect } from "react";

export default function TestimoniosModal({
  isOpen,
  onClose,
  onSubmit,
  formNombre,
  setFormNombre,
  formLocalidad,
  setFormLocalidad,
  formComentario,
  setFormComentario,
  formRating,
  setFormRating,
  onFileChange,
  formPreview,
}) {
  useEffect(() => {
    if (!isOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prevOverflow || "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] grid place-items-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto">
        <div className="rounded-2xl bg-white p-6 shadow-xl ring-1 ring-black/5">
          <div className="mb-4 flex justify-between">
            <h3 className="text-xl font-semibold">Compartir experiencia</h3>
            <button
              onClick={onClose}
              className="px-2 py-1 rounded-lg hover:bg-slate-100"
            >
              Cerrar
            </button>
          </div>

          <form className="space-y-4" onSubmit={onSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm">Nombre</label>
                <input
                  value={formNombre}
                  onChange={(e) => setFormNombre(e.target.value)}
                  required
                  className="w-full rounded-xl border px-3 py-2"
                />
              </div>
              <div>
                <label className="text-sm">Localidad</label>
                <input
                  value={formLocalidad}
                  onChange={(e) => setFormLocalidad(e.target.value)}
                  className="w-full rounded-xl border px-3 py-2"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm">Calificación</label>
                <select
                  value={formRating}
                  onChange={(e) => setFormRating(e.target.value)}
                  className="w-full rounded-xl border px-3 py-2"
                >
                  {[5, 4, 3, 2, 1].map((n) => (
                    <option key={n}>{n}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm">Imagen</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={onFileChange}
                  className="block w-full text-sm file:bg-blue-600 file:text-white file:px-3 file:py-2 file:rounded-lg"
                />
              </div>
            </div>

            {formPreview && (
              <div className="rounded-xl overflow-hidden border">
                <img
                  src={formPreview}
                  className="w-full max-h-60 object-cover"
                  alt="Preview"
                />
              </div>
            )}

            <div>
              <label className="text-sm">Comentario</label>
              <textarea
                value={formComentario}
                onChange={(e) => setFormComentario(e.target.value)}
                rows={4}
                required
                className="w-full rounded-xl border px-3 py-2"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-slate-100"
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-blue-600 text-white"
              >
                Publicar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
