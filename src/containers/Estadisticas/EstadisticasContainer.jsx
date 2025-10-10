// src/containers/Estadisticas/EstadisticasContainer.jsx
import { useMemo } from "react";
import EstadisticasHeader from "../../components/organisms/Estadisticas/EstadisticasHeader.jsx";
import DashboardPueblo from "../../components/organisms/Estadisticas/DashboardPueblo.jsx";

export default function EstadisticasContainer() {
  return (
    <>
      {/* Banner full-bleed */}
      <EstadisticasHeader
        title="Estadísticas"
        subtitle="Estadísticas demográficas, sociales y de salud"
      />

      {/* Contenido en container y dentro de un card */}
      <div className="container mx-auto px-4 pb-12">
        <div className="bg-white text-slate-900 rounded-2xl ring-1 ring-black/5">
          <section className="px-4 sm:px-6 lg:px-8 py-8">
            {/* Deshabilitamos el header interno del dashboard */}
            <DashboardPueblo showHeader={false} />
          </section>
        </div>
      </div>
    </>
  );
}
