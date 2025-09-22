import DestinoCard from "../../molecules/DestinoCard.jsx";

export default function DestinosGrid({
  destinos = [],
  hovered,
  setHovered,
  linkBase = "/destinos",
  showLink = true,
  limit,
}) {
  const list = Array.isArray(destinos)
    ? (limit ? destinos.slice(0, limit) : destinos)
    : [];

  if (list.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-12">
        No hay destinos disponibles por el momento.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {list.map((d) => (
        <DestinoCard
          key={d.id}
          destino={d}
          hovered={hovered}
          setHovered={setHovered}
          linkBase={linkBase}   // 👈 PASA linkBase
          showLink={showLink}   // 👈 PASA showLink
        />
      ))}
    </div>
  );
}
