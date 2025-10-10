// src/components/organisms/Avisos/AvisosHeader.jsx
import React from "react";
import { useInRouterContext, useNavigate } from "react-router-dom";
import fondo from "../../../assets/Avisos/fondo.jpg";

/** Botón Volver (mismo comportamiento que en Fiesta Patronal) */
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

export default function AvisosHeader({
  headerBg,
  layout,
  onToggleLayout,
  onOpenModal,
  total = 0,
}) {


  const ToggleIcon =
    layout === "grid"
      ? () => (
          // lista
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="8" y1="6" x2="21" y2="6" />
            <line x1="8" y1="12" x2="21" y2="12" />
            <line x1="8" y1="18" x2="21" y2="18" />
            <circle cx="4" cy="6" r="1" />
            <circle cx="4" cy="12" r="1" />
            <circle cx="4" cy="18" r="1" />
          </svg>
        )
      : () => (
          // grid
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
          </svg>
        );

  return (
    <section className="relative">
      {/* Hero: mismo alto y composición que Fiesta */}
      <div className="relative h-[40vh] md:h-[40vh] min-h-[260px] w-full overflow-hidden">

          <img
            src={fondo}
            alt="Avisos"
            className="absolute inset-0 h-full w-full object-cover"
          />
       

        {/* Overlay no bloquea clics y queda debajo con z-0 */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/50" />

        {/* Botón Volver arriba a la izquierda */}
        <div className="absolute top-4 left-4 z-20">
          <BackButton />
        </div>

        {/* Título/subtítulo y acciones al fondo del hero */}
        <div className="relative z-20 mx-auto flex h-full max-w-6xl items-end px-4 pb-10">
          <div>
            <h1 className="text-4xl md:text-5xl font-semibold text-white drop-shadow">Avisos</h1>
            <p className="mt-1 text-white/90 text-lg">Comunicados para toda la comunidad</p>

            {/* Acciones */}
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={onToggleLayout}
                className="inline-flex items-center gap-2 rounded-full bg-white/90 text-slate-700 px-3 py-1.5 shadow hover:bg-white transition"
              >
                <ToggleIcon />
                {layout === "grid" ? "Vista en lista" : "Vista en cuadrícula"}
              </button>

              <button
                onClick={onOpenModal}
                className="inline-flex items-center gap-2 rounded-full bg-emerald-600 text-white px-4 py-2 shadow hover:bg-emerald-700 transition"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Crear nuevo aviso
              </button>

              <span className="inline-flex items-center rounded-full bg-white/15 px-2.5 py-1 text-sm text-white backdrop-blur">
                {total} aviso{total === 1 ? "" : "s"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
