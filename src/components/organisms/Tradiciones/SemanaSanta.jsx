// src/components/organisms/tradiciones/SemanaSanta.jsx
import React from "react";
import { useInRouterContext, useNavigate } from "react-router-dom";

/** Botón Volver que funciona dentro o fuera del Router */
function BackButton({ className = "" }) {
  const inRouter = useInRouterContext();
  const navigate = inRouter ? useNavigate() : null;
  const handleClick = () => {
    if (inRouter && navigate) navigate(-1);
    else if (typeof window !== "undefined") window.history.back();
  };
  return (
    <button
      onClick={handleClick}
      className={`inline-flex items-center gap-2 rounded-full bg-white/90 text-slate-700 px-3 py-1.5 shadow hover:bg-white transition ${className}`}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 18l-6-6 6-6" />
      </svg>
      Volver
    </button>
  );
}

function HeroBanner({ image, title, subtitle }) {
  return (
    <div className="relative h-[40vh] min-h-[260px] w-full overflow-hidden">
      <img src={image} alt={title} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/50" />
      <div className="absolute top-4 left-4 z-10">
        <BackButton />
      </div>
      <div className="relative z-10 mx-auto flex h-full max-w-6xl items-end px-4 pb-10">
        <div>
          <h1 className="text-4xl md:text-5xl font-semibold text-white drop-shadow">{title}</h1>
          {subtitle && <p className="mt-1 text-white/90 text-lg">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
}

function InfoSection({ title, children, image, imageRight = true }) {
  return (
    <section className="mx-auto max-w-6xl px-4">
      <div className="grid gap-6 md:grid-cols-12 items-center">
        <div className={`md:col-span-7 ${imageRight ? "order-1" : "order-2 md:order-1"}`}>
          <div className="pl-5 border-l-4 border-indigo-500">
            <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
            <div className="mt-3 text-slate-600 leading-relaxed [text-wrap:pretty]">
              {children}
            </div>
          </div>
        </div>
        <div className={`md:col-span-5 ${imageRight ? "order-2" : "order-1 md:order-2"}`}>
          <img src={image} alt="Ilustración" className="w-full h-56 md:h-64 object-cover rounded-xl shadow-sm" />
        </div>
      </div>
    </section>
  );
}

function CalloutCard({ title, children }) {
  return (
    <div className="rounded-xl border border-indigo-200/70 bg-indigo-50/70 p-4 text-indigo-900">
      {title && <h3 className="font-semibold mb-2">{title}</h3>}
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  );
}

function DayCard({ day, title, children, image }) {
  return (
    <div className="grid gap-4 md:grid-cols-12 items-start">
      <div className="md:col-span-8">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white text-sm font-semibold">
              {day}
            </span>
            <h4 className="text-slate-900 font-semibold">{title}</h4>
          </div>
          <p className="mt-3 text-slate-600 text-sm leading-relaxed">{children}</p>
        </div>
      </div>
      <div className="md:col-span-4">
        <img src={image} alt="Día" className="w-full h-28 md:h-36 object-cover rounded-lg" />
      </div>
    </div>
  );
}

function Divider() {
  return <hr className="my-8 border-slate-200" />;
}

export default function SemanaSanta() {
  return (
    <div className="bg-zinc-50 text-slate-900">
      <HeroBanner
        title="Semana Santa"
        subtitle="Tradición de fe y comunidad"
        // Reemplaza por tu asset local si prefieres: /tradiciones/semana-santa-hero.jpg
        image="https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1600&auto=format&fit=crop"
      />
      <div className="mx-auto max-w-6xl px-4 py-10 space-y-10">
        <InfoSection
          title="¿Qué es la Semana Santa?"
          imageRight
          image="https://images.unsplash.com/photo-1496318447583-f524534e9ce1?q=80&w=1200&auto=format&fit=crop"
        >
          La Semana Santa conmemora la Pasión, Muerte y Resurrección de Jesucristo.
          En nuestra comunidad se vive con procesiones, oraciones y actividades que
          fomentan el encuentro y la solidaridad.
        </InfoSection>

        <InfoSection
          title="¿Cómo la celebramos?"
          imageRight={false}
          image="https://images.unsplash.com/photo-1517512006864-7edc3b933137?q=80&w=1200&auto=format&fit=crop"
        >
          Iniciamos con la bendición de palmas el Domingo de Ramos. Durante la semana
          se realizan viacrucis y momentos de reflexión. La Vigilia Pascual celebra
          la esperanza y la vida nueva.
        </InfoSection>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Recomendaciones</h2>
          <div className="grid gap-6 md:grid-cols-12 items-center">
            <div className="md:col-span-8">
              <CalloutCard>
                Lleva ropa cómoda y sobria, agua para hidratarte y respeta los
                momentos de silencio. Si participas en procesiones, utiliza calzado
                adecuado para trayectos largos.
              </CalloutCard>
            </div>
            <div className="md:col-span-4">
              <img
                src="https://images.unsplash.com/photo-1488085061387-422e29b40080?q=80&w=1200&auto=format&fit=crop"
                alt="Recomendaciones"
                className="w-full h-40 object-cover rounded-lg"
              />
            </div>
          </div>
        </section>

        <section className="space-y-5">
          <h2 className="text-2xl font-semibold">Momentos clave</h2>
          <DayCard
            day="D.R."
            title="Domingo de Ramos"
            image="https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?q=80&w=1200&auto=format&fit=crop"
          >
            Bendición de palmas y procesión de entrada. Se recuerda la entrada
            triunfal de Jesús en Jerusalén.
          </DayCard>
          <DayCard
            day="V.C."
            title="Viacrucis"
            image="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop"
          >
            Recorrido meditativo por las estaciones que recuerdan el camino hacia el Calvario.
          </DayCard>
          <DayCard
            day="V.P."
            title="Vigilia Pascual"
            image="https://images.unsplash.com/photo-1494390248081-4e521a5940db?q=80&w=1200&auto=format&fit=crop"
          >
            Celebración nocturna con el fuego nuevo, lecturas y canto del Aleluya. Culmina con un ambiente de fiesta y comunidad.
          </DayCard>
        </section>

        <Divider />
        {/* Aquí puedes agregar un carrusel o galería si lo necesitas */}
      </div>
    </div>
  );
}
