import React from 'react';

export default function Navbar({ scrollToUpload, switchTab }) {
  return (
    <nav className="navbar">
      <div className="logo" onClick={() => switchTab('videos')} style={{ cursor: 'pointer' }}>
        <div className="logo-icon">🚀</div>
        <span>EduCommerce</span>
      </div>
      <ul className="nav-links">
        <li><a href="#" onClick={(e) => { e.preventDefault(); switchTab('videos'); }}>Videos</a></li>
        <li><a href="#" onClick={(e) => { e.preventDefault(); switchTab('blog'); }}>Blog</a></li>
        <li><a href="#" onClick={(e) => { e.preventDefault(); switchTab('contenido'); }}>Mis Contenidos</a></li>
        <li><button className="btn-nav" onClick={scrollToUpload}>Subir Nuevo</button></li>
      </ul>
    </nav>
  );
}
