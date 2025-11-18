// src/components/organisms/Tienda/TiendaProductGrid.jsx
import React from "react";
import ProductCard from "../../molecules/ProductCard.jsx";

export default function TiendaProductGrid({ products }) {
  return (
    <div>
      <h2 className="text-xl md:text-2xl font-semibold text-slate-900 mb-4">
        Todos los productos
      </h2>

      {!products || products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-slate-500 text-lg">
            No hay productos disponibles por ahora.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              showManageButtons={false}
            />
          ))}
        </div>
      )}
    </div>
  );
}
