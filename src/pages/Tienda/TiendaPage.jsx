// src/pages/Tienda/TiendaPage.jsx
import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import TiendaContainer from "../../containers/Tienda/TiendaContainer.jsx";

export default function TiendaPage() {
  const { user, isChecking } = useAuth();
  const location = useLocation();

  useEffect(() => {
    document.title = "Tienda";
  }, []);

  // Mientras verifica sesión, no mostramos nada para evitar parpadeos
  if (isChecking) return null;

  // Si no hay usuario, mandamos a login
  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  // Contenido real de la tienda
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <TiendaContainer />
    </div>
  );
}
