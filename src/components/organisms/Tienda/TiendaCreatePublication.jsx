// src/components/organisms/Tienda/TiendaCreatePublication.jsx
import React, { useState } from "react";

export default function TiendaCreatePublication({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    owner: "Mi Usuario",        // TODO: luego lo conectas con el usuario logueado
    name: "",
    image: "/diverse-products-still-life.png",
    price: "",
    category: "Otros",
    stock: "",
    location: "",
    contactNumber: "",
    status: "pending",
  });

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.price ||
      !formData.stock ||
      !formData.location ||
      !formData.contactNumber
    ) {
      return;
    }

    const product = {
      ...formData,
      price: Number.parseFloat(formData.price),
      stock: Number.parseInt(formData.stock, 10),
    };

    onSubmit(product);

    // Reseteamos algunos campos
    setFormData((prev) => ({
      ...prev,
      name: "",
      price: "",
      stock: "",
      location: "",
      contactNumber: "",
    }));
  };

  return (
    <div className="max-w-2xl">
      <h2 className="text-xl md:text-2xl font-semibold text-slate-900 mb-4">
        Crear nueva publicación
      </h2>

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
            Número de contacto (WhatsApp) *
          </label>
          <input
            type="tel"
            required
            placeholder="Ej: +525511112233"
            value={formData.contactNumber}
            onChange={handleChange("contactNumber")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-black mb-2">
            URL de la imagen (opcional)
          </label>
          <input
            type="text"
            value={formData.image}
            onChange={handleChange("image")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Publicar
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
