import React, { useRef, useState } from 'react';

export default function UploadSection({ activeTab, switchTab, contents, publishContent, deleteContent, previewContent, showToast }) {
  const [videoFile, setVideoFile] = useState(null);
  const [videoProgress, setVideoProgress] = useState(0);
  const [showVideoForm, setShowVideoForm] = useState(false);
  const videoTitleRef = useRef(null);
  const videoCatRef = useRef(null);
  const videoDurationRef = useRef(null);
  const videoDescRef = useRef(null);
  const fileInputRef = useRef(null);

  const [audioFile, setAudioFile] = useState(null);
  const [audioProgress, setAudioProgress] = useState(0);
  const [showAudioForm, setShowAudioForm] = useState(false);
  const audioTitleRef = useRef(null);
  const audioCatRef = useRef(null);
  const audioDurationRef = useRef(null);
  const audioDescRef = useRef(null);
  const audioFileInputRef = useRef(null);

  const [blogImage, setBlogImage] = useState(null);
  const [blogImageName, setBlogImageName] = useState('');
  const blogTitleRef = useRef(null);
  const blogCatRef = useRef(null);
  const blogTimeRef = useRef(null);
  const blogEditorRef = useRef(null);
  const blogImageInputRef = useRef(null);

  const handleVideoFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith('video/')) {
      showToast('❌', 'Video inválido');
      return;
    }
    setVideoFile(file);
    setVideoProgress(1);
    let w = 0;
    const interval = setInterval(() => {
      w += Math.random() * 15;
      if (w >= 100) {
        w = 100;
        clearInterval(interval);
        setTimeout(() => {
          setShowVideoForm(true);
          showToast('✅', 'Video cargado');
        }, 300);
      }
      setVideoProgress(w);
    }, 120);
  };

  const submitVideo = () => {
    const title = videoTitleRef.current.value.trim();
    if (!title) { showToast('⚠️', 'Ingresa título'); return; }
    if (!videoFile) { showToast('⚠️', 'Selecciona video'); return; }
    const item = { id: Date.now(), type: 'video', title, category: videoCatRef.current.value || 'Sin categoría', duration: videoDurationRef.current.value || '?', description: videoDescRef.current.value, uploadDate: new Date(), date: new Date().toLocaleDateString('es-ES'), size: `${(videoFile.size / 1024 / 1024).toFixed(1)} MB`, videoUrl: URL.createObjectURL(videoFile) };
    publishContent(item);
    videoTitleRef.current.value = '';
    videoCatRef.current.value = '';
    videoDurationRef.current.value = '';
    videoDescRef.current.value = '';
    setShowVideoForm(false);
    setVideoFile(null);
    setVideoProgress(0);
    if(fileInputRef.current) fileInputRef.current.value = '';
    setTimeout(() => switchTab('videos'), 1200);
  };

  const handleAudioFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith('audio/')) {
      showToast('❌', 'Audio inválido');
      return;
    }
    setAudioFile(file);
    setAudioProgress(1);
    let w = 0;
    const interval = setInterval(() => {
      w += Math.random() * 15;
      if (w >= 100) {
        w = 100;
        clearInterval(interval);
        setTimeout(() => {
          setShowAudioForm(true);
          showToast('✅', 'Audio cargado');
        }, 300);
      }
      setAudioProgress(w);
    }, 120);
  };

  const submitAudio = () => {
    const title = audioTitleRef.current.value.trim();
    if (!title) { showToast('⚠️', 'Ingresa título'); return; }
    if (!audioFile) { showToast('⚠️', 'Selecciona audio'); return; }
    const item = { id: Date.now(), type: 'audio', title, category: audioCatRef.current.value || 'Sin categoría', duration: audioDurationRef.current.value || '?', description: audioDescRef.current.value, uploadDate: new Date(), date: new Date().toLocaleDateString('es-ES'), size: `${(audioFile.size / 1024 / 1024).toFixed(2)} MB`, audioUrl: URL.createObjectURL(audioFile) };
    publishContent(item);
    audioTitleRef.current.value = '';
    audioCatRef.current.value = '';
    audioDurationRef.current.value = '';
    audioDescRef.current.value = '';
    setShowAudioForm(false);
    setAudioFile(null);
    setAudioProgress(0);
    if(audioFileInputRef.current) audioFileInputRef.current.value = '';
    setTimeout(() => switchTab('audio'), 1200);
  };

  const handleBlogImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setBlogImage(ev.target.result);
      setBlogImageName(file.name);
    };
    reader.readAsDataURL(file);
  };

  const formatDoc = (cmd, val) => {
    if (blogEditorRef.current) blogEditorRef.current.focus();
    document.execCommand(cmd, false, val || null);
  };

  const submitBlog = () => {
    const title = blogTitleRef.current.value.trim();
    const content = blogEditorRef.current.innerHTML.trim();
    if (!title) { showToast('⚠️', 'Ingresa título'); return; }
    if (!content) { showToast('⚠️', 'Agrega contenido'); return; }
    const item = { id: Date.now(), type: 'blog', title, category: blogCatRef.current.value || 'Sin categoría', readTime: blogTimeRef.current.value || '?', content, image: blogImage, uploadDate: new Date(), date: new Date().toLocaleDateString('es-ES'), wordCount: content.replace(/<[^>]*>/g, '').split(/\s+/).length };
    publishContent(item);
    blogTitleRef.current.value = '';
    blogCatRef.current.value = '';
    blogTimeRef.current.value = '';
    blogEditorRef.current.innerHTML = '';
    if(blogImageInputRef.current) blogImageInputRef.current.value = '';
    setBlogImage(null);
    setBlogImageName('');
    setTimeout(() => switchTab('blog'), 1200);
  };

  return (
    <section id="upload-section" className="upload-section-bg">
      <div className="tabs-container">
        <div className="section-header">
          <h2>Sube tu Contenido</h2>
          <p>Comparte videos, audios y blogs con tu comunidad.</p>
        </div>
        <div className="showcase-tabs">
          <button className={`tab-btn ${activeTab === 'videos' ? 'active' : ''}`} onClick={() => switchTab('videos')}><span className="tab-icon">🎬</span><span className="tab-label">Videos</span></button>
          <button className={`tab-btn ${activeTab === 'audio' ? 'active' : ''}`} onClick={() => switchTab('audio')}><span className="tab-icon">🎧</span><span className="tab-label">Audios</span></button>
          <button className={`tab-btn ${activeTab === 'blog' ? 'active' : ''}`} onClick={() => switchTab('blog')}><span className="tab-icon">📝</span><span className="tab-label">Blogs</span></button>
        </div>
        {activeTab === 'videos' && (
          <div className="tab-panel active">
            <div className="upload-area" onClick={() => fileInputRef.current.click()} onDragOver={(e) => { e.preventDefault(); }} onDrop={(e) => { e.preventDefault(); handleVideoFile(e.dataTransfer.files[0]); }}>
              <input type="file" ref={fileInputRef} accept="video/*" onChange={(e) => handleVideoFile(e.target.files[0])} style={{ display: 'none' }} />
              <div style={{color: 'var(--blue)', margin: '0 auto 1rem', fontSize: '3rem'}}>🎬</div>
              <h3>Arrastra tu video aquí</h3>
              <p>o haz clic para seleccionar</p>
              <button className="btn-primary-new" onClick={(e) => { e.stopPropagation(); fileInputRef.current.click(); }}>Seleccionar Video</button>
              {videoProgress > 0 && !showVideoForm && (<div style={{ width: '100%', height: '4px', background: 'rgba(0,68,204,0.2)', borderRadius: '2px', marginTop: '1rem' }}><div style={{ width: `${videoProgress}%`, height: '100%', background: 'var(--gradient)', transition: 'width 0.2s' }}></div></div>)}
            </div>
            {showVideoForm && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '2rem' }}>
                <div><label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '600'}}>Título *</label><input type="text" ref={videoTitleRef} placeholder="Título" style={{width: '100%', padding: '0.8rem', border: '1px solid var(--border)', borderRadius: '8px'}} /></div>
                <div><label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '600'}}>Categoría</label><select ref={videoCatRef} style={{width: '100%', padding: '0.8rem', border: '1px solid var(--border)', borderRadius: '8px'}}><option>Fundamentos</option><option>Marketing</option></select></div>
                <div><label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '600'}}>Duración (min)</label><input type="text" ref={videoDurationRef} style={{width: '100%', padding: '0.8rem', border: '1px solid var(--border)', borderRadius: '8px'}} /></div>
                <div><label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '600'}}>Tamaño</label><input type="text" disabled value={videoFile ? `${(videoFile.size / 1024 / 1024).toFixed(1)} MB` : ''} style={{width: '100%', padding: '0.8rem', border: '1px solid var(--border)', borderRadius: '8px', background: 'var(--surface2)'}} /></div>
                <div style={{gridColumn: '1 / -1'}}><label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '600'}}>Descripción</label><textarea ref={videoDescRef} rows="3" style={{width: '100%', padding: '0.8rem', border: '1px solid var(--border)', borderRadius: '8px', resize: 'vertical'}}></textarea></div>
                <div style={{gridColumn: '1 / -1'}}><button className="btn-primary-new" onClick={submitVideo}>Publicar Video</button></div>
              </div>
            )}
          </div>
        )}
        {activeTab === 'audio' && (
          <div className="tab-panel active">
            <div className="upload-area" onClick={() => audioFileInputRef.current.click()} onDragOver={(e) => { e.preventDefault(); }} onDrop={(e) => { e.preventDefault(); handleAudioFile(e.dataTransfer.files[0]); }}>
              <input type="file" ref={audioFileInputRef} accept="audio/*" onChange={(e) => handleAudioFile(e.target.files[0])} style={{ display: 'none' }} />
              <div style={{color: 'var(--blue)', margin: '0 auto 1rem', fontSize: '3rem'}}>🎧</div>
              <h3>Arrastra tu audio aquí</h3>
              <p>o haz clic para seleccionar</p>
              <button className="btn-primary-new" onClick={(e) => { e.stopPropagation(); audioFileInputRef.current.click(); }}>Seleccionar Audio</button>
              {audioProgress > 0 && !showAudioForm && (<div style={{ width: '100%', height: '4px', background: 'rgba(0,68,204,0.2)', borderRadius: '2px', marginTop: '1rem' }}><div style={{ width: `${audioProgress}%`, height: '100%', background: 'var(--gradient)', transition: 'width 0.2s' }}></div></div>)}
            </div>
            {showAudioForm && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '2rem' }}>
                <div><label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '600'}}>Título *</label><input type="text" ref={audioTitleRef} style={{width: '100%', padding: '0.8rem', border: '1px solid var(--border)', borderRadius: '8px'}} /></div>
                <div><label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '600'}}>Categoría</label><select ref={audioCatRef} style={{width: '100%', padding: '0.8rem', border: '1px solid var(--border)', borderRadius: '8px'}}><option>Podcasts</option><option>Educación</option></select></div>
                <div><label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '600'}}>Duración (min)</label><input type="text" ref={audioDurationRef} style={{width: '100%', padding: '0.8rem', border: '1px solid var(--border)', borderRadius: '8px'}} /></div>
                <div><label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '600'}}>Tamaño</label><input type="text" disabled value={audioFile ? `${(audioFile.size / 1024 / 1024).toFixed(2)} MB` : ''} style={{width: '100%', padding: '0.8rem', border: '1px solid var(--border)', borderRadius: '8px', background: 'var(--surface2)'}} /></div>
                <div style={{gridColumn: '1 / -1'}}><label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '600'}}>Descripción</label><textarea ref={audioDescRef} rows="3" style={{width: '100%', padding: '0.8rem', border: '1px solid var(--border)', borderRadius: '8px', resize: 'vertical'}}></textarea></div>
                <div style={{gridColumn: '1 / -1'}}><button className="btn-primary-new" onClick={submitAudio}>Publicar Audio</button></div>
              </div>
            )}
          </div>
        )}
        {activeTab === 'blog' && (
          <div className="tab-panel active">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div><label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '600'}}>Título *</label><input type="text" ref={blogTitleRef} style={{width: '100%', padding: '0.8rem', border: '1px solid var(--border)', borderRadius: '8px'}} /></div>
              <div><label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '600'}}>Categoría</label><select ref={blogCatRef} style={{width: '100%', padding: '0.8rem', border: '1px solid var(--border)', borderRadius: '8px'}}><option>Estrategia</option><option>Marketing</option></select></div>
              <div><label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '600'}}>Lectura (min)</label><input type="text" ref={blogTimeRef} style={{width: '100%', padding: '0.8rem', border: '1px solid var(--border)', borderRadius: '8px'}} /></div>
              <div><label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '600'}}>Portada</label><div className="upload-area" style={{ padding: '1.5rem', cursor: 'pointer' }} onClick={() => blogImageInputRef.current.click()}><input type="file" ref={blogImageInputRef} accept="image/*" onChange={handleBlogImage} style={{ display: 'none' }} /><span>{blogImageName ? `✅ ${blogImageName}` : '📷 Subir'}</span></div></div>
              <div style={{gridColumn: '1 / -1'}}><label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '600'}}>Contenido *</label><div style={{display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', padding: '0.8rem', background: 'var(--surface2)', borderRadius: '8px', flexWrap: 'wrap'}}><button style={{padding: '0.5rem 0.8rem', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '4px', fontWeight: 'bold'}} onClick={() => formatDoc('bold')}>B</button><button style={{padding: '0.5rem 0.8rem', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '4px', fontStyle: 'italic'}} onClick={() => formatDoc('italic')}>I</button></div><div ref={blogEditorRef} contentEditable="true" style={{width: '100%', minHeight: '250px', padding: '1rem', border: '1px solid var(--border)', borderRadius: '8px', backgroundColor: 'var(--white)', outline: 'none'}}></div></div>
              <div style={{gridColumn: '1 / -1'}}><button className="btn-primary-new" onClick={submitBlog}>Publicar Blog</button></div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
