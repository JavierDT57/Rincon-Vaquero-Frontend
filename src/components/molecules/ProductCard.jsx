// src/components/molecules/ProductCard.jsx
import React from "react";

const getStatusColor = (status) => {
  switch (status) {
    case "published":
    case "approved":
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

  // LINK PARA WHATSAPP
  const whatsappLink = product.telefono
    ? `https://wa.me/${product.telefono}?text=Hola,%20me%20interesa%20tu%20producto:%20${encodeURIComponent(
        product.name
      )}`
    : null;

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      <div className="w-full h-56 bg-gray-100 flex items-center justify-center overflow-hidden">
        <img
          src={product.image || product.imagenurl || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

     <div className="p-4">

      {/* Vendedor + Estado */}
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs text-gray-500 font-semibold uppercase">
          👤 {product.owner || "Vendedor"}
        </p>

        {product.status && showManageButtons && (
          <span
            className={`px-3 py-1 rounded-full text-[10px] font-semibold ${getStatusColor(
              product.status
            )}`}
          >
            {product.status === "published" || product.status === "approved"
              ? "Publicado"
              : product.status === "pending"
              ? "Pendiente"
              : "Rechazada"}
          </span>
        )}
      </div>


        <h3 className="text-lg font-bold text-black mb-2">
          {product.name}
        </h3>

        <div className="space-y-2 mb-4 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">💲 Precio:</span>
            <span className="font-semibold text-black">${product.price}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">📂 Categoría:</span>
            <span className="font-semibold text-black">{product.category}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">📦 Stock:</span>
            <span className="font-semibold text-black">{product.stock} unidades</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">📍 Ubicación:</span>
            <span className="font-semibold text-black">{product.location}</span>
          </div>

          {product.telefono && (
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-green-500 text-white font-semibold py-2 rounded-lg hover:bg-green-600 transition-colors mb-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M20.52 3.48A11.85 11.85 0 0 0 12.04.02C5.55.02.33 5.25.33 11.75c0 2.07.54 4.1 1.57 5.88L0 24l6.53-1.83a11.68 11.68 0 0 0 5.5 1.39h.01c6.49 0 11.71-5.24 11.71-11.75a11.69 11.69 0 0 0-3.23-8.33Zm-8.48 18.3h-.01a9.86 9.86 0 0 1-5-1.36l-.37-.22-3.87 1.08 1.03-3.78-.24-.39a9.88 9.88 0 0 1-1.52-5.32c0-5.46 4.44-9.91 9.9-9.91a9.86 9.86 0 0 1 7 2.92 9.86 9.86 0 0 1 2.9 7 9.89 9.89 0 0 1-9.83 9.98Zm5.55-7.38c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.67.15-.2.29-.77.97-.94 1.17-.17.19-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.8-1.49-1.78-1.66-2.08-.17-.29-.02-.45.13-.6.13-.13.3-.35.44-.52.15-.17.2-.29.3-.48.1-.19.05-.36-.02-.51-.07-.15-.67-1.61-.92-2.21-.24-.57-.49-.5-.67-.5a1.34 1.34 0 0 0-.54.08c-.17.07-.52.24-.8.59-.27.35-1.04 1.02-1.04 2.47s1.07 2.86 1.22 3.06c.15.19 2.1 3.21 5.07 4.51.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.09 1.77-.73 2.02-1.44.24-.71.24-1.33.17-1.44-.07-.12-.27-.19-.57-.34Z"/>
            </svg>
            WhatsApp
          </a>
        )}
        </div>

        {/* BOTONES */}
        {showManageButtons && (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => onEdit && onEdit(product.id)}
              className="flex-1 bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Editar
            </button>
            <button
              type="button"
              onClick={() => onDelete && onDelete(product.id)}
              className="flex-1 bg-red-600 text-white font-semibold py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Eliminar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
