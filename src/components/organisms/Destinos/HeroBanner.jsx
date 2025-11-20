// src/components/organisms/common/HeroBanner.jsx
import { useInRouterContext, useNavigate, Link } from "react-router-dom";


/** Banner de héroe reutilizable */
export default function HeroBanner({
  image,
  title,
  subtitle,
  heightClass = "h-[40vh] min-h-[260px]",
  overlayClass = "bg-gradient-to-b from-black/50 via-black/40 to-black/50",
}) {
  return (
    <div className={`relative ${heightClass} w-full overflow-hidden`}>
      <img src={image} alt={title}
           className="absolute inset-0 h-full w-full object-cover" />
      <div className={`absolute inset-0 ${overlayClass}`} />
      <div className="relative z-10 mx-auto flex h-full max-w-6xl items-end px-4 pb-10">
        <div>
          <h1 className="text-4xl md:text-5xl font-semibold text-white drop-shadow">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-1 text-white/90 text-lg">{subtitle}</p>
          )}
        </div>
      </div>
    </div>
  );
}
