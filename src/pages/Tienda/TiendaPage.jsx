// src/pages/Tienda/TiendaPage.jsx
import React, { useEffect, useRef } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import TiendaContainer from "../../containers/Tienda/TiendaContainer.jsx";

export default function TiendaPage() {
  const { user, isChecking } = useAuth();
  const location = useLocation();
  //Evita desmontaje por parpadeos de sesión 
  const hadUserRef = useRef(!!user);
  const redirectTimerRef = useRef(null);

  useEffect(() => {
    document.title = "Tienda";
  }, []);

  useEffect(() => {
    if (user) hadUserRef.current = true;
  }, [user]);

  useEffect(() => {
    return () => {
      if (redirectTimerRef.current) {
        clearTimeout(redirectTimerRef.current);
        redirectTimerRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (isChecking) return;

    if (user) {
      if (redirectTimerRef.current) {
        clearTimeout(redirectTimerRef.current);
        redirectTimerRef.current = null;
      }
      return;
    }

    if (!hadUserRef.current) {
      return;
    }

    if (redirectTimerRef.current) clearTimeout(redirectTimerRef.current);

    redirectTimerRef.current = setTimeout(() => {
      if (!user) {
        window.location.replace(`/login?from=${location.pathname}`);
      }
    }, 700); 
  }, [isChecking, user, location.pathname]);


  if (isChecking && !hadUserRef.current) return null;

  if (!user && !hadUserRef.current) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <TiendaContainer />
    </div>
  );
}
