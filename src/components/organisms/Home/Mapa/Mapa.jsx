import { useState } from "react"
import { Card, CardContent } from "../../../molecules/Card";
import Button from "../../../atoms/Button"
import { MapPin, Navigation, Phone, Clock } from "lucide-react"

/* IMPORTA AQUI TUS IMÁGENES desde src/assets */
import iglesia from "../../../../assets/Home/Iglesia.jpeg";

export function MapaInteractivo() {
  const [mapaClicked, setMapaClicked] = useState(false)

  const handleMapaClick = () => {
    setMapaClicked(true)
    // Abre en otra pestaña el link de Google Maps
    window.open(
      "https://maps.app.goo.gl/TNd4Lg2ib6wy5UCo7", 
      "_blank", 
      "noopener,noreferrer"
    )
  }

  return (
    <section className="py-20 px-4 mx-auto">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif mb-6 text-balance">Encuéntranos</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Rincón Vaquero te espera en el corazón del Istmo, donde la magia se vive en cada esquina
          </p>
        </div>

        <div className="grid grid-cols-1  gap-12 items-center justify-center">
          <div className="relative justify-center">
            <Card className="overflow-hidden">
              <div
                className="relative h-96 bg-cover bg-center cursor-pointer group"
                style={{
                    backgroundImage: `url(${iglesia})`,
                    }}
                onClick={handleMapaClick}
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 text-center shadow-lg">
                    <MapPin className="w-8 h-8 text-primary mx-auto mb-3" />
                    <h4 className="text-lg font-semibold mb-2">Rincón Vaquero</h4>
                    <p className="text-sm text-muted-foreground mb-4">Haz clic para ver en Google Maps</p>
                    <Button onClick={handleMapaClick} className="w-full">
                      <Navigation className="w-4 h-4 mr-2" />
                      Abrir Mapa
                    </Button>
                  </div>
                </div>

                {/* Marcador animado */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <div className="w-4 h-4 bg-primary rounded-full animate-ping absolute"></div>
                    <div className="w-4 h-4 bg-primary rounded-full"></div>
                  </div>
                </div>
              </div>

              {mapaClicked && (
                <div className="p-4 bg-green-50 border-t border-green-200">
                  <p className="text-sm text-green-700 text-center">
                    ¡Perfecto! El mapa se abrio en una nueva ventana
                  </p>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
