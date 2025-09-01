// src/containers/LoginContainer.jsx
import React, { useState } from 'react';
import LoginForm from '../components/molecules/LoginForm';
import { loginUser } from '../api/users';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import '../styles/components.css';

export default function LoginContainer() {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      const data = await loginUser(form);
      setUser(data.user);
      navigate('/home');
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rv-wrap">
      <div>
        <LoginForm form={form} error={error} loading={loading} onChange={handleChange} onSubmit={handleSubmit} />
        <div className="rv-links">
          <Link to="/register">¿No tienes cuenta? Regístrate</Link>
          <Link to="/recover">Recuperar contraseña</Link>
        </div>
      </div>
    </div>
  );
}
