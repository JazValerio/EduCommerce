import React from 'react';

export default function Footer() {
  return (
    <footer style={{ padding: '3rem', textAlign: 'center', backgroundColor: '#ffffff', borderTop: '1px solid rgba(26,59,219,0.12)', color: 'var(--muted)', fontSize: '0.9rem', marginTop: '4rem' }}>
      <p>&copy; {new Date().getFullYear()} EduCommerce Platform. Todos los derechos reservados.</p>
    </footer>
  );
}
