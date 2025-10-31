import React, { useEffect, useState, useCallback } from "react";
import AdminPanel from "../../components/organisms/Admin/AdminPanel";
import AvisosModal from "../../components/organisms/Avisos/AvisosModal";
import TestimoniosModal from "../../components/organisms/Home/Testimonios/TestimoniosModal";
import UsuariosModal from "../../components/organisms/Usuarios/UsuariosModal";

import { fetchDashboard, updateDashboardItem } from "../../api/adminDashboard";
import { absUrl, normalizeAviso, normalizeTestimonio } from "../../api/adminMedia";

const API_BASE = (import.meta?.env?.VITE_API_BASE || "http://localhost:5000/api").replace(/\/$/, "");

// helpers users
const toBool = (v) => v === true || v === 1 || v === "1" || v === "true";
const normalizeUser = (u) => ({
  ...u,
  isActiveBool: toBool(u?.isActive ?? u?.activo ?? u?.active),
});

export default function AdminPanelContainer() {
  const [active, setActive] = useState("avisos");

  const [avisos, setAvisos] = useState([]);
  const [testimonios, setTestimonios] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  // estado de filtro para moderación
  const [tStatus, setTStatus] = useState("pending");

  const [loading, setLoading] = useState({
    avisos: true,
    testimonios: true,
    usuarios: true,
    estadisticas: true,
  });
  const [error, setError] = useState({
    avisos: null,
    testimonios: null,
    usuarios: null,
    estadisticas: null,
  });

  // ====== edición avisos/testimonios ======
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editTipo, setEditTipo] = useState(null);
  const [editId, setEditId] = useState(null);
  const [formTitulo, setFormTitulo] = useState("");
  const [formTexto, setFormTexto] = useState("");
  const [formNombre, setFormNombre] = useState("");
  const [formLocalidad, setFormLocalidad] = useState("");
  const [formComentario, setFormComentario] = useState("");
  const [formRating, setFormRating] = useState(5);
  const [file, setFile] = useState(null);
  const [formPreview, setFormPreview] = useState(null);

  // ====== edición usuarios ======
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userNombre, setUserNombre] = useState("");
  const [userApellidos, setUserApellidos] = useState("");
  const [userActivo, setUserActivo] = useState(true);
  const [userReadonly, setUserReadonly] = useState({ email: "", rol: "" });

  // ====== estadísticas ======
  const [stats, setStats] = useState([]);
  const [savingStats, setSavingStats] = useState(false);
  const [dirtyStats, setDirtyStats] = useState({}); // {slug: true}

  const resetEdit = () => {
    setIsEditOpen(false);
    setEditTipo(null);
    setEditId(null);
    setFile(null);
    setFormPreview(null);
    setFormTitulo(""); setFormTexto("");
    setFormNombre(""); setFormLocalidad(""); setFormComentario(""); setFormRating(5);
  };

  // ====== fetch base ======
  const fetchJSON = useCallback(async (url, opts = {}) => {
    const res = await fetch(url, {
      method: opts.method || "GET",
      credentials: "include",
      mode: "cors",
      headers: {
        Accept: "application/json",
        ...(opts.headers || {}),
      },
      body: opts.body,
    });
    const ct = res.headers.get("content-type") || "";
    const isJSON = ct.includes("application/json");
    const data = isJSON ? await res.json().catch(() => null) : await res.text();
    if (!res.ok) {
      const msg = isJSON ? (data?.message || data?.error) : data;
      throw new Error(msg || `HTTP ${res.status}`);
    }
    return data;
  }, []);

  // ====== loaders ======
  const loadAvisos = useCallback(async () => {
    setLoading((s) => ({ ...s, avisos: true }));
    setError((s) => ({ ...s, avisos: null }));
    try {
      const resp = await fetchJSON(`${API_BASE}/avisos`);
      const items = Array.isArray(resp?.data) ? resp.data : resp;
      setAvisos((items || []).map(normalizeAviso));
    } catch (e) {
      setError((s) => ({ ...s, avisos: String(e?.message || e) }));
    } finally {
      setLoading((s) => ({ ...s, avisos: false }));
    }
  }, [fetchJSON]);

  // endpoint admin con filtro de estado
  const loadTestimonios = useCallback(async () => {
    setLoading((s) => ({ ...s, testimonios: true }));
    setError((s) => ({ ...s, testimonios: null }));
    try {
      const resp = await fetchJSON(`${API_BASE}/testimonios/admin?status=${encodeURIComponent(tStatus)}`);
      const items = Array.isArray(resp?.data) ? resp.data : resp;
      setTestimonios((items || []).map(normalizeTestimonio));
    } catch (e) {
      setError((s) => ({ ...s, testimonios: String(e?.message || e) }));
    } finally {
      setLoading((s) => ({ ...s, testimonios: false }));
    }
  }, [fetchJSON, tStatus]);

  const loadUsuarios = useCallback(async () => {
    setLoading((s) => ({ ...s, usuarios: true }));
    setError((s) => ({ ...s, usuarios: null }));
    try {
      const resp = await fetchJSON(`${API_BASE}/users`);
      const list = Array.isArray(resp?.data) ? resp.data : resp;
      setUsuarios((list || []).map(normalizeUser));
    } catch (e) {
      setError((s) => ({ ...s, usuarios: String(e?.message || e) }));
    } finally {
      setLoading((s) => ({ ...s, usuarios: false }));
    }
  }, [fetchJSON]);

  const loadStats = useCallback(async () => {
    setLoading((s) => ({ ...s, estadisticas: true }));
    setError((s) => ({ ...s, estadisticas: null }));
    try {
      const list = await fetchDashboard();
      setStats(list || []);
      setDirtyStats({});
    } catch (e) {
      setError((s) => ({ ...s, estadisticas: String(e?.message || e) }));
    } finally {
      setLoading((s) => ({ ...s, estadisticas: false }));
    }
  }, []);

  useEffect(() => {
    loadAvisos();
    loadTestimonios();
    loadUsuarios();
    loadStats();
  }, [loadAvisos, loadTestimonios, loadUsuarios, loadStats]);

  // ====== edición avisos/testimonios ======
  const fetchItemForEdit = async (tipo, id) => {
    try {
      const r = await fetchJSON(`${API_BASE}/${tipo}/${id}`);
      return r?.data ?? r;
    } catch {
      const list = tipo === "avisos" ? avisos : testimonios;
      return list.find((x) => String(x.id) === String(id)) || null;
    }
  };

  const onAvisoFileChange = (f) => {
    const fileObj = f || null;
    setFile(fileObj);
    setFormPreview(fileObj ? URL.createObjectURL(fileObj) : formPreview);
  };
  const onTestimonioFileChange = (e) => {
    const f = e?.target?.files?.[0] || null;
    setFile(f);
    setFormPreview(f ? URL.createObjectURL(f) : formPreview);
  };

  const handleEdit = async (tipo, itemOrId) => {
    if (tipo === "usuarios") return handleUserEdit(itemOrId);

    const id = typeof itemOrId === "object" ? itemOrId.id : itemOrId;
    if (!id) return;
    setEditTipo(tipo);
    setEditId(id);

    try {
      const data = await fetchItemForEdit(tipo, id);
      if (!data) throw new Error("No se encontró el registro.");

      if (tipo === "avisos") {
        setFormTitulo(data.titulo || "");
        setFormTexto(data.texto || "");
        setFormPreview(absUrl(data.imgurl || data.imagen || data.image_url));
      } else {
        setFormNombre(data.nombre || "");
        setFormLocalidad(data.localidad || "");
        setFormComentario(data.comentario || "");
        setFormRating(Number(data.rating || 5));
        setFormPreview(absUrl(data.imagenurl || data.imagen_url || data.imgurl));
      }
      setFile(null);
      setIsEditOpen(true);
    } catch (e) {
      alert("Error al cargar datos para editar: " + (e?.message || e));
      resetEdit();
    }
  };

  const handleDelete = async (tipo, id) => {
    if (tipo === "usuarios") return handleDeleteUser(id);
    if (!id) return;

    const ok = confirm("¿Eliminar este registro? Esta acción no se puede deshacer.");
    if (!ok) return;
    try {
      const url = tipo === "avisos" ? `${API_BASE}/avisos/${id}` : `${API_BASE}/testimonios/${id}`;
      await fetchJSON(url, { method: "DELETE" });
      if (tipo === "avisos") await loadAvisos();
      if (tipo === "testimonios") await loadTestimonios();
    } catch (e) {
      alert("Error eliminando: " + String(e?.message || e));
    }
  };

  const submitEdit = async (e) => {
    e.preventDefault();
    if (!editTipo || !editId) return;

    const url = `${API_BASE}/${editTipo}/${editId}`;
    const fd = new FormData();

    if (editTipo === "avisos") {
      fd.append("titulo", formTitulo);
      fd.append("texto", formTexto);
      if (file) fd.append("imagen", file);
    } else {
      fd.append("nombre", formNombre);
      fd.append("localidad", formLocalidad || "");
      fd.append("comentario", formComentario);
      fd.append("rating", String(formRating));
      if (file) fd.append("imagen", file);
    }

    try {
      await fetch(url, { method: "PUT", body: fd, mode: "cors", credentials: "include" });
      if (editTipo === "avisos") await loadAvisos(); else await loadTestimonios();
      resetEdit();
    } catch (e2) {
      alert("Error guardando cambios: " + (e2?.message || e2));
    }
  };

  // ====== usuarios ======
  async function handleUserEdit(itemOrId) {
    const id = typeof itemOrId === "object" ? itemOrId.id : itemOrId;
    if (!id) return;
    try {
      const r = await fetchJSON(`${API_BASE}/users/${id}`);
      const u = r?.data ?? r;
      setUserId(id);
      setUserNombre(u?.nombre || "");
      setUserApellidos(u?.apellidos || u?.apellido || "");
      setUserActivo(toBool(u?.isActive ?? u?.activo ?? u?.active));
      setUserReadonly({
        email: u?.email || u?.correo || "",
        rol: u?.rol || u?.role || "",
      });
      setIsUserOpen(true);
    } catch (e) {
      alert("No se pudo cargar el usuario: " + (e?.message || e));
    }
  }

  async function submitUserEdit(e) {
    e.preventDefault();
    if (!userId) return;
    try {
      await fetchJSON(`${API_BASE}/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: userNombre,
          apellidos: userApellidos,
          isActive: userActivo ? 1 : 0,
        }),
      });
      await loadUsuarios();
      setIsUserOpen(false);
    } catch (e) {
      alert("No se pudo actualizar: " + (e?.message || e));
    }
  }

  async function handleSuspendUser(id) {
    const ok = confirm("¿Suspender este usuario? Podrás reactivarlo después.");
    if (!ok) return;
    try {
      await fetchJSON(`${API_BASE}/users/${id}`, { method: "DELETE" }); // soft → isActive=0
      await loadUsuarios();
    } catch (e) {
      alert("No se pudo suspender: " + (e?.message || e) );
    }
  }

  async function handleDeleteUser(id) {
    const ok = confirm("¿Eliminar DEFINITIVAMENTE este usuario? No se puede deshacer.");
    if (!ok) return;
    try {
      await fetchJSON(`${API_BASE}/users/${id}?hard=true`, { method: "DELETE" });
      await loadUsuarios();
    } catch (e) {
      alert("No se pudo eliminar: " + (e?.message || e));
    }
  }

  // ====== stats change/save ======
  const onStatChange = (slug, nextValue) => {
    setStats((prev) => prev.map((it) => (it.slug === slug ? { ...it, value: nextValue } : it)));
    setDirtyStats((d) => ({ ...d, [slug]: true }));
  };

  const saveAllStats = async () => {
    const toUpdate = stats.filter((it) => dirtyStats[it.slug]);
    if (toUpdate.length === 0) {
      alert("No hay cambios por guardar.");
      return;
    }
    setSavingStats(true);
    try {
      await Promise.all(toUpdate.map((it) => updateDashboardItem(it.slug, it.value)));
      await loadStats();
      alert("Estadísticas actualizadas.");
    } catch (e) {
      alert("No se pudieron actualizar: " + (e?.message || e));
    } finally {
      setSavingStats(false);
    }
  };

  // ====== aprobar testimonio ======
  const approveTestimonio = async (id) => {
    try {
      await fetchJSON(`${API_BASE}/testimonios/admin/${id}`, { method: "PATCH" });
      await loadTestimonios();
    } catch (e) {
      alert("No se pudo aprobar: " + (e?.message || e));
    }
  };

  return (
    <>
      <AdminPanel
        active={active}
        onSelect={setActive}
        avisos={avisos}
        testimonios={testimonios}
        usuarios={usuarios}
        loading={loading}
        error={error}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onSuspend={handleSuspendUser}

        // Moderación testimonios
        tStatus={tStatus}
        onChangeStatus={(s) => { setTStatus(s); }}    // cambia filtro
        onApprove={approveTestimonio}
        onRefreshTestimonios={loadTestimonios}

        // stats
        stats={stats}
        statsLoading={!!loading.estadisticas}
        statsError={error.estadisticas}
        onStatChange={onStatChange}
        onStatsSave={saveAllStats}
        statsSaving={savingStats}
        dirtyCount={Object.keys(dirtyStats).length}
      />

      {/* Modales AVISOS/Testimonios */}
      {isEditOpen && editTipo === "avisos" && (
        <AvisosModal
          isOpen={true}
          onClose={resetEdit}
          onSubmit={submitEdit}
          formTitulo={formTitulo}
          setFormTitulo={setFormTitulo}
          formTexto={formTexto}
          setFormTexto={setFormTexto}
          onFileChange={onAvisoFileChange}
          formPreview={formPreview}
        />
      )}
      {isEditOpen && editTipo === "testimonios" && (
        <TestimoniosModal
          isOpen={true}
          onClose={resetEdit}
          onSubmit={submitEdit}
          formNombre={formNombre}
          setFormNombre={setFormNombre}
          formLocalidad={formLocalidad}
          setFormLocalidad={setFormLocalidad}
          formComentario={formComentario}
          setFormComentario={setFormComentario}
          formRating={formRating}
          setFormRating={setFormRating}
          onFileChange={onTestimonioFileChange}
          formPreview={formPreview}
        />
      )}

      {/* Modal USUARIO */}
      {isUserOpen && (
        <UsuariosModal
          isOpen={isUserOpen}
          onClose={() => setIsUserOpen(false)}
          onSubmit={submitUserEdit}
          formNombre={userNombre}
          setFormNombre={setUserNombre}
          formApellidos={userApellidos}
          setFormApellidos={setUserApellidos}
          formActivo={userActivo}
          setFormActivo={setUserActivo}
          readEmail={userReadonly.email}
          readRol={userReadonly.rol}
        />
      )}
    </>
  );
}
