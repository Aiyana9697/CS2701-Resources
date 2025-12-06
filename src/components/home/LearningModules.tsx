import { useState } from 'react';
import { X, Filter, BookOpen, ArrowRight } from 'lucide-react';  

interface TimelineEvent {
  id: number;
  year: string;
  title: string;
  description: string;
  extendedDetails: string; // New field for deep reading
  impact: 'positive' | 'mixed' | 'negative';
}

interface Infographic {
  id: number;
  title: string;
  category: 'Deep Sea Mining' | 'Ecosystems' | 'Legislation';
  imageUrl: string; // We will use specific placeholder colors to differentiate
  summary: string;
  fullContent: string[]; // Array of paragraphs for the modal
  keyStats: string[]; // New field for "Quick Facts"
}

// RESEARCHED TIMELINE DATA
const timelineData: TimelineEvent[] = [
  { 
    id: 1, 
    year: "1982", 
    title: "UNCLOS Adopted", 
    description: "The 'Constitution for the Oceans' is signed, defining maritime zones.", 
    extendedDetails: "The United Nations Convention on the Law of the Sea (UNCLOS) defined the 200-nautical-mile Exclusive Economic Zone (EEZ) and declared the seabed beyond national jurisdiction as the 'Common Heritage of Mankind,' managed by the ISA.",
    impact: "positive" 
  },
  { 
    id: 2, 
    year: "1994", 
    title: "ISA Operations Begin", 
    description: "The International Seabed Authority (ISA) is formally established in Jamaica.", 
    extendedDetails: "The ISA was tasked with organizing and controlling all mineral-related activities in the international seabed area. Its dual mandate—to facilitate mining while protecting the marine environment—remains a subject of intense global debate today.",
    impact: "mixed" 
  },
  { 
    id: 3, 
    year: "2015", 
    title: "SDG 14 Established", 
    description: "The UN adopts the 2030 Agenda, including Goal 14: Life Below Water.", 
    extendedDetails: "SDG 14 was the first universal global framework to explicitly target marine pollution, ocean acidification, and the regulation of harvesting to end overfishing. It set specific targets for conserving at least 10% of coastal and marine areas.",
    impact: "positive" 
  },
  { 
    id: 4, 
    year: "2023", 
    title: "The High Seas Treaty", 
    description: "Nations agree to the BBNJ treaty to protect biodiversity beyond national jurisdiction.", 
    extendedDetails: "After nearly two decades of talks, the Biodiversity Beyond National Jurisdiction (BBNJ) treaty was agreed upon. It provides a legal framework for establishing Marine Protected Areas (MPAs) on the high seas, which cover nearly two-thirds of the ocean.",
    impact: "positive" 
  },
  { 
    id: 5, 
    year: "2024", 
    title: "The Mining Moratorium Call", 
    description: "25+ countries call for a 'precautionary pause' on deep-sea mining.", 
    extendedDetails: "With the ISA nearing the finalization of the Mining Code, a growing coalition of nations (including France, Canada, and the UK) argued that scientific knowledge of the deep sea is insufficient to approve commercial mining without risking irreversible ecological damage.",
    impact: "mixed" 
  }
];

