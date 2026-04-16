import React from 'react';

export default function InfoSection() {
  const benefits = [
    {
      icon: '🎥',
      title: 'Videos Educativos',
      desc: 'Monitorea el rendimiento de tu tienda con métricas detalladas'
    },
    {
      icon: '📝',
      title: 'Blog & Artículos',
      desc: 'Herramientas poderosas para expandir tu negocio rápidamente'
    },
    {
      icon: '🎧',
      title: 'Podcasts',
      desc: 'Protege tu tienda y datos de clientes con encriptación avanzada'
    },
    
  ];

  const features = [
    {
      title: 'Aprendizaje Integral',
      bgGradient: 'linear-gradient(135deg, #003399 0%, #0056e0 50%, #2e7aff 100%)',
      icon: ''
    },
    {
      title: 'Gestion de Contenido',
      bgGradient: 'linear-gradient(135deg, #0056e0 0%, #2e7aff 50%, #5fa3ff 100%)',
      icon: ''
    },
    {
      title: 'Optimización y efficiencia comercial',
      bgGradient: 'linear-gradient(135deg, #2e7aff 0%, #5fa3ff 50%, #8ebaff 100%)',
      icon: ''  
    }
  ];

  return (
    <>
      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="section-header">
          <h2>Curso de Comercio Electrónico</h2>
          <p>Soluciones completas para tu E-commerce</p>
        </div>
        
        <div className="benefits-grid">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="benefit-card">
              <div className="benefit-icon">{benefit.icon}</div>
              <h3>{benefit.title}</h3>
              <p>{benefit.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Banners */}
      <section className="features-section">
        <div className="features-grid">
          {features.map((feature, idx) => (
            <div 
              key={idx} 
              className="feature-banner"
              style={{ background: feature.bgGradient }}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>Explora todas las herramientas</p>
              <svg className="feature-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
          ))}
        </div>
      </section>

      

      {/* Info Banner */}
      <section className="info-banner">
        <div className="info-content">
          <div className="info-text">
            <h2>Maximiza tu potencial en el comercio electrónico</h2>
            <p>Explora contenido actualizado y práctico sobre comercio electrónico a través de videos, artículos y podcasts diseñados para ayudarte a entender, aplicar y dominar el mundo digital.</p>
            <ul className="info-list">
              <li>✓ Dashboard intuitivo y fácil de usar</li>
              <li>✓ Análisis detallados para tomar decisiones informadas</li>
              <li>✓ Automatización de procesos</li>
            </ul>
          </div>
          <div className="info-visual">
            <div className="visual-card card-1">
              <div className="visual-icon">📈</div>
              <span>Crece tu negocio</span>
            </div>
            <div className="visual-card card-2">
              <div className="visual-icon">⚡</div>
              <span>Automatiza tareas</span>
            </div>
            <div className="visual-card card-3">
              <div className="visual-icon">🎯</div>
              <span>Targeting perfecto</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
