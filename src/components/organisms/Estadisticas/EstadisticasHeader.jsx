// src/components/organisms/Estadisticas/EstadisticasHeader.jsx
import React from "react";
import { useInRouterContext, useNavigate } from "react-router-dom";
import fondo from "../../../assets/Avisos/fondo.jpg";

/** Botón Volver */
function BackButton({ className = "" }) {
  const inRouter = useInRouterContext();
  const navigate = inRouter ? useNavigate() : null;
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


/**
 * Banner full-bleed como Fiesta/Avisos.
 * `headerBg` puede ser clases Tailwind (bg-*, gradient) o una imagen (import/URL/data:).
 */
export default function EstadisticasHeader({

  title = "Estadísticas",
  subtitle = "Dashboard del pueblo",
  onEdit,            // opcional
  lastUpdated,       // opcional (string)
}) {


  return (
    <section className="relative left-1/2 right-1/2 -mx-[50vw] w-screen -mt-10 md:-mt-20 mb-6 sm:mb-8">

      <div className="relative h-[40vh] md:h-[40vh] min-h-[260px] w-full overflow-hidden">

          <img
            src={fondo}
            alt="Avisos"
            className="absolute inset-0 h-full w-full object-cover"
          />
        {/* Overlay */}
       <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/50" />

        {/* Volver */}
        <div className="absolute top-4 left-4 z-20">
          <BackButton />
        </div>

        {/* Título/subtítulo + acciones */}
        <div className="relative z-20 mx-auto flex h-full max-w-6xl items-end px-4 pb-8 sm:pb-10">
          <div>
            <h1 className="text-4xl md:text-5xl font-semibold text-white drop-shadow">{title}</h1>
            {subtitle && <p className="mt-1 text-white/90 text-lg">{subtitle}</p>}

            <div className="mt-4 flex flex-wrap items-center gap-3">
              {typeof onEdit === "function" && (
                <button
                  onClick={onEdit}
                  className="inline-flex items-center gap-2 rounded-full bg-white/90 text-slate-700 px-3 py-1.5 shadow hover:bg-white transition"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                       stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                  </svg>
                  Editar
                </button>
              )}
              {lastUpdated && (
                <span className="inline-flex items-center rounded-full bg-white/15 px-2.5 py-1 text-sm text-white backdrop-blur">
                  Última actualización: {lastUpdated}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
