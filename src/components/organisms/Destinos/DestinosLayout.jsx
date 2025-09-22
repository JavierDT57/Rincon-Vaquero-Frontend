// src/components/organisms/destinos/DestinosLayout.jsx
import { Link } from "react-router-dom";
import Button from "../../atoms/Button";

const colorClasses = {
  green:{ gradient:"from-green-500/30 to-emerald-600/30", text:"text-green-700", button:"hover:bg-green-50" },
  blue:{ gradient:"from-blue-500/30 to-cyan-600/30", text:"text-blue-700", button:"hover:bg-blue-50" },
  orange:{ gradient:"from-orange-500/30 to-red-600/30", text:"text-orange-700", button:"hover:bg-orange-50" },
  purple:{ gradient:"from-purple-500/30 to-indigo-600/30", text:"text-purple-700", button:"hover:bg-purple-50" },
  pink:{ gradient:"from-pink-500/30 to-rose-600/30", text:"text-pink-700", button:"hover:bg-pink-50" },
  teal:{ gradient:"from-teal-500/30 to-blue-600/30", text:"text-teal-700", button:"hover:bg-teal-50" },
};

export default function DestinosLayout({ title, subtitle, heroImage, color="blue", children }) {
  const colors = colorClasses[color] ?? colorClasses.blue;
  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="relative h-96 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient}`} />
        <img src={heroImage} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute top-6 left-6">
          <Link to="/destinos">
            <Button variant="secondary" className={`${colors.button}`}>← Volver</Button>
          </Link>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-8">
          <div className="container mx-auto">
            <h1 className="text-4xl md:text-6xl font-light text-white mb-2">{title}</h1>
            <p className="text-xl text-white/90">{subtitle}</p>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-16">{children}</div>
    </div>
  );
}
