// src/components/molecules/RegisterForm.jsx
import React from 'react';
import Input from '../atoms/Input';
import Button from '../atoms/Button';


export default function RegisterForm({ form, error, ok, loading, onChange, onSubmit }) {
  return (
    <form className="rv-card" onSubmit={onSubmit}>
      <h2 className="rv-title">Crear cuenta</h2>
      <p className="rv-sub">Regístrate como usuario</p>

      {error && <div className="rv-error">{error}</div>}
      {ok && <div className="rv-success">{ok}</div>}

      <Input id="r-nombre" label="Nombre" name="nombre" value={form.nombre} onChange={onChange} required />
      <Input id="r-apellidos" label="Apellidos" name="apellidos" value={form.apellidos} onChange={onChange} required />
      <Input id="r-email" label="Email" name="email" type="email" value={form.email} onChange={onChange} required />
      <Input id="r-password" label="Contraseña" name="password" type="password" value={form.password} onChange={onChange} required />

      <Button type="submit" disabled={loading}>{loading ? 'Creando...' : 'Registrarme'}</Button>
    </form>
  );
}
