import React, { createContext, useState, useEffect, useCallback } from "react";
import { apiUrl } from "../api/config";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isChecking, setIsChecking] = useState(true);

  /**
   * Verifica la sesión con /users/me
   */
  const refresh = useCallback(async () => {
    setIsChecking(true);

    try {
      const res = await fetch(apiUrl("/users/me"), {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) throw new Error("unauth");

      const data = await res.json();

      // Backend devuelve { user }, o el usuario directo
      setUser(data?.user ?? data ?? null);
    } catch (err) {
      setUser(null);
    } finally {
      setIsChecking(false);
    }
  }, []);

  /**
   * Primer chequeo al cargar + listeners
   */
  useEffect(() => {
    // 1. Revisar sesión al cargar
    refresh();

    // 2. Revalidar al volver al foco
    const onFocus = () => refresh();
    window.addEventListener("focus", onFocus);

    // 3. BroadcastChannel para sincronizar login/logout entre pestañas
    let bc;
    try {
      bc = new BroadcastChannel("auth");
      bc.onmessage = (e) => {
        if (e.data?.type === "login") refresh();
        if (e.data?.type === "logout") setUser(null);
      };
    } catch {}

    return () => {
      window.removeEventListener("focus", onFocus);
      if (bc) bc.close();
    };
  }, [refresh]);

  /**
   * Login
   */
  const login = async (email, password) => {
    const res = await fetch(apiUrl("/users/login"), {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      throw new Error("Login fallido");
    }

    const data = await res.json();

    setUser(data?.user ?? null);

    // Notificación entre pestañas
    try {
      new BroadcastChannel("auth").postMessage({ type: "login" });
    } catch {}

    return data?.user ?? null;
  };

  /**
   * Logout
   */
  const logout = async () => {
    try {
      await fetch(apiUrl("/users/logout"), {
        method: "POST",
        credentials: "include",
      });
    } catch {}

    setUser(null);

    // sincronizar entre pestañas
    try {
      new BroadcastChannel("auth").postMessage({ type: "logout" });
    } catch {}
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isChecking,
        refresh,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
