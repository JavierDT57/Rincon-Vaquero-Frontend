// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthProvider from './context/AuthContext';
import LoginPage from './pages/Login/LoginPage';
import RegisterPage from './pages/Login/RegisterPage';
import RecoverPage from './pages/Login/RecoverPage';
import HomePage from './pages/Home/HomePage';
import AppLayout from './components/Layout/AppLayout';
import DestinosPage from "./pages/Destinos/DestinosPage";
import DestinoDetallePage from "./pages/Destinos/DestinoDetallePage";
import TradicionesPage from "./pages/Tradiciones/TradicionesPage";
import SemanaSantaPage from "./pages/Tradiciones/SemanaSantaPage";
import FiestaPatronalPage from "./pages/Tradiciones/FiestaPatronalPage";
import NavidadPage from "./pages/Tradiciones/NavidadPage";
import AvisosPage from "./pages/Avisos/AvisosPage";


export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Todo esto usa la Navbar del AppLayout */}
          <Route path="/" element={<AppLayout />}>
            <Route index element={<HomePage />} />

            {/* Destinos */}
            <Route path="destinos" element={<DestinosPage />} />
            <Route path="destinos/:id" element={<DestinoDetallePage />} />

            {/* Tradiciones (ANIDADO Y RELATIVO) */}
            <Route path="tradiciones">
              <Route index element={<TradicionesPage />} />
              <Route path="fiesta-patronal" element={<FiestaPatronalPage />} />
              <Route path="semana-santa" element={<SemanaSantaPage />} />
              <Route path="navidad" element={<NavidadPage />} />
            </Route>

            {/* Avisos */  }
            <Route path="avisos" element={<AvisosPage />} />

          </Route>

          {/* Rutas SIN layout */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/recover" element={<RecoverPage />} />

          {/* 404 */}
          <Route path="*" element={<div style={{ padding: 24 }}>404 - Página no encontrada</div>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
