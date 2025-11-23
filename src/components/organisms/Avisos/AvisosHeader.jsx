import React from "react";
import useAuth from "../../../hooks/useAuth";

export default function AvisosHeader({
  layout,
  onToggleLayout,
  onOpenModal,
  total = 0,
}) {
  const { user, isChecking } = useAuth();

  const baseButton =
    "px-4 sm:px-6 py-2 rounded-lg text-sm font-semibold transition-colors";
  const primaryButton = `${baseButton} bg-blue-600 text-white hover:bg-blue-700`;
  const ghostButton =
    baseButton + " border border-blue-600 text-blue-700 hover:bg-blue-50";

  const ToggleIcon =
    layout === "grid"
      ? () => (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" strokeWidth="2"
               strokeLinecap="round" strokeLinejoin="round">
            <line x1="8" y1="6" x2="21" y2="6" />
            <line x1="8" y1="12" x2="21" y2="12" />
            <line x1="8" y1="18" x2="21" y2="18" />
            <circle cx="4" cy="6" r="1" />
            <circle cx="4" cy="12" r="1" />
            <circle cx="4" cy="18" r="1" />
          </svg>
        )
      : () => (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" strokeWidth="2"
               strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
          </svg>
        );

  return (
    <div className="container mx-auto px-4 mb-6 sm:mb-8">
      <header className="bg-white/90 backdrop-blur border border-gray-200 rounded-2xl ring-1 ring-black/5 mt-8">
        <div className="px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold text-slate-900">
                Avisos
              </h1>
              <p className="text-sm md:text-base text-slate-600 mt-1">
                Comunicados para toda la comunidad.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={onToggleLayout}
                className={ghostButton}
              >
                <div className="inline-flex items-center gap-2">
                  <ToggleIcon />
                  {layout === "grid" ? "Vista en lista" : "Vista en cuadrícula"}
                </div>
              </button>

              <span className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                {total} avisos
              </span>

              {!isChecking && user?.rol === "admin" && (
                <button
                  type="button"
                  data-testid="btn-crear-aviso"
                  onClick={onOpenModal}
                  className={primaryButton}
                >
                  + Crear nuevo aviso
                </button>
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
