// src/components/organisms/tradiciones/SemanaSanta.jsx
import React from "react";
import { useInRouterContext, useNavigate } from "react-router-dom";

import rio2 from "../../../assets/Tradiciones/rio2.jpg";
import cruz from "../../../assets/Tradiciones/cruz.jpg";
import rio3 from "../../../assets/Tradiciones/rio3.jpg";
import tapada from "../../../assets/Tradiciones/tapada.jpg";
import dr from "../../../assets/Tradiciones/dr.jpg";
import viacrusis from "../../../assets/Tradiciones/viacrusis.jpeg";
import sg from "../../../assets/Tradiciones/sg.jpeg";
import drr from "../../../assets/Tradiciones/drr.jpg";
const rawSvg = `
<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' stroke-width='1.5'>
  <path stroke-linecap='round' stroke-linejoin='round' d='M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z'/>
</svg>`;

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
      <div className="grid gap-6 md:grid-cols-12 items-centCalloutCarder">
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
        title="Semana Santa en Rincón Vaquero"
        subtitle="Fe, río y tradición comunitaria"
        image={rio2}
      />

      <div className="mx-auto max-w-6xl px-4 py-10 space-y-12">
        {/* Qué es */}
        <InfoSection
          title="¿Qué es la Semana Santa?"
          imageRight
          image={cruz}
        >
          La Semana Santa conmemora la Pasión, Muerte y Resurrección de Jesucristo.
          En Rincón Vaquero se vive con procesiones, oraciones y actividades que
          fortalecen la unión del pueblo. Durante toda la semana hay misas diarias y
          el Domingo de Resurrección se celebra una misa especial para cerrar las
          actividades.
        </InfoSection>

        {/* Río: corazón de la celebración */}
        <InfoSection
          title="El río: corazón de la Semana Santa"
          imageRight={false}
          image={rio3}
        >
          El río es el ícono del pueblo y recibe visitantes de comunidades vecinas
          para bañarse y convivir. Es único en la zona por sus cuatro nacederos de
          agua, y además tiene un papel práctico: desde uno de esos nacederos se
          bombea agua para la comunidad a través de la red de tuberías.
          <br />
          <br />
          En Semana Santa el comité organiza vendimia de alimentos y controla el
          acceso al río para recaudar fondos de mantenimiento y eventos. El cobro se
          realiza durante todos los días de la semana mayor, excepto a las personas
          del propio pueblo. Hay tres días especialmente fuertes de vendimia y
          afluencia.
        </InfoSection>

        {/* Tradición: Tapada */}
        <InfoSection
          title="La “Tapada”: tradición que nos reúne"
          imageRight
          image={tapada}
        >
          La <strong>tapada</strong> consiste en que vecinas y vecinos se organizan
          para cerrar parcialmente el flujo del río y embalsar una sección, creando
          una poza más honda y segura para el baño. Es un trabajo comunitario que
          vuelve el río un punto aún más atractivo durante la semana mayor y
          reafirma la identidad de Rincón Vaquero.
        </InfoSection>

        {/* Recomendaciones */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Recomendaciones</h2>
          <div className="grid gap-6 md:grid-cols-12 items-center">
            <div className="md:col-span-8">
              <CalloutCard>
                Lleva ropa cómoda y sobria para los actos religiosos, traje de baño
                adecuado si visitas el río, efectivo para la vendimia, y agua para
                hidratarte. Respeta las indicaciones del
                comité. Evita envases de vidrio, no uses detergentes en el río,
                cuida los nacederos y deposita la basura en los contenedores.
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

        {/* Momentos clave */}
        <section className="space-y-5">
          <h2 className="text-2xl font-semibold">Momentos clave</h2>

          <DayCard
            day="D.R."
            title="Domingo de Ramos"
            image={dr}
          >
            Bendición de palmas y procesión de entrada para recordar la entrada de
            Jesús en Jerusalén. Da inicio a la semana con ambiente de comunidad.
          </DayCard>

          <DayCard
            day="V.S."
            title="Viernes Santo — Viacrucis por el pueblo"
            image={viacrusis}
          >
            Recorrido meditativo por 14 estaciones, casa por casa, que representan
            los momentos clave de la Pasión y muerte de Jesucristo. Participa todo
            el pueblo.
          </DayCard>

          <DayCard
            day="S.G."
            title="Sábado en el río — Tapada y convivencia"
            image={sg}
          >
            Convivencia familiar en el río, con la tapada comunitaria. Vendimia de alimentos y control de acceso
            para recaudar fondos.
          </DayCard>

          <DayCard
            day="D.Res."
            title="Domingo de Resurrección"
            image={drr}
          >
            Misa solemne para concluir la Semana Santa y celebrar la esperanza.
          </DayCard>
        </section>

        {/* Acceso y cuotas */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Acceso y cuotas en el río</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border bg-white p-5 shadow-sm">
              <h3 className="font-semibold text-lg">Personas del pueblo</h3>
              <p className="text-sm text-slate-600 mt-1">
                <strong>Sin cobro</strong> durante toda la Semana Santa.
              </p>
              <p className="text-sm text-slate-600">
                Apoya respetando las normas y participando en las jornadas de
                limpieza y organización.
              </p>
            </div>
            <div className="rounded-xl border bg-white p-5 shadow-sm">
              <h3 className="font-semibold text-lg">Visitantes</h3>
              <p className="text-sm text-slate-600 mt-1">
                <strong>Cobro de acceso</strong> todos los días de Semana Santa.
              </p>
              <p className="text-sm text-slate-600">
                Los recursos se destinan a mantenimiento del río, eventos y mejoras
                comunitarias coordinadas por el comité.
              </p>
            </div>
          </div>
          <CalloutCard>
            Hay <strong>tres días de mayor afluencia</strong> y vendimia continua;
            organiza tu visita con tiempo y sigue las indicaciones del personal del
            comité para un acceso ágil y seguro.
          </CalloutCard>
        </section>

        {/* Vendimia */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Vendimia y recaudación</h2>
          <p className="text-slate-700">
            La vendimia se realiza durante <strong>tres días principales</strong>.
            Encontrarás alimentos preparados, bebidas y antojitos coordinados por
            el comité del pueblo. Tu consumo ayuda a recaudar fondos para el
            mantenimiento del espacio y actividades comunitarias.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Día 1", desc: "Puntos de venta desde la mañana hasta la tarde." },
              { title: "Día 2", desc: "Mayor variedad de alimentos y convivencia familiar." },
              { title: "Día 3", desc: "Cierre de vendimia y conteo de recaudación." },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border bg-white p-5 shadow-sm">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* Normas del río */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Normas del río</h2>
          <ul className="list-disc pl-5 space-y-1 text-slate-700">
            <li>Cuidar los nacederos y no introducir detergentes ni sustancias químicas.</li>
            <li>Evitar envases de vidrio; usar bolsas o termos reutilizables.</li>
            <li>Depositar la basura en contenedores y mantener limpias las orillas.</li>
            <li>Seguir señalización y recomendaciones de seguridad del comité.</li>
            <li>Supervisar a niñas y niños en zonas profundas o con corriente.</li>
          </ul>
        </section>

        {/* FAQ */}
        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Preguntas frecuentes</h2>
          <div className="grid gap-3">
            <details className="rounded-lg border bg-white p-4">
              <summary className="cursor-pointer font-medium">
                ¿Las personas del pueblo pagan acceso al río?
              </summary>
              <p className="mt-2 text-slate-700">
                No. Las personas del propio pueblo están exentas de pago durante
                toda la Semana Santa.
              </p>
            </details>
            <details className="rounded-lg border bg-white p-4">
              <summary className="cursor-pointer font-medium">
                ¿Puedo llevar alimentos o bebidas?
              </summary>
              <p className="mt-2 text-slate-700">
                Sí, siempre que mantengas limpia el área y evites envases de
                vidrio. También puedes apoyar consumiendo en la vendimia.
              </p>
            </details>
            <details className="rounded-lg border bg-white p-4">
              <summary className="cursor-pointer font-medium">
                ¿Cómo puedo participar en la tapada?
              </summary>
              <p className="mt-2 text-slate-700">
                Acércate al comité del pueblo. Ellos coordinan horarios, seguridad
                y logística para las labores comunitarias.
              </p>
            </details>
            <details className="rounded-lg border bg-white p-4">
              <summary className="cursor-pointer font-medium">
                ¿Habrá atención de primeros auxilios?
              </summary>
              <p className="mt-2 text-slate-700">
                Se coordina apoyo básico y puntos de información. En caso de
                emergencia sigue las indicaciones del personal del comité.
              </p>
            </details>
          </div>
        </section>

        <Divider />
        {/* Aquí puedes agregar una galería o carrusel de fotos del río y la tapada */}
      </div>
    </div>
  );
}

