import { useState, useEffect } from "react";

export default function Carousel({
  images = [],
  autoPlay = true,
  interval = 3500,
  height = "h-64",
}) {
  const [current, setCurrent] = useState(0);
  const length = images.length;

  if (length === 0) return null;

  // autoplay
  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % length);
    }, interval);

    return () => clearInterval(timer);
  }, [images]);

  const goTo = (i) => {
    setCurrent((i + length) % length);
  };

  return (
    <div className={`relative w-full overflow-hidden rounded-xl shadow-xl ${height}`}>
      {/* Área de slides */}
      <div
        className="flex transition-transform duration-[600ms] ease-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((src, i) => (
          <div key={i} className="w-full h-full flex-shrink-0">
            <img
              src={src}
              alt={`slide-${i}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Botón left */}
      <button
        onClick={() => goTo(current - 1)}
        className="
          absolute top-1/2 -translate-y-1/2 left-4
          bg-black/50 hover:bg-black/70
          text-white w-10 h-10 rounded-full
          flex items-center justify-center
          backdrop-blur-sm transition
        "
      >
        ‹
      </button>

      {/* Botón right */}
      <button
        onClick={() => goTo(current + 1)}
        className="
          absolute top-1/2 -translate-y-1/2 right-4
          bg-black/50 hover:bg-black/70
          text-white w-10 h-10 rounded-full
          flex items-center justify-center
          backdrop-blur-sm transition
        "
      >
        ›
      </button>

      {/* Indicadores */}
      <div className="absolute bottom-4 flex w-full justify-center gap-3">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`
              w-3 h-3 rounded-full transition-all
              ${i === current ? "bg-white scale-125" : "bg-white/40"}
            `}
          />
        ))}
      </div>
    </div>
  );
}
