import { useParams } from "react-router-dom";
import DestinosLayout from "../../components/organisms/Destinos/DestinosLayout";

// FOTOS
import olaverde2 from "../../assets/Destinos/campo2.jpeg";
import primaria2 from "../../assets/Destinos/primaria2.png";
import cancha2 from "../../assets/Destinos/cancha2.jpeg";
import iglesia2 from "../../assets/Destinos/iglesia2.jpeg";
import salon2 from "../../assets/Destinos/salon2.jpg";
import rio2 from "../../assets/Destinos/rio2.jpg";

const base = {
  "campo-futbol": {
    title: "Campo Fútbol",
    subtitle: "El Corazón Deportivo de Nuestra Comunidad",
    heroImage: olaverde2,
    color: "green",

    galleryFotos: [
      {
        src: olaverde2,
        alt: "Campo de fútbol",
        titulo: "Campo de Fútbol",
        descripcion: "El orgullo deportivo de la comunidad."
      }
    ],

    galleryVideos: [],

    coords: {
       
      lat: 16.765906647515752,  
      lng: -95.0277525291214,
      zoom: 18,        
    },

    sections : {
      queEs:
        "El campo comunitario de Rincón Vaquero, ubicado en el barrio de la Soledad, es considerado uno de los más bonitos y amplios del municipio. Cuenta con una cancha de pasto delimitada y espacio alrededor para que las familias se sienten a ver los partidos. No solo es un espacio deportivo, sino también un punto de reunión para la comunidad, donde se convive, se organizan torneos y se celebran fechas especiales. Aquí entrena y juega La Ola Verde, el equipo representativo del pueblo, que por generaciones ha llevado los colores y el orgullo de Rincón Vaquero a otros campos de la región.",

      historia:
        "Desde 1950, el campo ha sido el lugar de entrenamiento del equipo Ola Verde y el escenario de partidos amistosos, torneos que la gente aún recuerda. Con el tiempo, la comunidad fue mejorando el espacio: se niveló el terreno, se colocaron porterías más resistentes y se marcaron las líneas de juego. La Ola Verde se ha mantenido como el equipo del pueblo por varias generaciones; padres, hijos y hasta nietos han vestido el uniforme. Una de las tradiciones más queridas es el partido del 31 de diciembre, donde cada año se enfrentan los jóvenes contra los veteranos, en un partido de nostalgia y convivencia. Hoy en día, el campo sigue siendo un símbolo vivo del pueblo, donde nuevas generaciones continúan la tradición de jugar, entrenar y reunirse alrededor del fútbol.",

      curiosos: [
        {
          k: "Clásico del 31 de diciembre",
          v: "Cada 31 de diciembre se juega el tradicional partido Jóvenes vs Veteranos, donde La Ola Verde se divide por generaciones. Es un encuentro lleno de emociones y recuerdos, que se ha convertido en parte de las fiestas de fin de año."
        },
        {
          k: "Partidos",
          v: "Cada sábado, el campo se llena de vida con los partidos de La Ola Verde y otros equipos locales, creando un ambiente de emoción, porras y convivencia entre familias y amigos."
        },
        {
          k: "Mantenimiento comunitario",
          v: "La comunidad se organiza para darle mantenimiento constante al campo: se limpia la cancha, se corta el pasto, se reparan porterías y se revisan las líneas, todo de manera colaborativa."
        },
        {
          k: "Softball ocasional",
          v: "Además del fútbol, el campo también se adapta para jugar softball de vez en cuando, aprovechando su tamaño y la buena visibilidad para los espectadores."
        },
        {
          k: "Más de 40 años",
          v: "El campo lleva más de cuatro décadas siendo testigo de la tradición futbolera del pueblo, viendo pasar generaciones de jugadores que comenzaron a entrenar desde niños."
        },
        {
          k: "Días de fiesta",
          v: "En días de fiesta patronal o celebraciones importantes, el campo suele ser sede de torneos relámpago y partidos especiales que atraen a equipos de otros pueblos."
        },
        {
          k: "Ambiente familiar",
          v: "Alrededor del campo es común ver familias completas, niños corriendo y personas mayores recordando anécdotas de partidos antiguos, lo que crea un ambiente seguro y familiar."
        },
        {
          k: "Atardeceres",
          v: "Por su ubicación, desde el campo se pueden apreciar atardeceres muy vistosos, lo que hace que los entrenamientos de la tarde tengan un paisaje especial de fondo."
        }
      ],
    },
  },

  "escuela-primaria": {
    title: "Escuela Primaria",
    subtitle: "Donde comienzan los sueños",
    heroImage: primaria2,
    color: "blue",

    galleryFotos: [
      {
        src: primaria2,
        alt: "Escuela primaria",
        titulo: "Escuela Primaria",
        descripcion: "Una institución con más de 70 años de historia."
      }
    ],

    galleryVideos: [],

    coords: {
        
      lat: 16.764252054034742, 
      lng: -95.0266958730034, 
      zoom: 19,        
    },

    sections: {
      queEs:
        "La Escuela Primaria de Rincón Vaquero es una de las instituciones educativas más antiguas...",
      historia:
        "Fundada hace más de siete décadas, ha formado generaciones completas...",
      curiosos: [
        { k: "70+ años", v: "Formando generaciones del pueblo" },
        { k: "Concursos ganados", v: "Oratoria, fútbol, olimpiadas" },
        { k: "Administración comunitaria", v: "Padres y tutores involucrados" },
        { k: "Profesionales egresados", v: "Muchos han llegado a universidades" },
        { k: "Mejoras constantes", v: "Modernización de aulas y canchas" },
      ],
    },
  },

  cancha: {
    title: "Cancha",
    subtitle: "Espacio de encuentro y diversión",
    heroImage: cancha2,
    color: "orange",

    galleryFotos: [
      {
        src: cancha2,
        alt: "Cancha de usos múltiples",
        titulo: "Cancha",
        descripcion: "Punto de reunión para el deporte y las fiestas."
      }
    ],

    galleryVideos: [],

    coords: {
      lat: 16.762573410011736, 
      lng: -95.03027459503166, 
      zoom: 19,        
    },

    sections: {
      queEs:
        "La cancha comunitaria es un espacio recreativo usado para voleibol, fútbol y eventos...",
      historia:
        "Nació como un terreno deportivo y se convirtió en el eje de la vida comunitaria...",
      curiosos: [
        { k: "Tardes deportivas", v: "Voleibol y fútbol infantil diario" },
        { k: "Fiestas", v: "Ideal para eventos comunitarios" },
        { k: "Conasupo", v: "Tienda subsidiada cercana" },
        { k: "Clínica", v: "Atención primaria disponible" },
      ],
    },
  },

  iglesia: {
    title: "Iglesia",
    subtitle: "Centro espiritual de la comunidad",
    heroImage: iglesia2,
    color: "purple",

    galleryFotos: [
      {
        src: iglesia2,
        alt: "Iglesia del pueblo",
        titulo: "Iglesia",
        descripcion: "Centro espiritual y cultural de Rincón Vaquero."
      }
    ],

    galleryVideos: [],

    coords: {
      lat: 16.7625879297972,  
      lng: -95.03102629787227,
      zoom: 19,        
    },

    sections: {
      queEs:
        "La Iglesia de Rincón Vaquero es el centro espiritual del pueblo, donde se celebran ceremonias...",
      historia:
        "Construida hace décadas, ha sido restaurada con apoyo de la comunidad...",
      curiosos: [
        { k: "Misa dominical", v: "Cada domingo se llena la iglesia" },
        { k: "Sacramentos", v: "Bautizos, bodas y más" },
        { k: "Fiestas patronales", v: "Procesiones y novenas" },
        { k: "Decoración", v: "Retablos y vitrales destacados" },
        { k: "Obras sociales", v: "Colectas y voluntariado" },
      ],
    },
  },

  salon: {
    title: "Salón",
    subtitle: "Lugar de celebraciones y eventos",
    heroImage: salon2,
    color: "pink",

    galleryFotos: [
      {
        src: salon2,
        alt: "Salón comunitario",
        titulo: "Salón de Eventos",
        descripcion: "El espacio principal para fiestas y reuniones."
      },
      {
        src: rio2,
        alt: "Río de Rincón Vaquero",
        titulo: "Río Natural",
        descripcion: "Lugar emblemático con nacederos y pozas."
      }
    ],

    galleryVideos: [],

    coords: {
      lat: 16.762347799524,   
      lng: -95.03106250769545, 
      zoom: 20,        
    },

    sections: {
      queEs:
        "El salón es el principal espacio cubierto del pueblo, usado para fiestas y eventos culturales...",
      historia:
        "Construido hace más de 60 años, con varias remodelaciones importantes...",
      curiosos: [
        { k: "Grito de Septiembre", v: "Sede principal del evento" },
        { k: "Capacidad", v: "Hasta 300 personas" },
        { k: "Remodelaciones", v: "Tres renovaciones grandes" },
        { k: "Multifuncional", v: "Cursos, asambleas y cine" },
      ],
    },
  },

  rio: {
    title: "Río",
    subtitle: "La belleza natural que nos rodea",
    heroImage: rio2,
    color: "teal",

    galleryFotos: [
      {
        src: rio2,
        alt: "Río de Rincón Vaquero",
        titulo: "Río Natural",
        descripcion: "Lugar emblemático con nacederos y pozas."
      }
    ],

    galleryVideos: [],

    coords: {

      lat: 16.760147412706495, 
      lng: -95.03083157690325 , 
      zoom: 18 ,        
    },
    sections: {
      queEs:
        "El río es un ícono natural del pueblo, con nacederos y pozas que atraen visitantes...",
      historia:
        "Desde tiempos ancestrales ha sido vital para el asentamiento y vida del pueblo...",
      curiosos: [
        { k: "4 nacederos", v: "Mantienen el caudal estable" },
        { k: "Tapada", v: "Tradición para profundizar pozas" },
        { k: "Lavada de ornamentos", v: "Ritual del 3 de mayo" },
        { k: "Bombeo", v: "Agua potable para la comunidad" },
        { k: "Semana Santa", v: "Mayor afluencia del año" },
      ],
    },
  },
};

// ----------- HOOK -----------
export function useDestinoDetalleData() {
  const { id } = useParams();
  const data = base[id] ?? null;
  return { id, data };
}

export default function DestinoDetalleContainer() {
  const { id } = useParams();
  const data = base[id];

  if (!data) return <div className="p-6">Destino “{id}” no encontrado.</div>;

  return (
    <DestinosLayout
      title={data.title}
      subtitle={data.subtitle}
      heroImage={data.heroImage}
      color={data.color}
    >
      <DestinoDetalleCard data={data} />
    </DestinosLayout>
  );
}
