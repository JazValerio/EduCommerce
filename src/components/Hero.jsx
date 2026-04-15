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
          <div className="big-emoji">💡</div>
          <span className="badge-title">Creador Activo</span>
          <span className="badge-sub">Nivel Experto</span>
        </div>
        <div className="floating-tag tag-1">📈 +25% Vistas</div>
        <div className="floating-tag tag-2">⭐ 4.9/5 Rating</div>
        <div className="floating-tag tag-3">🚀 Top Creator</div>
      </div>
    </section>
  );
}
