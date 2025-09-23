import { useState, useEffect } from "react"
import { Card, CardContent } from "../../../molecules/Card";
import Button from "../../../atoms/Button"
import { Badge } from "../../../atoms/badge";
import { ChevronLeft, ChevronRight, Star, Quote, MapPin, Calendar } from "lucide-react"

import olaverde from "../../../../assets/Home/campo1.jpeg";
import rio2 from "../../../../assets/Home/rio2.jpg";
import tequio1 from "../../../../assets/Home/tequio1.png";

const testimonios = [
  {
    id: 1,
    nombre: "María González",
    origen: "Ciudad de México",
    fecha: "Abril 2025",
    rating: 5,
    testimonio:
      "Lo que más me gustó fue la autenticidad del pueblo. El rio en semana santa es espectacular y la gente es muy amable.",
    foto: rio2,
  },
  {
    id: 2,
    nombre: "Jonatan Badillo",
    origen: "Puebla",
    fecha: "Agosto 2025",
    rating: 5,
    testimonio:
      "Increible el ambiente que se vive un partido de la ola verde.",
    foto: olaverde,
  },
  {
    id: 3,
    nombre: "Ana Ruiz",
    origen: "Oaxaca",
    fecha: "Marzo 2025",
    rating: 5,
    testimonio:
      "EL apoyo comunitario y de la empresa Cruz Azul, ayuda a mantener el rio y todo el pueblo limpio.",
    foto: tequio1,
  },
]

export function TestimoniosYFotos() {
  const [testimonioActual, setTestimonioActual] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)

  useEffect(() => {
    if (!autoPlay) return

    const interval = setInterval(() => {
      setTestimonioActual((prev) => (prev + 1) % testimonios.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [autoPlay])

  const siguienteTestimonio = () => {
    setTestimonioActual((prev) => (prev + 1) % testimonios.length)
    setAutoPlay(false)
  }

  const testimonioAnterior = () => {
    setTestimonioActual((prev) => (prev - 1 + testimonios.length) % testimonios.length)
    setAutoPlay(false)
  }

  const testimonioSeleccionado = testimonios[testimonioActual]

  return (
    <section className="py-20 px-4 bg-muted/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif mb-6 text-balance">Testimonios & Fotos de Visitantes</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Descubre por qué nuestros visitantes se enamoran de Rincón Vaquero y regresan una y otra vez
          </p>
        </div>

        <div className="relative">
          <Card className="overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Imagen */}
              <div className="relative h-96 lg:h-auto">
                <img
                  src={testimonioSeleccionado.foto || "/placeholder.svg"}
                  alt={`Experiencia de ${testimonioSeleccionado.nombre}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-white/90 text-primary">{testimonioSeleccionado.experiencia}</Badge>
                </div>
              </div>

              {/* Testimonio */}
              <CardContent className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="mb-6">
                  <Quote className="w-8 h-8 text-primary mb-4" />
                  <p className="text-lg leading-relaxed mb-6 italic">"{testimonioSeleccionado.testimonio}"</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(testimonioSeleccionado.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  <div>
                    <h4 className="font-semibold text-lg">{testimonioSeleccionado.nombre}</h4>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>{testimonioSeleccionado.origen}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{testimonioSeleccionado.fecha}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </div>
          </Card>

          {/* Controles de navegación */}
          <div className="flex items-center justify-between mt-8">
            <Button variant="outline" size="icon" onClick={testimonioAnterior} className="rounded-full ">
              <ChevronLeft className="w-4 h-4" />
            </Button>

            <div className="flex items-center gap-2">
              {testimonios.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setTestimonioActual(index)
                    setAutoPlay(false)
                  }}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === testimonioActual ? "bg-black" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>

            <Button variant="outline" size="icon" onClick={siguienteTestimonio} className="rounded-full ">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Card className="max-w-lg mx-auto">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold mb-4">¿Ya visitaste Rincón Vaquero?</h3>
              <p className="text-muted-foreground mb-6">Comparte tu experiencia y fotos con otros viajeros</p>
              <Button className="w-full">Compartir mi experiencia</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
