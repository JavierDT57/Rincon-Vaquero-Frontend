// src/components/organisms/Tienda/TiendaCreatePublication.jsx
import React, { useState } from "react";

export default function TiendaCreatePublication({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "Otros",
    stock: "",
    location: "",
    imageFile: null, 
  });

  const [submitting, setSubmitting] = useState(false);
  const [localError, setLocalError] = useState("");

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      imageFile: file || null,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");

    if (
      !formData.name ||
      !formData.price ||
      !formData.stock ||
      !formData.location
    ) {
      setLocalError("Por favor completa todos los campos obligatorios.");
      return;
    }

    const payload = {
      name: formData.name,
      price: Number.parseFloat(formData.price),
      stock: Number.parseInt(formData.stock, 10),
      category: formData.category,
      location: formData.location,
      imageFile: formData.imageFile ?? null, 
    };

    try {
      setSubmitting(true);
      await onSubmit(payload);

      setFormData({
        name: "",
        price: "",
        category: "Otros",
        stock: "",
        location: "",
        imageFile: null,
      });
    } catch (err) {
      setLocalError(err?.message || "Error al crear el producto.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <h2 className="text-xl md:text-2xl font-semibold text-slate-900 mb-4">
        Crear nueva publicación
      </h2>

      {localError && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-sm">
          {localError}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white border border-gray-200 rounded-lg p-6 space-y-6"
      >
        <div>
          <label className="block text-sm font-semibold text-black mb-2">
            Nombre del producto *
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={handleChange("name")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-black mb-2">
              Precio *
            </label>
            <input
              type="number"
              required
              value={formData.price}
              onChange={handleChange("price")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-black mb-2">
              Stock *
            </label>
            <input
              type="number"
              required
              value={formData.stock}
              onChange={handleChange("stock")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-black mb-2">
            Categoría *
          </label>
          <select
            value={formData.category}
            onChange={handleChange("category")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>Electrónica</option>
            <option>Muebles</option>
            <option>Ropa</option>
            <option>Libros</option>
            <option>Otros</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-black mb-2">
            Ubicación *
          </label>
          <input
            type="text"
            required
            value={formData.location}
            onChange={handleChange("location")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-black mb-2">
            Imagen del producto (opcional)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full text-sm text-gray-700"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="flex-1 bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
          >
            {submitting ? "Publicando..." : "Publicar"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-400 text-white font-semibold py-2 rounded-lg hover:bg-gray-500 transition-colors"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
