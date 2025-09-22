import { useState } from "react";
import TradicionesGrid from "../../components/organisms/Tradiciones/TradicionesGrid.jsx";

export default function TradicionesContainer() {
  const [hovered, setHovered] = useState(null);

  // 3 tradiciones (ajusta imágenes en /public/tradiciones/*)
  const tradiciones = [
    {
      id: "fiesta-patronal",
      title: "Fiesta Patronal",
      description: "Celebra la identidad del pueblo",
      image: "/tradiciones/fiesta-patronal.jpg",
    },
    {
      id: "feria-artesanal",
      title: "Feria Artesanal",
      description: "Talento y cultura local",
      image: "/tradiciones/feria-artesanal.jpg",
    },
    {
      id: "danza-tradicional",
      title: "Danza Tradicional",
      description: "Herencia viva que nos une",
      image: "/tradiciones/danza-tradicional.jpg",
    },
  ];

  return (
    <TradicionesGrid
      tradiciones={tradiciones}
      hovered={hovered}
      setHovered={setHovered}
    />
  );
}
