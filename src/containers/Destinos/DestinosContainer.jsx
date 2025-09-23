import { useState } from "react";
import DestinosGrid from "../../components/organisms/Destinos/DestinosGrid.jsx";
import olaverde from "../../assets/Destinos/campo1.jpeg";
import primaria1 from "../../assets/Destinos/primaria1.jpg";
import cancha1 from "../../assets/Destinos/cancha1.jpg";
import iglesia1 from "../../assets/Destinos/iglesia1.jpg";
import salon1 from "../../assets/Destinos/salon1.jpg";
import rio1 from "../../assets/Destinos/rio1.jpg";


export default function DestinosContainer() {
  const [hovered, setHovered] = useState(null);

  
  // Asegúrate de que estas imágenes existan en /public
  const destinos = [
    { id:"campo-futbol",     title:"Campo Fútbol",      description:"El corazón deportivo de la comunidad", image:olaverde,},
    { id:"escuela-primaria", title:"Escuela Primaria",  description:"Donde comienzan los sueños",           image:primaria1,},
    { id:"cancha",           title:"Cancha",            description:"Espacio de encuentro y diversión",     image:cancha1,},
    { id:"iglesia",          title:"Iglesia",           description:"Centro espiritual de la comunidad",     image:iglesia1,},
    { id:"salon",            title:"Salón",             description:"Lugar de celebraciones y eventos",      image:salon1,},
    { id:"rio",              title:"Río",               description:"La belleza natural que nos rodea",      image:rio1,},
  ];

  return (
    <DestinosGrid
      destinos={destinos}
      hovered={hovered}
      setHovered={setHovered}
    />
  );
}
