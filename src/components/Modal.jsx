import React from 'react';

export default function Modal({ isOpen, content, closeModal }) {
  if (!isOpen || !content) return null;
  const isVideo = content.type === 'video';
  const isAudio = content.type === 'audio';

  return (
    <div className={`modal-overlay ${isOpen ? 'open' : ''}`} onClick={(e) => {
      if (e.target === e.currentTarget) closeModal();
    }}>
      <div className="modal">
        <button className="modal-close" onClick={closeModal}>✕</button>
        <h2>{content.title}</h2>
        
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', margin: '1rem 0', color: 'var(--muted)', fontSize: '0.85rem' }}>
          <span>📂 {content.category}</span>
          <span>{isVideo || isAudio ? `⏱ ${content.duration} min` : `📖 ${content.readTime} min lectura`}</span>
          <span>📅 {content.date}</span>
          {isVideo || isAudio ? <span>💾 {content.size}</span> : <span>📝 {content.wordCount} palabras</span>}
        </div>

        {/* IMAGEN PORTADA */}
        {content.image && (
          <img 
            src={content.image} 
            alt="cover"
            style={{ width: '100%', borderRadius: '12px', marginBottom: '1.5rem', maxHeight: '300px', objectFit: 'cover' }} 
          />
        )}

        {/* VIDEO */}
        {isVideo && content.videoUrl ? (
          <video 
            controls 
            src={content.videoUrl} 
            style={{ width: '100%', borderRadius: '12px', marginBottom: '1.5rem', maxHeight: '450px', backgroundColor: '#000' }} 
          />
        ) : isVideo ? (
          <div style={{ background: 'var(--surface2)', borderRadius: '12px', padding: '3rem 1.5rem', textAlign: 'center', marginBottom: '1.5rem' }}>
            <div style={{fontSize: '3rem', marginBottom: '0.5rem'}}>🎬</div>
            <small style={{ color: 'var(--muted)', fontSize: '0.85rem', fontFamily: "'Plus Jakarta Sans'" }}>Archivo de video cargado (Recarga la página y sube de nuevo para previsualizar)</small>
          </div>
        ) : null}

        {/* AUDIO */}
        {isAudio && content.audioUrl ? (
          <audio 
            controls 
            src={content.audioUrl}
            style={{ width: '100%', marginBottom: '1.5rem' }}
          />
        ) : isAudio ? (
          <div style={{ background: 'var(--surface2)', borderRadius: '12px', padding: '3rem 1.5rem', textAlign: 'center', marginBottom: '1.5rem' }}>
            <div style={{fontSize: '3rem', marginBottom: '0.5rem'}}>🎧</div>
            <small style={{ color: 'var(--muted)', fontSize: '0.85rem', fontFamily: "'Plus Jakarta Sans'" }}>Archivo de audio cargado (Recarga la página y sube de nuevo para previsualizar)</small>
          </div>
        ) : null}

        {/* CONTENIDO DESCRIPCIÓN O BLOG */}
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
