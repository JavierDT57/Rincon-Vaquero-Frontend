"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1
              className={`text-2xl font-bold transition-colors duration-300 ${
                isScrolled ? "text-primary" : "text-white"
              }`}
            >
              Wanderlust
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {["Destinos", "Experiencias", "Ofertas", "Sobre Nosotros"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className={`px-3 py-2 text-sm font-medium transition-colors duration-300 hover:text-accent ${
                    isScrolled ? "text-foreground hover:text-accent" : "text-white/90 hover:text-white"
                  }`}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium">Reservar Ahora</Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`${isScrolled ? "text-foreground" : "text-white"}`}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-md rounded-lg mt-2">
              {["Destinos", "Experiencias", "Ofertas", "Sobre Nosotros"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="block px-3 py-2 text-base font-medium text-foreground hover:text-accent transition-colors"
                >
                  {item}
                </a>
              ))}
              <div className="px-3 py-2">
                <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">Reservar Ahora</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
