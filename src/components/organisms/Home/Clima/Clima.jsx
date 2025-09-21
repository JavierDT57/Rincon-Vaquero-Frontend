import { Card, CardContent } from "../../../molecules/Card";
import { Badge } from "../../../atoms/badge";
import { Sun, Cloud, Droplets, Thermometer, Eye, Wind } from "lucide-react"

const climaActual = {
  temperatura: "22°C",
  sensacion: "25°C",
  humedad: "65%",
  viento: "12 km/h",
  uv: "Moderado",
  lluvia: "10%",
  descripcion: "Parcialmente nublado",
}

const mejoresEpocas = [
  {
    meses: "Marzo - Mayo",
    titulo: "Primavera Mágica",
    descripcion: "Jacarandas en flor y ferias tradicionales. Clima perfecto para caminar.",
    temperatura: "18-25°C",
    actividades: ["Festival de Jacarandas", "Feria de Artesanías", "Senderismo"],
    color: "bg-green-100 text-green-800",
  },
  {
    meses: "Octubre - Diciembre",
    titulo: "Temporada Dorada",
    descripcion: "Día de Muertos y posadas navideñas. Cielos despejados y noches frescas.",
    temperatura: "15-22°C",
    actividades: ["Día de Muertos", "Las Posadas", "Observación de estrellas"],
    color: "bg-orange-100 text-orange-800",
  },
  {
    meses: "Enero - Febrero",
    titulo: "Invierno Seco",
    descripcion: "Días soleados y noches frías. Ideal para fogatas y chocolate caliente.",
    temperatura: "10-20°C",
    actividades: ["Carnaval", "Danzas tradicionales", "Gastronomía caliente"],
    color: "bg-blue-100 text-blue-800",
  },
  {
    meses: "Junio - Septiembre",
    titulo: "Temporada de Lluvias",
    descripción: "Paisajes verdes y cascadas. Perfecto para fotografía de naturaleza.",
    temperatura: "20-28°C",
    actividades: ["Fotografía", "Cascadas", "Festivales de música"],
    color: "bg-teal-100 text-teal-800",
  },
]

export function ClimaYEpoca() {
  return (
    <section className="py-20 px-4 bg-muted/30">
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

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">{climaActual.temperatura}</div>
                  <p className="text-sm text-muted-foreground">Temperatura</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-semibold text-muted-foreground mb-2">{climaActual.sensacion}</div>
                  <p className="text-sm text-muted-foreground">Sensación térmica</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Droplets className="w-4 h-4 text-blue-500" />
                    <span className="text-sm">Humedad</span>
                  </div>
                  <span className="font-medium">{climaActual.humedad}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Wind className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">Viento</span>
                  </div>
                  <span className="font-medium">{climaActual.viento}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-purple-500" />
                    <span className="text-sm">Índice UV</span>
                  </div>
                  <Badge variant="secondary">{climaActual.uv}</Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Cloud className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">Probabilidad de lluvia</span>
                  </div>
                  <span className="font-medium">{climaActual.lluvia}</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-muted rounded-lg">
                <p className="text-center text-sm">
                  <strong>Condiciones actuales:</strong> {climaActual.descripcion}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Pronóstico Semanal */}
          <Card>
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold mb-6">Pronóstico de 7 días</h3>

              <div className="space-y-4">
                {["Hoy", "Mañana", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"].map((dia, index) => (
                  <div key={dia} className="flex items-center justify-between py-2">
                    <span className="font-medium w-20">{dia}</span>
                    <div className="flex items-center gap-2">
                      {index % 3 === 0 ? (
                        <Sun className="w-4 h-4 text-yellow-500" />
                      ) : index % 3 === 1 ? (
                        <Cloud className="w-4 h-4 text-gray-400" />
                      ) : (
                        <Droplets className="w-4 h-4 text-blue-500" />
                      )}
                    </div>
                    <div className="text-right">
                      <span className="font-semibold">{22 - index}°</span>
                      <span className="text-muted-foreground ml-2">{15 - index}°</span>
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
  )
}
