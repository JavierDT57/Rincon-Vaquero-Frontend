import { useState, useEffect } from "react"
import { Link } from "react-router-dom";

import Button from '../../atoms/Button'
import { Menu, X } from "lucide-react"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)



  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          
           <Link
                to="/" className="flex-shrink-0">
            <h1
              className={`text-2xl font-bold transition-colors duration-300 ${
                isScrolled ? "text-purple-600" : "text-black"
              }`}
            >
              Inicio
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {["Destinos", "Tienda", "Avisos", "Tradiciones" ,"Estadisticas"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className={`px-3 py-2 text-sm font-medium transition-colors duration-300 hover:text-purple-400 ${
                    isScrolled ? "text-gray-800 hover:text-purple-600" : "text-black hover:text-white"
                  }`}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          <div className="hidden md:block">
            <Link to="/login">
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-2 rounded-lg transition-colors duration-300">
              Iniciar secion
            </button>
            </Link>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-md transition-colors duration-300 ${isScrolled ? "text-gray-800" : "text-white"}`}
            >
              {isMobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-md rounded-lg mt-2">
             {["Destinos", "Tienda", "Avisos", "Tradiciones" ,"Estadisticas"].map((item) => (
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
                  Iniciar Secion
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

