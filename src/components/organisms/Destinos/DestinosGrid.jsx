import DestinoCard from "../../molecules/DestinoCard.jsx";

export default function DestinosGrid({ destinos = [], hovered, setHovered }) {
  console.log("[DestinosGrid] destinos:", destinos); // para verificar que llegue el array

  if (!Array.isArray(destinos) || destinos.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-12">
        No hay destinos disponibles por el momento.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {destinos.map((d) => (
        <DestinoCard
          key={d.id}
          destino={d}
          hovered={hovered}
          setHovered={setHovered}
        />
      ))}
    </div>
  );
}
