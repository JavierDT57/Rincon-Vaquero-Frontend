// src/components/organisms/Tienda/TiendaMyPublications.jsx
import React, { useState } from "react";
import ProductCard from "../../molecules/ProductCard.jsx";

export default function TiendaMyPublications({ products, onEdit, onDelete }) {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  // TODO: luego filtrar por usuario logueado
  const userProducts = products; // antes slice(0,1)

  const handleEditClick = (product) => {
    setEditingId(product.id);
    setEditData(product);
  };

  const handleSaveEdit = () => {
    if (!editingId) return;
    onEdit(editingId, editData);
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData({});
  };

  return (
    <div>
      <h2 className="text-xl md:text-2xl font-semibold text-slate-900 mb-4">
        Mis publicaciones
      </h2>

      {(!userProducts || userProducts.length === 0) ? (
        <div className="text-center py-12">
          <p className="text-slate-500 text-lg">
            No tienes publicaciones aún.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userProducts.map((product) => (
            <div key={product.id}>
              {editingId === product.id ? (
                // Card de edición, misma anchura que las cards normales
                <div className="bg-white border-2 border-blue-600 rounded-lg p-4 space-y-3 text-sm shadow-sm">
                  <h3 className="text-base font-semibold text-slate-900 mb-1">
                    Editar publicación
                  </h3>

                  <div className="grid grid-cols-1 gap-3">
                    <input
                      type="text"
                      value={editData.name || ""}
                      onChange={(e) =>
                        setEditData({ ...editData, name: e.target.value })
                      }
                      placeholder="Nombre del producto"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="number"
                      value={editData.price ?? ""}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          price: Number(e.target.value),
                        })
                      }
                      placeholder="Precio"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      value={editData.category || ""}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          category: e.target.value,
                        })
                      }
                      placeholder="Categoría"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="number"
                      value={editData.stock ?? ""}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          stock: Number(e.target.value),
                        })
                      }
                      placeholder="Stock"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      value={editData.location || ""}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          location: e.target.value,
                        })
                      }
                      placeholder="Ubicación"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      value={editData.contactNumber || ""}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          contactNumber: e.target.value,
                        })
                      }
                      placeholder="Número de contacto (WhatsApp)"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      value={editData.image || ""}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          image: e.target.value,
                        })
                      }
                      placeholder="URL de la imagen"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex gap-2 pt-1">
                    <button
                      type="button"
                      onClick={handleSaveEdit}
                      className="flex-1 bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
                    >
                      ✓ Guardar
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="flex-1 bg-gray-400 text-white font-semibold py-2 rounded-lg hover:bg-gray-500 transition-colors text-sm"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <ProductCard
                  product={product}
                  showManageButtons
                  onEdit={() => handleEditClick(product)}
                  onDelete={() => onDelete(product.id)}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
