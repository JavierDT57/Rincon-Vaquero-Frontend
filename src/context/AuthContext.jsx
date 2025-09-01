// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Verifica el usuario actual al cargar la app (usa cookies)
  useEffect(() => {
    fetch('http://localhost:5000/api/users/me', {
      method: 'GET',
      credentials: 'include'
    })
      .then(res => (res.ok ? res.json() : null))
      .then(data => setUser(data?.user || null))
      .catch(() => setUser(null));
  }, []);

  // Login (ejemplo, puedes tener tu propia función)
  const login = async (email, password) => {
    const res = await fetch('http://localhost:5000/api/users/login', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) throw new Error('Login fallido');
    const data = await res.json();
    setUser(data.user);
    return data.user;
  };

  // Logout (como vimos antes)
  const logout = async () => {
    await fetch('http://localhost:5000/api/users/logout', {
      method: 'POST',
      credentials: 'include'
    });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
