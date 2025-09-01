import React, { useState } from 'react';
import { recoverPassword } from '../api/users';
import { Link, useNavigate } from 'react-router-dom';

export default function RecoverPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', newPassword: '' });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(''); setErr('');
    setLoading(true);
    try {
      const data = await recoverPassword(form);
      setMsg(data.mensaje || 'Contraseña actualizada correctamente.');
      setTimeout(() => navigate('/login'), 800);
    } catch (e) {
      setErr(e.message || 'No se pudo actualizar la contraseña');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrap}>
      <form onSubmit={handleSubmit} style={styles.card}>
        <h1 style={{ marginBottom: 8 }}>Recuperar contraseña</h1>
        <p style={{ marginTop: 0, opacity: 0.7 }}>Ingresa tu email y tu nueva contraseña</p>

        {err && <div style={styles.error}>{err}</div>}
        {msg && <div style={styles.success}>{msg}</div>}

        <label style={styles.label}>Email</label>
        <input style={styles.input} type="email" name="email" value={form.email} onChange={handleChange} required />

        <label style={styles.label}>Nueva contraseña</label>
        <input style={styles.input} type="password" name="newPassword" value={form.newPassword} onChange={handleChange} required />

        <button style={styles.button} type="submit" disabled={loading}>
          {loading ? 'Actualizando...' : 'Actualizar'}
        </button>

        <div style={{ marginTop: 12 }}>
          <Link to="/login">Volver al login</Link>
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
