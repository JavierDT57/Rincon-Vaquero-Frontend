import React, { createContext, useState, useEffect, useCallback } from 'react';

export const AuthContext = createContext(null);

const API_BASE = import.meta?.env?.VITE_API_BASE || 'http://localhost:5000/api';

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isChecking, setIsChecking] = useState(true);

  const refresh = useCallback(async () => {
    setIsChecking(true);
    try {
      const res = await fetch(`${API_BASE}/users/me`, { method: 'GET', credentials: 'include' });
      if (!res.ok) throw new Error('unauth');
      const data = await res.json();
      setUser(data?.user ?? data ?? null);
    } catch {
      setUser(null);
    } finally {
      setIsChecking(false);
    }
  }, []);

  useEffect(() => {
    // 1) comprobar sesión 
    refresh();

    // 2) revalidar al volver el foco 
    const onFocus = () => refresh();
    window.addEventListener('focus', onFocus);

    // 3) sincronizar login/logout entre pestañas y componentes
    let bc;
    try {
      bc = new BroadcastChannel('auth');
      bc.onmessage = (e) => {
        if (e.data?.type === 'login') refresh();
        if (e.data?.type === 'logout') setUser(null);
      };
    } catch {}

    return () => {
      window.removeEventListener('focus', onFocus);
      if (bc) bc.close();
    };
  }, [refresh]);

  const login = async (email, password) => {
    const res = await fetch(`${API_BASE}/users/login`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) throw new Error('Login fallido');
    const data = await res.json();
    
    setUser(data?.user ?? null);
    try { new BroadcastChannel('auth').postMessage({ type: 'login' }); } catch {}
    return data?.user ?? null;
  };

  const logout = async () => {
    try {
      
      await fetch(`${API_BASE}/users/logout`, { method: 'POST', credentials: 'include' });
    } catch {}
    setUser(null);
    try { new BroadcastChannel('auth').postMessage({ type: 'logout' }); } catch {}
  };

  return (
    <AuthContext.Provider value={{ user, setUser, isChecking, refresh, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
