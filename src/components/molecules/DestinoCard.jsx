import { Link } from "react-router-dom";

export default function DestinoCard({
  destino,
  hovered,
  setHovered,
  linkBase = "/destinos",  // <- POR DEFECTO apunta a destinos
  showLink = true,
}) {
  const { id, title, description, image } = destino;
  const href = `${linkBase}/${id}`;

  return (
    <div
      className="group relative overflow-hidden rounded-xl shadow transition bg-white"
      onMouseEnter={() => setHovered?.(id)}
      onMouseLeave={() => setHovered?.(null)}
    >
      <div className="relative h-64 overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-muted" />
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold">{title}</h3>
        {description && (
          <p className="text-muted-foreground mt-1">{description}</p>
        )}

        {showLink ? (
          <Link
            to={href}
            className="mt-4 inline-flex items-center gap-2 text-primary"
          >
            Conocer más{" "}
            <span
              className={`transition-transform ${
                hovered === id ? "translate-x-1" : ""
              }`}
            >
              →
            </span>
          </Link>
        ) : (
          <span
            aria-disabled
            className="mt-4 inline-flex items-center gap-2 text-muted-foreground cursor-not-allowed select-none"
          >
            Próximamente
          </span>
        )}
      </div>
    </div>
  );
}
