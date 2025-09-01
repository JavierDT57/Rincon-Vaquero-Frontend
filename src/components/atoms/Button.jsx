// src/components/atoms/Button.jsx
import React from 'react';


export default function Button({ children, className = '', ...props }) {
  return (
    <button className={`rv-button ${className}`} {...props}>
      {children}
    </button>
  );
}
