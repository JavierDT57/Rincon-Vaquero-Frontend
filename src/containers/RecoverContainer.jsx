// src/containers/RecoverContainer.jsx
import React, { useState } from 'react';
import RecoverForm from '../components/molecules/RecoverForm';
import { recoverPassword } from '../api/users';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/components.css';

export default function RecoverContainer() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', newPassword: '' });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(''); setErr(''); setLoading(true);
    try {
      const data = await recoverPassword(form);
      setMsg(data.mensaje || 'Contraseña actualizada correctamente.');
      setTimeout(() => navigate('/login'), 900);
    } catch (error) {
      setErr(error.message || 'No se pudo actualizar la contraseña');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rv-wrap">
      <div>
        <RecoverForm form={form} error={err} msg={msg} loading={loading} onChange={handleChange} onSubmit={handleSubmit} />
        <div className="rv-links" style={{ marginTop: 8 }}>
          <Link to="/login">Volver al login</Link>
        </div>
      </div>
    </div>
  );
}
