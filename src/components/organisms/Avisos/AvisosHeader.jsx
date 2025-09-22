export default function AvisosHeader({ headerBg, layout, onToggleLayout, onOpenModal, total = 0 }) {
  const ghostBtn =
    "inline-flex items-center gap-2 rounded-xl border border-white/70 bg-white/20 backdrop-blur text-white px-3 py-1.5 hover:bg-white/30 transition";
  const purpleBtn =
    "inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-purple-600 to-fuchsia-600 text-white px-4 py-2 font-medium shadow-md hover:shadow-lg active:translate-y-px transition";

  return (
    <section className="relative">
      <div className="h-52 w-full overflow-hidden">
        <img
          src={headerBg}
          alt=""
          className="h-full w-full object-cover"
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
        <div className="absolute inset-0 bg-[radial-gradient(90rem_40rem_at_10%_-20%,rgba(168,85,247,.45),transparent),radial-gradient(90rem_40rem_at_90%_0%,rgba(217,70,239,.45),transparent)]" />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="absolute inset-0 flex items-center">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-start justify-between">
            <div>
              <button
                onClick={() => window.history.back()}
                className={ghostBtn + " mb-4"}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="-ml-0.5">
                  <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Volver
              </button>
              <h1 className="text-3xl font-bold text-white drop-shadow-sm">Avisos</h1>
              <p className="text-white/90">Comunicados para toda la comunidad · {total}</p>
            </div>

            <div className="flex items-center gap-2">
              <button onClick={onToggleLayout} className={ghostBtn}>
                {layout === "grid" ? (
                  <span className="inline-flex items-center gap-2">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 8v-8h8v8h-8z" fill="currentColor"/></svg>
                    Vista lista
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M4 5h16v4H4V5zm0 5h16v4H4v-4zm0 5h16v4H4v-4z" fill="currentColor"/></svg>
                    Vista grid
                  </span>
                )}
              </button>
              <button onClick={onOpenModal} className={purpleBtn + " shadow-purple-600/30"}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                Crear nuevo aviso
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
