import React, { useEffect, useState, useCallback } from "react";
import AdminPanel from "../../components/organisms/Admin/AdminPanel";
import AvisosModal from "../../components/organisms/Avisos/AvisosModal";
import TestimoniosModal from "../../components/organisms/Home/Testimonios/TestimoniosModal";
import UsuariosModal from "../../components/organisms/Usuarios/UsuariosModal";
import TiendaCreatePublication from "../../components/organisms/Tienda/TiendaCrearModal";

import { fetchDashboard, updateDashboardItem } from "../../api/adminDashboard";
import {
  absUrl,
  normalizeAviso,
  normalizeTestimonio,
} from "../../api/adminMedia";

const API_BASE = (import.meta?.env?.VITE_API_BASE || "http://localhost:5000/api")
  .replace(/\/$/, "");

const toBool = (v) =>
  v === true || v === 1 || v === "1" || v === "true";

const normalizeUser = (u) => ({
  ...u,
  isActiveBool: toBool(u?.isActive ?? u?.activo ?? u?.active),
});

const normalizeProducto = (p) => ({
  ...p,
  imgSrc: absUrl(p.imagenurl ?? ""),
});

export default function AdminPanelContainer() {
  const [active, setActive] = useState("avisos");

  const [avisos, setAvisos] = useState([]);
  const [testimonios, setTestimonios] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [productos, setProductos] = useState([]);

  const [tStatus, setTStatus] = useState("pending");
  const [pStatus, setPStatus] = useState("pending");

  const [loading, setLoading] = useState({
    avisos: true,
    testimonios: true,
    usuarios: true,
    tienda: true,
    estadisticas: true,
  });

  const [error, setError] = useState({
    avisos: null,
    testimonios: null,
    usuarios: null,
    tienda: null,
    estadisticas: null,
  });

  // MODALES
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editTipo, setEditTipo] = useState(null);
  const [editId, setEditId] = useState(null);

  // Avisos / Testimonios
  const [formTitulo, setFormTitulo] = useState("");
  const [formTexto, setFormTexto] = useState("");
  const [formNombre, setFormNombre] = useState("");
  const [formLocalidad, setFormLocalidad] = useState("");
  const [formComentario, setFormComentario] = useState("");
  const [formRating, setFormRating] = useState(5);
  const [file, setFile] = useState(null);
  const [formPreview, setFormPreview] = useState(null);

  // Tienda (initialData para modal)
  const [productoInicial, setProductoInicial] = useState(null);

  // MODAL USUARIOS
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userNombre, setUserNombre] = useState("");
  const [userApellidos, setUserApellidos] = useState("");
  const [userActivo, setUserActivo] = useState(true);
  const [userReadonly, setUserReadonly] = useState({
    email: "",
    rol: "",
  });

  // Estadísticas
  const [stats, setStats] = useState([]);
  const [savingStats, setSavingStats] = useState(false);
  const [dirtyStats, setDirtyStats] = useState({});

  const resetEdit = () => {
    setIsEditOpen(false);
    setEditTipo(null);
    setEditId(null);
    setFile(null);
    setFormPreview(null);
    setFormTitulo("");
    setFormTexto("");
    setFormNombre("");
    setFormLocalidad("");
    setFormComentario("");
    setFormRating(5);
    setProductoInicial(null);
  };

  // ========== Fetch JSON helper ==========
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

    const isJSON = (res.headers.get("content-type") || "").includes(
      "application/json"
    );
    const data = isJSON ? await res.json().catch(() => null) : await res.text();

    if (!res.ok) {
      const msg = isJSON ? data?.message || data?.error : data;
      throw new Error(msg || `HTTP ${res.status}`);
    }
    return data;
  }, []);

  // ========== LOADERS ==========
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

  const loadTestimonios = useCallback(async () => {
    setLoading((s) => ({ ...s, testimonios: true }));
    setError((s) => ({ ...s, testimonios: null }));

    try {
      const resp = await fetchJSON(
        `${API_BASE}/testimonios/admin?status=${encodeURIComponent(tStatus)}`
      );
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

  const loadTienda = useCallback(async () => {
    setLoading((s) => ({ ...s, tienda: true }));
    setError((s) => ({ ...s, tienda: null }));

    try {
      const resp = await fetchJSON(
        `${API_BASE}/tienda/admin?status=${encodeURIComponent(pStatus)}`
      );
      const items = Array.isArray(resp?.data) ? resp.data : resp;
      setProductos((items || []).map(normalizeProducto));
    } catch (e) {
      setError((s) => ({ ...s, tienda: String(e?.message || e) }));
    } finally {
      setLoading((s) => ({ ...s, tienda: false }));
    }
  }, [fetchJSON, pStatus]);

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

  // Cargar todo al montar
  useEffect(() => {
    loadAvisos();
    loadTestimonios();
    loadUsuarios();
    loadTienda();
    loadStats();
  }, [loadAvisos, loadTestimonios, loadUsuarios, loadTienda, loadStats]);

  // Recargar al cambiar tab o estatus de testimonios/tienda
  useEffect(() => {
    if (active === "avisos") loadAvisos();
    if (active === "usuarios") loadUsuarios();
    if (active === "estadisticas") loadStats();
    if (active === "testimonios") loadTestimonios();
    if (active === "tienda") loadTienda();
  }, [active, tStatus, pStatus, loadAvisos, loadUsuarios, loadStats, loadTestimonios, loadTienda]);

  // ========== EDICIÓN ==========
  const fetchItemForEdit = async (tipo, id) => {
    try {
      const r = await fetchJSON(`${API_BASE}/${tipo}/${id}`);
      return r?.data ?? r;
    } catch {
      let list = [];
      if (tipo === "avisos") list = avisos;
      else if (tipo === "testimonios") list = testimonios;
      else if (tipo === "tienda") list = productos;
      return list.find((x) => String(x.id) === String(id)) || null;
    }
  };

  const handleEdit = async (tipo, itemOrId) => {
    if (tipo === "usuarios") return handleUserEdit(itemOrId);

    const id = typeof itemOrId === "object" ? itemOrId.id : itemOrId;
    if (!id) return;

    setEditTipo(tipo);
    setEditId(id);

    try {
      const data = await fetchItemForEdit(tipo, id);

      if (tipo === "avisos") {
        setFormTitulo(data.titulo || "");
        setFormTexto(data.texto || "");
        setFormPreview(absUrl(data.imgurl || data.imagen || data.image_url));
        setFile(null);
        setIsEditOpen(true);
      } else if (tipo === "testimonios") {
        setFormNombre(data.nombre || "");
        setFormLocalidad(data.localidad || "");
        setFormComentario(data.comentario || "");
        setFormRating(Number(data.rating || 5));
        setFormPreview(
          absUrl(data.imagenurl || data.imagen_url || data.imgurl)
        );
        setFile(null);
        setIsEditOpen(true);
      } else if (tipo === "tienda") {
        setProductoInicial({
          id: data.id,
          nombre: data.nombre || "",
          name: data.nombre || "",
          precio: data.precio,
          price: data.precio,
          categoria: data.categoria || "Otros",
          category: data.categoria || "Otros",
          stock: data.stock,
          ubicacion: data.ubicacion || "",
          location: data.ubicacion || "",
          telefono: data.telefono || "",
          imagenurl: absUrl(data.imagenurl || ""),
          imgSrc: absUrl(data.imagenurl || ""),
          status: data.status,
        });
        setIsEditOpen(true);
      }
    } catch (e) {
      alert("Error al cargar datos: " + (e?.message || e));
      resetEdit();
    }
  };

  const handleDelete = async (tipo, id) => {
    if (tipo === "usuarios") return handleDeleteUser(id);
    if (!id) return;

    const ok = confirm("¿Eliminar este registro?");
    if (!ok) return;

    try {
      const url = `${API_BASE}/${tipo}/${id}`;
      await fetchJSON(url, { method: "DELETE" });

      if (tipo === "avisos") loadAvisos();
      if (tipo === "testimonios") loadTestimonios();
      if (tipo === "tienda") loadTienda();
    } catch (e) {
      alert("Error eliminando: " + (e?.message || e));
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
    } else if (editTipo === "testimonios") {
      fd.append("nombre", formNombre);
      fd.append("localidad", formLocalidad || "");
      fd.append("comentario", formComentario);
      fd.append("rating", String(formRating));
      if (file) fd.append("imagen", file);
    } else {
      return;
    }

    try {
      await fetch(url, { method: "PUT", body: fd, credentials: "include" });

      if (editTipo === "avisos") loadAvisos();
      else if (editTipo === "testimonios") loadTestimonios();

      resetEdit();
    } catch (e2) {
      alert("Error guardando cambios: " + (e2?.message || e2));
    }
  };

  // ========== TIENDA (EDITAR) ==========
  const submitTiendaEdit = async (payload) => {
    if (!editId) throw new Error("ID inválido");

    const url = `${API_BASE}/tienda/${editId}`;
    const fd = new FormData();

    fd.append("nombre", payload.name);
    fd.append("precio", String(payload.price));
    fd.append("stock", String(payload.stock));
    fd.append("categoria", payload.category);
    fd.append("ubicacion", payload.location);
    fd.append("telefono", payload.telefono);

    if (payload.imageFile) {
      fd.append("imagen", payload.imageFile);
    }

    try {
      await fetch(url, {
        method: "PUT",
        body: fd,
        credentials: "include",
      });
      await loadTienda();
      resetEdit();
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  // ========== USUARIOS ==========
  async function handleUserEdit(itemOrId) {
    const id = typeof itemOrId === "object" ? itemOrId.id : itemOrId;

    try {
      const r = await fetchJSON(`${API_BASE}/users/${id}`);
      const u = r?.data ?? r;

      setUserId(id);
      setUserNombre(u.nombre || "");
      setUserApellidos(u.apellidos || u.apellido || "");
      setUserActivo(toBool(u.isActive ?? u.activo ?? u.active));
      setUserReadonly({
        email: u.email || u.correo || "",
        rol: u.rol || u.role || "",
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

      loadUsuarios();
      setIsUserOpen(false);
    } catch (e) {
      alert("No se pudo actualizar: " + (e?.message || e));
    }
  }

  async function handleSuspendUser(id) {
    const ok = confirm("¿Suspender usuario?");
    if (!ok) return;

    try {
      await fetchJSON(`${API_BASE}/users/${id}`, { method: "DELETE" });
      loadUsuarios();
    } catch (e) {
      alert("No se pudo suspender: " + (e?.message || e));
    }
  }

  async function handleDeleteUser(id) {
    const ok = confirm("¿Eliminar usuario DEFINITIVAMENTE?");
    if (!ok) return;

    try {
      await fetchJSON(`${API_BASE}/users/${id}?hard=true`, {
        method: "DELETE",
      });
      loadUsuarios();
    } catch (e) {
      alert("No se pudo eliminar: " + (e?.message || e));
    }
  }

  // ========== ESTADISTICAS ==========
  const onStatChange = (slug, nextValue) => {
    setStats((prev) =>
      prev.map((it) => (it.slug === slug ? { ...it, value: nextValue } : it))
    );
    setDirtyStats((d) => ({ ...d, [slug]: true }));
  };

  const saveAllStats = async () => {
    const toUpdate = stats.filter((it) => dirtyStats[it.slug]);

    setSavingStats(true);
    try {
      await Promise.all(
        toUpdate.map((it) => updateDashboardItem(it.slug, it.value))
      );
      await loadStats();
      alert("Estadísticas actualizadas.");
    } catch (e) {
      alert("No se pudieron actualizar: " + (e?.message || e));
    }
    setSavingStats(false);
  };

  // ========== APROBAR TESTIMONIOS ==========
  const approveTestimonio = async (id) => {
    try {
      await fetchJSON(`${API_BASE}/testimonios/admin/${id}`, {
        method: "PATCH",
      });
      loadTestimonios();
    } catch (e) {
      alert("No se pudo aprobar: " + (e?.message || e));
    }
  };

  // ========== APROBAR PRODUCTO ==========
  const approveProducto = async (id) => {
    try {
      await fetchJSON(`${API_BASE}/tienda/admin/${id}`, {
        method: "PATCH",
      });
      loadTienda();
    } catch (e) {
      alert("No se pudo aprobar: " + (e?.message || e));
    }
  };

  return (
    <>
      <AdminPanel
        active={active}
        onSelect={setActive}
        // DATOS
        avisos={avisos}
        testimonios={testimonios}
        usuarios={usuarios}
        productos={productos}
        loading={loading}
        error={error}
        // EDICIÓN
        onEdit={handleEdit}
        onDelete={handleDelete}
        onSuspend={handleSuspendUser}
        // RECARGAS
        onRefreshAvisos={loadAvisos}
        onRefreshUsuarios={loadUsuarios}
        onRefreshStats={loadStats}
        onRefreshTestimonios={loadTestimonios}
        onRefreshTienda={loadTienda}
        // Testimonios
        tStatus={tStatus}
        onChangeStatus={setTStatus}
        onApprove={approveTestimonio}
        // Tienda
        pStatus={pStatus}
        onChangePStatus={setPStatus}
        onApproveProducto={approveProducto}
        // Estadísticas
        stats={stats}
        statsLoading={!!loading.estadisticas}
        statsError={error.estadisticas}
        onStatChange={onStatChange}
        onStatsSave={saveAllStats}
        statsSaving={savingStats}
        dirtyCount={Object.keys(dirtyStats).length}
      />

      {/* Modales Avisos / Testimonios */}
      {isEditOpen && editTipo === "avisos" && (
        <AvisosModal
          isOpen={true}
          onClose={resetEdit}
          onSubmit={submitEdit}
          formTitulo={formTitulo}
          setFormTitulo={setFormTitulo}
          formTexto={formTexto}
          setFormTexto={setFormTexto}
          onFileChange={(f) => {
            setFile(f);
            setFormPreview(f ? URL.createObjectURL(f) : null);
          }}
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
          onFileChange={(e) => {
            const f = e.target.files?.[0] || null;
            setFile(f);
            setFormPreview(f ? URL.createObjectURL(f) : null);
          }}
          formPreview={formPreview}
        />
      )}

      {/* Modal Tienda */}
      {isEditOpen && editTipo === "tienda" && productoInicial && (
        <TiendaCreatePublication
          isOpen={true}
          onClose={resetEdit}
          onSubmit={submitTiendaEdit}
          editMode={true}
          initialData={productoInicial}
        />
      )}

      {/* Modal Usuarios */}
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
