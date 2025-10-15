import React, { useMemo } from "react";
import { Quote, Users, Bell, MessageSquare, BarChart2, Trash2, Pencil, Calendar, MapPin } from "lucide-react";

/**
 * Organism: AdminPanel (presentational)
 * - Receives data and handlers from Container
 * - Renders Sidebar + Content (Usuarios/Avisos/Testimonios/Estadísticas)
 */
export default function AdminPanel({
  active,
  onSelect,
  avisos = [],
  testimonios = [],
  usuarios = [],
  loading = {},
  error = {},
  onEdit = () => {},
  onDelete = () => {},
}) {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Title */}
      <header className="max-w-7xl mx-auto px-6 pt-10 pb-6">
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-none">
          <span className="text-slate-900">Panel </span>
          <span className="text-purple-600">Administrativo</span>
        </h1>
        <p className="text-slate-500 mt-2">Gestiona usuarios, avisos, testimonios y estadísticas.</p>
      </header>

      <div className="max-w-7xl mx-auto px-4 md:px-6 pb-12 grid grid-cols-1 md:grid-cols-[260px,1fr] gap-6">
        <Sidebar active={active} onSelect={onSelect} />

        <main>
          {active === "usuarios" && (
            <UsuariosList
              usuarios={usuarios}
              loading={!!loading.usuarios}
              error={error.usuarios}
            />
          )}
          {active === "avisos" && (
            <AvisosList
              data={avisos}
              loading={!!loading.avisos}
              error={error.avisos}
              onEdit={(item) => onEdit("avisos", item)}
              onDelete={(id) => onDelete("avisos", id)}
            />
          )}
          {active === "testimonios" && (
            <TestimoniosList
              data={testimonios}
              loading={!!loading.testimonios}
              error={error.testimonios}
              onEdit={(item) => onEdit("testimonios", item)}
              onDelete={(id) => onDelete("testimonios", id)}
            />
          )}
          {active === "estadisticas" && <EstadisticasPlaceholder />}
        </main>
      </div>
    </div>
  );
}

