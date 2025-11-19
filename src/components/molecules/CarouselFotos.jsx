import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import  Button  from '../../components/atoms/Button'

export function CarouselFotos({ 
  fotos = [],
  autoPlay = false,
  intervalo = 5000 
}) {
const [indiceActual, setIndiceActual] = useState(0)

  if (autoPlay && fotos.length > 0) {
    setTimeout(() => {
      setIndiceActual((prev) => (prev + 1) % fotos.length)
    }, intervalo)
  }

  if (!fotos || fotos.length === 0) {
    return (
      <div className="w-full bg-muted rounded-lg flex items-center justify-center h-96">
        <p className="text-muted-foreground">No hay fotos disponibles</p>
      </div>
    )
  }

  const irAnterior = () => {
    setIndiceActual((prev) => 
      prev === 0 ? fotos.length - 1 : prev - 1
    )
  }

  const irSiguiente = () => {
    setIndiceActual((prev) => (prev + 1) % fotos.length)
  }

  const fotoActual = fotos[indiceActual]

  return (
    <div className="relative w-full group">
      {/* Contenedor de la imagen */}
      <div className="relative w-full h-96 overflow-hidden rounded-lg bg-muted">
        <img
          src={fotoActual.src || "/placeholder.svg"}
          alt={fotoActual.alt || `Foto ${indiceActual + 1}`}
          className="w-full h-full object-cover transition-opacity duration-500"
        />
        
        {/* Overlay con información */}
        {fotoActual.titulo && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
            <h3 className="text-white text-xl font-semibold">
              {fotoActual.titulo}
            </h3>
            {fotoActual.descripcion && (
              <p className="text-white/80 text-sm mt-1">
                {fotoActual.descripcion}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Botones de navegación */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={irAnterior}
        aria-label="Foto anterior"
      >
        <ChevronLeft className="w-5 h-5" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={irSiguiente}
        aria-label="Siguiente foto"
      >
        <ChevronRight className="w-5 h-5" />
      </Button>

      {/* Indicadores de puntos */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {fotos.map((_, indice) => (
          <button
            key={indice}
            onClick={() => setIndiceActual(indice)}
            className={`w-2 h-2 rounded-full transition-all ${
              indice === indiceActual 
                ? 'bg-white w-6' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Ir a foto ${indice + 1}`}
          />
        ))}
      </div>

      {/* Contador */}
      <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
        {indiceActual + 1} / {fotos.length}
      </div>
    </div>
  )
}

