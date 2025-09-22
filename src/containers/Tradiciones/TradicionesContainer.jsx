import { useState } from "react";
import TradicionesGrid from "../../components/organisms/Tradiciones/TradicionesGrid.jsx";

export default function TradicionesContainer() {
  const [hovered, setHovered] = useState(null);

  const tradiciones = [
    { id:"fiesta-patronal",  title:"Fiesta Patronal",  description:"El corazón festivo de la comunidad",  image:"/tradiciones/fiesta-patronal.jpg" },
    { id:"semana-santa",     title:"Semana Santa",     description:"Tradición de fe y comunidad",          image:"/tradiciones/semana-santa.jpg" },
    { id:"navidad",          title:"Navidad",          description:"Luz, posadas y comunidad",             image:"/tradiciones/navidad.jpg" },
  ];

  return (
    <TradicionesGrid
      tradiciones={tradiciones}
      hovered={hovered}
      setHovered={setHovered}
      showLink={true}
    />
  );
}
