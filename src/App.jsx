// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthProvider from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import RecoverPage from './pages/RecoverPage';
import HomePage from './pages/HomePage';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/recover" element={<RecoverPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="*" element={<div style={{ padding: 24 }}>404 - Página no encontrada</div>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
