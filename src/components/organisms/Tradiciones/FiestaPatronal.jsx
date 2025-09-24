/* Basado en tu archivo de Fiesta Patronal */
import React from "react";
import { useInRouterContext, useNavigate } from "react-router-dom";
import salon1 from "../../../assets/Tradiciones/salon1.jpg";
import santa1 from "../../../assets/Tradiciones/santa1.jpeg";
import cancha1 from "../../../assets/Tradiciones/cancha1.jpg";
import ornamentos from "../../../assets/Tradiciones/ornamentos.jpeg";
import calenda1 from "../../../assets/Tradiciones/calenda.jpeg";
import fiesta2 from "../../../assets/Tradiciones/fiesta2.jpg";
import lavada1 from "../../../assets/Tradiciones/lavada1.jpeg";
const rawSvg = `
<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' stroke-width='1.5'>
  <path stroke-linecap='round' stroke-linejoin='round' d='M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z'/>
</svg>`;

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
        title="Fiesta a la Santa Cruz"
        subtitle="Mayo: tradición, fe y comunidad"
        image={salon1}
      />

      <div className="mx-auto max-w-6xl px-4 py-10 space-y-12">
        {/* ¿Qué es? */}
        <InfoSection
          title="¿Qué es la Fiesta a la Santa Cruz?"
          imageRight
          image={santa1}
        >
          La Fiesta a la Santa Cruz es la celebración patronal más significativa del mes de mayo
          en Rincón Vaquero. Inicia el <strong>3 de mayo</strong> con la <em>Lavada de ornamentos</em>
          y tiene sus días más fuertes del <strong>16 al 18 de mayo</strong>, cuando la comunidad y
          visitantes se reúnen para la <strong>calenda</strong>, la quema de <strong>toritos y castillos</strong>,
          la <strong>misa con mayordomos</strong>, la <strong>cabalgata</strong> y el <strong>baile tradicional</strong>.
          Es una fiesta de fe, identidad y cooperación comunitaria.
        </InfoSection>

        {/* Calendario general de mayo */}
        <InfoSection
          title="Calendario de mayo"
          imageRight={false}
          image={cancha1}
        >
          <p className="mb-3">
            <strong>3 de mayo — Lavada de ornamentos:</strong> Misa matutina y procesión al río para
            lavar la ropa y ornamentos del Niño Dios. Posteriormente, se plancha y devuelve a la iglesia.
          </p>
          <p className="mb-2"><strong>16 de mayo — Día 1 (Calenda):</strong> La banda inicia temprano, se coopera con la directiva; 
            recorrido de calenda por el pueblo con quema de <em>toritos</em> y <em>castillos</em>. Cierre con agrupación nocturna.
          </p>
          <p className="mb-2"><strong>17 de mayo — Día 2 (Mayordomos):</strong> Misa con mayordomos y pueblo;
            convivencia en el salón, casa del mayordomo o cascanchas. Por la tarde, <em>cabalgata</em> y, por la noche,
            <strong> baile tradicional</strong> organizado por la directiva (agrupación fuerte), hasta la madrugada.
          </p>
          <p><strong>18 de mayo — Día 3 (Lavada de ollas):</strong> Tarde con agrupaciones y baile organizado por la directiva;
            proclamación de nuevos mayordomos y padrinos para el siguiente año (flores, toritos, castillos, etc.).</p>
        </InfoSection>

        {/* Vestimenta sugerida */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Vestimenta tradicional</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border bg-white p-5 shadow-sm">
              <h3 className="font-semibold text-lg">Mujeres — Traje regional (Istmo)</h3>
              <ul className="mt-2 list-disc pl-5 text-slate-700 space-y-1">
                <li>Huipil y enagua del Istmo de Tehuantepec; peinado con trenzas y flores (si aplica).</li>
                <li>Rebozo, aretes y collar tradicionales; calzado cómodo para procesiones.</li>
                <li>Para misa: tonos sobrios; para calenda/baile: atuendo festivo y accesorios.</li>
              </ul>
            </div>
            <div className="rounded-xl border bg-white p-5 shadow-sm">
              <h3 className="font-semibold text-lg">Hombres — Pantalón y guayabera</h3>
              <ul className="mt-2 list-disc pl-5 text-slate-700 space-y-1">
                <li>Pantalón de vestir o mezclilla oscura y guayabera clara; cinturón discreto.</li>
                <li>Sombrero opcional; huaraches o zapato cómodo para caminatas.</li>
                <li>Para misa: guayabera limpia y de tono sobrio; para baile: atuendo más festivo.</li>
              </ul>
            </div>
          </div>
          <CalloutCard>
            <strong>Código por día:</strong> 3 de mayo (misa y río) — ropa sobria y cómoda; 16 de mayo (calenda) — atuendo
            festivo tradicional; 17 de mayo (misa + cabalgata + baile) — formal en la mañana y festivo por la noche;
            18 de mayo (lavada de ollas) — casual festivo.
          </CalloutCard>
        </section>

        {/* Momentos clave (DayCards) */}
        <section className="space-y-5">
          <h2 className="text-2xl font-semibold">Momentos clave</h2>

          <DayCard
            day="3 MAY"
            title="Lavada de ornamentos"
            image={ornamentos}
          >
            Misa y procesión al río para lavar la ropa y ornamentos del Niño Dios. Se planchan y reintegran a la iglesia,
            marcando el inicio devocional del mes.
          </DayCard>

          <DayCard
            day="16 MAY"
            title="Calenda, toritos y castillos"
            image={calenda1}
          >
            La banda comienza temprano; cooperación con la directiva del pueblo. Recorrido de calenda por las calles,
            con quema de toritos y castillos. Cierre con agrupación nocturna.
          </DayCard>

          <DayCard
            day="17 MAY"
            title="Mayordomos, cabalgata y baile tradicional"
            image={fiesta2}
          >
            Misa matutina con mayordomos y pueblo. Convivencia en salón/casa del mayordomo/cascanchas con música.
            Por la tarde, cabalgata; por la noche, gran baile organizado por la directiva —hasta la madrugada—.
          </DayCard>

          <DayCard
            day="18 MAY"
            title="Lavada de ollas y proclamaciones"
            image={lavada1}
          >
            Tarde con agrupaciones y baile. Se proclaman nuevos mayordomos y padrinos (flores, toritos, castillos, etc.)
            para el siguiente año. Cierre oficial de la fiesta.
          </DayCard>
        </section>

        {/* Itinerario por día (resumen operativo) */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Itinerario por día</h2>
          <div className="grid gap-4 lg:grid-cols-3">
            {[
              {
                title: "Día 1 — 16 de mayo",
                bloques: [
                  "Mañana: Banda y cooperaciones con la directiva; preparación de la calenda.",
                  "Tarde: Recorrido de calenda por calles principales; quema de toritos y castillos.",
                  "Noche: Cierre con agrupación/banda invitada."
                ],
              },
              {
                title: "Día 2 — 17 de mayo",
                bloques: [
                  "Mañana: Misa con mayordomos y pueblo.",
                  "Mediodía/Tarde: Convivencia en salón/casa del mayordomo/cascanchas con música.",
                  "Tarde: Cabalgata por la comunidad.",
                  "Noche: Baile tradicional organizado por la directiva (agrupación fuerte)."
                ],
              },
              {
                title: "Día 3 — 18 de mayo",
                bloques: [
                  "Tarde: Baile y agrupaciones en la explanada.",
                  "Tarde-Noche: Lavada de ollas y cierre de recaudaciones.",
                  "Noche: Proclamación de nuevos mayordomos y padrinos para el siguiente año."
                ],
              },
            ].map((card) => (
              <div key={card.title} className="rounded-xl border bg-white p-5 shadow-sm">
                <h3 className="font-semibold">{card.title}</h3>
                <ul className="mt-2 list-disc pl-5 text-slate-700 space-y-1">
                  {card.bloques.map((b) => <li key={b}>{b}</li>)}
                </ul>
              </div>
            ))}
          </div>
          <CalloutCard>
            <strong>Consejo:</strong> Lleva efectivo para cooperaciones y consumo; respeta los tiempos de misa y
            los protocolos de seguridad durante la pirotecnia (toritos y castillos).
          </CalloutCard>
        </section>

        <Divider />

        {/* Cultura de cooperación */}
        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Mayordomía, directiva y padrinos</h2>
          <p className="text-slate-700">
            La fiesta se sostiene con el trabajo de la <strong>directiva</strong>, la <strong>mayordomía</strong> y el apoyo de
            <strong> padrinos</strong>. El <strong>17 de mayo</strong> se reconoce a los mayordomos que conducen las actividades del año;
            el <strong>18 de mayo</strong> se proclaman nuevos mayordomos y se invita a padrinos a donar en especie o efectivo
            (por ejemplo, flores, toritos, castillos).
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border bg-white p-5 shadow-sm">
              <h3 className="font-semibold">¿Cómo apoyar?</h3>
              <ul className="mt-2 list-disc pl-5 text-slate-700 space-y-1">
                <li>Cooperación económica voluntaria.</li>
                <li>Donación de insumos (flores, veladoras, alimentos).</li>
                <li>Voluntariado en logística, limpieza y seguridad.</li>
              </ul>
            </div>
            <div className="rounded-xl border bg-white p-5 shadow-sm">
              <h3 className="font-semibold">Sedes y recorridos</h3>
              <p className="text-slate-700 mt-2">
                Actividades entre Iglesia, salón comunitario, calles principales (calenda), cascanchas
                y explanadas para baile. Sigue la señalización y avisos de la directiva.
              </p>
            </div>
          </div>
        </section>

        {/* Recomendaciones */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Recomendaciones generales</h2>
          <div className="grid gap-6 md:grid-cols-12 items-center">
            <div className="md:col-span-8">
              <CalloutCard>
                Hidratación y bloqueador para recorridos y cabalgata; calzado cómodo; respeto a los horarios de misa;
                precaución con pirotecnia (mantener distancia, seguir instrucciones); cuidado de niñas y niños en
                aglomeraciones; depósito responsable de basura y apoyo a la limpieza al cierre de cada día.
              </CalloutCard>
            </div>
            <div className="md:col-span-4">
            <img
              alt="check"
              src={`data:image/svg+xml;utf8,${encodeURIComponent(rawSvg)}`}
              width="130"   
            />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Preguntas frecuentes</h2>
          <div className="grid gap-3">
            <details className="rounded-lg border bg-white p-4">
              <summary className="cursor-pointer font-medium">¿Qué es la calenda?</summary>
              <p className="mt-2 text-slate-700">
                Es un recorrido festivo por el pueblo con música, danzas y pirotecnia (toritos y castillos),
                que anuncia la fiesta patronal e invita a participar.
              </p>
            </details>
            <details className="rounded-lg border bg-white p-4">
              <summary className="cursor-pointer font-medium">¿Hay código de vestimenta?</summary>
              <p className="mt-2 text-slate-700">
                Se sugiere <strong>traje regional del Istmo</strong> para mujeres y <strong>pantalón con guayabera</strong> para hombres.
                Para misa: tonos sobrios; para calenda/baile: atuendo festivo tradicional.
              </p>
            </details>
            <details className="rounded-lg border bg-white p-4">
              <summary className="cursor-pointer font-medium">¿Quién organiza el baile?</summary>
              <p className="mt-2 text-slate-700">
                La <strong>directiva del pueblo</strong>. El día 17 se acostumbra contratar una agrupación destacada;
                el 18 se realiza la <em>Lavada de ollas</em> con agrupaciones vespertinas.
              </p>
            </details>
            <details className="rounded-lg border bg-white p-4">
              <summary className="cursor-pointer font-medium">¿Cómo se eligen mayordomos y padrinos?</summary>
              <p className="mt-2 text-slate-700">
                El <strong>18 de mayo</strong> se proclaman los mayordomos para el siguiente año y se registran padrinos
                que donarán elementos de la fiesta (flores, toritos, castillos, etc.).
              </p>
            </details>
          </div>
        </section>

        <Divider />
        {/* Aquí puedes insertar tu galería/carrusel de fotos y videos de calenda, cabalgata y baile */}
      </div>
    </div>
  );
}