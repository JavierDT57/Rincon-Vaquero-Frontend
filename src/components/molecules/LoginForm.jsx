// src/components/molecules/LoginForm.jsx
import React from 'react';
import Input from '../atoms/Input';
import Button from '../atoms/Button';


export default function LoginForm({ form, error, loading, onChange, onSubmit }) {
  return (
    <form className="rv-card" onSubmit={onSubmit}>
      <h2 className="rv-title">Iniciar sesión</h2>
      <p className="rv-sub">Ingresa tus credenciales</p>

      {error && <div className="rv-error">{error}</div>}

      <Input
        id="login-email"
        label="Email"
        name="email"
        type="email"
        value={form.email}
        onChange={onChange}
        required
      />

      <Input
        id="login-password"
        label="Contraseña"
        name="password"
        type="password"
        value={form.password}
        onChange={onChange}
        required
      />

      <Button type="submit" disabled={loading}>
        {loading ? 'Entrando...' : 'Entrar'}
      </Button>
    </form>
  );
}