// RESEARCHED INFOGRAPHIC DATA 
const infographicData: Infographic[] = [
  { 
    id: 1, 
    title: "Polymetallic Nodules", 
    category: "Deep Sea Mining", 
    imageUrl: "https://placehold.co/800x600/1e293b/FFF?text=Nodules", 
    summary: "The primary target for deep-sea mining: potato-sized rocks rich in battery metals.", 
    fullContent: [
      "Polymetallic nodules are authigenic deposits found on the abyssal plains, most notably in the Clarion-Clipperton Zone (CCZ) in the Pacific. They take millions of years to form, growing by precipitating metals from seawater around a core fragment.",
      "These nodules are rich in manganese, nickel, copper, and cobalt—metals essential for EV batteries and renewable energy storage. Proponents argue extracting them is less damaging than rainforest mining.",
      "However, nodules are also a substrate for unique life forms. Sponges, corals, and xenophyophores rely on these hard surfaces in the soft sediment. Removing the nodules effectively removes the habitat forever, as they do not grow back on human timescales."
    ],
    keyStats: [
      "Growth Rate: 1-10 mm per million years",
      "Location: 4,000 - 6,000 meters deep",
      "Resource: Estimated 21 billion tonnes in CCZ"
    ]
  },
  { 
    id: 2, 
    title: "Hydrothermal Vents", 
    category: "Ecosystems", 
    imageUrl: "https://placehold.co/800x600/064e3b/FFF?text=Vents", 
    summary: "Underwater geysers hosting unique life powered by chemosynthesis, not sunlight.", 
    fullContent: [
      "Discovered in 1977, hydrothermal vents are fissures on the seabed that release geothermally heated water rich in minerals. They are often associated with Seafloor Massive Sulfides (SMS), another target for mining.",
      "Unlike most life on Earth, vent ecosystems do not rely on photosynthesis. Instead, bacteria convert toxic chemicals like hydrogen sulfide into energy (chemosynthesis), supporting giant tube worms, yeti crabs, and scaly-foot snails.",
      "Mining these vents for copper and gold poses a threat to these endemic species, many of which exist nowhere else on Earth. The physical destruction of the vent chimneys would likely lead to immediate localized extinction."
    ],
    keyStats: [
      "Temperature: Up to 400°C (750°F)",
      "Biodiversity: High endemism (species found nowhere else)",
      "Depth: Usually 1,500 - 4,000 meters"
    ]
  },
  { 
    id: 3, 
    title: "Sediment Plumes", 
    category: "Deep Sea Mining", 
    imageUrl: "https://placehold.co/800x600/7f1d1d/FFF?text=Plumes", 
    summary: "The 'smog' of the sea: how mining vehicles choke marine life.", 
    fullContent: [
      "Deep-sea mining collectors are massive machines resembling underwater bulldozers. As they harvest nodules, they disturb the top layer of soft sediment, creating clouds of particles known as 'plumes'.",
      "These plumes can drift for hundreds of kilometers. When the sediment eventually settles, it can bury slow-moving organisms and clog the delicate feeding structures of filter feeders like corals and sponges.",
      "Furthermore, the sediment cloud blocks bioluminescence (light created by animals), which is the primary form of communication and hunting in the deep ocean, potentially disrupting the entire food web."
    ],
    keyStats: [
      "Spread: Plumes can travel 100+ km",
      "Impact: Smothers filter feeders",
      "Duration: Suspended particles may linger for months"
    ]
  },
  { 
    id: 4, 
    title: "The 'Twilight Zone' Gap", 
    category: "Ecosystems", 
    imageUrl: "https://placehold.co/800x600/172554/FFF?text=Twilight+Zone", 
    summary: "How industrial noise and waste affect the mid-water column.", 
    fullContent: [
      "While mining happens on the seafloor, the return water (containing sediment and fines) is often discharged in the mid-water column, or 'Twilight Zone' (200m to 1000m deep).",
      "This zone contains the greatest biomass on Earth and is critical for carbon sequestration. The daily vertical migration of fish here moves carbon from the surface to the deep.",
      "Discharging waste here introduces noise, light, and turbidity to a pristine environment. Scientists warn that disrupting the Twilight Zone could reduce the ocean's ability to absorb human-produced CO2."
    ],
    keyStats: [
      "Depth: 200m - 1000m",
      "Importance: Critical for Carbon Sequestration",
      "Risk: Noise pollution & water turbidity"
    ]
  },
  { 
    id: 5, 
    title: "The Precautionary Principle", 
    category: "Legislation", 
    imageUrl: "https://placehold.co/800x600/4c1d95/FFF?text=Precaution", 
    summary: "The legal argument for pausing exploitation until science catches up.", 
    fullContent: [
      "The Precautionary Principle is a core tenet of international environmental law. It states that if an action has a suspected risk of causing harm to the public or the environment, the burden of proof that it is NOT harmful falls on those taking the action.",
      "In the context of SDG 14, this principle is the foundation for the call for a moratorium. Scientists argue we have explored less than 5% of the deep ocean.",
      "Without a baseline understanding of what lives there, it is impossible to conduct a valid Environmental Impact Assessment (EIA). Therefore, mining should not proceed until the science is sufficient."
    ],
    keyStats: [
      "Concept: 'Do no harm' before acting",
      "Adoption: Rio Declaration (1992)",
      "Status: Central to current ISA debates"
    ]
  }
];


export function LearningModulesSection() {
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