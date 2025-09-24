import { useParams } from "react-router-dom";
import DestinosLayout from "../../components/organisms/Destinos/DestinosLayout";

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
    sections: {
      queEs:
        "El campo comunitario de Rincón Vaquero es considerado uno de los más bonitos del municipio. Es un espacio donde se han disputado memorables partidos de torneos locales, además de ser punto de encuentro para la convivencia social y deportiva de la comunidad.",
      historia:
        "Desde 1950, el campo ha sido el lugar de entrenamiento del equipo local 'La Ola Verde', que ha trascendido entre generaciones. Con el paso de los años, se ha convertido en un símbolo deportivo y cultural de Rincón Vaquero, fomentando la práctica del fútbol y la participación en torneos municipales.",
      curiosos: [
        { k: "Todos los sábados", v: "La Ola Verde disputa partidos, ya sea de local o visitante" },
        { k: "Mantenimiento constante", v: "La comunidad se organiza para conservarlo en excelentes condiciones" },
        { k: "Deporte alterno", v: "El campo también es utilizado para juegos ocasionales de softball" },
        { k: "Más de 40 años", v: "Promoviendo la tradición futbolera en Rincón Vaquero" },
      ],

    },
  },
  "escuela-primaria": {
    title: "Escuela Primaria",
    subtitle: "Donde comienzan los sueños",
    heroImage: primaria2,
    color: "blue",
    sections: {
      queEs:
        "La Escuela Primaria de Rincón Vaquero es una de las instituciones educativas más importantes y antiguas de la comunidad. Durante más de 70 años ha formado a generaciones de estudiantes, transmitiendo valores, conocimientos y cultura. Es un pilar fundamental en el desarrollo del pueblo, pues además de educar, sirve como punto de encuentro y orgullo para las familias.",
      historia:
        "Fundada hace más de siete décadas, la escuela ha acompañado el crecimiento de Rincón Vaquero, brindando educación a niños y niñas que hoy en día son profesionistas, líderes comunitarios y representantes destacados en diferentes áreas. Con el esfuerzo de docentes, padres de familia y autoridades, la institución ha ido mejorando sus instalaciones, programas y métodos de enseñanza a lo largo de los años. La administración ha estado fuertemente ligada al compromiso de los tutores, quienes han impulsado proyectos para mantener viva la calidad educativa. La escuela no solo se centra en la enseñanza académica, sino también en el desarrollo integral de sus estudiantes, fomentando el deporte, la cultura y la participación en concursos y actividades extracurriculares.",
      curiosos: [
        { k: "70+ años", v: "Formando a generaciones de habitantes del pueblo" },
        { k: "Concursos ganados", v: "Fútbol, oratoria, olimpiadas del conocimiento y eventos culturales" },
        { k: "Administración comunitaria", v: "La escuela ha sido gestionada con apoyo y compromiso de padres y tutores" },
        { k: "Profesionales egresados", v: "Muchos de sus alumnos han continuado estudios superiores y hoy son profesionistas" },
        { k: "Mejoras constantes", v: "Con el paso de los años se han modernizado aulas, canchas y espacios de aprendizaje" },
      ],


    },
  },
  cancha: {
    title: "Cancha",
    subtitle: "Espacio de encuentro y diversión",
    heroImage: cancha2,
    color: "orange",
    sections: {
      queEs:
        "La cancha comunitaria de Rincón Vaquero es un espacio recreativo donde, sobre todo por las tardes, se disputan partidos de voleibol y fútbol infantil. Gracias a su amplitud se adapta también para eventos populares como fiestas. El entorno incluye una pequeña tienda Conasupo cercana que facilita el acceso a alimentos a precios subsidiados y una clínica de atención primaria para urgencias y consultas básicas. La comunidad participa activamente en su mantenimiento para conservar el espacio en buenas condiciones.",

      historia:
        "La cancha nació como un terreno destinado al encuentro deportivo del pueblo y, con el tiempo, se fue consolidando como eje de la vida comunitaria. Fue adaptada progresivamente para recibir actividades escolares, torneos infantiles y celebraciones vecinales; ante la demanda, se mejoraron sus servicios básicos y se reforzó la iluminación para permitir actividades vespertinas. La creación o instalación de la Conasupo y la cercanía de una clínica de salud respondieron a la necesidad de servicios para las familias que usan el espacio. Hoy la cancha es un símbolo de cooperación local: las vecinas y vecinos realizan jornadas de limpieza y mantenimiento, y las autoridades y escuelas colaboran en programas y eventos deportivos.",

      curiosos: [
        { k: "Tardes deportivas", v: "Voleibol y fútbol infantil todas las tardes; la escuela local también la utiliza para clases de educación física." },
        { k: "Fiestas", v: "Se acondiciona ocasionalmente para fiestas patronales y convivios por su gran espacio." },
        { k: "Conasupo cercana", v: "Tienda subsidiada que facilita el acceso a alimentos básicos a precios económicos." },
        { k: "Clínica de salud", v: "Atención primaria y campañas de vacunación disponibles para la comunidad." },
      ],


    },
  },
  iglesia: {
    title: "Iglesia",
    subtitle: "Centro espiritual de la comunidad",
    heroImage: iglesia2,
    color: "purple",
    sections: {
      queEs:
        "La Iglesia de Rincón Vaquero es el centro espiritual y religioso de la comunidad. Allí se concentra la práctica de la fe católica mediante ceremonias, sacramentos y celebraciones comunitarias. Más que un edificio, la iglesia es un punto de encuentro donde las familias se reúnen cada semana para fortalecer la vida social y las tradiciones transmitidas de generación en generación.",
      historia:
        "La iglesia fue construida hace varias décadas y, gracias al esfuerzo conjunto de la parroquia y los vecinos, ha sido restaurada y mejorada a lo largo del tiempo. Desde su fundación ha acompañado los hitos más importantes de la comunidad —bautizos, primeras comuniones, bodas, funerales y fiestas patronales— convirtiéndose en testigo y protagonista de la historia familiar de muchas generaciones.",
      curiosos: [
        { k: "Misa dominical", v: "Cada domingo se celebra una misa comunitaria a la que asiste la mayor parte de la población católica del pueblo." },
        { k: "Sacramentos frecuentes", v: "En la parroquia se realizan bautizos, primeras comuniones, confirmaciones, matrimonios y misas por difuntos." },
        { k: "Fiestas patronales", v: "Durante la fiesta patronal se organizan novenas, procesiones y actividades religiosas y culturales que movilizan a toda la comunidad." },
        { k: "Decoración destacada", v: "El interior destaca por su decoración cuidada —retablos, vitrales y esculturas— que hacen del espacio un lugar amplio y visualmente atractivo." },
        { k: "Obras sociales", v: "La parroquia coordina labores de apoyo comunitario: colectas, acompañamiento a familias necesitadas y programas de voluntariado." },
      ],


    },
  },
  salon: {
    title: "Salón",
    subtitle: "Lugar de celebraciones y eventos",
    heroImage: salon2,
    color: "pink",
    sections: {
      queEs:
        "El salón comunitario de Rincón Vaquero es el principal espacio cubierto del pueblo, dedicado a la vida social y cultural. Allí se celebran fiestas patronales, cumpleaños, XV años, y el tradicional Grito de Septiembre; además funciona como sede de cursos recreativos, talleres, asambleas comunitarias y eventos culturales (bailes, presentaciones y cine comunitario). El salón cuenta con iluminación básica, cocina de apoyo y servicios sanitarios, y es gestionado por el agente municipal que coordina reservas y mantenimiento. Por su versatilidad se utiliza tanto para reuniones multitudinarias como para encuentros más pequeños, y es un punto clave para la cohesión social del pueblo.",
      historia:
        "El salón ha sido parte de la vida de Rincón Vaquero durante décadas. Construido originalmente hace más de 60 años, ha sufrido varias remodelaciones y mejoras gracias al apoyo del municipio: refuerzo del techo, renovación de pisos, modernización eléctrica. Estas intervenciones lo convirtieron en un ícono local: generaciones enteras crecieron celebrando ahí sus eventos importantes. El respaldo municipal combinado con la organización comunitaria ha permitido mantener el salón en condiciones aptas para grandes festividades y actividades periódicas, consolidándolo como un patrimonio inmaterial del pueblo.",
      curiosos: [
        { k: "Grito de Septiembre", v: "El salón es el lugar central donde se organiza el Grito y los festejos patrios cada 15 de septiembre." },
        { k: "Capacidad", v: "Aforo aproximado de 250–300 personas según la disposición de sillas." },
        { k: "Remodelaciones", v: "Ha recibido al menos 3 remodelaciones importantes en las últimas cuatro décadas con apoyo municipal." },
        { k: "Multifuncional", v: "Además de fiestas, alberga cursos (manualidades), asambleas y funciones culturales." },
      ],


    },
  },
  rio: {
    title: "Río",
    subtitle: "La belleza natural que nos rodea",
    heroImage: rio2,
    color: "teal",
    sections: {
      queEs:
        "El río de Rincón Vaquero es el icono natural del pueblo y un punto de atracción tanto para habitantes como para visitantes de otras localidades. Destaca por sus cuatro nacederos naturales que alimentan su caudal y por las pozas aptas para el baño; durante temporadas de calor recibe gran afluencia de familias y niños. Además de recreación, el río cumple funciones prácticas: muchas familias lo usan para lavar ropa y realizar tareas domésticas, y desde uno de sus nacederos se extrae agua mediante una bomba que abastece a gran parte de la comunidad a través de una red de tuberías. En Semana Santa el comité del pueblo organiza actividades en sus orillas —puestos de comida y control de acceso cuyo propósito es recaudar fondos para mantenimiento y eventos— por lo que esos días su afluencia aumenta notablemente. Entre las tradiciones locales también está la llamada 'tapada' (sección temporal donde se embalsa el agua para profundizar una poza) y eventos religiosos como la 'lavada de ornamentos' —el lavado ritual de las vestiduras religiosas— que se celebra el 3 de mayo.",

      historia:
        "El río ha sido parte de la vida de Rincón Vaquero desde tiempos ancestrales; su existencia y sus nacederos marcaron el asentamiento y desarrollo del pueblo. Con los años, la comunidad fue organizando usos colectivos: se instaló una bomba para potabilizar y distribuir agua, y se definieron áreas de baño y lavado. El vínculo cultural con el río se refleja en fiestas y prácticas comunitarias: la tapada, las ventas y colectas de Semana Santa, y las ceremonias religiosas que incluyen el lavado de vestiduras y ornamentos. A lo largo del tiempo se han impulsado pequeñas acciones de conservación y jornadas de limpieza organizadas por vecinos y el comité local para atender erosión, basura y preservar la calidad del agua, conscientes de que el río es fuente de vida y economía para el pueblo.",

      curiosos: [
        { k: "4 nacederos", v: "El río recibe agua de cuatro ojos de agua naturales que mantienen su caudal incluso en temporadas secas." },
        { k: "Tapada", v: "Tradición local que consiste en cerrar temporalmente el flujo para profundizar una poza, creando áreas de baño más seguras." },
        { k: "Lavada de ornamentos", v: "Ritual religioso (3 de mayo) en el que se lavan las vestiduras y ornamentos del santo, seguido de procesión y ofrendas." },
        { k: "Bombeo comunitario", v: "Desde uno de los nacederos se opera una bomba que distribuye agua potable por tuberías a la comunidad." },
        { k: "Semana Santa", v: "El comité organiza venta de comida y cobra acceso al río para recaudar fondos; es la época de mayor afluencia de visitantes." },
      ],

    },
  },
};


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
