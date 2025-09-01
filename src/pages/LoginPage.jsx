import React, { useState } from 'react';
import { loginUser } from '../api/users';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function LoginPage() {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr('');
    setLoading(true);
    try {
      const data = await loginUser(form);
      // El backend responde { mensaje, user: {...} }
      setUser(data.user);
      navigate('/home');
    } catch (e) {
      setErr(e.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrap}>
      <form onSubmit={handleSubmit} style={styles.card}>
        <h1 style={{ marginBottom: 8 }}>Iniciar sesión</h1>
        <p style={{ marginTop: 0, opacity: 0.7 }}>Bienvenido a Rincon Vaquero</p>

        {err && <div style={styles.error}>{err}</div>}

        <label style={styles.label}>Email</label>
        <input
          style={styles.input}
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="tu@email.com"
          required
        />

        <label style={styles.label}>Contraseña</label>
        <input
          style={styles.input}
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="••••••••"
          required
        />

        <button style={styles.button} type="submit" disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </button>

        <div style={styles.row}>
          <Link to="/register">¿No tienes cuenta? Regístrate</Link>
          <Link to="/recover">Recuperar contraseña</Link>
        </div>
      </form>
    </div>
  );
}

const styles = {
  wrap: { minHeight: '100dvh', display: 'grid', placeItems: 'center', background: '#0b1220' },
  card: { width: 360, background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 10px 30px rgba(0,0,0,.2)' },
  label: { fontSize: 13, marginTop: 12 },
  input: { width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #ddd', outline: 'none' },
  button: { marginTop: 16, width: '100%', padding: '10px 12px', borderRadius: 8, border: 'none', background: '#111827', color: '#fff', cursor: 'pointer' },
  error: { background: '#fee2e2', color: '#991b1b', border: '1px solid #fecaca', padding: 8, borderRadius: 8, marginBottom: 8 },
  row: { display: 'flex', justifyContent: 'space-between', marginTop: 12, fontSize: 14 },
};
