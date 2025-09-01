import React, { useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div style={{ minHeight: '100dvh', display: 'grid', placeItems: 'center', background: '#f1f5f9' }}>
      <div style={{ background: '#fff', padding: 24, borderRadius: 12, boxShadow: '0 10px 30px rgba(0,0,0,.1)' }}>
        <h1>Hola, {user.nombre} {user.apellidos} 👋</h1>
        <p>Rol: <b>{user.rol}</b></p>
        <button onClick={logout} style={{ marginTop: 8, padding: '8px 12px', borderRadius: 8, border: '1px solid #ddd', background: '#111827', color: '#fff', cursor: 'pointer' }}>
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}
