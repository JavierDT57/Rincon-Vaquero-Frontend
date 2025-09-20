// src/pages/HomePage.jsx
import React, { useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import '../../styles/components.css';

export default function HomePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="rv-wrap-light">
      <div className="rv-card-light">
        <h1>Hola, {user.nombre} {user.apellidos} 👋</h1>
        <p>Rol: <b>{user.rol}</b></p>
        <div style={{ marginTop: 12 }}>
          <button className="rv-button" onClick={() => { logout(); navigate('/logout'); }}>
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
}
