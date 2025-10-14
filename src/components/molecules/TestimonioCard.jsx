// src/components/molecules/TestimonioCard.jsx
export default function TestimonioCard({ testimonio, expanded, onToggle }) {
  if (!testimonio) return null;

  const body = String(testimonio.comentario ?? "");
  const maxChars = 180;
  const largo = body.length > maxChars;
  const texto = !expanded && largo ? body.slice(0, maxChars) + "…" : body;

  return (
    <div className="group relative h-full rounded-2xl p-[1px] bg-gradient-to-br from-purple-500/40 to-fuchsia-500/40 shadow-lg transition-transform hover:translate-y-[-2px]">
      <div className="flex h-full flex-col rounded-2xl bg-white ring-1 ring-black/5 overflow-hidden">
        {testimonio.imagenUrl && (
          <div className="relative h-44 w-full overflow-hidden bg-gradient-to-br from-slate-200 to-slate-100">
            <img
              src={testimonio.imagenUrl}
              alt=""
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              loading="lazy"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"/>
          </div>
        )}

        <div className="flex flex-1 flex-col p-4">
          <div className="mb-1 flex items-center justify-between gap-2">
            <h3 className="text-lg font-semibold text-slate-900">{testimonio.nombre || "Anónimo"}</h3>
            <span className="rounded-full bg-purple-100/60 px-2 py-0.5 text-xs font-medium text-purple-700">
              {testimonio.fecha ? new Date(testimonio.fecha).toLocaleDateString() : ""}
            </span>
          </div>
          <div className="mb-2 text-xs text-slate-600">
            {testimonio.localidad ? `📍 ${testimonio.localidad}` : ""} {Boolean(testimonio.rating) && ` • ⭐ ${testimonio.rating}/5`}
          </div>
          <p className="text-sm text-slate-700">{texto}</p>

          {largo && (
            <button onClick={onToggle} className="mt-2 self-start text-sm font-medium text-purple-700 hover:underline">
              {expanded ? "Ver menos" : "Ver más"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
