import React, { useState } from 'react';
import { registerUser } from '../api/users';
import { Link, useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ nombre: '', apellidos: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const [ok, setOk] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr('');
    setOk('');
    setLoading(true);
    try {
      await registerUser(form);
      setOk('Registro exitoso. Ahora puedes iniciar sesión.');
      setTimeout(() => navigate('/login'), 800);
    } catch (e) {
      setErr(e.message || 'Error al registrar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrap}>
      <form onSubmit={handleSubmit} style={styles.card}>
        <h1 style={{ marginBottom: 8 }}>Crear cuenta</h1>
        <p style={{ marginTop: 0, opacity: 0.7 }}>Rol por defecto: usuario</p>

        {err && <div style={styles.error}>{err}</div>}
        {ok && <div style={styles.success}>{ok}</div>}

        <label style={styles.label}>Nombre</label>
        <input style={styles.input} name="nombre" value={form.nombre} onChange={handleChange} required />

        <label style={styles.label}>Apellidos</label>
        <input style={styles.input} name="apellidos" value={form.apellidos} onChange={handleChange} required />

        <label style={styles.label}>Email</label>
        <input style={styles.input} type="email" name="email" value={form.email} onChange={handleChange} required />

        <label style={styles.label}>Contraseña</label>
        <input style={styles.input} type="password" name="password" value={form.password} onChange={handleChange} required />

        <button style={styles.button} type="submit" disabled={loading}>
          {loading ? 'Creando...' : 'Registrarme'}
        </button>

        <div style={{ marginTop: 12 }}>
          <Link to="/login">Ya tengo cuenta</Link>
        </div>
      </form>
    </div>
  );
}

const styles = {
  wrap: { minHeight: '100dvh', display: 'grid', placeItems: 'center', background: '#0b1220' },
  card: { width: 420, background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 10px 30px rgba(0,0,0,.2)' },
  label: { fontSize: 13, marginTop: 12 },
  input: { width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #ddd', outline: 'none' },
  button: { marginTop: 16, width: '100%', padding: '10px 12px', borderRadius: 8, border: 'none', background: '#111827', color: '#fff', cursor: 'pointer' },
  error: { background: '#fee2e2', color: '#991b1b', border: '1px solid #fecaca', padding: 8, borderRadius: 8, marginBottom: 8 },
  success: { background: '#dcfce7', color: '#166534', border: '1px solid #bbf7d0', padding: 8, borderRadius: 8, marginBottom: 8 },
};
