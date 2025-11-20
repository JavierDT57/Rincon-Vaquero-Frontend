import React, { useState, useMemo } from "react";
import ProductCard from "../../molecules/ProductCard.jsx";
import TiendaCreatePublication from "../Tienda/TiendaCrearModal.jsx";

export default function TiendaMyPublications({
  products,
  onEdit,    
  onDelete,
  onRefresh,
}) {
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);

  const userProducts = products || [];

  const hasActiveFilters =
    searchTerm.trim() !== "" || minPrice !== "" || maxPrice !== "";

  // FILTROS
  const filteredProducts = useMemo(() => {
    return userProducts.filter((p) => {
      const name = p.name || p.nombre || "";
      const price = Number(p.price ?? p.precio ?? 0);

      const matchesSearch = searchTerm
        ? name.toLowerCase().includes(searchTerm.toLowerCase())
        : true;

      const matchesMin = minPrice !== "" ? price >= Number(minPrice) : true;
      const matchesMax = maxPrice !== "" ? price <= Number(maxPrice) : true;

      return matchesSearch && matchesMin && matchesMax;
    });
  }, [userProducts, searchTerm, minPrice, maxPrice]);

  const handleEditClick = (product) => {
    const initialData = {
      ...product,

      id: product.id,
      nombre: product.nombre ?? product.name ?? "",
      name: product.name ?? product.nombre ?? "",

      precio: product.precio ?? product.price,
      price: product.price ?? product.precio,

      categoria: product.categoria ?? product.category ?? "Otros",
      category: product.category ?? product.categoria ?? "Otros",

      ubicacion: product.ubicacion ?? product.location ?? "",
      location: product.location ?? product.ubicacion ?? "",

      telefono: product.telefono ?? product.phone ?? "",

      imagenurl:
        product.imagenurl ?? product.imageUrl ?? product.image ?? "",
      imgSrc:
        product.imageUrl ?? product.imagenurl ?? product.image ?? "",
    };

    setEditingProduct(initialData);
  };

  const handleCloseModal = () => {
    setEditingProduct(null);
  };

  const handleSubmitEdit = async (payload) => {
    if (!editingProduct) return;

    await onEdit(editingProduct.id, payload);


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
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
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
          <p className="text-slate-500 text-lg">
            No se encontraron publicaciones.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              showManageButtons
              onEdit={() => handleEditClick(product)}
              onDelete={() => onDelete(product.id)}
            />
          ))}
        </div>
      )}

      <TiendaCreatePublication
        isOpen={!!editingProduct}
        onClose={handleCloseModal}
        onSubmit={handleSubmitEdit}
        editMode={true}
        initialData={editingProduct}
      />
    </div>
  );
}
