// src/components/organisms/tradiciones/Navidad.jsx
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
          <div className="pl-5 border-l-4 border-rose-500">
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
    <div className="rounded-xl border border-rose-200/70 bg-rose-50/70 p-4 text-rose-900">
      {title && <h3 className="font-semibold mb-2">{title}</h3>}
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  );
}

function Bullet({ children }) {
  return (
    <li className="flex items-start gap-2">
      <span className="mt-1 inline-block h-2 w-2 rounded-full bg-rose-500" />
      <span className="text-slate-600">{children}</span>
    </li>
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

export default function Navidad() {
  return (
    <div className="bg-zinc-50 text-slate-900">
      <HeroBanner
        title="Navidad"
        subtitle="Luz, posadas y comunidad"
        // Reemplaza por tu asset local si prefieres: /tradiciones/navidad-hero.jpg
        image="https://images.unsplash.com/photo-1512389142860-9c449e58a543?q=80&w=1600&auto=format&fit=crop"
      />

      <div className="mx-auto max-w-6xl px-4 py-10 space-y-10">
        <InfoSection
          title="¿Cómo vivimos la Navidad?"
          imageRight
          image="https://images.unsplash.com/photo-1512389814765-a92eea1f5b16?q=80&w=1200&auto=format&fit=crop"
        >
          La Navidad reúne a familias y vecinos en torno a las posadas, cantos y
          la tradicional Nochebuena. Es un tiempo de esperanza, unión y gratitud.
        </InfoSection>

        <InfoSection
          title="Las Posadas"
          imageRight={false}
          image="https://images.unsplash.com/photo-1512646605205-78422b7c7895?q=80&w=1200&auto=format&fit=crop"
        >
          Durante los días previos a Nochebuena, se realizan posadas con letanías,
          velitas y piñatas. Cada hogar anfitrión prepara ponche y alimentos para
          compartir con los asistentes.
        </InfoSection>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Elementos típicos</h2>
          <div className="grid gap-6 md:grid-cols-12 items-start">
            <div className="md:col-span-8">
              <CalloutCard>
                Decora con sencillez: nacimientos, luces cálidas, coronas y
                velas. Cuida siempre la seguridad con instalaciones eléctricas y
                pirotecnia **autorizada**.
              </CalloutCard>
              <ul className="mt-4 space-y-2">
                <Bullet>Piñatas de 7 picos (virtudes sobre los vicios)</Bullet>
                <Bullet>Ponche de frutas y buñuelos</Bullet>
                <Bullet>Villancicos y pastorelas</Bullet>
                <Bullet>Intercambio de detalles en familia</Bullet>
              </ul>
            </div>
            <div className="md:col-span-4">
              <img
                src="https://images.unsplash.com/photo-1512914890250-88d0784d4334?q=80&w=1200&auto=format&fit=crop"
                alt="Decoración"
                className="w-full h-40 object-cover rounded-lg"
              />
            </div>
          </div>
        </section>

        <section className="space-y-5">
          <h2 className="text-2xl font-semibold">Fechas destacadas</h2>
          <DayCard
            day="16–24"
            title="Posadas"
            image="https://images.unsplash.com/photo-1543709530-2e6a0b1598be?q=80&w=1200&auto=format&fit=crop"
          >
            Procesiones con cantos, petición de posada y convivencia en el hogar
            anfitrión. Actividades para niñas y niños con piñata.
          </DayCard>
          <DayCard
            day="24"
            title="Nochebuena"
            image="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1200&auto=format&fit=crop"
          >
            Cena familiar, arrullo del Niño Dios y misa de medianoche. Ambiente de
            reconciliación y gratitud.
          </DayCard>
          <DayCard
            day="6"
            title="Día de Reyes"
            image="https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop"
          >
            Rosca compartida, entrega de juguetes y cierre del ciclo navideño
            con espíritu de comunidad.
          </DayCard>
        </section>

        <Divider />
        {/* Aquí puedes agregar una galería/carrusel si lo necesitas */}
      </div>
    </div>
  );
}
