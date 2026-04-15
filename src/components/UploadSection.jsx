import React, { useRef, useState } from 'react';

export default function UploadSection({ activeTab, switchTab, contents, publishContent, deleteContent, previewContent, showToast }) {
  // Video State
  const [videoFile, setVideoFile] = useState(null);
  const [videoProgress, setVideoProgress] = useState(0);
  const [showVideoForm, setShowVideoForm] = useState(false);
  const videoTitleRef = useRef(null);
  const videoCatRef = useRef(null);
  const videoDurationRef = useRef(null);
  const videoDescRef = useRef(null);
  const fileInputRef = useRef(null);

  // Blog State
  const [blogImage, setBlogImage] = useState(null);
  const [blogImageName, setBlogImageName] = useState('');
  const blogTitleRef = useRef(null);
  const blogCatRef = useRef(null);
  const blogTimeRef = useRef(null);
  const blogEditorRef = useRef(null);
  const blogImageInputRef = useRef(null);

  // Setup refs
  const dropZoneRef = useRef(null);

  const handleVideoFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith('video/')) {
      showToast('❌', 'Por favor sube un archivo de video válido');
      return;
    }
    setVideoFile(file);
    setVideoProgress(1); // start showing progress
    let w = 0;
    const interval = setInterval(() => {
      w += Math.random() * 15;
      if (w >= 100) {
        w = 100;
        clearInterval(interval);
        setTimeout(() => {
          setShowVideoForm(true);
          showToast('✅', 'Video cargado. Completa los detalles para publicar.');
        }, 300);
      }
      setVideoProgress(w);
    }, 120);
  };

  const submitVideo = () => {
    const title = videoTitleRef.current.value.trim();
    if (!title) { showToast('⚠️', 'Por favor ingresa un título'); return; }
    if (!videoFile) { showToast('⚠️', 'Por favor selecciona un video'); return; }

    const item = {
      id: Date.now(),
      type: 'video',
      title,
      category: videoCatRef.current.value || 'Sin categoría',
      duration: videoDurationRef.current.value || '?',
      description: videoDescRef.current.value,
      date: new Date().toLocaleDateString('es-ES'),
      size: `${(videoFile.size / 1024 / 1024).toFixed(1)} MB`,
      videoUrl: URL.createObjectURL(videoFile)
    };

    publishContent(item);
    
    // Reset form
    videoTitleRef.current.value = '';
    videoCatRef.current.value = '';
    videoDurationRef.current.value = '';
    videoDescRef.current.value = '';
    setShowVideoForm(false);
    setVideoFile(null);
    setVideoProgress(0);
    if(fileInputRef.current) fileInputRef.current.value = '';
    
    showToast('🎬', '¡Video publicado exitosamente!');
    setTimeout(() => switchTab('contenido'), 1200);
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
    if (!title) { showToast('⚠️', 'Por favor ingresa un título'); return; }
    if (!content || content === '') { showToast('⚠️', 'El contenido del blog no puede estar vacío'); return; }

    const item = {
      id: Date.now(),
      type: 'blog',
      title,
      category: blogCatRef.current.value || 'Sin categoría',
      readTime: blogTimeRef.current.value || '?',
      content,
      image: blogImage,
      date: new Date().toLocaleDateString('es-ES'),
      wordCount: content.replace(/<[^>]*>/g, '').split(/\s+/).length
    };

    publishContent(item);
    
    // Reset blog
    blogTitleRef.current.value = '';
    blogCatRef.current.value = '';
    blogTimeRef.current.value = '';
    blogEditorRef.current.innerHTML = '';
    if(blogImageInputRef.current) blogImageInputRef.current.value = '';
    setBlogImage(null);
    setBlogImageName('');
    
    showToast('✍️', '¡Blog publicado exitosamente!');
    setTimeout(() => switchTab('contenido'), 1200);
  };

  return (
    <section id="upload-section" className="upload-section-bg">
      <div className="tabs-container">
        <div className="section-tag">Gestión de Contenido</div>
        <h2 className="section-title">Sube tu Contenido</h2>
        <p className="section-desc">Comparte videos educativos y artículos de blog con tu comunidad de estudiantes.</p>

        <div className="tabs">
          <button className={`tab ${activeTab === 'videos' ? 'active' : ''}`} onClick={() => switchTab('videos')}>🎬 Subir Video</button>
          <button className={`tab ${activeTab === 'blog' ? 'active' : ''}`} onClick={() => switchTab('blog')}>✍️ Crear Blog</button>
          <button className={`tab ${activeTab === 'contenido' ? 'active' : ''}`} onClick={() => switchTab('contenido')}>📚 Mi Contenido</button>
        </div>

        {/* TAB VIDEOS */}
        {activeTab === 'videos' && (
          <div className="tab-panel active">
            <div 
              className={`upload-area ${videoProgress > 0 && !showVideoForm ? 'drag-over' : ''}`} 
              ref={dropZoneRef}
              onClick={() => fileInputRef.current.click()}
              onDragOver={(e) => { e.preventDefault(); dropZoneRef.current.classList.add('drag-over'); }}
              onDragLeave={() => dropZoneRef.current.classList.remove('drag-over')}
              onDrop={(e) => {
                e.preventDefault();
                dropZoneRef.current.classList.remove('drag-over');
                handleVideoFile(e.dataTransfer.files[0]);
              }}
            >
              <input type="file" ref={fileInputRef} accept="video/*" onChange={(e) => handleVideoFile(e.target.files[0])} style={{ display: 'none' }} />
              <div className="upload-icon">🎬</div>
              <h3>Arrastra tu video aquí</h3>
              <p>o haz clic para seleccionar desde tu dispositivo</p>
              <div className="upload-types">
                <span className="type-badge">MP4</span>
                <span className="type-badge">MOV</span>
                <span className="type-badge">AVI</span>
                <span className="type-badge">MKV</span>
                <span className="type-badge">WEBM</span>
              </div>
              <button 
                className="btn-upload" 
                onClick={(e) => { e.stopPropagation(); fileInputRef.current.click(); }}
              >
                Seleccionar Video
              </button>
              
              <div className="progress-wrap" style={{ display: videoProgress > 0 ? 'block' : 'none' }}>
                <div className="progress-bar" style={{ width: `${videoProgress}%` }}></div>
              </div>
            </div>

            {showVideoForm && (
              <div className="form-grid">
                <div className="form-group full">
                  <label>Título del Video *</label>
                  <input type="text" ref={videoTitleRef} placeholder="Ej: Cómo crear tu primera tienda en línea" />
                </div>
                <div className="form-group">
                  <label>Categoría</label>
                  <select ref={videoCatRef}>
                    <option value="">Seleccionar...</option>
                    <option>Fundamentos de E-Commerce</option>
                    <option>Marketing Digital</option>
                    <option>SEO y Posicionamiento</option>
                    <option>Redes Sociales</option>
                    <option>Logística y Envíos</option>
                    <option>Pagos y Finanzas</option>
                    <option>Estrategias de Ventas</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Duración (min)</label>
                  <input type="text" ref={videoDurationRef} placeholder="Ej: 15" />
                </div>
                <div className="form-group full">
                  <label>Descripción</label>
                  <textarea ref={videoDescRef} rows="3" placeholder="Describe el contenido de tu video..."></textarea>
                </div>
                <div className="form-group full">
                  <button className="btn-primary" style={{ width: 'fit-content' }} onClick={submitVideo}>Publicar Video →</button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB BLOG */}
        {activeTab === 'blog' && (
          <div className="tab-panel active">
            <div className="form-grid">
              <div className="form-group full">
                <label>Título del Blog *</label>
                <input type="text" ref={blogTitleRef} placeholder="Ej: 10 Estrategias para aumentar tus ventas online" />
              </div>
              <div className="form-group">
                <label>Categoría</label>
                <select ref={blogCatRef}>
                  <option value="">Seleccionar...</option>
                  <option>Estrategia de Negocio</option>
                  <option>Marketing Digital</option>
                  <option>Experiencia del Cliente</option>
                  <option>Tecnología</option>
                  <option>Tendencias</option>
                  <option>Casos de Éxito</option>
                </select>
              </div>
              <div className="form-group">
                <label>Tiempo de lectura (min)</label>
                <input type="text" ref={blogTimeRef} placeholder="Ej: 5" />
              </div>
              <div className="form-group full">
                <label>Imagen de portada</label>
                <div className="upload-area" style={{ padding: '1.5rem', borderRadius: '14px' }} onClick={() => blogImageInputRef.current.click()}>
                  <input type="file" ref={blogImageInputRef} accept="image/*" onChange={handleBlogImage} style={{ display: 'none' }} />
                  <span>{blogImageName ? `✅ ${blogImageName}` : '📷 Haz clic para subir imagen de portada'}</span>
                </div>
              </div>
              <div className="form-group full">
                <label>Contenido del Blog *</label>
                <div className="editor-toolbar">
                  <button className="toolbar-btn" onClick={() => formatDoc('bold')} title="Negrita"><b>B</b></button>
                  <button className="toolbar-btn" onClick={() => formatDoc('italic')} title="Cursiva"><i>I</i></button>
                  <button className="toolbar-btn" onClick={() => formatDoc('underline')} title="Subrayar"><u>U</u></button>
                  <div className="toolbar-sep"></div>
                  <button className="toolbar-btn" onClick={() => formatDoc('insertUnorderedList')} title="Lista">≡</button>
                  <button className="toolbar-btn" onClick={() => formatDoc('insertOrderedList')} title="Numerada">№</button>
                  <div className="toolbar-sep"></div>
                  <button className="toolbar-btn" onClick={() => formatDoc('justifyLeft')} title="Izquierda">⬅</button>
                  <button className="toolbar-btn" onClick={() => formatDoc('justifyCenter')} title="Centro">↔</button>
                  <button className="toolbar-btn" onClick={() => formatDoc('justifyRight')} title="Derecha">➡</button>
                  <div className="toolbar-sep"></div>
                  <button className="toolbar-btn" onClick={() => formatDoc('formatBlock', 'h2')} title="Título">H</button>
                  <button className="toolbar-btn" onClick={() => formatDoc('formatBlock', 'p')} title="Párrafo">¶</button>
                </div>
                <div 
                  className="editor-area" 
                  ref={blogEditorRef} 
                  contentEditable="true" 
                  data-placeholder="Comienza a escribir tu artículo aquí..."
                  onFocus={(e) => { if (!e.target.textContent.trim()) e.target.innerHTML = ''; }}
                ></div>
              </div>
              <div className="form-group full">
                <button className="btn-primary" style={{ width: 'fit-content' }} onClick={submitBlog}>Publicar Blog →</button>
              </div>
            </div>
          </div>
        )}

        {/* TAB CONTENIDO */}
        {activeTab === 'contenido' && (
          <div className="tab-panel active">
            {contents.length === 0 ? (
              <div className="empty-state">
                <div className="icon">📭</div>
                <p>Aún no has subido contenido.<br />¡Comienza subiendo tu primer video o blog!</p>
              </div>
            ) : (
              <div className="content-grid">
                {contents.map(c => {
                  const isVideo = c.type === 'video';
                  return (
                    <div className="content-card" key={c.id}>
                      <div className="card-thumb" style={c.image ? { backgroundImage: `url(${c.image})`, backgroundSize:'cover', backgroundPosition:'center' } : {}}>
                        {!c.image && (isVideo ? '🎬' : '📝')}
                        <span className="card-type">{isVideo ? 'VIDEO' : 'BLOG'}</span>
                      </div>
                      <div className="card-body">
                        <div className="card-title">{c.title}</div>
                        <div className="card-meta">
                          <span>📂 {c.category}</span>
                          <span>{isVideo ? `⏱ ${c.duration} min` : `📖 ${c.readTime} min`}</span>
                          <span>📅 {c.date}</span>
                        </div>
                      </div>
                      <div className="card-actions">
                        <button className="btn-small btn-edit" onClick={() => previewContent(c)}>👁 Ver</button>
                        <button className="btn-small btn-delete" onClick={() => {
                          if (window.confirm('¿Seguro que deseas eliminar este contenido?')) {
                            deleteContent(c.id);
                            showToast('🗑', 'Contenido eliminado');
                          }
                        }}>🗑 Eliminar</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
