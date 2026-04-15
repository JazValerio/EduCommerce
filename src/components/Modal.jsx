import React from 'react';

export default function Modal({ isOpen, content, closeModal }) {
  if (!isOpen || !content) return null;
  const isVideo = content.type === 'video';

  return (
    <div className={`modal-overlay ${isOpen ? 'open' : ''}`} onClick={(e) => {
      if (e.target.className.includes('modal-overlay')) closeModal();
    }}>
      <div className="modal">
        <button className="modal-close" onClick={closeModal}>✕</button>
        <h2>{content.title}</h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', margin: '1rem 0', color: 'var(--muted)', fontSize: '0.85rem' }}>
          <span>📂 {content.category}</span>
          <span>{isVideo ? `⏱ ${content.duration} min` : `📖 ${content.readTime} min`}</span>
          <span>📅 {content.date}</span>
          {isVideo ? <span>💾 {content.size}</span> : <span>📝 {content.wordCount} palabras</span>}
        </div>
        {content.image && <img src={content.image} style={{ width: '100%', borderRadius: '12px', marginBottom: '1rem', maxHeight: '200px', objectFit: 'cover' }} alt="cover" />}
        {isVideo && content.videoUrl ? (
          <video 
            controls 
            src={content.videoUrl} 
            style={{ width: '100%', borderRadius: '12px', marginBottom: '1rem', maxHeight: '400px', backgroundColor: '#000' }} 
          />
        ) : isVideo ? (
          <div style={{ background: 'var(--surface2)', borderRadius: '12px', padding: '1.5rem', textAlign: 'center', fontSize: '3rem' }}>
            🎬<br />
            <small style={{ color: 'var(--muted)', fontSize: '0.85rem', fontFamily: "'Plus Jakarta Sans'", marginTop: '0.5rem', display: 'block' }}>Archivo de video cargado (Recarga la página y sube de nuevo para previsualizar)</small>
          </div>
        ) : null}
        {(content.description || content.content) && (
          <div 
            style={{ marginTop: '1.5rem', lineHeight: '1.75', color: 'var(--muted)', fontSize: '0.93rem' }}
            dangerouslySetInnerHTML={{ __html: content.description || content.content }} 
          />
        )}
      </div>
    </div>
  );
}
