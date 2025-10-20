import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function TiendaPage() {
  const { user, isChecking } = useAuth();
  const location = useLocation();

  useEffect(() => { document.title = "Tienda"; }, []);

  if (isChecking) return null; 
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return (
    <>
      
      <h1 className="px-4 py-6 text-2xl font-semibold">Tienda</h1>
    </>
  );
}
