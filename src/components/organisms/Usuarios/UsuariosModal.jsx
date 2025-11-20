import React, { useEffect } from "react";

export default function UsuariosModal({
  isOpen, onClose, onSubmit,
  formNombre, setFormNombre,
  formApellidos, setFormApellidos,
  formActivo, setFormActivo,
  readEmail, readRol,
}) {

  if (!isOpen) return null;

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  return (
    <div className="fixed inset-0 z-[60] grid place-items-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-xl rounded-2xl p-[1px] bg-gradient-to-br from-purple-500/40 to-fuchsia-500/40 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="rounded-2xl bg-white ring-1 ring-black/5 p-6">

          {/* Header */}
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Editar usuario</h2>
            <button
              onClick={onClose}
              className="rounded-lg px-2 py-1 text-sm text-slate-600 hover:bg-slate-100"
            >
              Cerrar
            </button>
          </div>

          <form onSubmit={onSubmit} className="space-y-5">

            {/* Nombre y Apellidos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Nombre</label>
                <input
                  type="text"
                  value={formNombre}
                  onChange={(e)=>setFormNombre(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Apellidos</label>
                <input
                  type="text"
                  value={formApellidos}
                  onChange={(e)=>setFormApellidos(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
            </div>

            {/* Correo / Rol / Estatus */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              {/* Correo */}
              <div>
                <label className="block text-xs font-medium text-slate-500">Correo</label>
                <div className="mt-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 overflow-hidden text-ellipsis whitespace-nowrap shadow-sm">
                  {readEmail}
                </div>
              </div>

              {/* Rol */}
              <div>
                <label className="block text-xs font-medium text-slate-500">Rol</label>
                <div className="mt-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 overflow-hidden text-ellipsis whitespace-nowrap shadow-sm">
                  {readRol}
                </div>
              </div>

              {/* Estatus */}
              <div>
                <label className="block text-xs font-medium text-slate-500">Estatus</label>
                <div className="mt-1 flex items-center gap-3">

                  <button
                    type="button"
                    onClick={() => setFormActivo(!formActivo)}
                    className={
                      "relative w-12 h-6 rounded-full transition " +
                      (formActivo ? "bg-green-500" : "bg-slate-300")
                    }
                  >
                    <span
                      className={
                        "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition " +
                        (formActivo ? "right-0.5" : "left-0.5")
                      }
                    />
                  </button>

                  <span
                    className={
                      "text-sm " +
                      (formActivo ? "text-green-700" : "text-amber-700")
                    }
                  >
                    {formActivo ? "Activo" : "Suspendido"}
                  </span>

                </div>
              </div>

            </div>

            {/* Botones */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm hover:bg-slate-50"
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="rounded-xl bg-blue-600 px-5 py-2.5 text-white font-medium shadow hover:opacity-90"
              >
                Guardar cambios
              </button>
            </div>

          </form>

        </div>
      </div>
    </div>
  );
}
