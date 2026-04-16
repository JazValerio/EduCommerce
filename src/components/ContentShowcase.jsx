import React, { useState } from 'react';

export default function ContentShowcase({ contents, activeTab, switchTab, deleteContent, previewContent, showToast }) {
  const getFilteredContents = () => {
    if (activeTab === 'videos') return contents.filter(c => c.type === 'video');
    if (activeTab === 'audio') return contents.filter(c => c.type === 'audio');
    if (activeTab === 'blog') return contents.filter(c => c.type === 'blog');
    return contents;
  };

  const filteredContents = getFilteredContents();

  const tabs = [
    { id: 'videos', label: 'Videos', icon: '🎥' },
    { id: 'audio', label: 'Audios', icon: '🎧' },
    { id: 'blog', label: 'Blogs', icon: '📝' }
  ];

  return (
    <section className="showcase-section" id="content-showcase">
      <div className="section-header">
        <h2>Mi Contenido Publicado</h2>
        <p>Administra y visualiza todo tu contenido en un solo lugar</p>
      </div>

      {/* Tab Navigation */}
      <div className="showcase-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => switchTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
            {activeTab === tab.id && <span className="tab-count">{getFilteredContents().length}</span>}
          </button>
        ))}
      </div>

      {/* Content Grid */}
      {filteredContents.length > 0 ? (
        <div className="content-grid">
          {filteredContents.map(content => (
            <div key={content.id} className="content-card">
              <div className="content-thumbnail">
                <div className="thumbnail-overlay">
                  <button className="btn-preview" onClick={() => previewContent(content)}>
                    👁️ Vista previa
                  </button>
                  <button className="btn-delete" onClick={() => deleteContent(content.id)}>
                    🗑️ Eliminar
                  </button>
                </div>
              </div>
              <div className="content-info">
                <h4>{content.title || 'Sin título'}</h4>
                <p className="content-type">{content.type === 'video' ? '🎥 Video' : content.type === 'audio' ? '🎧 Audio' : '📝 Blog'}</p>
                <p className="content-desc">{content.description?.substring(0, 60)}...</p>
                <div className="content-meta">
                  <span className="meta-date">{new Date(content.uploadDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <h3>No hay contenido aún</h3>
          <p>Comienza a subir {activeTab === 'videos' ? 'videos' : activeTab === 'audio' ? 'audios' : 'blogs'}</p>
        </div>
      )}
    </section>
  );
}
