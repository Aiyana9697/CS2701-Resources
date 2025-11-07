import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Info, ZoomIn} from 'lucide-react';
import './InteractiveMap.css';

interface MapRegion {
  id: string;
  name: string;
  biodiversity: 'high' | 'medium' | 'low';
  protected: boolean;
  x: number;
  y: number;
}

const oceanRegions: MapRegion[] = [
  { id: '1', name: 'Pacific Deep Zone', biodiversity: 'high', protected: true, x: 20, y: 35 },
  { id: '2', name: 'Atlantic Trench', biodiversity: 'high', protected: true, x: 50, y: 30 },
  { id: '3', name: 'Indian Basin', biodiversity: 'medium', protected: false, x: 65, y: 55 },
  { id: '4', name: 'Arctic Shelf', biodiversity: 'low', protected: true, x: 45, y: 10 },
  { id: '5', name : 'Southern Ocean', biodiversity: 'medium', protected: false, x: 40, y: 85 },
];

export function InteractiveMap() {
  const [selectedRegion, setSelectedRegion] = useState<MapRegion | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  const getBiodiversityClass = (level: string) => {
    switch (level) {
      case 'high': return 'biodiversity-high';
      case 'medium': return 'biodiversity-medium';
      case 'low': return 'biodiversity-low';
      default: return 'biodiversity-default';
    }
  };

  return (
    <section className="interactive-map-section">
      <div className="map-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="map-header"
        >
        <div className="map-tag">
          <MapPin/>  
          <span>Interactive Map</span>
        </div>
        
          <h2>Interactive Ocean Map</h2>
          <p>Explore seabed regions, biodiversity hotspots, and protected marine areas</p>
        </motion.div>

        <div className="map-grid">
          {/* Map Card */}
          <div className="map-card">
            <div className="map-visual">
              <svg className="map-svg" viewBox="0 0 100 100">
                <defs>
                  <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(6, 182, 212, 0.1)" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#grid)" />

                {oceanRegions.map((region) => (
                  <g key={region.id}>
                    <motion.circle
                      cx={region.x}
                      cy={region.y}
                      r={hoveredRegion === region.id ? "4" : "3"}
                      className={`region-marker ${getBiodiversityClass(region.biodiversity)}`}
                      onClick={() => setSelectedRegion(region)}
                      onMouseEnter={() => setHoveredRegion(region.id)}
                      onMouseLeave={() => setHoveredRegion(null)}
                      whileHover={{ scale: 1.3 }}
                    />
                    {region.protected && (
                      <circle
                        cx={region.x}
                        cy={region.y}
                        r="5"
                        fill="none"
                        stroke="rgba(16, 185, 129, 0.5)"
                        strokeWidth="0.5"
                        strokeDasharray="2,2"
                      />
                    )}
                  </g>
                ))}
              </svg>

              <div className="zoom-controls">
                <button className="zoom-button">
                  <ZoomIn className="icon" />
                </button>
              </div>
            </div>
          </div>

          {/* Details + Legend */}
          <div className="map-sidebar">
            <div className="map-card info-card">
              <div className="info-header">
                <Info className="icon" />
                <h3>Region Details</h3>
              </div>

              {selectedRegion ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="region-details"
                >
                  <p className="region-name">{selectedRegion.name}</p>
                  <div className="region-tags">
                    <span className={`badge ${getBiodiversityClass(selectedRegion.biodiversity)}`}>
                      {selectedRegion.biodiversity} biodiversity
                    </span>
                    {selectedRegion.protected && (
                      <span className="badge protected">Protected Area</span>
                    )}
                  </div>
                  <p className="region-desc">
                    Click on map markers to explore different ocean regions and their conservation status.
                  </p>
                </motion.div>
              ) : (
                <p className="region-placeholder">
                  Select a region on the map to view details about biodiversity and protection status.
                </p>
              )}
            </div>

            <div className="map-card legend-card">
              <h4>Legend</h4>
              <div className="legend-list">
                <div className="legend-item"><div className="dot high"></div>High Biodiversity</div>
                <div className="legend-item"><div className="dot medium"></div>Medium Biodiversity</div>
                <div className="legend-item"><div className="dot low"></div>Low Biodiversity</div>
                <div className="legend-item"><div className="dot protected-border"></div>Protected Area</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
