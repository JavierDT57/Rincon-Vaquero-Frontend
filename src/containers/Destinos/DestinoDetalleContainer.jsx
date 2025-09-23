import { useParams } from "react-router-dom";
import DestinosLayout from "../../components/organisms/Destinos/DestinosLayout";


// Importa un hero por destino (ajusta extensión .jpg/.jpeg según tus archivos)

const base = {
  "campo-futbol": {
    title: "Campo Fútbol",
    subtitle: "El Corazón Deportivo de Nuestra Comunidad",
    heroImage: "../../assets/destinos/campo-futbol/hero.jpeg",
    color: "green",
    images: "../../assets/destinos/campo-futbol/hero.jpeg",
    sections: {
      queEs:
        "El campo comunitario de Rincón Vaquero es considerado uno de los más bonitos del municipio. Es un espacio donde se han disputado memorables partidos de torneos locales, además de ser punto de encuentro para la convivencia social y deportiva de la comunidad.",
      historia:
        "Desde 1980, el campo ha sido el lugar de entrenamiento del equipo local 'La Ola Verde', que ha trascendido entre generaciones. Con el paso de los años, se ha convertido en un símbolo deportivo y cultural de Rincón Vaquero, fomentando la práctica del fútbol y la participación en torneos municipales y regionales.",
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
    heroImage: "../../assets/destinos/campo-futbol/hero.jpeg",
    color: "blue",
    images: "../../assets/destinos/campo-futbol/hero.jpeg",
    sections: {
      queEs:
        "El campo comunitario de Rincón Vaquero es considerado uno de los más bonitos del municipio. Es un espacio donde se han disputado memorables partidos de torneos locales, además de ser punto de encuentro para la convivencia social y deportiva de la comunidad.",
      historia:
        "Desde 1980, el campo ha sido el lugar de entrenamiento del equipo local 'La Ola Verde', que ha trascendido entre generaciones. Con el paso de los años, se ha convertido en un símbolo deportivo y cultural de Rincón Vaquero, fomentando la práctica del fútbol y la participación en torneos municipales y regionales.",
      curiosos: [
        { k: "Todos los sábados", v: "La Ola Verde disputa partidos, ya sea de local o visitante" },
        { k: "Mantenimiento constante", v: "La comunidad se organiza para conservarlo en excelentes condiciones" },
        { k: "Deporte alterno", v: "El campo también es utilizado para juegos ocasionales de softball" },
        { k: "Más de 40 años", v: "Promoviendo la tradición futbolera en Rincón Vaquero" },
      ],

    },
  },
  cancha: {
    title: "Cancha",
    subtitle: "Espacio de encuentro y diversión",
    heroImage: "../../assets/destinos/campo-futbol/hero.jpeg",
    color: "orange",
    images: "../../assets/destinos/campo-futbol/hero.jpeg",
    sections: {
      queEs:
        "El campo comunitario de Rincón Vaquero es considerado uno de los más bonitos del municipio. Es un espacio donde se han disputado memorables partidos de torneos locales, además de ser punto de encuentro para la convivencia social y deportiva de la comunidad.",
      historia:
        "Desde 1980, el campo ha sido el lugar de entrenamiento del equipo local 'La Ola Verde', que ha trascendido entre generaciones. Con el paso de los años, se ha convertido en un símbolo deportivo y cultural de Rincón Vaquero, fomentando la práctica del fútbol y la participación en torneos municipales y regionales.",
      curiosos: [
        { k: "Todos los sábados", v: "La Ola Verde disputa partidos, ya sea de local o visitante" },
        { k: "Mantenimiento constante", v: "La comunidad se organiza para conservarlo en excelentes condiciones" },
        { k: "Deporte alterno", v: "El campo también es utilizado para juegos ocasionales de softball" },
        { k: "Más de 40 años", v: "Promoviendo la tradición futbolera en Rincón Vaquero" },
      ],

    },
  },
  iglesia: {
    title: "Iglesia",
    subtitle: "Centro espiritual de la comunidad",
    heroImage: "../../assets/destinos/campo-futbol/hero.jpeg",
    color: "purple",
    images: "../../assets/destinos/campo-futbol/hero.jpeg",
    sections: {
      queEs:
        "El campo comunitario de Rincón Vaquero es considerado uno de los más bonitos del municipio. Es un espacio donde se han disputado memorables partidos de torneos locales, además de ser punto de encuentro para la convivencia social y deportiva de la comunidad.",
      historia:
        "Desde 1980, el campo ha sido el lugar de entrenamiento del equipo local 'La Ola Verde', que ha trascendido entre generaciones. Con el paso de los años, se ha convertido en un símbolo deportivo y cultural de Rincón Vaquero, fomentando la práctica del fútbol y la participación en torneos municipales y regionales.",
      curiosos: [
        { k: "Todos los sábados", v: "La Ola Verde disputa partidos, ya sea de local o visitante" },
        { k: "Mantenimiento constante", v: "La comunidad se organiza para conservarlo en excelentes condiciones" },
        { k: "Deporte alterno", v: "El campo también es utilizado para juegos ocasionales de softball" },
        { k: "Más de 40 años", v: "Promoviendo la tradición futbolera en Rincón Vaquero" },
      ],

    },
  },
  salon: {
    title: "Salón",
    subtitle: "Lugar de celebraciones y eventos",
    heroImage: "../../assets/destinos/campo-futbol/hero.jpeg",
    color: "pink",
    images: "../../assets/destinos/campo-futbol/hero.jpeg",
    sections: {
      queEs:
        "El campo comunitario de Rincón Vaquero es considerado uno de los más bonitos del municipio. Es un espacio donde se han disputado memorables partidos de torneos locales, además de ser punto de encuentro para la convivencia social y deportiva de la comunidad.",
      historia:
        "Desde 1980, el campo ha sido el lugar de entrenamiento del equipo local 'La Ola Verde', que ha trascendido entre generaciones. Con el paso de los años, se ha convertido en un símbolo deportivo y cultural de Rincón Vaquero, fomentando la práctica del fútbol y la participación en torneos municipales y regionales.",
      curiosos: [
        { k: "Todos los sábados", v: "La Ola Verde disputa partidos, ya sea de local o visitante" },
        { k: "Mantenimiento constante", v: "La comunidad se organiza para conservarlo en excelentes condiciones" },
        { k: "Deporte alterno", v: "El campo también es utilizado para juegos ocasionales de softball" },
        { k: "Más de 40 años", v: "Promoviendo la tradición futbolera en Rincón Vaquero" },
      ],

    },
  },
  rio: {
    title: "Río",
    subtitle: "La belleza natural que nos rodea",
    heroImage: "../../assets/destinos/campo-futbol/hero.jpeg",
    color: "teal",
    images: "../../assets/destinos/campo-futbol/hero.jpeg",
    sections: {
      queEs:
        "El campo comunitario de Rincón Vaquero es considerado uno de los más bonitos del municipio. Es un espacio donde se han disputado memorables partidos de torneos locales, además de ser punto de encuentro para la convivencia social y deportiva de la comunidad.",
      historia:
        "Desde 1980, el campo ha sido el lugar de entrenamiento del equipo local 'La Ola Verde', que ha trascendido entre generaciones. Con el paso de los años, se ha convertido en un símbolo deportivo y cultural de Rincón Vaquero, fomentando la práctica del fútbol y la participación en torneos municipales y regionales.",
      curiosos: [
        { k: "Todos los sábados", v: "La Ola Verde disputa partidos, ya sea de local o visitante" },
        { k: "Mantenimiento constante", v: "La comunidad se organiza para conservarlo en excelentes condiciones" },
        { k: "Deporte alterno", v: "El campo también es utilizado para juegos ocasionales de softball" },
        { k: "Más de 40 años", v: "Promoviendo la tradición futbolera en Rincón Vaquero" },
      ],

    },
  },
};

// ====== ESTE ES EL EXPORT QUE FALTABA ======
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
