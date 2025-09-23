import { useDestinoDetalleData } from "../../containers/Destinos/DestinoDetalleContainer";
import DestinosLayout from "../../components/organisms/Destinos/DestinosLayout";
import ImageCarousel from "../../components/organisms/Destinos/ImageCarousel";

export default function DestinoDetallePage() {
  // ✅ usar el hook, no llamar el container como función
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
          <h2 className="text-3xl font-medium mb-8">Galería de Imágenes</h2>

        </section>
      </div>
    </DestinosLayout>
  );
}
