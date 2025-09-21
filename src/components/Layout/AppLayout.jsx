// src/components/layout/AppLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../organisms/Navbar/Navbar';

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-16"> 
        <Outlet />
      </main>
    </div>
  );
}
