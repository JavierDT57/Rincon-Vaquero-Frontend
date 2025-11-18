// src/containers/Tienda/TiendaContainer.jsx
import React, { useEffect, useMemo, useState } from "react";
import TiendaHeader from "../../components/organisms/Tienda/TiendaHeader.jsx";
import TiendaProductGrid from "../../components/organisms/Tienda/TiendaProductGrid.jsx";
import TiendaMyPublications from "../../components/organisms/Tienda/TiendaMisPublicaciones.jsx";
import TiendaCreatePublication from "../../components/organisms/Tienda/TiendaCrearModal.jsx";

import {
  fetchPublicProducts,
  fetchMyProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../api/tienda.js";

export default function TiendaContainer() {
  const [view, setView] = useState("general");

  const [publicProducts, setPublicProducts] = useState([]);
  const [myProducts, setMyProducts] = useState([]);

  const [loadingPublic, setLoadingPublic] = useState(true);
  const [loadingMy, setLoadingMy] = useState(false);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  useEffect(() => {
    let ignore = false;

    async function loadPublic() {
      setLoadingPublic(true);
      setError("");

      try {
        const data = await fetchPublicProducts();
        if (!ignore) setPublicProducts(data);
      } catch (err) {
        if (!ignore) setError(err.message || "Error al cargar productos.");
      } finally {
        if (!ignore) setLoadingPublic(false);
      }
    }

    async function loadMine() {
      setLoadingMy(true);

      try {
        const data = await fetchMyProducts();
        if (!ignore) setMyProducts(data);
      } catch (err) {
        if (!ignore) setError(err.message || "Error al cargar mis productos.");
      } finally {
        if (!ignore) setLoadingMy(false);
      }
    }

    loadPublic();
    loadMine();

    return () => {
      ignore = true;
    };
  }, []);

  const hasActiveFilters =
    Boolean(searchTerm) || Boolean(minPrice) || Boolean(maxPrice);

  const filteredProducts = useMemo(() => {
    return publicProducts.filter((product) => {
      const name = (product.name || "").toLowerCase();
      const matchesSearch = name.includes(searchTerm.toLowerCase());

      const price = Number(product.price) || 0;
      const matchesMin = minPrice === "" || price >= Number(minPrice || 0);
      const matchesMax = maxPrice === "" || price <= Number(maxPrice || 0);

      return matchesSearch && matchesMin && matchesMax;
    });
  }, [publicProducts, searchTerm, minPrice, maxPrice]);


  const handleCreatePublication = async (newProduct) => {
    try {
      setSaving(true);
      setError("");

      const created = await createProduct(newProduct);

      setMyProducts((prev) => [created, ...prev]);

      if (created.status === "published" || created.status === "approved") {
        setPublicProducts((prev) => [created, ...prev]);
      }

      setIsCreateModalOpen(false);
      setView("my-publications");
    } catch (err) {
      setError(err.message || "Error al crear la publicación.");
      throw err;
    } finally {
      setSaving(false);
    }
  };

  const handleEditPublication = async (id, updatedProduct) => {
    try {
      setSaving(true);
      setError("");

      const saved = await updateProduct(id, updatedProduct);

      setMyProducts((prev) => prev.map((p) => (p.id === id ? saved : p)));
      setPublicProducts((prev) => prev.map((p) => (p.id === id ? saved : p)));
    } catch (err) {
      setError(err.message || "Error al actualizar la publicación.");
      throw err;
    } finally {
      setSaving(false);
    }
  };

  const handleDeletePublication = async (id) => {
    try {
      setSaving(true);
      setError("");

      await deleteProduct(id);

      setMyProducts((prev) => prev.filter((p) => p.id !== id));
      setPublicProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      setError(err.message || "Error al eliminar publicación.");
      throw err;
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <TiendaHeader
        activeView={view}
        onShowGeneral={() => setView("general")}
        onCreateClick={() => setIsCreateModalOpen(true)} // ✔ ABRE MODAL
        onMyPublicationsClick={() => setView("my-publications")}
      />

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {saving && (
        <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-2 rounded-lg text-xs">
          Guardando cambios...
        </div>
      )}

      {view === "general" && (
        <section className="bg-white text-slate-900 rounded-2xl ring-1 ring-black/5 p-4 sm:p-6 lg:p-8">
          <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <button
              type="button"
              onClick={() => setShowFilters((prev) => !prev)}
              className="relative flex items-center gap-2 px-4 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors text-gray-700 text-sm font-medium"
              title="Filtrar productos"
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

            {showFilters && (
              <div className="flex-1 w-full flex flex-col sm:flex-row gap-3 bg-gray-50 p-4 rounded-lg">
                <input
                  type="text"
                  placeholder="Buscar..."
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
          </div>

          {loadingPublic ? (
            <div className="text-center py-12 text-slate-500">
              Cargando productos...
            </div>
          ) : (
            <TiendaProductGrid products={filteredProducts} />
          )}
        </section>
      )}

      {view === "my-publications" && (
        <section className="bg-white text-slate-900 rounded-2xl ring-1 ring-black/5 p-4 sm:p-6 lg:p-8">
          {loadingMy ? (
            <div className="text-center py-12 text-slate-500">
              Cargando tus productos...
            </div>
          ) : (
            <TiendaMyPublications
              products={myProducts}
              onEdit={handleEditPublication}
              onDelete={handleDeletePublication}
            />
          )}
        </section>
      )}

      <TiendaCreatePublication
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreatePublication}
      />
    </div>
  );
}
