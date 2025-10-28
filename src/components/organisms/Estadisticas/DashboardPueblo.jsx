import React, { useEffect, useState } from "react";
import { getDashboardComputed } from "../../../api/dashboard";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  Label,
} from "recharts";



const PURPLE = ["#7c3aed", "#a855f7", "#c084fc", "#e9d5ff", "#d946ef", "#9333ea"];

export default function DashboardPueblo() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const d = await getDashboardComputed();
        setData(d);
      } catch (e) {
        setErr(String(e.message || e));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div className="p-8 text-slate-500">Cargando dashboard…</div>;
  if (err) return <div className="p-8 text-red-600">Error: {err}</div>;
  if (!data) return null;

  const { charts = {}, derivados = {}, porcentajes = {}, textos = {} } = data;

  const POBTOT = derivados.POBTOT ?? 0;
  const POB15MAS = derivados.POB15MAS ?? 0;

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-stretch">
          {/* Población por sexo */}
          <ChartCard title="Población por sexo" subtitle={`Total: ${POBTOT}`} className="min-h-[520px]">
            <Donut
              data={charts.sexoData || []}
              colors={[PURPLE[0], PURPLE[2]]}
              center={`${porcentajes.hombres ?? 0}% hombres / ${porcentajes.mujeres ?? 0}% mujeres`}
              height="h-80"
              margin={{ bottom: 40 }}
              hideLegend
            />
            <LegendDots
              items={[
                { name: "Hombres", color: PURPLE[0] },
                { name: "Mujeres", color: PURPLE[2] },
              ]}
            />
            <CardInfo>
              <p>{textos.poblacionSexo ?? <>La población es de <b>{POBTOT}</b> personas.</>}</p>
            </CardInfo>
          </ChartCard>

          {/* Grupos de edad */}
          <ChartCard title="Distribución por grupos de edad" subtitle="Conteo de personas">
            <Donut
              data={charts.edadData || []}
              colors={[PURPLE[0], PURPLE[1], PURPLE[3]]}
              center={`${porcentajes.ninos ?? 0}% / ${porcentajes.adultos ?? 0}% / ${porcentajes.tercera ?? 0}%`}
              height="h-72"
              margin={{ bottom: 40 }}
              hideLegend
            />
            <LegendDots
              items={[
                { name: "0–14", color: PURPLE[0] },
                { name: "15–64", color: PURPLE[1] },
                { name: "65+", color: PURPLE[3] },
              ]}
            />
            <CardInfo>
              <p>{textos.estructuraEtaria}</p>
            </CardInfo>
          </ChartCard>

          {/* Religión */}
          <ChartCard title="Religión y creencias" subtitle="Distribución porcentual">
            <Donut
              data={charts.religionData || []}
              colors={[PURPLE[0], PURPLE[2], PURPLE[4]]}
              center={`${porcentajes.catolica ?? 0}% católica`}
              height="h-72"
              margin={{ bottom: 40 }}
              hideLegend
            />
            <LegendDots
              items={[
                { name: "Católica", color: PURPLE[0] },
                { name: "Sin religión", color: PURPLE[2] },
                { name: "Otras", color: PURPLE[4] },
              ]}
            />
            <CardInfo>
              <p>{textos.religion}</p>
            </CardInfo>
          </ChartCard>

          {/* Actividad económica */}
          <ChartCard title="Actividad económica (15+)" subtitle={`Población 15+: ${POB15MAS}`} className="min-h-[520px] md:col-span-2 xl:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Donut
                  data={charts.peaData || []}
                  colors={[PURPLE[0], "#e5e7eb"]}
                  center={`${porcentajes.pea_sobre_15mas ?? 0}% PEA`}
                  height="h-72"
                  margin={{ bottom: 24 }}
                  hideLegend
                />
                <LegendDots
                  items={[
                    { name: "Activa (PEA)", color: PURPLE[0] },
                    { name: "No activa", color: "#e5e7eb" },
                  ]}
                />
              </div>
              <div>
                <Donut
                  data={charts.peaSexoData || []}
                  colors={[PURPLE[0], PURPLE[2]]}
                  center={`${porcentajes.pea_hombres ?? 0}% M / ${porcentajes.pea_mujeres ?? 0}% F`}
                  height="h-72"
                  margin={{ bottom: 24 }}
                  hideLegend
                />
                <LegendDots
                  items={[
                    { name: "Hombres (PEA)", color: PURPLE[0] },
                    { name: "Mujeres (PEA)", color: PURPLE[2] },
                  ]}
                />
              </div>
            </div>
            <CardInfo>
              <p>{textos.pea}</p>
            </CardInfo>
          </ChartCard>

          {/* Salud */}
          <div className="md:col-span-2 xl:col-span-3">
            <ChartCard
              title="Derechohabiencia a servicios de salud"
              subtitle={`Cobertura general: ${porcentajes.cobertura_salud ?? 0}%`}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Donut
                    data={charts.ssCoberturaData || []}
                    colors={[PURPLE[0], "#e5e7eb"]}
                    center={`${porcentajes.cobertura_salud ?? 0}% con servicio`}
                    height="h-72"
                    margin={{ bottom: 24 }}
                    hideLegend
                  />
                  <LegendDots
                    items={[
                      { name: "Con servicio", color: PURPLE[0] },
                      { name: "Sin servicio", color: "#e5e7eb" },
                    ]}
                  />
                </div>

                <div>
                  <Donut
                    data={charts.ssDetalleData || []}
                    colors={[
                      PURPLE[0],
                      PURPLE[1],
                      PURPLE[2],
                      PURPLE[3],
                      PURPLE[4],
                      "#a1a1aa",
                      "#b45309",
                      "#16a34a",
                    ]}
                    center="Distribución"
                    height="h-72"
                    hideLegend
                    margin={{ bottom: 0 }}
                  />
                  <LegendDots
                    items={[
                      { name: "IMSS", color: PURPLE[0] },
                      { name: "IMSS-B", color: PURPLE[1] },
                      { name: "ISSSTE", color: PURPLE[2] },
                      { name: "Inst. estatales", color: PURPLE[3] },
                      { name: "Seguro Popular", color: PURPLE[4] },
                      { name: "Privada", color: "#a1a1aa" },
                      { name: "Programa púb.", color: "#b45309" },
                      { name: "Otra", color: "#16a34a" },
                    ]}
                  />
                </div>
              </div>

              <CardInfo>
                <p>{textos.salud}</p>
              </CardInfo>
            </ChartCard>
          </div>
        </div>

        <div className="mt-8 text-xs text-slate-500">
          Nota: Las cifras se derivan automáticamente del backend (fuente atómica + cálculo).
        </div>
      </main>
    </div>
  );
}

