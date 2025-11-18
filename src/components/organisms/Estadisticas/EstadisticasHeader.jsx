// src/components/organisms/Estadisticas/EstadisticasHeader.jsx
import React from "react";

export default function EstadisticasHeader({
  title = "Estadísticas",
  subtitle = "Dashboard del pueblo",
  lastUpdated,
}) {
  const baseButton =
    "px-4 sm:px-6 py-2 rounded-lg text-sm font-semibold transition-colors";
  const primaryButton = `${baseButton} bg-blue-600 text-white hover:bg-blue-700`;

  return (
    <div className="container mx-auto px-4 mb-6 sm:mb-8">
    <header className="bg-white/90 backdrop-blur border border-gray-200 rounded-2xl ring-1 ring-black/5 mt-8">
      <div className="px-4 sm:px-6 lg:px-8 py-5">

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">

          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-slate-900">
              {title}
            </h1>

            {subtitle && (
              <p className="text-sm md:text-base text-slate-600 mt-1">
                {subtitle}
              </p>
            )}

            {lastUpdated && (
              <span className="inline-flex items-center px-3 py-1 mt-2 rounded-full text-sm bg-blue-50 text-blue-700 border border-blue-200">
                Última actualización: {lastUpdated}
              </span>
            )}
          </div>

        </div>
      </div>
    </header>
    </div>
  );
}