function Sidebar({ active, onSelect }) {
  const items = [
    { id: "usuarios", label: "Usuarios", icon: Users },
    { id: "avisos", label: "Avisos", icon: Bell },
    { id: "testimonios", label: "Testimonios", icon: MessageSquare },
    { id: "estadisticas", label: "Estadísticas", icon: BarChart2 },
  ];

  return (
    <aside className="bg-white border border-slate-200 rounded-2xl p-3 h-fit md:sticky md:top-6">
      <nav className="space-y-1">
        {items.map(({ id, label, icon: Icon }) => {
          const selected = active === id;
          return (
            <button
              key={id}
              onClick={() => onSelect(id)}
              className={
                "w-full flex items-center gap-3 rounded-xl px-3 py-2 transition border " +
                (selected
                  ? "bg-purple-50 border-purple-300 text-purple-700"
                  : "bg-white border-transparent hover:bg-slate-50 text-slate-700")
              }
            >
              <Icon className="w-4 h-4" />
              <span className="font-medium">{label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

/** ------------------------ USUARIOS (placeholder) ------------------------ */
function UsuariosList({ usuarios = [], loading, error }) {
  return (
    <section>
      <SectionTitle titleBlack="Lista de" titlePurple="Usuarios" />
      {loading && <ListSkeleton lines={3} />}
      {error && <ErrorBox msg={error} />}
      {!loading && !error && (
        <div className="border border-dashed border-slate-300 rounded-2xl p-8 text-slate-500">
          Próximamente. (Conectarás tu GET /api/usuarios cuando esté listo.)
        </div>
      )}
    </section>
  );
}

/** ------------------------ AVISOS ------------------------ */
function AvisosList({ data = [], loading, error, onEdit, onDelete }) {
  return (
    <section>
      <SectionTitle titleBlack="Gestionar" titlePurple="Avisos" />
      {loading && <ListSkeleton lines={3} />}
      {error && <ErrorBox msg={error} />}

      <ul className="space-y-4">
        {data?.map((aviso) => (
          <li key={aviso.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
            <div className="flex gap-4 p-4 items-center">
              {/* Imagen */}
              {aviso.imgurl ? (
                <img
                  src={aviso.imgurl}
                  alt={aviso.titulo}
                  className="w-40 h-24 object-cover rounded-xl border border-slate-200"
                />
              ) : (
                <div className="w-40 h-24 rounded-xl bg-slate-100 grid place-items-center text-slate-400">Sin imagen</div>
              )}

              {/* Texto */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold text-slate-900 truncate">{aviso.titulo}</h3>
                  {aviso.fecha && (
                    <span className="shrink-0 text-[12px] px-3 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
                      {formatFecha(aviso.fecha)}
                    </span>
                  )}
                </div>
                {aviso.texto && <p className="text-slate-600 mt-1 line-clamp-2">{aviso.texto}</p>}

                {/* Acciones */}
                <div className="mt-3 flex items-center gap-2">
                  <button
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                    onClick={() => onEdit(aviso)}
                  >
                    <Pencil className="w-4 h-4" /> Editar
                  </button>
                  <button
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-600 text-white hover:bg-red-700"
                    onClick={() => onDelete(aviso.id)}
                  >
                    <Trash2 className="w-4 h-4" /> Eliminar
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {!loading && !error && data?.length === 0 && (
        <div className="border border-dashed border-slate-300 rounded-2xl p-8 text-center text-slate-500 mt-4">
          No hay avisos para mostrar.
        </div>
      )}
    </section>
  );
}

/** ------------------------ TESTIMONIOS ------------------------ */
function TestimoniosList({ data = [], loading, error, onEdit, onDelete }) {
  return (
    <section>
      <SectionTitle titleBlack="Gestionar" titlePurple="Testimonios" />

      {loading && <ListSkeleton lines={2} />}
      {error && <ErrorBox msg={error} />}

      <ul className="space-y-4">
        {data?.map((t) => (
          <li key={t.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
            <div className="grid md:grid-cols-[280px,1fr] gap-4 p-4 items-center">
              {/* Imagen (maneja vertical/horizontal) */}
              <div className="w-full rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                <div className="w-full aspect-[4/3] md:aspect-[16/9]">
                  {t.imagenurl ? (
                    <img
                      src={t.imagenurl}
                      alt={t.nombre || "foto"}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full grid place-items-center text-slate-400">Sin imagen</div>
                  )}
                </div>
              </div>

              {/* Contenido derecho */}
              <div className="pr-2">
                <Quote className="w-6 h-6 text-purple-700" />
                <p className="italic text-slate-700 mt-1">{`“${t.comentario ?? ""}”`}</p>

                <div className="mt-2">
                  <StarRating value={Number(t.rating) || 0} />
                </div>

                <div className="mt-2 font-semibold text-slate-900">{t.nombre}</div>

                <div className="mt-1 flex flex-wrap gap-4 text-sm text-slate-500">
                  {t.localidad && (
                    <span className="inline-flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{t.localidad}</span>
                  )}
                  {t.fecha && (
                    <span className="inline-flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{formatFecha(t.fecha)}</span>
                  )}
                </div>

                {/* Acciones */}
                <div className="mt-3 flex items-center gap-2">
                  <button
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                    onClick={() => onEdit(t)}
                  >
                    <Pencil className="w-4 h-4" /> Editar
                  </button>
                  <button
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-600 text-white hover:bg-red-700"
                    onClick={() => onDelete(t.id)}
                  >
                    <Trash2 className="w-4 h-4" /> Eliminar
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {!loading && !error && data?.length === 0 && (
        <div className="border border-dashed border-slate-300 rounded-2xl p-8 text-center text-slate-500 mt-4">
          No hay testimonios para mostrar.
        </div>
      )}
    </section>
  );
}

/** ------------------------ ESTADÍSTICAS (placeholder) ------------------------ */
function EstadisticasPlaceholder() {
  return (
    <section>
      <SectionTitle titleBlack="Panel de" titlePurple="Estadísticas" />
      <div className="border border-dashed border-slate-300 rounded-2xl p-8 text-slate-500">
        Pendiente de implementar. Aquí podrás mostrar tus dashboards.
      </div>
    </section>
  );
}

/** ------------------------ UI helpers ------------------------ */
function SectionTitle({ titleBlack, titlePurple }) {
  return (
    <div className="mb-4">
      <h2 className="text-2xl md:text-3xl font-semibold">
        <span className="text-slate-900">{titleBlack} </span>
        <span className="text-purple-600">{titlePurple}</span>
      </h2>
    </div>
  );
}

function ErrorBox({ msg }) {
  return (
    <div className="mb-4 rounded-xl border border-red-200 bg-red-50 text-red-700 px-4 py-3">
      Error al cargar: {String(msg)}
    </div>
  );
}

function ListSkeleton({ lines = 3 }) {
  return (
    <ul className="space-y-4 mb-4 animate-pulse">
      {Array.from({ length: lines }).map((_, i) => (
        <li key={i} className="rounded-2xl border border-slate-200 p-4">
          <div className="h-5 w-2/3 bg-slate-200 rounded" />
          <div className="h-4 w-1/2 bg-slate-100 rounded mt-2" />
        </li>
      ))}
    </ul>
  );
}

function StarRating({ value = 0, max = 5 }) {
  const items = useMemo(() => Array.from({ length: max }), [max]);
  return (
    <div className="flex items-center gap-1">
      {items.map((_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className={"w-4 h-4 " + (i < value ? "fill-yellow-400 text-yellow-400" : "fill-slate-300 text-slate-300")}
        >
          <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  );
}

function formatFecha(f) {
  try {
    const d = new Date(f);
    return d.toLocaleDateString("es-MX", { day: "2-digit", month: "2-digit", year: "numeric" });
  } catch {
    return f;
  }
}