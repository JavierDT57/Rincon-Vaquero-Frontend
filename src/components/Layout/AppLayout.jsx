import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../organisms/Navbar/Navbar";
import { Footer } from "../organisms/Footer/Footer";

export default function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Navbar fija arriba (ya la tienes) */}
      <Navbar />

      {/* Contenido que ocupa el espacio restante */}
      {/* Si tu Navbar está fija en top, recuerda usar pt-16 (o la altura real) */}
      <main className="flex-1 pt-16">
        <Outlet />
      </main>

      {/* Footer al final de la columna */}
      <Footer />
    </div>
  );
}
