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
        "La Escuela Primaria de Rincón Vaquero es una escuela rural ubicada en el corazón de la comunidad. Es una de las instituciones educativas más antiguas del pueblo y, al mismo tiempo, uno de sus pilares más importantes. Ofrece el máximo grado de estudios disponible dentro de Rincón Vaquero, por lo que representa una oportunidad clave para que niñas y niños puedan iniciar y completar su educación básica sin salir de la comunidad. Cuenta con aulas remodeladas, un domo muy bonito que protege de sol y lluvia durante los actos cívicos y actividades deportivas, y un ambiente cercano entre alumnos, maestros y familias.",

      historia:
        "Fundada hace alrededor de 70 años, la escuela primaria surgió como respuesta a la necesidad de darle continuidad a los estudios de los niños de la comunidad, especialmente porque el preescolar también se encuentra en Rincón Vaquero. Desde entonces, ha formado generaciones completas de estudiantes que más tarde han continuado con la secundaria, el bachillerato y hasta la universidad. A lo largo de las décadas, la escuela ha pasado por varias etapas de mejora: primero con aulas sencillas y techos básicos, después con la construcción de salones más amplios, y recientemente con remodelaciones apoyadas por el gobierno y la buena administración de la comunidad. El domo, la modernización de las aulas y el cuidado constante han hecho que la escuela luzca más ordenada, cómoda y digna para el aprendizaje. Para muchos profesionistas del pueblo, esta primaria fue el primer paso y la base fundamental de su formación académica y personal.",

      curiosos: [
        {
          k: "70+ años de historia",
          v: "Tiene más de siete décadas formando generaciones de niñas y niños de Rincón Vaquero, muchos de los cuales hoy son profesionistas."
        },
        {
          k: "Domo y remodelaciones",
          v: "Gracias a los apoyos del gobierno y a una buena administración, la escuela cuenta con un domo muy bonito y aulas remodeladas que mejoran el ambiente de estudio."
        },
        {
          k: "Concursos ganados",
          v: "Alumnos de la escuela han participado y ganado en concursos de oratoria, fútbol y conocimiento, poniendo en alto el nombre de la comunidad."
        },
        {
          k: "Base para profesionistas",
          v: "De esta primaria han egresado jóvenes que después estudiaron licenciaturas y carreras técnicas."
        },
        {
          k: "Administración comunitaria",
          v: "Padres de familia y tutores se involucran activamente en comités y actividades, apoyando la gestión de recursos y las mejoras constantes."
        },
        {
          k: "Apoyo indispensable",
          v: "Para muchas familias, la escuela es un apoyo indispensable, pues les permite ofrecer educación a sus hijos sin tener que enviarlos a otras localidades."
        }
      ]
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
        "La cancha comunitaria de Rincón Vaquero es un espacio recreativo para el pueblo. Es una cancha multiusos donde se puede jugar fútbol, básquetbol y, más recientemente, voleibol, especialmente entre jóvenes de la comunidad. Casi todos los días se juegan partidos improvisados y pláticas. En el mismo punto se encuentra una tienda DICONSA, pensada para ofrecer productos de la canasta básica a precios más accesibles para las familias. A un costado también se localiza un pequeño dispensario de salud, donde los habitantes pueden acudir en caso de malestar y donde llegan brigadas de vacunación.",

      historia:
        "La cancha nació como un terreno deportivo sencillo, donde al inicio solo se trazaban las porterías y las líneas de juego con cal o incluso con piedras. Con el paso del tiempo, y gracias al esfuerzo de la comunidad, el espacio fue mejorando: se niveló el piso, se colocó firme, se pintaron las líneas para fútbol y básquetbol, y se instalaron tableros y porterías más resistentes. Más adelante, con apoyo de programas del gobierno y la gestión de las autoridades locales, se construyó una tienda Diconsa cerca de la cancha para acercar productos de la canasta básica a la población. Poco después se habilitó un dispensario de salud con atención básica y espacio para jornadas de vacunación. Además de ser un punto deportivo, la cancha empezó a usarse para fiestas del pueblo, convivios familiares y eventos privados, convirtiéndose en un lugar conmemorativo y lleno de recuerdos para personas de distintas edades. Hoy en día, sigue siendo uno de los espacios más vivos y representativos de Rincón Vaquero.",

      curiosos: [
        {
          k: "Tardes deportivas",
          v: "Casi todos los días, niños y jóvenes se reúnen para jugar fútbol, básquetbol o voleibol, haciendo de la cancha el punto más activo de la comunidad por las tardes."
        },
        {
          k: "Punto de reunión",
          v: "Además de los partidos, la cancha es un lugar donde la gente se sienta a platicar, convivir y ver pasar el día, creando un ambiente de confianza y amistad."
        },
        {
          k: "Tienda Diconsa",
          v: "A un costado se encuentra una tienda Diconsa, pensada para ofrecer productos de la canasta básica a precios accesibles para las familias del pueblo."
        },
        {
          k: "Dispensario de salud",
          v: "En la misma zona hay un dispensario de salud con atención básica y espacio para brigadas de vacunación, al que acuden los habitantes cuando se les convoca."
        },
        {
          k: "Escenario de fiestas",
          v: "Durante fiestas del pueblo y eventos privados, la cancha se adapta para recibir a mucha gente, colocarse música, mesas y servicios, convirtiéndose en un gran salón al aire libre."
        },
        {
          k: "Lugar conmemorativo",
          v: "Es un lugar muy recordado por personas de diferentes generaciones que han jugado, convivido o festejado ahí, acumulando historias y recuerdos de muchos años."
        }
      ]
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
    "La Iglesia de Rincón Vaquero es el centro religioso de la comunidad, reconocida como el principal referente de la fe católica en el pueblo. Es una capilla muy cuidada, con una fachada sencilla pero llamativa y detalles en su interior que la hacen acogedora. Cada domingo se celebran misas a las que acuden familias de distintas edades, y también se imparten clases de catecismo para preparación a la Primera Comunión y la Confirmación. Además de ser un lugar de oración, es un espacio donde se fortalecen los lazos comunitarios a través de celebraciones, convivencias y tradiciones que se han mantenido vivas con el paso del tiempo.",

  historia:
    "Construida hace varias décadas, la iglesia de Rincón Vaquero ha sido restaurada y conservada gracias al esfuerzo conjunto de la comunidad y el apoyo de distintas administraciones. Con el tiempo se han ido mejorando sus muros, techo, altar y detalles decorativos, manteniendo siempre el respeto por su diseño original. En ella se han celebrado misas importantes para el pueblo: desde bautizos, bodas y misas de difunto, hasta fiestas patronales y celebraciones especiales. Una de las festividades más importantes es la dedicada a la Santa Cruz, considerada la fiesta local, donde se enaltece al santo con misas, procesiones y ofrendas. También es escenario de las celebraciones de Nochebuena, especialmente el 24 de diciembre, cuando se recuerda el nacimiento del Niño Jesús y gran parte de la comunidad acude a la misa y a las posadas. Gracias al cuidado de los fieles y a las actividades organizadas por grupos de la iglesia, se ha mantenido como un lugar limpio, adornado y muy apreciado, incluso por visitantes que la consideran una capilla ejemplar para la región.",

  curiosos: [
    {
      k: "Misa dominical",
      v: "Cada domingo se celebra la misa, a la que acuden numerosas familias de la comunidad para escuchar la palabra, dar gracias y convivir al final de la celebración."
    },
    {
      k: "Catecismo y sacramentos",
      v: "En la iglesia se ofrecen clases de catecismo para la Primera Comunión y la Confirmación, además de celebrarse sacramentos como bautizos, bodas y misas privadas."
    },
    {
      k: "Fiesta de la Santa Cruz",
      v: "Es el punto central de la fiesta local en honor a la Santa Cruz, con misas especiales, arreglos florales, procesiones y gran participación de la comunidad."
    },
    {
      k: "Nochebuena y nacimiento",
      v: "El 24 de diciembre se celebra el nacimiento del Niño Jesús con misa, cantos y posadas, convirtiéndose en una de las noches más concurridas y emotivas del año."
    },
    {
      k: "Siempre adornada",
      v: "La iglesia suele estar decorada con flores, telas y detalles alusivos al tiempo litúrgico, lo que la hace lucir bonita y acogedora durante todo el año."
    },
    {
      k: "Apoyo comunitario",
      v: "Diversos integrantes de la comunidad realizan actividades y cooperaciones para mantener la iglesia en buen estado, mostrando el cariño que le tienen."
    }
  ]
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

    sections:  {
      queEs:
        "El salón comunitario de Rincón Vaquero es el principal espacio del pueblo y uno de los puntos más importantes para la convivencia social. Es un lugar amplio y multifuncional donde se celebran desde cumpleaños y 15 años, hasta reuniones de la comunidad y eventos oficiales. También se utiliza para asambleas en donde el agente municipal da sus informes, así como para actividades culturales, bailes y eventos religiosos relacionados con las fiestas del pueblo. Gracias a sus dimensiones y a que está techado, se ha convertido en el lugar ideal para reunir a muchas personas en un ambiente cómodo y protegido del clima.",

      historia:
        "Construido hace varias décadas, el salón comunitario ha sido testigo de innumerables festejos y momentos importantes para Rincón Vaquero. Con el paso del tiempo, el edificio ha recibido diversas mejoras: desde una reconstrucción estructural, cambio de techo y refuerzo de columnas, hasta la remodelación de áreas interiores y exteriores. Estas mejoras han permitido que el salón sea más seguro, funcional y agradable para quienes lo usan. Año con año, la comunidad lo aprovecha para sus tradiciones: en abril se realiza el planchado de la ropa del Niño Dios, en mayo se celebra el tradicional baile de la fiesta de la Santa Cruz, y en septiembre se convierte en el escenario principal del Grito de Independencia. Con una capacidad aproximada de 200 personas, el salón se ha consolidado como un punto clave para la organización, la fiesta y la identidad del pueblo.",

      curiosos: [
        {
          k: "Corazón de las fiestas",
          v: "Es el lugar favorito para celebrar cumpleaños, 15 años, bautizos y convivios familiares gracias a su tamaño y a que está techado."
        },
        {
          k: "Punto de reunión",
          v: "Ahí se realizan asambleas y reuniones donde las autoridades municipales y locales comparten información e informes con la comunidad."
        },
        {
          k: "Planchado del Niño Dios",
          v: "Cada abril se lleva a cabo la tradición del planchado de la ropa del Niño Dios en el salón, reuniendo a devotos y familias en un ambiente de fe y convivencia."
        },
        {
          k: "Baile de la Santa Cruz",
          v: "Durante la fiesta de mayo en honor a la Santa Cruz, el salón es sede del tradicional baile, uno de los eventos más esperados del año."
        },
        {
          k: "Grito de septiembre",
          v: "En las fiestas patrias, el salón se convierte en escenario del Grito de Independencia y de las celebraciones del 15 de septiembre."
        },
        {
          k: "Capacidad y mejoras",
          v: "Tiene capacidad para aproximadamente 200 personas y ha sido reforzado y remodelado con nuevos techos y áreas mejoradas para ofrecer mayor comodidad y seguridad."
        }
      ]
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
    sections:  {
      queEs:
        "El río Paso del Mango es el lugar turístico y natural más emblemático de Rincón Vaquero. Es un río de aguas cristalinas, rodeado de vegetación y pequeñas pozas donde las familias pueden bañarse, descansar y convivir. Muchas personas de otras localidades visitan este sitio para disfrutar del paisaje, refrescarse y pasar un día de campo en contacto con la naturaleza. Además de ser un espacio recreativo, el río es fundamental para la comunidad, ya que cuenta con varios nacederos que abastecen de agua potable al pueblo.",

      historia:
        "Desde hace muchos años, el río Paso del Mango ha sido vital para la vida de la comunidad de Rincón Vaquero. Sus nacederos han permitido contar con agua limpia para el uso diario y, al mismo tiempo, han convertido el lugar en un punto de reunión y esparcimiento. Con el paso del tiempo, la tradición de visitarlo en fechas especiales, como Semana Santa, se ha fortalecido. Días antes de estas festividades, la comunidad se organiza para colocar la famosa ‘tapada’, que consiste en contener parcialmente el flujo del agua con paredes de hule y otras estructuras, elevando el nivel de las pozas para hacerlas más profundas y atractivas para los visitantes. Durante el fin de semana de Semana Santa, la directiva de festividades organiza vendimia de comida, cobra una entrada simbólica y ofrece un ambiente ordenado para que las familias disfruten del río. El resto del año, la entrada es gratuita y el lugar sigue siendo un espacio tranquilo para bañarse, pescár y convivir. Otra tradición importante es la ‘lavada de ornamentos’, cuando el 3 de mayo se lleva la ropa del Niño Dios al río para lavarla, combinando la fe con el respeto a este entorno natural tan especial.",

      curiosos: [
        {
          k: "Aguas cristalinas",
          v: "El río cuenta con pozas de agua muy clara y fresca, ideales para nadar y relajarse en familia."
        },
        {
          k: "Nacederos vitales",
          v: "Alrededor de tres nacederos alimentan el caudal del río y sirven como fuente de agua potable para la comunidad."
        },
        {
          k: "La famosa tapada",
          v: "Días antes de Semana Santa, la comunidad coloca la ‘tapada’ para elevar el nivel del agua y hacer las pozas más profundas y atractivas para los visitantes."
        },
        {
          k: "Semana Santa en el río",
          v: "Durante el fin de semana de Semana Santa se cobra la entrada, se organiza vendimia de comida y el río se convierte en el principal punto turístico del pueblo."
        },
        {
          k: "Lavada de ornamentos",
          v: "Cada 3 de mayo se realiza la lavada de los ornamentos y la ropa del Niño Dios en el río, una tradición que mezcla devoción y respeto por el agua."
        },
        {
          k: "Pesca y recreación",
          v: "Además de bañarse, algunos habitantes aprovechan el río para pescar y pasar tardes tranquilas disfrutando de la naturaleza."
        }
      ]
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
