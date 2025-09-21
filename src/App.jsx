// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthProvider from './context/AuthContext';
import LoginPage from './pages/Login/LoginPage';
import RegisterPage from './pages/Login/RegisterPage';
import RecoverPage from './pages/Login/RecoverPage';
import HomePage from './pages/Home/HomePage';
import AppLayout from './components/Layout/AppLayout';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Rutas que usan el layout con Navbar */}
          <Route element={<AppLayout />}>
            <Route path="/" element={<HomePage />} />
          </Route>

          {/* Rutas de autenticación SIN layout */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/recover" element={<RecoverPage />} />

          {/* 404 */}
          <Route
            path="*"
            element={<div style={{ padding: 24 }}>404 - Página no encontrada</div>}
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
