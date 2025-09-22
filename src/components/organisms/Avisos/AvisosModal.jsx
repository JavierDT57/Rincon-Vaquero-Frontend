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
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] grid place-items-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl rounded-2xl p-[1px] bg-gradient-to-br from-purple-500/40 to-fuchsia-500/40 shadow-2xl">
        <div className="rounded-2xl bg-white ring-1 ring-black/5 p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Crear nuevo aviso</h2>
            <button onClick={onClose} className="rounded-lg px-2 py-1 text-sm text-slate-600 hover:bg-slate-100">Cerrar</button>
          </div>

          <form onSubmit={onSubmit} className="space-y-5">
            <div>
              <label htmlFor="titulo" className="mb-1 block text-sm font-medium">Título</label>
              <input
                id="titulo"
                type="text"
                value={formTitulo}
                onChange={(e) => setFormTitulo(e.target.value)}
                placeholder="Escribe un título"
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div>
              <label htmlFor="imagen" className="mb-1 block text-sm font-medium">Imagen (opcional)</label>
              <input
                id="imagen"
                type="file"
                accept="image/*"
                onChange={(e) => onFileChange(e.target.files?.[0] || null)}
                className="block w-full text-sm file:mr-4 file:rounded-lg file:border-0 file:bg-purple-600 file:px-4 file:py-2 file:text-white file:font-medium file:hover:opacity-90"
              />
              {formPreview && (
                <div className="mt-3 overflow-hidden rounded-xl ring-1 ring-black/5">
                  <img src={formPreview} alt="Vista previa" className="h-48 w-full object-cover" />
                </div>
              )}
            </div>

            <div>
              <label htmlFor="texto" className="mb-1 block text-sm font-medium">Aviso</label>
              <textarea
                id="texto"
                rows={6}
                value={formTexto}
                onChange={(e) => setFormTexto(e.target.value)}
                placeholder="Escribe el contenido del aviso..."
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button type="button" onClick={onClose} className="rounded-xl border border-slate-200 px-4 py-2 text-sm hover:bg-slate-50">Cancelar</button>
              <button type="submit" className="rounded-xl bg-purple-600 px-5 py-2.5 text-white font-medium shadow hover:opacity-90 active:translate-y-px">
                Publicar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
