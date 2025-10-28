import React, { useMemo } from "react";
import {
  Quote, Users, Bell, MessageSquare, BarChart2, Trash2, Pencil, Calendar, MapPin
} from "lucide-react";
import { absUrl } from "../../../api/adminMedia";

export default function AdminPanel({
  active,
  onSelect,
  avisos = [],
  testimonios = [],
  usuarios = [],
  loading = {},
  error = {},
  onEdit = () => {},
  onSuspend = () => {},
  onDelete = () => {},

  // Estadísticas (admin)
  stats = [],
  statsLoading = false,
  statsError = null,
  onStatChange = () => {},
  onStatsSave = () => {},
  statsSaving = false,
  dirtyCount = 0,
}) {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="max-w-7xl mx-auto px-6 pt-10 pb-6">
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-none">
          <span className="text-slate-900">Panel </span>
          <span className="text-[#0833a2]">Administrativo</span>
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
              onEdit={(item) => onEdit("usuarios", item)}
              onSuspend={(id) => onSuspend(id)}
              onDelete={(id) => onDelete("usuarios", id)}
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

          {active === "estadisticas" && (
            <EstadisticasEditable
              stats={stats}
              loading={statsLoading}
              error={statsError}
              onChange={onStatChange}
              onSave={onStatsSave}
              saving={statsSaving}
              dirtyCount={dirtyCount}
            />
          )}
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
                  ? "bg-purple-50 border-blue-300 text-[#0833a2]"
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

/** ------------------------ USUARIOS ------------------------ */
function UsuariosList({ usuarios = [], loading, error, onEdit, onSuspend, onDelete }) {
  const toBool = (v) => v === true || v === 1 || v === "1" || v === "true";
  return (
    <section>
      <SectionTitle titleBlack="Gestionar" titlePurple="Usuarios" />
      {loading && <ListSkeleton lines={3} />}
      {error && <ErrorBox msg={error} />}

      <ul className="space-y-4">
        {usuarios?.map((u) => {
          const nombre = u.nombre || "";
          const apellidos = u.apellidos || u.apellido || "";
          const email = u.email || u.correo || "";
          const rol = u.rol || u.role || "usuario";
          // ✅ ocupa isActive correctamente
          const activo = u.isActiveBool ?? toBool(u.isActive ?? u.activo ?? u.active);

          return (
            <li key={u.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
              <div className="flex gap-4 p-4 items-center">
                <div className="w-16 h-16 rounded-xl border border-slate-200 bg-slate-50 grid place-items-center shrink-0">
                  <svg viewBox="0 0 24 24" className="w-9 h-9 text-slate-400">
                    <path fill="currentColor" d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-5 0-9 2.5-9 5.5A1.5 1.5 0 0 0 4.5 21h15A1.5 1.5 0 0 0 21 19.5C21 16.5 17 14 12 14Z"/>
                  </svg>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-semibold text-slate-900 truncate">
                      {nombre} {apellidos}
                    </h3>
                    <span className={`shrink-0 text-[12px] px-3 py-1 rounded-full border ${
                      activo ? "bg-green-50 text-green-700 border-green-200" : "bg-amber-50 text-amber-700 border-amber-200"
                    }`}>
                      {activo ? "Activo" : "Suspendido"}
                    </span>
                  </div>

                  <div className="mt-1 text-sm text-slate-600">
                    <div className="truncate"><span className="text-slate-500">Correo:</span> {email}</div>
                    <div className="truncate"><span className="text-slate-500">Rol:</span> {rol}</div>
                  </div>

                  <div className="mt-3 flex items-center gap-2">
                    <button
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                      onClick={() => onEdit?.(u)}
                    >
                      Editar
                    </button>
                    <button
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-orange-500 text-white hover:bg-orange-600"
                      onClick={() => onSuspend?.(u.id)}
                    >
                      Suspender
                    </button>
                    <button
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-600 text-white hover:bg-red-700"
                      onClick={() => onDelete?.(u.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {!loading && !error && usuarios?.length === 0 && (
        <div className="border border-dashed border-slate-300 rounded-2xl p-8 text-center text-slate-500 mt-4">
          No hay usuarios para mostrar.
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
        {data?.map((aviso) => {
          const src = aviso.imgSrc ?? absUrl(aviso.imgurl ?? aviso.imagen ?? aviso.image_url);
          return (
            <li key={aviso.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
              <div className="flex gap-4 p-4 items-center">
                {src ? (
                  <img
                    src={src}
                    alt={aviso.titulo || "aviso"}
                    className="w-40 h-24 object-cover rounded-xl border border-slate-200"
                    onError={(e) => (e.currentTarget.src = "/placeholder.svg")}
                  />
                ) : (
                  <div className="w-40 h-24 rounded-xl bg-slate-100 grid place-items-center text-slate-400">
                    Sin imagen
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-semibold text-slate-900 truncate">{aviso.titulo}</h3>
                    {aviso.fecha && (
                      <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-medium !text-white">
                        {formatFecha(aviso.fecha)}
                      </span>
                    )}
                  </div>
                  {aviso.texto && <p className="text-slate-600 mt-1 line-clamp-2">{aviso.texto}</p>}

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
          );
        })}
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
        {data?.map((t) => {
          const src = t.imgSrc ?? absUrl(t.imagenurl ?? t.imagen_url ?? t.imgurl ?? t.imagen);
          return (
            <li key={t.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
              <div className="grid md:grid-cols-[280px,1fr] gap-4 p-4 items-center">
                <div className="w-full rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                  <div className="w-full aspect-[4/3] md:aspect-[16/9]">
                    {src ? (
                      <img
                        src={src}
                        alt={t.nombre || "foto"}
                        className="w-full h-full object-cover"
                        onError={(e) => (e.currentTarget.src = "/placeholder.svg")}
                      />
                    ) : (
                      <div className="w-full h-full grid place-items-center text-slate-400">Sin imagen</div>
                    )}
                  </div>
                </div>

                <div className="pr-2">
                  <Quote className="w-6 h-6 text-blue-700" />
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
          );
        })}
      </ul>

      {!loading && !error && data?.length === 0 && (
        <div className="border border-dashed border-slate-300 rounded-2xl p-8 text-center text-slate-500 mt-4">
          No hay testimonios para mostrar.
        </div>
      )}
    </section>
  );
}

/** ------------------------ ESTADÍSTICAS (editable) ------------------------ */
function EstadisticasEditable({ stats = [], loading, error, onChange, onSave, saving, dirtyCount }) {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <SectionTitle titleBlack="Gestionar" titlePurple="Estadísticas" />
        <button
          onClick={onSave}
          disabled={saving || dirtyCount === 0}
          className={
            "rounded-xl px-4 py-2 text-white font-medium shadow " +
            (dirtyCount === 0
              ? "bg-slate-300 cursor-not-allowed"
              : "bg-primary hover:bg-blue-700")
          }
          title={dirtyCount === 0 ? "No hay cambios" : `Actualizar (${dirtyCount})`}
        >
          {saving ? "Guardando…" : dirtyCount === 0 ? "Actualizar" : `Actualizar (${dirtyCount})`}
        </button>
      </div>

      {loading && <ListSkeleton lines={4} />}
      {error && <ErrorBox msg={error} />}

      {!loading && !error && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stats.map((s) => (
            <div key={s.slug} className="rounded-2xl border border-slate-200 p-4">
              <div className="text-sm text-slate-500">{s.slug}</div>
              <div className="text-lg font-semibold text-slate-900 mb-2">{s.title}</div>
              <input
                type="number"
                value={String(s.value ?? "")}
                onChange={(e) => onChange(s.slug, Number(e.target.value || 0))}
                className="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

/** ------------------------ UI helpers ------------------------ */
function SectionTitle({ titleBlack, titlePurple }) {
  return (
    <div className="mb-1">
      <h2 className="text-2xl md:text-3xl font-semibold">
        <span className="text-slate-900">{titleBlack} </span>
        <span className="text-[#0833a2]">{titlePurple}</span>
      </h2>
    </div>
  );
}

function ErrorBox({ msg }) { 
  return (
    <div className="mb-4 rounded-xl border border-red-200 bg-red-50 text-red-700 px-4 py-3">
      Error: {String(msg)}
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
