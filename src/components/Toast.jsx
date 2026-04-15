import React from 'react';

export default function Toast({ toast }) {
  return (
    <div className={`toast ${toast.show ? 'show' : ''}`} id="toast">
      <span className="toast-icon">{toast.icon}</span>
      <span className="toast-text">{toast.text}</span>
    </div>
  );
}
