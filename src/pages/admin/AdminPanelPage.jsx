// src/pages/AdminPanelPage.jsx
import React, { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import AdminPanelContainer from "../../containers/admin/AdminPanelContainer";

export default function AdminPanelPage() {
  const { user, isChecking } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // no desmontar por parpadeos
  const hadAdminRef = useRef(!!(user && user.rol === "admin"));
  
  const redirectTimerRef = useRef(null);

  useEffect(() => {
    document.title = "Panel Administrativo";
  }, []);

  
  useEffect(() => {
    if (user?.rol === "admin") hadAdminRef.current = true;
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

    
    if (user && user.rol !== "admin") {
      navigate("/", { replace: true });
      return;
    }

    
    if (!user) {
      
      if (!hadAdminRef.current) {
        navigate("/login", { replace: true, state: { from: location.pathname } });
        return;
      }
      
      if (redirectTimerRef.current) clearTimeout(redirectTimerRef.current);
      redirectTimerRef.current = setTimeout(() => {
        if (!user) {
          navigate("/login", { replace: true, state: { from: location.pathname } });
        }
      }, 700); 
      return;
    }

    
    if (redirectTimerRef.current) {
      clearTimeout(redirectTimerRef.current);
      redirectTimerRef.current = null;
    }
  
  }, [isChecking, user, navigate]);


  if (isChecking && !hadAdminRef.current) return null;

  return (
    <div className="bg-white text-slate-900">
      <AdminPanelContainer />
    </div>
  );
}
