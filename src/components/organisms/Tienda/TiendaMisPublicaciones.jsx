import React, { useState, useMemo } from "react";
import ProductCard from "../../molecules/ProductCard.jsx";

export default function TiendaMyPublications({
  products,
  onEdit,
  onDelete,
  onRefresh,       
}) {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const userProducts = products || [];

  const hasActiveFilters =
    searchTerm.trim() !== "" || minPrice !== "" || maxPrice !== "";

  // FILTROS
  const filteredProducts = useMemo(() => {
    return userProducts.filter((p) => {
      const matchesSearch = searchTerm
        ? p.name.toLowerCase().includes(searchTerm.toLowerCase())
        : true;

      const matchesMin = minPrice !== "" ? p.price >= Number(minPrice) : true;
      const matchesMax = maxPrice !== "" ? p.price <= Number(maxPrice) : true;

      return matchesSearch && matchesMin && matchesMax;
    });
  }, [userProducts, searchTerm, minPrice, maxPrice]);

  const handleEditClick = (product) => {
    setEditingId(product.id);
    setEditData(product);
  };

  const handleSaveEdit = async () => {
    if (!editingId) return;
    await onEdit(editingId, editData);
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData({});
  };

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    setEditData((prev) => ({
      ...prev,
      imageFile: file || null,
    }));
  };

  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => setShowFilters((prev) => !prev)}
          className="relative flex items-center gap-2 px-4 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors text-gray-700 text-sm font-medium"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
              d="M3 4h18M6 8h12M9 12h6m-4 4h2m-6 4h10"
            />
          </svg>
          Filtrar

          {hasActiveFilters && (
            <span className="absolute top-0 right-0 w-2 h-2 bg-blue-600 rounded-full" />
          )}
        </button>
        <button
          type="button"
          onClick={onRefresh}
          className="flex items-center gap-2 px-4 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 
                    transition-colors text-gray-700 text-sm font-medium border border-gray-300"
        >

          Recargar
        </button>

      </div>

      {showFilters && (
        <div className="flex-1 w-full flex flex-col sm:flex-row gap-3 bg-gray-50 p-4 rounded-lg mb-4">
          <input
            type="text"
            placeholder="Buscar producto..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
          />

          <input
            type="number"
            placeholder="Precio mín"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full sm:w-28 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
          />

          <input
            type="number"
            placeholder="Precio máx"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full sm:w-28 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
          />

          {hasActiveFilters && (
            <button
              type="button"
              onClick={() => {
                setSearchTerm("");
                setMinPrice("");
                setMaxPrice("");
              }}
              className="px-3 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 text-sm font-semibold"
            >
              Limpiar
            </button>
          )}
        </div>
      )}

      <h2 className="text-xl md:text-2xl font-semibold text-slate-900 mb-4">
        Mis publicaciones
      </h2>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-slate-500 text-lg">No se encontraron publicaciones.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id}>
              {editingId === product.id ? (
                <div className="bg-white border-2 border-blue-600 rounded-lg p-4 space-y-3 text-sm shadow-sm">
                  
                  <h3 className="text-base font-semibold mb-1">
                    Editar publicación
                  </h3>

                  <div className="grid gap-3">
                    <input
                      type="text"
                      value={editData.name || ""}
                      onChange={(e) =>
                        setEditData({ ...editData, name: e.target.value })
                      }
                      placeholder="Nombre del producto"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />

                    <input
                      type="number"
                      value={editData.price ?? ""}
                      onChange={(e) =>
                        setEditData({ ...editData, price: Number(e.target.value) })
                      }
                      placeholder="Precio"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />

                    <input
                      type="text"
                      value={editData.category || ""}
                      onChange={(e) =>
                        setEditData({ ...editData, category: e.target.value })
                      }
                      placeholder="Categoría"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />

                    <input
                      type="number"
                      value={editData.stock ?? ""}
                      onChange={(e) =>
                        setEditData({ ...editData, stock: Number(e.target.value) })
                      }
                      placeholder="Stock"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />

                    <input
                      type="text"
                      value={editData.location || ""}
                      onChange={(e) =>
                        setEditData({ ...editData, location: e.target.value })
                      }
                      placeholder="Ubicación"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />

                    <div>
                      <p className="text-xs text-gray-500 mb-1">
                        Imagen actual:{" "}
                        <span className="break-all">
                          {editData.image || "(sin imagen)"}
                        </span>
                      </p>

                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full text-sm text-gray-700"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 pt-1">
                    <button
                      type="button"
                      onClick={handleSaveEdit}
                      className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 text-sm"
                    >
                      ✓ Guardar
                    </button>

                    <button
                      type="button"
                      onClick={handleCancel}
                      className="flex-1 bg-gray-400 text-white py-2 rounded-lg hover:bg-gray-500 text-sm"
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
