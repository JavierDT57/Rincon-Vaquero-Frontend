// src/containers/RegisterContainer.jsx
import React, { useState } from 'react';
import RegisterForm from '../components/molecules/RegisterForm';
import { registerUser } from '../api/users';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/components.css';

export default function RegisterContainer() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ nombre: '', apellidos: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [ok, setOk] = useState('');

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setOk(''); setLoading(true);
    try {
      await registerUser(form);
      setOk('Registro exitoso. Serás redirigido a login...');
      setTimeout(() => navigate('/login'), 900);
    } catch (err) {
      setError(err.message || 'Error al registrar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rv-wrap">
      <div>
        <RegisterForm form={form} error={error} ok={ok} loading={loading} onChange={handleChange} onSubmit={handleSubmit} />
        <div className="rv-links" style={{ marginTop: 8 }}>
          <Link to="/login">¿Ya tienes cuenta? Inicia sesión</Link>
        </div>
      </div>
    </div>
  );
}
