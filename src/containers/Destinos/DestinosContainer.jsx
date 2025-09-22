import { useState } from "react";
import DestinosGrid from "../../components/organisms/Destinos/DestinosGrid.jsx";

export default function DestinosContainer() {
  const [hovered, setHovered] = useState(null);

  // Asegúrate de que estas imágenes existan en /public
  const destinos = [
    { id:"campo-futbol",     title:"Campo Fútbol",      description:"El corazón deportivo de la comunidad", image:"/soccer-field-with-green-grass-and-goal-posts.jpg",         color:"green" },
    { id:"escuela-primaria", title:"Escuela Primaria",  description:"Donde comienzan los sueños",           image:"/elementary-school-building-with-children-playing.jpg",     color:"blue" },
    { id:"cancha",           title:"Cancha",            description:"Espacio de encuentro y diversión",     image:"/basketball-court-with-hoops-and-painted-lines.jpg",        color:"orange" },
    { id:"iglesia",          title:"Iglesia",           description:"Centro espiritual de la comunidad",     image:"/beautiful-church-with-bell-tower-and-stained-glass.jpg",  color:"purple" },
    { id:"salon",            title:"Salón",             description:"Lugar de celebraciones y eventos",      image:"/elegant-event-hall-with-tables-and-decorations.jpg",       color:"pink" },
    { id:"rio",              title:"Río",               description:"La belleza natural que nos rodea",      image:"/peaceful-river-with-trees-and-rocks-along-the-bank.jpg",   color:"teal" },
  ];

  return (
    <DestinosGrid
      destinos={destinos}
      hovered={hovered}
      setHovered={setHovered}
    />
  );
}
