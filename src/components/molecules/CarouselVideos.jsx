import { useState } from 'react'
import { ChevronLeft, ChevronRight, Play } from 'lucide-react'
import  Button  from '../../components/atoms/Button'

export function CarouselVideos({ 
  videos = [],
  autoPlay = false,
  intervalo = 8000 
}) {
  const [indiceActual, setIndiceActual] = useState(0)
  const [videoEnReproduccion, setVideoEnReproduccion] = useState(false)

  if (!videos || videos.length === 0) {
    return (
      <div className="w-full bg-muted rounded-lg flex items-center justify-center h-96">
        <p className="text-muted-foreground">No hay videos disponibles</p>
      </div>
    )
  }

  const irAnterior = () => {
    setIndiceActual((prev) => 
      prev === 0 ? videos.length - 1 : prev - 1
    )
    setVideoEnReproduccion(false)
  }

  const irSiguiente = () => {
    setIndiceActual((prev) => (prev + 1) % videos.length)
    setVideoEnReproduccion(false)
  }

  const videoActual = videos[indiceActual]

  return (
    <div className="relative w-full group">
      {/* Contenedor del video */}
      <div className="relative w-full h-96 overflow-hidden rounded-lg bg-black">
        {videoEnReproduccion ? (
          <iframe
            width="100%"
            height="100%"
            src={`${videoActual.src}?autoplay=1`}
            title={videoActual.titulo}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        ) : (
          <>
            {/* Thumbnail */}
            <img
              src={videoActual.thumbnail || "/placeholder.svg"}
              alt={videoActual.alt || `Video ${indiceActual + 1}`}
              className="w-full h-full object-cover"
            />
            
            {/* Overlay para reproducción */}
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <Button
                size="icon"
                className="w-20 h-20 rounded-full bg-white/90 hover:bg-white"
                onClick={() => setVideoEnReproduccion(true)}
                aria-label="Reproducir video"
              >
                <Play className="w-8 h-8 fill-black text-black" />
              </Button>
            </div>
          </>
        )}

        {/* Información del video */}
        {videoActual.titulo && !videoEnReproduccion && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
            <h3 className="text-white text-xl font-semibold">
              {videoActual.titulo}
            </h3>
            {videoActual.descripcion && (
              <p className="text-white/80 text-sm mt-1">
                {videoActual.descripcion}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Botones de navegación */}
      {!videoEnReproduccion && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={irAnterior}
            aria-label="Video anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={irSiguiente}
            aria-label="Siguiente video"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </>
      )}

      {/* Indicadores de puntos */}
      {!videoEnReproduccion && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {videos.map((_, indice) => (
            <button
              key={indice}
              onClick={() => {
                setIndiceActual(indice)
                setVideoEnReproduccion(false)
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                indice === indiceActual 
                  ? 'bg-white w-6' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Ir a video ${indice + 1}`}
            />
          ))}
        </div>
      )}

      {/* Contador */}
      {!videoEnReproduccion && (
        <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
          {indiceActual + 1} / {videos.length}
        </div>
      )}
    </div>
  )
}