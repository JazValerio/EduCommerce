import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import HeroNew from './components/HeroNew'
import InfoSection from './components/InfoSection'
import ContentShowcase from './components/ContentShowcase'
import UploadSection from './components/UploadSection'
import Footer from './components/Footer'
import Toast from './components/Toast'
import Modal from './components/Modal'
import './index.css'

function App() {
  const [contents, setContents] = useState(() => {
    const saved = localStorage.getItem('ecommerce_content');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [activeTab, setActiveTab] = useState('videos');
  const [toast, setToast] = useState({ show: false, icon: '', text: '' });
  const [modal, setModal] = useState({ isOpen: false, content: null });

  useEffect(() => {
    localStorage.setItem('ecommerce_content', JSON.stringify(contents));
  }, [contents]);

  const showToast = (icon, text) => {
    setToast({ show: true, icon, text });
    setTimeout(() => {
      setToast(t => ({ ...t, show: false }));
    }, 3500);
  };

  const publishContent = (item) => {
    setContents(prev => [item, ...prev]);
    showToast('✅', 'Contenido publicado exitosamente');
  };

  const deleteContent = (id) => {
    setContents(prev => prev.filter(c => c.id !== id));
    showToast('🗑️', 'Contenido eliminado');
  };

  const switchTab = (tab) => {
    setActiveTab(tab);
    setTimeout(() => {
      document.getElementById('content-showcase')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const scrollToUpload = () => {
    document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const previewContent = (content) => {
    setModal({ isOpen: true, content });
  };

  const stats = {
    videos: contents.filter(c => c.type === 'video').length,
    audios: contents.filter(c => c.type === 'audio').length,
    blogs: contents.filter(c => c.type === 'blog').length
  };

  return (
    <>
      <Navbar scrollToUpload={scrollToUpload} switchTab={switchTab} activeTab={activeTab} />
      <HeroNew scrollToUpload={scrollToUpload} showSection={switchTab} stats={stats} />
      <InfoSection />
      <ContentShowcase 
        contents={contents}
        activeTab={activeTab}
        switchTab={switchTab}
        deleteContent={deleteContent}
        previewContent={previewContent}
        showToast={showToast}
      />
      <UploadSection 
        activeTab={activeTab} 
        switchTab={switchTab} 
        contents={contents} 
        publishContent={publishContent} 
        deleteContent={deleteContent} 
        previewContent={previewContent} 
        showToast={showToast} 
      />
      <Footer />
      <Toast toast={toast} />
      <Modal isOpen={modal.isOpen} content={modal.content} closeModal={() => setModal({ isOpen: false, content: null })} />
    </>
  )
}

export default App
