// src/components/organisms/Navbar/Navbar.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from '../../atoms/Button'
import { Menu, X } from "lucide-react"

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // si quieres conservar comportamiento móvil, mantenemos el toggle
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-md`}
      style={{ WebkitBackdropFilter: "blur(6px)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-gray-800">Inicio</h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {["Destinos", "Tienda", "Avisos", "Tradiciones" ,"Estadisticas"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="px-3 py-2 text-sm font-medium text-gray-800 hover:text-purple-600 transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Botón iniciar sesión */}
          <div className="hidden md:block">
            <Link to="/login">
              <button className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-2 rounded-lg transition-colors duration-300">
                Iniciar sesión
              </button>
            </Link>
          </div>

          {/* Mobile button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-800"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 rounded-lg mt-2 bg-white/95 backdrop-blur-md">
              {["Destinos","Tienda","Avisos","Tradiciones","Estadisticas"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="block px-3 py-2 text-base font-medium text-gray-800 hover:text-purple-600 transition-colors"
                >
                  {item}
                </a>
              ))}
              <div className="px-3 py-2">
                <Link to="/login">
                  <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-2 rounded-lg transition-colors duration-300">
                    Iniciar Sesión
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
