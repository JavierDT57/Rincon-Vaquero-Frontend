// src/containers/Destinos/DestinoDetalleContainer.jsx
import { useParams } from "react-router-dom";

/**
 * Base de contenido para cada destino.
 * Asegúrate de que las imágenes existan en /public
 */
const base = {
  "campo-futbol": {
    title: "Campo Fútbol",
    subtitle: "El Corazón Deportivo de Nuestra Comunidad",
    heroImage: "/beautiful-soccer-field-with-mountains-in-backgroun.jpg",
    color: "green",
    images: [
      "/soccer-field-aerial-view-with-players.jpg",
      "/soccer-goal-with-net-and-grass-field.jpg",
      "/placeholder-7sw9n.png",
      "/soccer-field-at-sunset-with-beautiful-lighting.jpg",
    ],
    sections: {
      queEs:
        "Nuestro campo de fútbol es más que un simple espacio deportivo: aquí se reúnen familias, se organizan torneos locales y se fomenta el trabajo en equipo.",
      historia:
        "Construido en 1985 por la comunidad local y renovado varias veces. Ha sido sede de copas regionales.",
      curiosos: [
        { k: "500+", v: "Partidos jugados anualmente" },
        { k: "12", v: "Equipos locales entrenan aquí" },
        { k: "1985", v: "Año de construcción" },
        { k: "105×68 m", v: "Dimensiones oficiales FIFA" },
      ],
    },
  },

  "escuela-primaria": {
    title: "Escuela Primaria",
    subtitle: "Donde comienzan los sueños",
    heroImage: "/elementary-school-building-with-children-playing.jpg",
    color: "blue",
    images: [
      "/children-playing-in-school-yard.jpg",
      "/school-classroom-with-desks-and-board.jpg",
      "/books-and-pencils-on-desk.jpg",
      "/school-hallway-lockers.jpg",
    ],
    sections: {
      queEs:
        "La escuela primaria es el lugar donde se forman los cimientos académicos y valores de la niñez.",
      historia:
        "Inaugurada en 1992 con apoyo estatal y participación de la comunidad.",
      curiosos: [
        { k: "300+", v: "Alumnos inscritos por ciclo" },
        { k: "18", v: "Docentes y personal educativo" },
        { k: "1992", v: "Año de inauguración" },
        { k: "1:17", v: "Relación aprox. maestro/alumno" },
      ],
    },
  },

  cancha: {
    title: "Cancha",
    subtitle: "Espacio de encuentro y diversión",
    heroImage: "/basketball-court-with-hoops-and-painted-lines.jpg",
    color: "orange",
    images: [
      "/outdoor-basketball-court-sunset.jpg",
      "/basketball-hoop-closeup.jpg",
      "/volleyball-net-on-court.jpg",
      "/multisport-court-lines-colorful.jpg",
    ],
    sections: {
      queEs:
        "La cancha multiusos permite practicar baloncesto, voleibol y actividades recreativas.",
      historia:
        "Levantada en 2001 como parte de un programa de espacios públicos. Mantenimiento en 2012 y 2021.",
      curiosos: [
        { k: "3", v: "Deportes principales (Básquet, Voleibol, Futsal)" },
        { k: "30 m", v: "Longitud aproximada" },
        { k: "Iluminación", v: "Focos LED para uso nocturno" },
        { k: "Graderío", v: "Área para espectadores" },
      ],
    },
  },

  iglesia: {
    title: "Iglesia",
    subtitle: "Centro espiritual de la comunidad",
    heroImage: "/beautiful-church-with-bell-tower-and-stained-glass.jpg",
    color: "purple",
    images: [
      "/church-interior-with-pews-and-altar.jpg",
      "/stained-glass-window-colorful.jpg",
      "/church-bell-tower-blue-sky.jpg",
      "/candlelight-prayer-inside-church.jpg",
    ],
    sections: {
      queEs:
        "La iglesia es un símbolo de identidad y tradición. Aquí se celebran misas, bautizos, bodas y festividades.",
      historia:
        "Capilla original de mediados del siglo XX. El templo actual se terminó a finales de los 90.",
      curiosos: [
        { k: "Patrona", v: "Fiesta mayor en julio" },
        { k: "Coros", v: "Participación de coros juveniles" },
        { k: "Campanario", v: "Toques tradicionales en festividades" },
        { k: "Mural", v: "Arte local en el presbiterio" },
      ],
    },
  },

  salon: {
    title: "Salón",
    subtitle: "Lugar de celebraciones y eventos",
    heroImage: "/elegant-event-hall-with-tables-and-decorations.jpg",
    color: "pink",
    images: [
      "/event-hall-with-stage-and-lights.jpg",
      "/banquet-tables-with-centerpieces.jpg",
      "/dance-floor-with-dj-booth.jpg",
      "/event-decor-lights-and-drapes.jpg",
    ],
    sections: {
      queEs:
        "El salón comunitario se utiliza para bodas, cumpleaños, asambleas y talleres.",
      historia:
        "Construido en 2008 con apoyo municipal. Renovación de iluminación en 2018.",
      curiosos: [
        { k: "300", v: "Capacidad aproximada de personas" },
        { k: "Escenario", v: "Ideal para presentaciones" },
        { k: "Cocina", v: "Área de apoyo para banquetes" },
        { k: "Audio", v: "Sistema básico integrado" },
      ],
    },
  },

  rio: {
    title: "Río",
    subtitle: "La belleza natural que nos rodea",
    heroImage: "/peaceful-river-with-trees-and-rocks-along-the-bank.jpg",
    color: "teal",
    images: [
      "/river-bend-with-clear-water.jpg",
      "/river-rocks-and-forest.jpg",
      "/wooden-bridge-over-river.jpg",
      "/sunlight-reflection-on-river.jpg",
    ],
    sections: {
      queEs:
        "El río es un entorno natural para el descanso y la contemplación. Paisajes ideales para caminatas y fotografía.",
      historia:
        "Parte esencial del desarrollo local, antaño para riego y actividades productivas. Hoy se impulsa su cuidado.",
      curiosos: [
        { k: "Fauna", v: "Aves, peces y pequeños mamíferos" },
        { k: "Senderos", v: "Rutas informales para caminatas" },
        { k: "Temporada", v: "Mayor caudal en lluvias" },
        { k: "Educación", v: "Jornadas de limpieza y reciclaje" },
      ],
    },
  },
};

export default function DestinoDetalleContainer() {
  const { id } = useParams();
  const data = base[id] ?? null;
  return { id, data };
}
