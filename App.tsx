import { useState } from 'react';
import { X, Filter, BookOpen, ArrowRight } from 'lucide-react';
import { timelineData, infographicData, type Infographic } from './data';
import './index.css';

function App() {
  const [activeTab, setActiveTab] = useState<'timeline' | 'infographics'>('timeline');
  const [selectedInfographic, setSelectedInfographic] = useState<Infographic | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('All');

  // Logic: Filter the cards
  const filteredInfographics = filterCategory === 'All' 
    ? infographicData 
    : infographicData.filter(item => item.category === filterCategory);

  // Logic: Define colors based on "Impact" field for timeline
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'positive': return '#22c55e'; // Green
      case 'mixed': return '#eab308';    // Yellow
      case 'negative': return '#ef4444'; // Red
      default: return '#cbd5e1';         // Gray
    }
  };

  return (
    <div className="container">
      
      {/* 1. HEADER SECTION */}
      <header className="page-header">
        <h1 className="page-title">Life Below Water: The Knowledge Hub</h1>
        <p className="page-subtitle">
          An interactive deep dive into UN SDG 14, exploring the balance between deep-sea exploration, resource extraction, and ecosystem preservation.
        </p>

        {/* Tab Buttons */}
        <div className="nav-container" style={{ marginTop: '2.5rem' }}>
          <button 
            className={`nav-btn ${activeTab === 'timeline' ? 'active' : ''}`}
            onClick={() => setActiveTab('timeline')}
          >
            History & Legislation
          </button>
          <button 
            className={`nav-btn ${activeTab === 'infographics' ? 'active' : ''}`}
            onClick={() => setActiveTab('infographics')}
          >
            Ecosystems & Mining
          </button>
        </div>
      </header>

      {/* 2. TIMELINE SECTION */}
      {activeTab === 'timeline' && (
        <section>
          {/* Legend */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '3rem', fontSize: '0.9rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#22c55e' }}></div>
              <span>Progress</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#eab308' }}></div>
              <span>Contentious/Mixed</span>
            </div>
          </div>

          <div className="timeline-container">
            {timelineData.map((event) => (
              <div key={event.id} className="timeline-item">
                <div className="timeline-dot"></div>
                
                <div 
                  className="timeline-card"
                  style={{ borderLeftColor: getImpactColor(event.impact) }}
                >
                  <span className="timeline-year">{event.year}</span>
                  <h3 style={{ fontSize: '1.5rem', marginTop: 0, marginBottom: '0.5rem' }}>
                    {event.title}
                  </h3>
                  <p style={{ fontWeight: '500', marginBottom: '1rem' }}>
                    {event.description}
                  </p>
                  <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', fontSize: '0.95rem', color: '#475569' }}>
                    <strong>Deep Dive:</strong> {event.extendedDetails}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 3. INFOGRAPHIC GRID SECTION */}
      {activeTab === 'infographics' && (
        <section>
          {/* Filters */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b' }}>
              <Filter size={20} />
              <span style={{ fontWeight: 600 }}>Filter by Topic:</span>
            </div>
            {['All', 'Deep Sea Mining', 'Ecosystems', 'Legislation'].map(cat => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                style={{
                  padding: '0.5rem 1.25rem',
                  borderRadius: '20px',
                  border: '1px solid #cbd5e1',
                  background: filterCategory === cat ? '#0f172a' : 'white',
                  color: filterCategory === cat ? 'white' : '#64748b',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  transition: 'all 0.2s'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          <div className="grid-container">
            {filteredInfographics.map((info) => (
              <div key={info.id} className="info-card" onClick={() => setSelectedInfographic(info)}>
                <div className="card-image-wrapper">
                  <img src={info.imageUrl} alt={info.title} className="card-image" />
                  <div className="category-badge">{info.category}</div>
                </div>
                <div className="card-content">
                  <h3 style={{ marginTop: 0, fontSize: '1.25rem', color: '#0f172a' }}>{info.title}</h3>
                  <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.5 }}>
                    {info.summary}
                  </p>
                  <div className="read-more-link">
                    <BookOpen size={16} /> Read Full Analysis <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. MODAL POPUP (The detailed learning view) */}
      {selectedInfographic && (
        <div className="modal-overlay" onClick={() => setSelectedInfographic(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            
            {/* Close Button */}
            <button className="close-btn" onClick={() => setSelectedInfographic(null)}>
              <X size={24} color="#0f172a" />
            </button>

            {/* Header Image */}
            <div className="modal-header">
              <img 
                src={selectedInfographic.imageUrl} 
                alt={selectedInfographic.title} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', padding: '2rem' }}>
                <span style={{ color: '#38bdf8', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.85rem' }}>
                  {selectedInfographic.category}
                </span>
                <h2 style={{ color: 'white', fontSize: '2.5rem', margin: 0 }}>
                  {selectedInfographic.title}
                </h2>
              </div>
            </div>

            {/* Scrollable Content Body */}
            <div className="modal-body">
              
              {/* Key Stats Row */}
              <div className="stat-grid">
                {selectedInfographic.keyStats.map((stat, idx) => (
                  <div key={idx} className="stat-box">
                    <div className="stat-text">{stat}</div>
                  </div>
                ))}
              </div>

              {/* Paragraphs */}
              <div style={{ fontSize: '1.1rem', color: '#334155', lineHeight: 1.8 }}>
                {selectedInfographic.fullContent.map((paragraph, index) => (
                  <p key={index} style={{ marginBottom: '1.5rem' }}>{paragraph}</p>
                ))}
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;