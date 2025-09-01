// src/context/AuthContext.jsx
import React, { createContext, useEffect, useMemo, useState } from 'react';

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('auth_user');
      if (raw) setUser(JSON.parse(raw));
    } catch (_) {}
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem('auth_user', JSON.stringify(user));
    else localStorage.removeItem('auth_user');
  }, [user]);

  const logout = () => setUser(null);

  const value = useMemo(() => ({ user, setUser, logout }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
