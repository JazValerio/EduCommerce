import React, { useState } from 'react';

export default function HeroNew({ scrollToUpload, showSection, stats }) {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = () => {
    if (searchValue.toLowerCase().includes('video')) showSection('videos');
    else if (searchValue.toLowerCase().includes('audio')) showSection('audio');
    else if (searchValue.toLowerCase().includes('blog')) showSection('blog');
  };

  return (
    <section className="hero-new">
      <div className="hero-background">
        <div className="hero-shape shape-1"></div>
        <div className="hero-shape shape-2"></div>
        <div className="hero-shape shape-3"></div>
      </div>

      <div className="hero-new-content">
        {/* Top Badge */}
        <div className="hero-badge-new">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M13 2H3v10h10V2z M21 2h-10v10h10V2z M13 12H3v10h10v-10z M21 12h-10v10h10v-10z"/>
          </svg>
          <span>E-Commerce </span>
        </div>

        {/* Main Title */}
        <h1 className="hero-title">
          Comercio<em> Electrónico</em> <br />
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle">
          Universidad Nacional de Costa Rica 
        </p>

        {/* Search/Action Area */}
        <div className="hero-search-area">
          <div className="search-box">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <input
              type="text"
              placeholder="¿Qué quieres crear? Videos, audios, blogs..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button className="btn-search" onClick={handleSearch}>
              Explorar
            </button>
          </div>
          <div className="quick-links">
            <button onClick={() => showSection('videos')}>Últimos Videos</button>
            <button onClick={() => showSection('audio')}>Audios Populares</button>
            <button onClick={() => showSection('blog')}>Blog Actualizado</button>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="hero-cta">
          <button className="btn-primary-new" onClick={scrollToUpload}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 5v14M5 12h14"/>
            </svg>
            Comenzar a Publicar
          </button>
        </div>

        {/* Stats Bar */}
        <div className="hero-stats">
          <div className="stat">
            <div className="stat-icon">📹</div>
            <div className="stat-info">
              <h4>{stats.videos || 0}</h4>
              <p>Videos</p>
            </div>
          </div>
          <div className="stat">
            <div className="stat-icon">🎧</div>
            <div className="stat-info">
              <h4>{stats.audios || 0}</h4>
              <p>Audios</p>
            </div>
          </div>
          <div className="stat">
            <div className="stat-icon">📝</div>
            <div className="stat-info">
              <h4>{stats.blogs || 0}</h4>
              <p>Blogs</p>
            </div>
          </div>
          <div className="stat">
            <div className="stat-icon">⭐</div>
            <div className="stat-info">
              <h4>4.9</h4>
              <p>Rating</p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Cards */}
      <div className="floating-cards">
        <div className="float-card fc-1">
          <div className="fc-icon">🚀</div>
          <p>Fácil de usar</p>
        </div>
        <div className="float-card fc-2">
          <div className="fc-icon">💡</div>
          <p>Innovador</p>
        </div>
        <div className="float-card fc-3">
          <div className="fc-icon">🌍</div>
          <p>Global</p>
        </div>
      </div>
    </section>
  );
}
