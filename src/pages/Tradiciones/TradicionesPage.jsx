import TradicionesContainer from "../../containers/Tradiciones/TradicionesContainer.jsx";

export default function TradicionesPage() {
  return (
    <main className="min-h-screen bg-background pt-24">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-light mb-2">
            Nuestras <span className="font-medium text-primary">Tradiciones</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Una muestra de las celebraciones y costumbres que nos representan.
          </p>
        </div>

        <TradicionesContainer />
      </div>
    </main>
  );
}
