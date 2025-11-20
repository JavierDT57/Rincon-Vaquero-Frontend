import React, { useState, useEffect } from "react";

export default function TiendaCreatePublication({
  isOpen,
  onClose,
  onSubmit,
  editMode = false,
  initialData = null,
}) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "Otros",
    stock: "",
    location: "",
    lada: "+52",
    phone: "",
    imageFile: null,
  });

  const [preview, setPreview] = useState(null);
  const [localError, setLocalError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const resetState = () => {
    setFormData({
      name: "",
      price: "",
      category: "Otros",
      stock: "",
      location: "",
      lada: "+52",
      phone: "",
      imageFile: null,
    });
    setPreview(null);
    setLocalError("");
    setSubmitting(false);
  };

  // Reset cuando se cierra
  useEffect(() => {
    if (!isOpen) {
      resetState();
    }
  }, [isOpen]);

  // Precargar datos 
  useEffect(() => {
    if (isOpen && editMode && initialData) {
      const tel = initialData.telefono || "";
      let lada = "+52";
      let phone = "";

      if (tel) {
        if (/^\+\d+/.test(tel)) {
          if (tel.length > 4) {
            lada = tel.slice(0, 3); 
            phone = tel.slice(3);
          } else {
            lada = tel;
          }
        } else if (tel.length > 10) {
          lada = tel.slice(0, tel.length - 10);
          phone = tel.slice(-10);
        } else {
          phone = tel;
        }
      }

      setFormData({
        name: initialData.name ?? initialData.nombre ?? "",
        price: String(
          initialData.price ??
            initialData.precio ??
            ""
        ),
        category: initialData.category ?? initialData.categoria ?? "Otros",
        stock: String(initialData.stock ?? ""),
        location: initialData.location ?? initialData.ubicacion ?? "",
        lada,
        phone,
        imageFile: null,
      });

      if (initialData.imagenurl || initialData.imgSrc) {
        setPreview(initialData.imgSrc || initialData.imagenurl);
      } else {
        setPreview(null);
      }

      setLocalError("");
    }
  }, [isOpen, editMode, initialData]);

  if (!isOpen) return null;

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, imageFile: file }));

    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");

    if (!formData.name || !formData.price || !formData.stock || !formData.location) {
      setLocalError("Por favor completa todos los campos obligatorios.");
      return;
    }

    // VALIDAR TELEFONO
    if (!/^\+?\d{1,3}$/.test(formData.lada)) {
      setLocalError("La lada debe ser algo como +52 o +1.");
      return;
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      setLocalError("El número debe tener exactamente 10 dígitos.");
      return;
    }

    const telefonoCompleto = `${formData.lada}${formData.phone}`;

    const payload = {
      name: formData.name,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock, 10),
      category: formData.category,
      location: formData.location,
      telefono: telefonoCompleto,
      imageFile: formData.imageFile,
    };

    try {
      setSubmitting(true);
      await onSubmit(payload);
      onClose();
    } catch (err) {
      setLocalError(err?.message || "Error al guardar la publicación.");
    } finally {
      setSubmitting(false);
    }
  };

  const titleText = editMode ? "Editar publicación" : "Crear nueva publicación";
  const buttonText = submitting
    ? editMode
      ? "Guardando..."
      : "Publicando..."
    : editMode
    ? "Guardar cambios"
    : "Publicar";

  return (
    <div className="fixed inset-0 z-[60] grid place-items-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-2xl rounded-2xl p-[1px] bg-gradient-to-br from-blue-500/40 to-blue-500/40 shadow-2xl">
        <div className="rounded-2xl bg-white ring-1 ring-black/5 p-6 animate-fadeIn">

          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">{titleText}</h2>
            <button
              onClick={onClose}
              className="rounded-lg px-2 py-1 text-sm text-slate-600 hover:bg-slate-100"
            >
              Cerrar
            </button>
          </div>

          {localError && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-sm">
              {localError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Nombre */}
            <div>
              <label className="block text-sm font-medium">Nombre *</label>
              <input
                type="text"
                value={formData.name}
                onChange={handleChange("name")}
                required
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Precio + Stock */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Precio *</label>
                <input
                  type="number"
                  required
                  value={formData.price}
                  onChange={handleChange("price")}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Stock *</label>
                <input
                  type="number"
                  required
                  value={formData.stock}
                  onChange={handleChange("stock")}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Categoría */}
            <div>
              <label className="block text-sm font-medium">Categoría *</label>
              <select
                value={formData.category}
                onChange={handleChange("category")}
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5 focus:ring-2 focus:ring-blue-500"
              >
                <option>Electrónica</option>
                <option>Muebles</option>
                <option>Ropa</option>
                <option>Libros</option>
                <option>Otros</option>
              </select>
            </div>

            {/* Ubicación */}
            <div>
              <label className="block text-sm font-medium">Ubicación *</label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={handleChange("location")}
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* TELEFONO */}
            <div>
              <label className="block text-sm font-medium">Teléfono *</label>
              <div className="flex gap-3">
                {/* LADA */}
                <input
                  type="text"
                  value={formData.lada}
                  onChange={handleChange("lada")}
                  className="w-24 rounded-xl border border-slate-200 px-3 py-2.5 focus:ring-2 focus:ring-blue-500"
                />

                {/* NUMERO */}
                <input
                  type="text"
                  value={formData.phone}
                  maxLength="10"
                  placeholder="10 dígitos"
                  onChange={handleChange("phone")}
                  className="flex-1 rounded-xl border border-slate-200 px-3 py-2.5 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Imagen */}
            <div>
              <label className="block text-sm font-medium">
                Imagen (opcional)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-sm file:mr-4 file:rounded-lg file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-white file:font-medium file:hover:opacity-90"
              />

              {preview && (
                <div className="mt-3 overflow-hidden rounded-xl ring-1 ring-black/5">
                  <img
                    src={preview}
                    className="h-48 w-full object-cover"
                    alt="Vista previa"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm hover:bg-slate-50"
              >
                Cancelar
              </button>

              <button
                type="submit"
                disabled={submitting}
                className="rounded-xl bg-blue-600 px-5 py-2.5 text-white font-medium shadow hover:opacity-90 disabled:opacity-60"
              >
                {buttonText}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
