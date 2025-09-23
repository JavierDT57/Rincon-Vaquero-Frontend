// src/components/organisms/common/HeroBanner.jsx
import { useInRouterContext, useNavigate, Link } from "react-router-dom";

/** Botón Volver: usa `to` si se pasa ruta, si no usa history.back() */
export function BackButton({ className = "", to }) {
  const inRouter = useInRouterContext();
  const navigate = inRouter ? useNavigate() : null;

  if (to) {
    return (
      <Link
        to={to}
        className={`inline-flex items-center gap-2 rounded-full bg-white/90 text-slate-700 px-3 py-1.5 shadow hover:bg-white transition ${className}`}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
        Volver
      </Link>
    );
  }

  const handleClick = () => {
    if (inRouter && navigate) navigate(-1);
    else if (typeof window !== "undefined") window.history.back();
  };

  return (
    <button
      onClick={handleClick}
      className={`inline-flex items-center gap-2 rounded-full bg-white/90 text-slate-700 px-3 py-1.5 shadow hover:bg-white transition ${className}`}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 18l-6-6 6-6" />
      </svg>
      Volver
    </button>
  );
}

/** Banner de héroe reutilizable */
export default function HeroBanner({
  image,
  title,
  subtitle,
  backTo, // opcional: ruta a la que volver (ej. "/destinos")
  heightClass = "h-[40vh] min-h-[260px]",
  overlayClass = "bg-gradient-to-b from-black/50 via-black/40 to-black/50",
}) {
  return (
    <div className={`relative ${heightClass} w-full overflow-hidden`}>
      <img src={image} alt={title}
           className="absolute inset-0 h-full w-full object-cover" />
      <div className={`absolute inset-0 ${overlayClass}`} />
      <div className="absolute top-4 left-4 z-10">
        <BackButton to={backTo} />
      </div>
      <div className="relative z-10 mx-auto flex h-full max-w-6xl items-end px-4 pb-10">
        <div>
          <h1 className="text-4xl md:text-5xl font-semibold text-white drop-shadow">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-1 text-white/90 text-lg">{subtitle}</p>
          )}
        </div>
      </div>
    </div>
  );
}
