// src/components/organisms/Navbar/Navbar.jsx
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import useAuth from "../../../hooks/useAuth";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isChecking, logout } = useAuth();
  const navigate = useNavigate();


  const navItems = [
    { label: "Destinos", to: "/destinos" },
    { label: "Tienda", to: "/tienda", authOnly: true },          
    { label: "Avisos", to: "/avisos" },
    { label: "Tradiciones", to: "/tradiciones" },
    { label: "Estadisticas", to: "/estadisticas" },
    { label: "Administración", to: "/admin", adminOnly: true },  
  ];

  const canShow = (item) => {
    
    if (isChecking && (item.authOnly || item.adminOnly || item.userOnly)) return false;
    if (item.adminOnly)  return !!user && user.rol === "admin";
    if (item.userOnly)   return !!user && user.rol === "usuario";
    if (item.authOnly)   return !!user; // usuario o admin
    return true;
  };

  const visibleItems = navItems.filter(canShow);

  const doLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-md" style={{ WebkitBackdropFilter: "blur(6px)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-gray-800">Inicio</h1>
          </Link>

          {/* Desktop */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {visibleItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `px-3 py-2 text-sm font-medium transition-colors ${
                      isActive ? "text-purple-600" : "text-gray-800 hover:text-purple-600"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>

          {/* CTA derecha (desktop) */}
          <div className="hidden md:block">
            {isChecking ? null : user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">Hola, {user?.nombre}</span>
                <button
                  onClick={doLogout}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-2 rounded-lg"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login">
                <button className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-2 rounded-lg">
                  Iniciar sesión
                </button>
              </Link>
            )}
          </div>

          {/* Mobile toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 rounded-md text-gray-800">
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 rounded-lg mt-2 bg-white/95 backdrop-blur-md">
              {visibleItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-2 text-base font-medium ${
                      isActive ? "text-purple-600" : "text-gray-800 hover:text-purple-600"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}

              {!isChecking && (
                <div className="px-3 py-2">
                  {user ? (
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        doLogout();
                      }}
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-2 rounded-lg"
                    >
                      Logout
                    </button>
                  ) : (
                    <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                      <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-2 rounded-lg">
                        Iniciar Sesión
                      </button>
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
