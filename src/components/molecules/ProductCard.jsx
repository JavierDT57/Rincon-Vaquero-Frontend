// src/components/molecules/ProductCard.jsx
import React from "react";

const getStatusColor = (status) => {
  switch (status) {
    case "published":
      return "bg-green-100 text-green-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "rejected":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function ProductCard({
  product,
  showManageButtons = false,
  onEdit,
  onDelete,
}) {
  if (!product) return null;

  const whatsappNumber = product.contactNumber || "";
  const sanitized = whatsappNumber.replace(/\D/g, "");
  const whatsappLink = sanitized
    ? `https://wa.me/${sanitized}?text=${encodeURIComponent(
        `Hola, vi tu producto "${product.name}" en la tienda y me interesa.`
      )}`
    : "#";

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      {/* Imagen */}
      <div className="w-full h-48 bg-gray-100 overflow-hidden">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Contenido */}
      <div className="p-4">
        <p className="text-xs text-gray-500 font-semibold uppercase mb-2">
          👤 {product.owner}
        </p>

        <h3 className="text-lg font-bold text-black mb-2">
          {product.name}
        </h3>

        <div className="space-y-2 mb-4 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">💲 Precio:</span>
            <span className="font-semibold text-black">
              ${product.price}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">📂 Categoría:</span>
            <span className="font-semibold text-black">
              {product.category}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">📦 Stock:</span>
            <span className="font-semibold text-black">
              {product.stock} unidades
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">📍 Ubicación:</span>
            <span className="font-semibold text-black">
              {product.location}
            </span>
          </div>
        </div>

        {/* Estado (solo en Mis publicaciones) */}
        {showManageButtons && product.status && (
          <div className="mb-4">
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                product.status
              )}`}
            >
              {product.status === "published"
                ? "Publicado"
                : product.status === "pending"
                ? "Pendiente"
                : "Rechazada"}
            </span>
          </div>
        )}

        {/* Botón WhatsApp */}
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full mb-3 bg-green-500 text-white font-semibold py-2 rounded-lg hover:bg-green-600 transition-colors text-center"
        >
          💬 WhatsApp
        </a>

        {/* Botones de gestión (Mis publicaciones) */}
        {showManageButtons && (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => onEdit && onEdit(product.id)}
              className="flex-1 bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              ✏️ Editar
            </button>
            <button
              type="button"
              onClick={() => onDelete && onDelete(product.id)}
              className="flex-1 bg-red-600 text-white font-semibold py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              🗑️ Eliminar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
