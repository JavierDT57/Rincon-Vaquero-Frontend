// src/containers/Tienda/TiendaContainer.jsx
import React, { useMemo, useState } from "react";
import TiendaHeader from "../../components/organisms/Tienda/TiendaHeader.jsx";
import TiendaProductGrid from "../../components/organisms/Tienda/TiendaProductGrid.jsx";
import TiendaMyPublications from "../../components/organisms/Tienda/TiendaMyPublications.jsx";
import TiendaCreatePublication from "../../components/organisms/Tienda/TiendaCreatePublication.jsx";

// Por ahora usamos datos de ejemplo en memoria.
// Más adelante puedes sustituir esto por llamadas a tu API.
const MOCK_PRODUCTS = [
  {
    id: "1",
    owner: "Juan García",
    name: "Laptop Dell XPS",
    image: "/modern-laptop-workspace.png",
    price: 1200,
    category: "Electrónica",
    stock: 5,
    location: "Rincón Baquero",
    contactNumber: "+525511112233",
    status: "published",
  },
  {
    id: "2",
    owner: "María López",
    name: "Silla ergonómica",
    image: "/office-chair.jpg",
    price: 350,
    category: "Muebles",
    stock: 3,
    location: "Rincón Baquero",
    contactNumber: "+525522223344",
    status: "published",
  },
  {
    id: "3",
    owner: "Carlos Rodríguez",
    name: "Monitor 4K",
    image: "/computer-monitor.png",
    price: 450,
    category: "Electrónica",
    stock: 8,
    location: "Rincón Baquero",
    contactNumber: "+525533334455",
    status: "published",
  },
];

export default function TiendaContainer() {
  const [view, setView] = useState("general"); // "general" | "my-publications" | "create"
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesMin =
        minPrice === "" || product.price >= Number.parseFloat(minPrice);
      const matchesMax =
        maxPrice === "" || product.price <= Number.parseFloat(maxPrice);
      return matchesSearch && matchesMin && matchesMax;
    });
  }, [products, searchTerm, minPrice, maxPrice]);

  const handleCreatePublication = (newProduct) => {
    const id = Date.now().toString();
    setProducts((prev) => [...prev, { ...newProduct, id }]);
    setView("general");
  };

  const handleEditPublication = (id, updatedProduct) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedProduct } : p))
    );
  };

  const handleDeletePublication = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const hasActiveFilters =
    Boolean(searchTerm) || Boolean(minPrice) || Boolean(maxPrice);

  return (
    <div className="space-y-6">
      <TiendaHeader
        activeView={view}
        onShowGeneral={() => setView("general")}
        onCreateClick={() => setView("create")}
        onMyPublicationsClick={() => setView("my-publications")}
      />

      {view === "general" && (
        <section className="bg-white text-slate-900 rounded-2xl ring-1 ring-black/5 p-4 sm:p-6 lg:p-8">
          {/* Barra de filtros */}
          <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <button
              type="button"
              onClick={() => setShowFilters((prev) => !prev)}
              className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
              title="Filtrar productos"
            >
              <svg
                className="w-5 h-5 text-gray-700"
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
              {hasActiveFilters && (
                <span className="absolute top-0 right-0 w-2 h-2 bg-blue-600 rounded-full" />
              )}
            </button>

            {showFilters && (
              <div className="flex-1 w-full flex flex-col sm:flex-row gap-3 bg-gray-50 p-4 rounded-lg">
                <input
                  type="text"
                  placeholder="Buscar producto..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <input
                  type="number"
                  placeholder="Precio mín"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full sm:w-28 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <input
                  type="number"
                  placeholder="Precio máx"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full sm:w-28 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchTerm("");
                      setMinPrice("");
                      setMaxPrice("");
                    }}
                    className="px-3 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors text-sm font-semibold"
                  >
                    Limpiar
                  </button>
                )}
              </div>
            )}
          </div>

          <TiendaProductGrid products={filteredProducts} />
        </section>
      )}

      {view === "my-publications" && (
        <section className="bg-white text-slate-900 rounded-2xl ring-1 ring-black/5 p-4 sm:p-6 lg:p-8">
          <TiendaMyPublications
            products={products}
            onEdit={handleEditPublication}
            onDelete={handleDeletePublication}
          />
        </section>
      )}

      {view === "create" && (
        <section className="bg-white text-slate-900 rounded-2xl ring-1 ring-black/5 p-4 sm:p-6 lg:p-8">
          <TiendaCreatePublication
            onSubmit={handleCreatePublication}
            onCancel={() => setView("general")}
          />
        </section>
      )}
    </div>
  );
}
