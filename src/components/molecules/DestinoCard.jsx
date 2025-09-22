// src/components/molecules/DestinoCard.jsx
import { Link } from "react-router-dom";

export default function DestinoCard({ destino, hovered, setHovered }) {
  return (
    <div
      className={`group relative overflow-hidden rounded-xl shadow transition duration-500 bg-white`}
      onMouseEnter={()=>setHovered(destino.id)}
      onMouseLeave={()=>setHovered(null)}
    >
      <div className="relative h-64 overflow-hidden">
        <img src={destino.image} alt={destino.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold">{destino.title}</h3>
        <p className="text-muted-foreground mt-1">{destino.description}</p>
        <Link to={`/destinos/${destino.id}`} className="mt-4 inline-flex items-center gap-2 text-primary">
          Conocer más <span className={`transition-transform ${hovered===destino.id ? "translate-x-1":""}`}>→</span>
        </Link>
      </div>
    </div>
  );
}
