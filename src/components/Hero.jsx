import React from 'react';

export default function Hero({ scrollToUpload, showSection, stats }) {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-badge">NUEVO PANEL DE CREADOR</div>
        <h1>Comparte tu <em>conocimiento</em></h1>
        <p>Sube y administra tu contenido educativo fácilmente. Llega a miles de estudiantes en todo el mundo con un solo clic.</p>
        
        <div className="hero-btns">
          <button className="btn-primary" onClick={scrollToUpload}>Comenzar a Subir</button>
          <button className="btn-ghost" onClick={() => showSection('contenido')}>Ver Mis Publicaciones</button>
        </div>

        <div className="stats-row">
          <div className="stat-card" style={{ cursor: 'pointer' }} onClick={() => showSection('videos')}>
            <h3 className="stat-num">{stats.videos}</h3>
            <p className="stat-label">Videos Educativos</p>
          </div>
          <div className="stat-card" style={{ cursor: 'pointer' }} onClick={() => showSection('blog')}>
            <h3 className="stat-num">{stats.blogs}</h3>
            <p className="stat-label">Artículos de Blog</p>
          </div>
        </div>
      </div>
      
      <div className="hero-deco"></div>
      <div className="hero-deco-inner">
        <div className="hero-center-badge">
          <div className="big-emoji">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="url(#blue-grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <defs>
                <linearGradient id="blue-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#003399" />
                  <stop offset="100%" stopColor="#0056e0" />
                </linearGradient>
              </defs>
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
          <span className="badge-title">Creador Activo</span>
          <span className="badge-sub">Nivel Experto</span>
        </div>
        <div className="floating-tag tag-1">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2e7aff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '6px', verticalAlign: 'text-bottom'}}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
          +45% Rendimiento
        </div>
        <div className="floating-tag tag-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#0056e0" stroke="none" style={{marginRight: '6px', verticalAlign: 'text-bottom'}}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
          4.9/5 Rating
        </div>
        <div className="floating-tag tag-3">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#003399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '6px', verticalAlign: 'text-bottom'}}><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
          Top Creator
        </div>
      </div>
    </section>
  );
}
