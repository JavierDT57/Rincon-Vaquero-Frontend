// src/components/layout/AppLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../organisms/Navbar/Navbar"; // conserva export nombrado

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar fija arriba */}
      <Navbar />
      {/* Empuja el contenido para que no quede debajo de la navbar */}
      <main className="pt-16">
        <Outlet />
      </main>
    </div>
  );
}
