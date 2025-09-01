// src/components/molecules/RecoverForm.jsx
import React from 'react';
import Input from '../atoms/Input';
import Button from '../atoms/Button';


export default function RecoverForm({ form, error, msg, loading, onChange, onSubmit }) {
  return (
    <form className="rv-card" onSubmit={onSubmit}>
      <h2 className="rv-title">Recuperar contraseña</h2>
      <p className="rv-sub">Ingresa tu email y una nueva contraseña</p>

      {error && <div className="rv-error">{error}</div>}
      {msg && <div className="rv-success">{msg}</div>}

      <Input id="rec-email" label="Email" name="email" type="email" value={form.email} onChange={onChange} required />
      <Input id="rec-new" label="Nueva contraseña" name="newPassword" type="password" value={form.newPassword} onChange={onChange} required />

      <Button type="submit" disabled={loading}>{loading ? 'Actualizando...' : 'Actualizar'}</Button>
    </form>
  );
}
