/* Basado en tu archivo de Fiesta Patronal */
import React from "react";
import { useInRouterContext, useNavigate } from "react-router-dom";

function BackButton({ className = "" }) {
  const inRouter = useInRouterContext();
  const navigate = inRouter ? useNavigate() : null;
  const handleClick = () => { if (inRouter && navigate) navigate(-1); else if (typeof window !== "undefined") window.history.back(); };
  return (
    <button onClick={handleClick} className={`inline-flex items-center gap-2 rounded-full bg-white/90 text-slate-700 px-3 py-1.5 shadow hover:bg-white transition ${className}`}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
      Volver
    </button>
  );
}

function HeroBanner({ image, title, subtitle }) {
  return (
    <div className="relative h-[40vh] min-h-[260px] w-full overflow-hidden">
      <img src={image} alt={title} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/50" />
      <div className="absolute top-4 left-4 z-10"><BackButton /></div>
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
          <div className="pl-5 border-l-4 border-emerald-500">
            <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
            <div className="mt-3 text-slate-600 leading-relaxed [text-wrap:pretty]">{children}</div>
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
    <div className="rounded-xl border border-emerald-200/70 bg-emerald-50/70 p-4 text-emerald-900">
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
            <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white text-sm font-semibold">{day}</span>
            <h4 className="text-slate-900 font-semibold">{title}</h4>
          </div>
          <p className="mt-3 text-slate-600 text-sm leading-relaxed">{children}</p>
        </div>
      </div>
      <div className="md:col-span-4">
        <img src={image} alt="Día ilustración" className="w-full h-28 md:h-36 object-cover rounded-lg" />
      </div>
    </div>
  );
}

function Divider(){ return <hr className="my-8 border-slate-200" />; }

export default function FiestaPatronal(){
  return (
    <div className="bg-zinc-50 text-slate-900">
      <HeroBanner
        title="Fiesta Patronal"
        subtitle="El corazón festivo de la comunidad"
        image="https://images.unsplash.com/photo-1523419409543-8c4d631fdb47?q=80&w=1600&auto=format&fit=crop"
      />
      <div className="mx-auto max-w-6xl px-4 py-10 space-y-10">
        <InfoSection title="¿De qué se trata?" imageRight image="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop">
          La Fiesta Patronal honra al santo protector del pueblo. Reúne a familias, mayordomos y visitantes en un ambiente de gratitud, identidad y alegría.
        </InfoSection>
        <InfoSection title="¿Cómo se realiza?" imageRight={false} image="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?q=80&w=1200&auto=format&fit=crop">
          Repique de campanas, procesión, Misa Solemne y verbena popular con gastronomía, música y danza regional.
        </InfoSection>
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Vestimenta típica</h2>
          <div className="grid gap-6 md:grid-cols-12 items-center">
            <div className="md:col-span-8">
              <CalloutCard>
                Ropa blanca para procesión, rebozo en tonos sobrios; cuadrillas con trajes bordados, listones y penachos. Calzado cómodo para calles empedradas.
              </CalloutCard>
            </div>
            <div className="md:col-span-4">
              <img src="https://images.unsplash.com/photo-1542060748-10c28b62716f?q=80&w=1200&auto=format&fit=crop" alt="Vestimenta" className="w-full h-40 object-cover rounded-lg"/>
            </div>
          </div>
        </section>
        <section className="space-y-5">
          <h2 className="text-2xl font-semibold">Días de Fiesta</h2>
          <DayCard day="1" title="Vísperas y apertura" image="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1200&auto=format&fit=crop">
            Arcos florales, serenata al patrono y encendido del alumbrado; danza regional y pirotecnia **autorizada**.
          </DayCard>
          <DayCard day="2" title="Día Solemne" image="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1200&auto=format&fit=crop">
            Misa mayor y procesión; comida comunitaria, mariachis, talleres infantiles y torneo relámpago.
          </DayCard>
          <DayCard day="3" title="Convivencia y cierre" image="https://images.unsplash.com/photo-1531306728370-e2ebd9d7bb99?q=80&w=1200&auto=format&fit=crop">
            Jaripeo/baile (según comité), agradecimiento a mayordomos y castillo de luces.
          </DayCard>
        </section>
        {/* <CarouselFiestaPatronal/> */}
      </div>
    </div>
  );
}
