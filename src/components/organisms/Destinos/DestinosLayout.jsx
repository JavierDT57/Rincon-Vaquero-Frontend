// src/components/organisms/destinos/DestinosLayout.jsx
import { Link } from "react-router-dom";
import Button from "../../atoms/Button";
import HeroBanner from "../../organisms/Destinos/HeroBanner";

const colorClasses = {
  green:{ gradient:"from-green-500/30 to-emerald-600/30", text:"text-green-700", button:"hover:bg-green-50" },
  blue:{ gradient:"from-blue-500/30 to-cyan-600/30", text:"text-blue-700", button:"hover:bg-blue-50" },
  orange:{ gradient:"from-orange-500/30 to-red-600/30", text:"text-orange-700", button:"hover:bg-orange-50" },
  purple:{ gradient:"from-purple-500/30 to-indigo-600/30", text:"text-purple-700", button:"hover:bg-purple-50" },
  pink:{ gradient:"from-pink-500/30 to-rose-600/30", text:"text-pink-700", button:"hover:bg-pink-50" },
  teal:{ gradient:"from-teal-500/30 to-blue-600/30", text:"text-teal-700", button:"hover:bg-teal-50" },
};

export default function DestinosLayout({
  title,
  subtitle,
  heroImage,
  color = "blue", // lo puedes conservar si lo usas en otros estilos
  children,
}) {
  return (
    <div className="bg-zinc-50 text-slate-900">
      {/* Banner clonado de Semana Santa */}
      <HeroBanner
        image={heroImage}
        title={title}
        subtitle={subtitle}
        backTo="/destinos"   // ← vuelve a la lista de destinos
      />

      {/* Contenido de la página */}
      <div className="container mx-auto px-4 py-16">{children}</div>
    </div>
  );
}
