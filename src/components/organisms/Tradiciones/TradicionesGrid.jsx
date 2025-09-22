import DestinosGrid from "../Destinos/DestinosGrid.jsx";

export default function TradicionesGrid({
  tradiciones = [],
  hovered,
  setHovered,
  showLink = true,
}) {
  return (
    <DestinosGrid
      destinos={tradiciones}
      hovered={hovered}
      setHovered={setHovered}
      linkBase="/tradiciones" // 👈 RUTA CORRECTA
      showLink={showLink}     // true = Conocer más activo
      limit={3}               // 3 cards
    />
  );
}
