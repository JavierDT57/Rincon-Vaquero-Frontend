// src/pages/tienda/TiendaPage.jsx
import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import TiendaContainer from "../../containers/tienda/TiendaContainer"; // <- ajusta si tu container se llama distinto

export default function TiendaPage() {
  const { user, isChecking } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  
  useEffect(() => {
    document.title = "Tienda";
  }, []);

  
  useEffect(() => {
    if (isChecking) return; 
    if (!user) {
      navigate("/login", { replace: true, state: { from: location.pathname } });
    }
  }, [isChecking, user, navigate, location.pathname]);

  
  if (isChecking) return null;
  if (!user) return null;

  return <TiendaContainer />;
}
