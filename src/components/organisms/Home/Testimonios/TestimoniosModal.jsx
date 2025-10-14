// src/components/organisms/Testimonios/TestimoniosModal.jsx
export default function TestimoniosModal({
  isOpen, onClose, onSubmit,
  formNombre, setFormNombre,
  formLocalidad, setFormLocalidad,
  formComentario, setFormComentario,
  formRating, setFormRating,
  onFileChange, formPreview,
}) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[60] grid place-items-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-xl">
        <div className="rounded-2xl bg-white p-6 shadow-xl ring-1 ring-black/5">
          <h3 className="text-xl font-semibold text-slate-800">Compartir experiencia</h3>
          <form className="mt-4 space-y-4" onSubmit={onSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700">Nombre</label>
                <input type="text" value={formNombre} onChange={(e) => setFormNombre(e.target.value)} required
                  className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-purple-500/60" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Localidad</label>
                <input type="text" value={formLocalidad} onChange={(e) => setFormLocalidad(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-purple-500/60" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700">Calificación</label>
                <select value={formRating} onChange={(e) => setFormRating(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-purple-500/60">
                  {[5,4,3,2,1].map((n) => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Imagen (opcional)</label>
                <input type="file" accept="image/*" onChange={onFileChange}
                  className="mt-1 block w-full text-sm text-slate-600 file:mr-4 file:rounded-lg file:border-0 file:bg-purple-600 file:px-3 file:py-2 file:text-white hover:file:opacity-90" />
              </div>
            </div>

            {formPreview && (
              <div className="overflow-hidden rounded-xl border border-slate-200">
                <img src={formPreview} alt="preview" className="max-h-60 w-full object-cover" />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-700">Comentario</label>
              <textarea value={formComentario} onChange={(e) => setFormComentario(e.target.value)} required rows={4}
                className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-purple-500/60"
                placeholder="Cuéntanos tu experiencia…" />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button type="button" onClick={onClose}
                className="rounded-xl bg-slate-100 px-4 py-2 text-sm text-slate-700 shadow hover:bg-slate-50">Cancelar</button>
              <button type="submit"
                className="rounded-xl bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow hover:opacity-90 active:translate-y-px">Publicar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
