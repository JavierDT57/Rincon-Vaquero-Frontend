import React, { useEffect } from "react";

export default function AvisosModal({
  isOpen,
  onClose,
  onSubmit,
  formTitulo,
  setFormTitulo,
  formTexto,
  setFormTexto,
  onFileChange,
  formPreview
}) {

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [isOpen]);

  if (!isOpen) return null; 

  return (
    <div className="fixed inset-0 z-[60] grid place-items-center p-4">

      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-2xl rounded-2xl p-[1px] 
                      bg-gradient-to-br from-blue-500/40 to-blue-500/40 shadow-2xl
                      max-h-[90vh] overflow-y-auto">

        <div className="rounded-2xl bg-white ring-1 ring-black/5 p-6">

          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Crear nuevo aviso</h2>
            <button onClick={onClose} className="rounded-lg px-2 py-1 text-sm text-slate-600 hover:bg-slate-100">
              Cerrar
            </button>
          </div>

          <form onSubmit={onSubmit} className="space-y-5">

            <div>
              <label className="mb-1 block text-sm font-medium">Título</label>
              <input
                type="text"
                value={formTitulo}
                onChange={(e) => setFormTitulo(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5 focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Imagen (opcional)</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => onFileChange(e.target.files?.[0] || null)}
                className="block w-full text-sm file:bg-blue-600 file:text-white file:px-4 file:py-2 file:rounded-lg"
              />

              {formPreview && (
                <div className="mt-3 overflow-hidden rounded-xl ring-1 ring-black/5">
                  <img src={formPreview} alt="Preview" className="h-48 w-full object-cover" />
                </div>
              )}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Aviso</label>
              <textarea
                rows={6}
                value={formTexto}
                onChange={(e) => setFormTexto(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5 focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={onClose} className="border rounded-xl px-4 py-2 text-sm">Cancelar</button>
              <button type="submit" className="bg-blue-600 text-white rounded-xl px-5 py-2.5">
                Publicar
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
