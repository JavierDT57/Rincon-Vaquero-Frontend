// src/components/molecules/AvisoCard.jsx
export default function AvisoCard({ aviso, expanded, onToggle }) {
  if (!aviso) return null;

  // ---- Helpers para URL absoluta de imagen ----
  const backendOrigin = (() => {
    try {
      const base = import.meta.env?.VITE_API_BASE?.trim() || "";
      // p.ej. http://localhost:5000/api  ->  http://localhost:5000
      return base ? new URL(base, window.location.href).origin : "";
    } catch {
      return "";
    }
  })();

  const toAbsolute = (p) => {
    if (!p || typeof p !== "string") return "";
    if (/^https?:\/\//i.test(p)) return p;               // ya es absoluta
    return `${backendOrigin}${p.startsWith("/") ? p : `/${p}`}`;
  };

  const imgSrc = toAbsolute(
    aviso.imagenUrl ??
    aviso.img_url ??
    aviso.imgurl ??
    aviso.imageUrl ??
    aviso.image ??
    ""
  );

  const body = String(aviso.texto ?? "");
  const maxChars = 180;
  const largo = body.length > maxChars;
  const texto = !expanded && largo ? body.slice(0, maxChars) + "…" : body;

  return (
    <div className="group relative h-full rounded-2xl p-[1px] bg-gradient-to-br from-purple-500/40 to-fuchsia-500/40 shadow-lg transition-transform hover:translate-y-[-2px]">
      <div className="flex h-full flex-col rounded-2xl bg-white ring-1 ring-black/5 overflow-hidden">
        {imgSrc && (
          <div className="relative h-44 w-full overflow-hidden bg-gradient-to-br from-slate-200 to-slate-100">
            <img
              src={imgSrc}
              alt=""
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              loading="lazy"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"/>
          </div>
        )}
        <div className="flex flex-1 flex-col p-4">
          <div className="mb-2 flex items-center justify-between gap-2">
            <h3 className="text-lg font-semibold text-slate-900">{aviso.titulo ?? "Sin título"}</h3>
            <span className="rounded-full bg-purple-100/60 px-2 py-0.5 text-xs font-medium text-purple-700">
              {aviso.fecha ? new Date(aviso.fecha).toLocaleDateString() : ""}
            </span>
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