/* ---------------- UI helpers (sin cambios) ---------------- */
function ChartCard({ title, subtitle, children, className = "" }) {
  return (
    <div className={`relative h-full overflow-hidden rounded-2xl p-[1px] border border-border bg-card shadow-lg ${className}`}>
      <div className="flex h-full flex-col rounded-2xl bg-white ring-1 ring-black/5 p-4">
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
          {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
        </div>
        {children}
      </div>
    </div>
  );
}

function CardInfo({ children }) {
  return (
    <div className="mt-4 rounded-xl bg-gradient-to-br from-slate-50 to-white ring-1 ring-slate-200 p-3 text-sm text-slate-700">
      {children}
    </div>
  );
}

function LegendDots({ items }) {
  return (
    <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
      {items.map((it) => (
        <div key={it.name} className="flex items-center gap-2">
          <span
            className="inline-block h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: it.color }}
          />
          <span className="text-slate-600">{it.name}</span>
        </div>
      ))}
    </div>
  );
}

function Donut({ data, colors, center, height = "h-64", margin = { bottom: 32 }, hideLegend = false }) {
  return (
    <div className={height}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart margin={margin}>
          <Tooltip contentStyle={{ borderRadius: 12 }} />
          <Pie
            data={data}
            innerRadius={70}
            outerRadius={95}
            paddingAngle={2}
            dataKey="value"
            nameKey="name"
          >
            {(data || []).map((_, i) => (
              <Cell key={`cell-${i}`} fill={colors[i % colors.length]} />
            ))}
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  const { cx, cy } = viewBox;
                  return (
                    <text x={cx} y={cy} textAnchor="middle" dominantBaseline="central" className="fill-slate-700 text-xs">
                      {center}
                    </text>
                  );
                }
                return null;
              }}
              position="center"
            />
          </Pie>
          {!hideLegend && (
            <Legend verticalAlign="bottom" height={28} iconType="circle" wrapperStyle={{ paddingTop: 12 }} />
          )}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
