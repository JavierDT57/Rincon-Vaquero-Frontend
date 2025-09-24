import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  Label,
} from "recharts";

export default function DashboardPueblo() {
  // ---------------- Datos base ----------------
  const POBTOT = 250;
  const POBMAS = 142;
  const POBFEM = 108;

  const NINOS = 45;
  const ADULTOS = 164; // 15–64
  const TERCERA = 41; // 65+
  const POB15MAS = ADULTOS + TERCERA; // 205

  const CATOLICA = 206;
  const SINREL = 16;
  const OTRASREL = 28;

  const PEA = 105; // 15+
  const PEA_M = 66;
  const PEA_F = 39;
  const NO_PEA = POB15MAS - PEA; // 100

  const DER_SS = 220; // Con derechohabiencia a algún servicio
  const SIN_SS = POBTOT - DER_SS; // 30
  const IMSS = 139;
  const IMSSB = 1;
  const ISSSTE = 2;
  const ISEST = 0;
  const SP = 60; // Seguro Popular
  const PRIV = 7; // Institución privada
  const PROG = 8; // Programa público
  const OTRA = 3;

  // ---------------- Helpers ----------------
  const pct = (n, d) => (d === 0 ? 0 : Math.round((n / d) * 1000) / 10); // 1 decimal

  // Paleta morados / neutros
  const PURPLE = ["#7c3aed", "#a855f7", "#c084fc", "#e9d5ff", "#d946ef", "#9333ea"]; // variantes

  // Datasets para las gráficas
  const sexoData = [
    { name: "Hombres", value: POBMAS },
    { name: "Mujeres", value: POBFEM },
  ];

  const edadData = [
    { name: "0–14", value: NINOS },
    { name: "15–64", value: ADULTOS },
    { name: "65+", value: TERCERA },
  ];

  const religionData = [
    { name: "Católica", value: CATOLICA },
    { name: "Sin religión", value: SINREL },
    { name: "Otras", value: OTRASREL },
  ];

  const peaData = [
    { name: "Activa (PEA)", value: PEA },
    { name: "No activa", value: NO_PEA },
  ];

  const peaSexoData = [
    { name: "Hombres (PEA)", value: PEA_M },
    { name: "Mujeres (PEA)", value: PEA_F },
  ];

  const ssCoberturaData = [
    { name: "Con servicio", value: DER_SS },
    { name: "Sin servicio", value: SIN_SS },
  ];

  const ssDetalleData = [
    { name: "IMSS", value: IMSS },
    { name: "IMSS-B", value: IMSSB },
    { name: "ISSSTE", value: ISSSTE },
    { name: "Inst. estatales", value: ISEST },
    { name: "Seguro Popular", value: SP },
    { name: "Privada", value: PRIV },
    { name: "Programa púb.", value: PROG },
    { name: "Otra", value: OTRA },
  ];

  const headerBg =
    "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?q=80&w=2000&auto=format&fit=crop";

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Header con imagen y overlay morado */}
      <section className="relative -mt-16">
        <div className="h-56 w-full overflow-hidden">
          <img src={headerBg} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-[radial-gradient(100rem_40rem_at_0%_0%,rgba(168,85,247,.45),transparent),radial-gradient(100rem_40rem_at_100%_0%,rgba(217,70,239,.45),transparent)]" />
          <div className="absolute inset-0 bg-black/35" />
        </div>
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white drop-shadow-sm">Dashboard del Pueblo</h1>
                <p className="text-white/90">Estadísticas demográficas, sociales y de salud</p>
              </div>
              <div className="hidden md:block rounded-xl bg-white/15 px-3 py-2 text-white text-sm backdrop-blur">POB. Total: <b>{POBTOT}</b></div>
            </div>
          </div>
        </div>
      </section>

      {/* Contenido */}
      <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-stretch">
          {/* Población por sexo */}
          <ChartCard title="Población por sexo" subtitle={`Total: ${POBTOT}`} className="min-h-[520px]">
            <Donut
              data={sexoData}
              colors={[PURPLE[0], PURPLE[2]]}
              center={`${pct(POBMAS, POBTOT)}% hombres / ${pct(POBFEM, POBTOT)}% mujeres`}
              height="h-80"
              margin={{ bottom: 40 }}
              hideLegend
            />
            <LegendDots
              items={sexoData.map((d, i) => ({ name: d.name, color: [PURPLE[0], PURPLE[2]][i] }))}
            />
            <CardInfo>
              <p>
                La población es de <b>{POBTOT}</b> personas: <b>{POBMAS}</b> hombres ({pct(POBMAS, POBTOT)}%) y <b>{POBFEM}</b> mujeres ({pct(POBFEM, POBTOT)}%).
                La relación es de ~<b>{Math.round((POBMAS / POBFEM) * 100) / 100}</b> hombres por cada mujer.
              </p>
            </CardInfo>
          </ChartCard>

          {/* Grupos de edad */}
          <ChartCard title="Distribución por grupos de edad" subtitle="Conteo de personas">
            <Donut
              data={edadData}
              colors={[PURPLE[0], PURPLE[1], PURPLE[3]]}
              center={`${pct(NINOS, POBTOT)}% / ${pct(ADULTOS, POBTOT)}% / ${pct(TERCERA, POBTOT)}%`}
              height="h-72"
              margin={{ bottom: 40 }}
              hideLegend
            />
            <LegendDots
              items={edadData.map((d, i) => ({ name: d.name, color: [PURPLE[0], PURPLE[1], PURPLE[3]][i] }))}
            />
            <CardInfo>
              <p>
                Estructura etaria: <b>{pct(NINOS, POBTOT)}%</b> niños (0–14), <b>{pct(ADULTOS, POBTOT)}%</b> adultos (15–64) y <b>{pct(TERCERA, POBTOT)}%</b> personas mayores (65+).
                Predominan los adultos, lo que sugiere fuerza laboral amplia y demanda de servicios para hogar y empleo.
              </p>
            </CardInfo>
          </ChartCard>

          {/* Religión */}
          <ChartCard title="Religión y creencias" subtitle="Distribución porcentual">
            <Donut
              data={religionData}
              colors={[PURPLE[0], PURPLE[2], PURPLE[4]]}
              center={`${pct(CATOLICA, POBTOT)}% católica`}
              height="h-72"
              margin={{ bottom: 40 }}
              hideLegend
            />
            <LegendDots
              items={religionData.map((d, i) => ({ name: d.name, color: [PURPLE[0], PURPLE[2], PURPLE[4]][i] }))}
            />
            <CardInfo>
              <p>
                La mayoría se identifica como <b>católica ({pct(CATOLICA, POBTOT)}%)</b>. Las <b>otras religiones</b> concentran {pct(OTRASREL, POBTOT)}% y <b>sin religión</b> {pct(SINREL, POBTOT)}%.
                Esto orienta actividades culturales, festividades y comunicación comunitaria.
              </p>
            </CardInfo>
          </ChartCard>

          {/* Actividad económica */}
          <ChartCard title="Actividad económica (15+)" subtitle={`Población 15+: ${POB15MAS}`} className="min-h-[520px] md:col-span-2 xl:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Donut
                  data={peaData}
                  colors={[PURPLE[0], "#e5e7eb"]}
                  center={`${pct(PEA, POB15MAS)}% PEA`}
                  height="h-72"
                  margin={{ bottom: 24 }}
                  hideLegend
                />
                <LegendDots
                  items={peaData.map((d, i) => ({ name: d.name, color: [PURPLE[0], "#e5e7eb"][i] }))}
                />
              </div>
              <div>
                <Donut
                  data={peaSexoData}
                  colors={[PURPLE[0], PURPLE[2]]}
                  center={`${pct(PEA_M, PEA)}% M / ${pct(PEA_F, PEA)}% F`}
                  height="h-72"
                  margin={{ bottom: 24 }}
                  hideLegend
                />
                <LegendDots
                  items={peaSexoData.map((d, i) => ({ name: d.name, color: [PURPLE[0], PURPLE[2]][i] }))}
                />
              </div>
            </div>
            <CardInfo>
              <p>
                La <b>PEA</b> es <b>{PEA}</b> de <b>{POB15MAS}</b> personas de 15+: <b>{pct(PEA, POB15MAS)}%</b>.
                Dentro de la PEA, <b>{pct(PEA_M, PEA)}%</b> son hombres y <b>{pct(PEA_F, PEA)}%</b> mujeres. La participación femenina podría crecer con guarderías, capacitación y horarios flexibles.
              </p>
            </CardInfo>
          </ChartCard>

          {/* Salud: cobertura y afiliación — se extiende a todo el ancho */}
          <div className="md:col-span-2 xl:col-span-3">
            <ChartCard
              title="Derechohabiencia a servicios de salud"
              subtitle={`Cobertura general: ${pct(DER_SS, POBTOT)}%`}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Donut
                    data={ssCoberturaData}
                    colors={[PURPLE[0], "#e5e7eb"]}
                    center={`${pct(DER_SS, POBTOT)}% con servicio`}
                    height="h-72"
                    margin={{ bottom: 24 }}
                    hideLegend
                  />
                  <LegendDots
                    items={ssCoberturaData.map((d, i) => ({ name: d.name, color: [PURPLE[0], "#e5e7eb"][i] }))}
                  />
                </div>

                <div>
                  <Donut
                    data={ssDetalleData}
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
                    // Sin leyenda interna: usamos una externa debajo para evitar traslapes
                    hideLegend
                    margin={{ bottom: 0 }}
                  />
                  <LegendDots
                    items={ssDetalleData.map((d, i) => ({
                      name: d.name,
                      color: [
                        PURPLE[0],
                        PURPLE[1],
                        PURPLE[2],
                        PURPLE[3],
                        PURPLE[4],
                        "#a1a1aa",
                        "#b45309",
                        "#16a34a",
                      ][i],
                    }))}
                  />
                </div>
              </div>

              <CardInfo>
                <p>
                  <b>{DER_SS}</b> personas (<b>{pct(DER_SS, POBTOT)}%</b>) tienen derecho a algún servicio; <b>{SIN_SS}</b> (<b>{pct(SIN_SS, POBTOT)}%</b>) no.
                  La afiliación se concentra en <b>IMSS ({pct(IMSS, POBTOT)}%)</b> y <b>Seguro Popular ({pct(SP, POBTOT)}%)</b>, con menor presencia de ISSSTE u opciones privadas.
                  Esto sugiere que las jornadas médicas y convenios con IMSS serían las más efectivas.
                </p>
              </CardInfo>
            </ChartCard>
          </div>
        </div>

        <div className="mt-8 text-xs text-slate-500">
          Nota: Las cifras de derechohabiencia están desagregadas dentro de quienes reportan tener algún servicio (220). En tu fuente podrían permitir múltiple afiliación; aquí se muestran como distribución simple para lectura rápida.
        </div>
      </main>
    </div>
  );
}

// ---------------- UI helpers ----------------
function ChartCard({ title, subtitle, children, className = "" }) {
  return (
    <div className={`relative h-full overflow-hidden rounded-2xl p-[1px] bg-gradient-to-br from-purple-500/40 to-fuchsia-500/40 shadow-lg ${className}`}>
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
            {data.map((_, i) => (
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
