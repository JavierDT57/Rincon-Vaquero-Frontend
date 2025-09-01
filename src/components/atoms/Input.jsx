// src/components/atoms/Input.jsx
import React from 'react';


export default function Input({ label, id, className = '', ...props }) {
  return (
    <div className={`rv-input-wrap ${className}`}>
      {label && <label htmlFor={id} className="rv-label">{label}</label>}
      <input id={id} className="rv-input" {...props} />
    </div>
  );
}
