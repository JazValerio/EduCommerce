import React, { useState } from 'react';

export default function Navbar({ scrollToUpload, switchTab, activeTab }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = (tab) => {
    switchTab(tab);
    setMenuOpen(false);
  };

  return (
    <nav className="navbar-new">
      <div className="navbar-container">
        {/* Logo */}
        <div className="logo-new" onClick={() => switchTab('videos')} style={{ cursor: 'pointer' }}>
          <div className="logo-icon-new">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
              <path d="M2 17l10 5 10-5"></path>
              <path d="M2 12l10 5 10-5"></path>
            </svg>
          </div>
          <span className="logo-text">Comercio Electrónico</span>
        </div>

        {/* Nav Links */}
        <ul className="nav-links-new">
          <li>
            <button 
              className={`nav-item ${activeTab === 'videos' ? 'active' : ''}`}
              onClick={() => handleNavClick('videos')}
            >
              <span className="nav-icon">🎥</span>
              Videos
            </button>
          </li>
          <li>
            <button 
              className={`nav-item ${activeTab === 'audio' ? 'active' : ''}`}
              onClick={() => handleNavClick('audio')}
            >
              <span className="nav-icon">🎧</span>
              Audios
            </button>
          </li>
          <li>
            <button 
              className={`nav-item ${activeTab === 'blog' ? 'active' : ''}`}
              onClick={() => handleNavClick('blog')}
            >
              <span className="nav-icon">📝</span>
              Blogs
            </button>
          </li>
        </ul>

        {/* Right Actions */}
        <div className="navbar-actions">
          <button className="btn-upload-nav" onClick={scrollToUpload}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 5v14M5 12h14"/>
            </svg>
            Subir Contenido
          </button>
        </div>

        {/* Mobile Menu */}
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </button>

        {menuOpen && (
          <div className="mobile-menu">
            <button onClick={() => handleNavClick('videos')}>Videos</button>
            <button onClick={() => handleNavClick('audio')}>Audios</button>
            <button onClick={() => handleNavClick('blog')}>Blogs</button>
            <button onClick={scrollToUpload}>Subir Contenido</button>
          </div>
        )}
      </div>
    </nav>
  );
}
