import DestinosGrid from "../Destinos/DestinosGrid.jsx";

export default function TradicionesGrid({ tradiciones = [], hovered, setHovered }) {
  return (
    <DestinosGrid
      destinos={tradiciones}
      hovered={hovered}
      setHovered={setHovered}
      linkBase="/tradiciones"
      showLink={false}   // 👈 no navega (aparece “Próximamente”)
      limit={3}          // 👈 solo 3 cards
    />
  );
}
