// src/components/organisms/Tienda/TiendaHeader.jsx
import React from "react";

export default function TiendaHeader({
  activeView,
  onShowGeneral,
  onCreateClick,
  onMyPublicationsClick,
}) {
  const baseButton =
    "px-4 sm:px-6 py-2 rounded-lg text-sm font-semibold transition-colors";
  const primaryButton = `${baseButton} bg-blue-600 text-white hover:bg-blue-700`;
  const ghostButton =
    baseButton + " border border-blue-600 text-blue-700 hover:bg-blue-50";

  return (
    <header className="bg-white/90 backdrop-blur border border-gray-200 rounded-2xl ring-1 ring-black/5">
      <div className="px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-slate-900">
              Tienda comunitaria
            </h1>
            <p className="text-sm md:text-base text-slate-600 mt-1">
              Compra y vende productos locales dentro de la comunidad.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={onShowGeneral}
              className={
                activeView === "general" ? primaryButton : ghostButton
              }
            >
              Ver productos
            </button>
            <button
              type="button"
              onClick={onMyPublicationsClick}
              className={
                activeView === "my-publications"
                  ? primaryButton
                  : ghostButton
              }
            >
              Mis publicaciones
            </button>
            <button
              type="button"
              onClick={onCreateClick}
              data-testid="btn-crear-publicacion"
              className={
                activeView === "create" ? primaryButton : ghostButton
              }
            >
              + Crear publicación
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
