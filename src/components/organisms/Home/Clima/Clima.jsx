// src/components/organisms/ClimaYEpoca/ClimaYEpoca.jsx
import React from "react";
import { Card, CardContent } from "../../../molecules/Card";
import { Badge } from "../../../atoms/badge";
import { Sun, Cloud, Droplets, Thermometer, Eye, Wind, Loader2, AlertTriangle } from "lucide-react";

// Icono según tipo mapeado desde el container/hook
function WeatherIcon({ type }) {
  if (type === "sun") return <Sun className="w-4 h-4 text-yellow-500" />;
  if (type === "rain") return <Droplets className="w-4 h-4 text-blue-500" />;
  return <Cloud className="w-4 h-4 text-gray-400" />; // default: nubes
}

// Fallbacks para cuando aún no hay datos
const FALLBACK_ACTUAL = {
  temperatura: "—",
  sensacion: "—",
  humedad: "—",
  viento: "—",
  uv: "—",
  lluvia: "—",
  descripcion: "Cargando...",
};

const FALLBACK_SEMANA = ["Hoy", "Mañana", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"].map(
  (dia, i) => ({
    dia,
    tMax: "—",
    tMin: "—",
    icon: i % 3 === 0 ? "sun" : i % 3 === 1 ? "cloud" : "rain",
  })
);

// Bloque estático 
const mejoresEpocas = [
  {
    meses: "Marzo – Abril",
    titulo: "Semana Santa",
    descripcion:
      "Días de fe y tradición: viacrucis, procesiones y vendimia en el rio. El pueblo se vive con intensidad y calidez comunitaria.",
    temperatura: "Caluroso",
    actividades: ["Viacrucis","Ir al rio","Ir al Baile en la noche", "Disfrutar musica en vivo"], 
    color: "bg-emerald-100 text-emerald-800",
  },
  {
    meses: "Mayo",
    titulo: "Fiestas de la Santa Cruz",
    descripcion:
      "Celebración patronal que reúne a todos: la Cruz se adorna, hay rezos, música y convivencia que fortalecen la identidad del pueblo.",
    temperatura: "Caluroso",
    actividades: ["Lavada de ornamentos", "Labrada de velas", "Calenda","Santa Cruz", "Lavada de ollas"],
    color: "bg-emerald-100 text-emerald-800",
  },
];


export function ClimaYEpoca({ climaActual, semana, loading = false, error = null }) {
  const actual = climaActual ?? FALLBACK_ACTUAL;
  const listaSemana = (semana && semana.length > 0 ? semana : FALLBACK_SEMANA).slice(0, 7);

  return (
    <section className="py-10 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif mb-6 text-balance">Clima & Mejor Época</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Planifica tu visita conociendo el clima y las mejores temporadas para disfrutar cada experiencia
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Clima Actual */}
          <Card className="overflow-hidden">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <Sun className="w-6 h-6 text-yellow-500" />
                <h3 className="text-2xl font-semibold">Clima Actual</h3>
              </div>

              {loading && (
                <div className="flex items-center gap-2 text-muted-foreground mb-6">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Cargando pronóstico…
                </div>
              )}

              {error && (
                <div className="flex items-center gap-2 text-red-600 mb-6">
                  <AlertTriangle className="w-4 h-4" />
                  No se pudo cargar el clima. Intenta de nuevo más tarde.
                </div>
              )}

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">{actual.temperatura}</div>
                  <p className="text-sm text-muted-foreground">Temperatura</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">{actual.sensacion}</div>
                  <p className="text-sm text-muted-foreground">Sensación térmica</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Droplets className="w-4 h-4 text-blue-500" />
                    <span className="text-sm">Humedad</span>
                  </div>
                  <span className="font-medium">{actual.humedad}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Wind className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">Viento</span>
                  </div>
                  <span className="font-medium">{actual.viento}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-purple-500" />
                    <span className="text-sm">Índice UV</span>
                  </div>
                  <Badge variant="secondary">{actual.uv}</Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Cloud className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">Probabilidad de lluvia</span>
                  </div>
                  <span className="font-medium">{actual.lluvia}</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-primary rounded-lg">
                <p className="text-center  text-sm !text-white">
                  <strong>Condiciones actuales:</strong> {actual.descripcion}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Pronóstico Semanal */}
          <Card>
            <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                <Sun className="w-6 h-6 text-yellow-500" />
                <h3 className="text-2xl font-semibold">Pronóstico de 7 días</h3>
                </div>
              

              {loading && (
                <div className="flex items-center gap-2 text-muted-foreground mb-4">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Cargando…
                </div>
              )}

              <div className="space-y-4">
                {listaSemana.map((d, index) => (
                  <div key={`${d.dia}-${index}`} className="flex items-center justify-between py-2">
                    <span className="font-medium w-24 capitalize">{d.dia}</span>
                    <div className="flex items-center gap-2">
                      <WeatherIcon type={d.icon} />
                    </div>
                    <div className="text-right">
                      <span className="font-semibold">
                        {typeof d.tMax === "number" ? `${d.tMax}°` : d.tMax}
                      </span>
                      <span className="text-muted-foreground ml-2">
                        {typeof d.tMin === "number" ? `${d.tMin}°` : d.tMin}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Mejores Épocas */}
        <div>
          <h3 className="text-3xl font-serif text-center mb-12">Mejores Épocas para Visitar</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {mejoresEpocas.map((epoca, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Badge className={epoca.color}>{epoca.meses}</Badge>
                    <div className="flex items-center gap-1">
                      <Thermometer className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{epoca.temperatura}</span>
                    </div>
                  </div>

                  <h4 className="text-xl font-semibold mb-3">{epoca.titulo}</h4>
                  <p className="text-muted-foreground mb-4 leading-relaxed">{epoca.descripcion}</p>

                  <div>
                    <p className="text-sm font-medium mb-2">Actividades destacadas:</p>
                    <div className="flex flex-wrap gap-2">
                      {epoca.actividades.map((actividad, actIndex) => (
                        <Badge key={actIndex} variant="outline" className="text-xs">
                          {actividad}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ClimaYEpoca;
