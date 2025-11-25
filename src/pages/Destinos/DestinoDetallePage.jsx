import { useDestinoDetalleData } from "../../containers/Destinos/DestinoDetalleContainer";
import DestinosLayout from "../../components/organisms/Destinos/DestinosLayout";
import { CarouselFotos } from "../../components/molecules/CarouselFotos";
import { CarouselVideos } from "../../components/molecules/CarouselVideos";
import { MapaPunto } from "../../components/molecules/MapaPunto";


export default function DestinoDetallePage() {
  const { data } = useDestinoDetalleData();

  if (!data) return <main className="pt-24 p-8">Destino no encontrado</main>;

  return (
    <DestinosLayout
      title={data.title}
      subtitle={data.subtitle}
      heroImage={data.heroImage}
      color={data.color}
    >
      <div className="space-y-12">
        <section>
          <h2 className="text-3xl font-medium mb-6">¿Qué es?</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {data.sections.queEs}
          </p>
        </section>

        <section className="p-8 rounded-2xl bg-muted/30">
          <h2 className="text-3xl font-medium mb-6">Historia</h2>
          <p className="text-muted-foreground">{data.sections.historia}</p>
        </section>

          <section>
          <h2 className="text-3xl font-medium mb-8">Datos Curiosos</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {data.sections.curiosos.map((c, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm border">
                <div className="text-2xl font-bold mb-2">{c.k}</div>
                <p className="text-muted-foreground">{c.v}</p>
              </div>
            ))}
          </div>
        </section>

          <section>
            <h2 className="text-3xl font-medium mb-8">Galería de Fotos</h2>
            <CarouselFotos fotos={data.galleryFotos} autoPlay={false} />
          </section>

          <section>
            <h2 className="text-3xl font-medium mb-8">Galería de Videos</h2>
            <CarouselVideos videos={data.galleryVideos} />
          </section>

          {data.coords && (
            <section>
              <h2 className="text-3xl font-medium mb-8">Ubicación en el mapa</h2>
              <p className="text-muted-foreground mb-4">
                Usa el mapa para explorar la zona y pulsa el botón para abrir la
                ubicación en Google Maps.
              </p>
              <MapaPunto
                nombre={data.title}
                lat={data.coords.lat}
                lng={data.coords.lng}
                zoom={data.coords.zoom ?? 17}
              />
            </section>
          )}

      </div>
    </DestinosLayout>
  );
}
