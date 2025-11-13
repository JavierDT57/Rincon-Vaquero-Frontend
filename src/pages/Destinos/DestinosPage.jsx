import DestinosContainer from "../../containers/Destinos/DestinosContainer.jsx";

export default function DestinosPage() {
  return (
    <main className="min-h-screen bg-background pt-1">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-6xl font-light mb-2">
            Descubre Nuestros <span className="font-medium text-primary">Destinos</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explora los lugares más emblemáticos de nuestra comunidad.
          </p>
        </div>

        {/* IMPORTANTE: usa el CONTAINER, no el Grid directo */}
        <DestinosContainer />
      </div>
    </main>
  );
}
