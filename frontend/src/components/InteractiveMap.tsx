import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Map, Info, ZoomIn } from 'lucide-react';
import { Button } from './ui/button';

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
  { id: '5', name: 'Southern Ocean', biodiversity: 'medium', protected: false, x: 40, y: 85 },
];

export function InteractiveMap() {
  const [selectedRegion, setSelectedRegion] = useState<MapRegion | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  const getBiodiversityColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-emerald-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-blue-950 to-slate-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-4 py-2 mb-4">
            <Map className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-300 text-sm">Interactive Map</span>
          </div>
          <h2 className="text-white mb-4">Interactive Ocean Map</h2>
          <p className="text-slate-400 text-xl max-w-3xl mx-auto">
            Explore seabed regions, biodiversity hotspots, and protected marine areas
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2 bg-slate-800/50 border-cyan-500/20 backdrop-blur-sm p-0 overflow-hidden">
            <div className="relative aspect-video bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900">
              {/* Map visualization */}
              <svg className="w-full h-full" viewBox="0 0 100 100">
                {/* Ocean background pattern */}
                <defs>
                  <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(6, 182, 212, 0.1)" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#grid)" />

                {/* Region markers */}
                {oceanRegions.map((region) => (
                  <g key={region.id}>
                    <motion.circle
                      cx={region.x}
                      cy={region.y}
                      r={hoveredRegion === region.id ? "4" : "3"}
                      className={`${getBiodiversityColor(region.biodiversity)} cursor-pointer`}
                      style={{ filter: 'drop-shadow(0 0 8px rgba(6, 182, 212, 0.6))' }}
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

              {/* Zoom control */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <Button size="sm" className="bg-slate-700/80 hover:bg-slate-600 border-cyan-500/30">
                  <ZoomIn className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>

          <div className="space-y-4">
            <Card className="bg-slate-800/50 border-cyan-500/20 backdrop-blur-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <Info className="w-5 h-5 text-cyan-400" />
                <h3 className="text-white">Region Details</h3>
              </div>
              
              {selectedRegion ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-3"
                >
                  <div>
                    <p className="text-cyan-300 mb-2">{selectedRegion.name}</p>
                    <div className="flex gap-2 flex-wrap">
                      <Badge className={`${getBiodiversityColor(selectedRegion.biodiversity)} text-white`}>
                        {selectedRegion.biodiversity} biodiversity
                      </Badge>
                      {selectedRegion.protected && (
                        <Badge className="bg-emerald-600 text-white">Protected Area</Badge>
                      )}
                    </div>
                  </div>
                  <p className="text-slate-400 text-sm">
                    Click on map markers to explore different ocean regions and their conservation status.
                  </p>
                </motion.div>
              ) : (
                <p className="text-slate-400 text-sm">
                  Select a region on the map to view details about biodiversity and protection status.
                </p>
              )}
            </Card>

            <Card className="bg-slate-800/50 border-cyan-500/20 backdrop-blur-sm p-6">
              <h4 className="text-white mb-3">Legend</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-slate-300">High Biodiversity</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <span className="text-slate-300">Medium Biodiversity</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-orange-500" />
                  <span className="text-slate-300">Low Biodiversity</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full border-2 border-emerald-500 border-dashed" />
                  <span className="text-slate-300">Protected Area</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
