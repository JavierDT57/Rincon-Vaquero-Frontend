import React, { useEffect, useState, useCallback } from "react";
import AdminPanel from "../../components/organisms/Admin/AdminPanel";
import AvisosModal from "../../components/organisms/Avisos/AvisosModal";
import TestimoniosModal from "../../components/organisms/Home/Testimonios/TestimoniosModal";
import UsuariosModal from "../../components/organisms/Usuarios/UsuariosModal";

// helpers imágenes (avisos/testimonios)
import { absUrl, normalizeAviso, normalizeTestimonio } from "../../api/adminMedia";

// API usuarios
import {
  fetchUsers,
  fetchUserById,
  updateUser,
  suspendUser,
  deleteUserHard,
} from "../../api/users";

const API_BASE = import.meta?.env?.VITE_API_BASE || "http://localhost:5000/api";

export default function AdminPanelContainer() {
  const [active, setActive] = useState("avisos");

  // data
  const [avisos, setAvisos] = useState([]);
  const [testimonios, setTestimonios] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  const [loading, setLoading] = useState({ avisos: true, testimonios: true, usuarios: true });
  const [error, setError] = useState({ avisos: null, testimonios: null, usuarios: null });

  // ====== Estado para EDITAR aviso/testimonio ======
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editTipo, setEditTipo] = useState(null); // 'avisos' | 'testimonios'
  const [editId, setEditId] = useState(null);

  // AVISOS
  const [formTitulo, setFormTitulo] = useState("");
  const [formTexto, setFormTexto] = useState("");

  // TESTIMONIOS
  const [formNombre, setFormNombre] = useState("");
  const [formLocalidad, setFormLocalidad] = useState("");
  const [formComentario, setFormComentario] = useState("");
  const [formRating, setFormRating] = useState(5);

  // Imagen
  const [file, setFile] = useState(null);
  const [formPreview, setFormPreview] = useState(null);

  // ====== Estado para EDITAR usuario ======
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userNombre, setUserNombre] = useState("");
  const [userApellidos, setUserApellidos] = useState("");
  const [userReadonly, setUserReadonly] = useState({ email: "", rol: "", activo: true });

  const resetEdit = () => {
    setIsEditOpen(false);
    setEditTipo(null);
    setEditId(null);
    setFile(null);
    setFormPreview(null);
    setFormTitulo(""); setFormTexto("");
    setFormNombre(""); setFormLocalidad(""); setFormComentario(""); setFormRating(5);
  };

  // ====== Data fetch base ======
  const fetchJSON = useCallback(async (url, opts = {}) => {
    const res = await fetch(url, {
      method: "GET",
      mode: "cors",
      credentials: "include",
      headers: { Accept: "application/json" },
      ...opts,
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`${res.status} ${res.statusText} - ${text}`);
    }
    const ct = res.headers.get("content-type") || "";
    if (!ct.includes("application/json")) {
      try { return JSON.parse((await res.text()) || "[]"); } catch { return []; }
    }
    return res.json();
  }, []);

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
      const resp = await fetchJSON(`${API_BASE}/testimonios`);
      const items = Array.isArray(resp?.data) ? resp.data : resp;
      setTestimonios((items || []).map(normalizeTestimonio));
    } catch (e) {
      setError((s) => ({ ...s, testimonios: String(e?.message || e) }));
    } finally {
      setLoading((s) => ({ ...s, testimonios: false }));
    }
  }, [fetchJSON]);

  const loadUsuarios = useCallback(async () => {
    setLoading((s) => ({ ...s, usuarios: true }));
    setError((s) => ({ ...s, usuarios: null }));
    try {
      const list = await fetchUsers();
      setUsuarios(list || []);
    } catch (e) {
      setError((s) => ({ ...s, usuarios: String(e?.message || e) }));
    } finally {
      setLoading((s) => ({ ...s, usuarios: false }));
    }
  }, []);

  useEffect(() => {
    loadAvisos();
    loadTestimonios();
    loadUsuarios(); // ⬅️ usuarios también
  }, [loadAvisos, loadTestimonios, loadUsuarios]);

  // ====== Helpers edición (avisos/testimonios) ======
  const fetchItemForEdit = async (tipo, id) => {
    try {
      const r = await fetch(`${API_BASE}/${tipo}/${id}`, { credentials: "include" });
      if (!r.ok) throw new Error("GET individual no disponible");
      const js = await r.json();
      return js?.data ?? js;
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
    if (tipo === "usuarios") return handleUserEdit(itemOrId); // ⬅️ redirige a modal usuario

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
    if (tipo === "usuarios") return handleDeleteUser(id); // ⬅️ hard delete
    if (!id) return;

    const ok = confirm("¿Eliminar este registro? Esta acción no se puede deshacer.");
    if (!ok) return;
    try {
      const url = tipo === "avisos" ? `${API_BASE}/avisos/${id}` : `${API_BASE}/testimonios/${id}`;
      await fetch(url, { method: "DELETE", mode: "cors", credentials: "include" });
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
      if (file) fd.append("imagenurl", file);
    }

    try {
      const r = await fetch(url, { method: "PUT", body: fd, mode: "cors", credentials: "include" });
      if (!r.ok) throw new Error(`PUT ${editTipo} falló (${r.status})`);
      if (editTipo === "avisos") await loadAvisos(); else await loadTestimonios();
      resetEdit();
    } catch (e2) {
      alert("Error guardando cambios: " + (e2?.message || e2));
    }
  };

  // ====== USUARIOS: editar / suspender / eliminar ======
  async function handleUserEdit(itemOrId) {
    const id = typeof itemOrId === "object" ? itemOrId.id : itemOrId;
    if (!id) return;
    try {
      const u = await fetchUserById(id);
      setUserId(id);
      setUserNombre(u?.nombre || "");
      setUserApellidos(u?.apellidos || u?.apellido || "");
      setUserReadonly({
        email: u?.email || u?.correo || "",
        rol: u?.rol || u?.role || "",
        activo: u?.activo ?? u?.active ?? true,
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
      await updateUser(userId, { nombre: userNombre, apellidos: userApellidos });
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
      await suspendUser(id);  // DELETE /users/:id (soft)
      await loadUsuarios();
    } catch (e) {
      alert("No se pudo suspender: " + (e?.message || e));
    }
  }

  async function handleDeleteUser(id) {
    const ok = confirm("¿Eliminar DEFINITIVAMENTE este usuario? No se puede deshacer.");
    if (!ok) return;
    try {
      await deleteUserHard(id); // DELETE /users/:id?hard=true
      await loadUsuarios();
    } catch (e) {
      alert("No se pudo eliminar: " + (e?.message || e));
    }
  }

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

        // ⬇️ props para usuarios
        onSuspend={handleSuspendUser}
        onEditUser={(item) => handleUserEdit(item)}
        onDeleteUser={(id) => handleDeleteUser(id)}
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

      {/* Modal USUARIO (solo nombre y apellidos) */}
      {isUserOpen && (
        <UsuariosModal
          isOpen={isUserOpen}
          onClose={() => setIsUserOpen(false)}
          onSubmit={submitUserEdit}
          formNombre={userNombre}
          setFormNombre={setUserNombre}
          formApellidos={userApellidos}
          setFormApellidos={setUserApellidos}
          readEmail={userReadonly.email}
          readRol={userReadonly.rol}
          readActivo={userReadonly.activo}
        />
      )}
    </>
  );
}
