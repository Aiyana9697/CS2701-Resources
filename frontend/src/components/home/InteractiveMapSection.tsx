/*
Renders an interactive ocean map that allows users to:
- search for ocean regions by name or ocean
- toggle different information layers (biodiversity, mining risk, protected areas)
- click map markers to view details about a region
- view real region data loaded from the backend
*/
import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Map, Search, Layers, MapPin, X, Fish, AlertTriangle, Shield } from 'lucide-react';
import { handleApiError, regionService } from '../../services';
import type { Region } from '../../types/api';

/*
Extends the backend Region type with local display-only fields that preserve
the current map UI without requiring backend schema changes.
*/
interface MapRegion extends Region {
  x: number;
  y: number;
  biodiversity: 'high' | 'medium' | 'low';
  miningRisk: 'high' | 'medium' | 'low';
  protected: boolean;
}

/*
State Variable 1 'selectedRegion':
- stores the region the user has clicked on
- initially null (as nothing has been selected yet)

State Variable 2 'searchQuery':
- stores the text where user types in the search bar
- used to filter which regions appear

State Variable 3 'visibleLayers':
- tracks which map layers are currently visible (biodiversity, mining, protected)

State Variable 4 'regions':
- stores backend regions mapped into the visual shape required by this section

State Variable 5 'loading' and 'error':
- support asynchronous loading from the backend and user-friendly feedback
*/
export function InteractiveMap() {
  const [selectedRegion, setSelectedRegion] = useState<MapRegion | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleLayers, setVisibleLayers] = useState({
    biodiversity: true,
    mining: true,
    protected: true,
  });
  const [regions, setRegions] = useState<MapRegion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  /*
  Converts backend Region data into the display model expected by the existing map.
  The extra values are derived locally so the frontend layout can stay the same.
  */
  const mapBackendRegion = (region: Region, index: number): MapRegion => {
    const type = (region.type ?? '').toUpperCase();
    const isProtected = type === 'MARINE_PROTECTED_AREA';
    const biodiversity =
      isProtected || type === 'RIDGE' || type === 'TRENCH' ? 'high' :
      type === 'BASIN' || type === 'SEA' ? 'medium' :
      'low';
    const miningRisk =
      isProtected ? 'low' :
      type === 'OCEAN' || type === 'BASIN' || type === 'PLATFORM' ? 'high' :
      'medium';

    return {
      ...region,
      x: 20 + (index % 5) * 15,
      y: 25 + Math.floor(index / 5) * 16,
      biodiversity,
      miningRisk,
      protected: isProtected,
    };
  };

  useEffect(() => {
    const loadRegions = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await regionService.getRegions();
        const mappedRegions = (response.data ?? []).map(mapBackendRegion);
        setRegions(mappedRegions);
      } catch (err) {
        setError(handleApiError(err));
      } finally {
        setLoading(false);
      }
    };

    void loadRegions();
  }, []);

  /*
  toggleLayer function receives a layer name (biodiversity, mining, protected)
  and flips its visibility in state.
  */
  const toggleLayer = (layer: keyof typeof visibleLayers) => {
    setVisibleLayers(prev => ({ ...prev, [layer]: !prev[layer] }));
  };

  /*
  Filters the backend-backed regions list using region name or ocean name so
  the search bar still behaves like the current UI expects.
  */
  const filteredRegions = useMemo(
    () =>
      regions.filter(region =>
        region.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (region.oceanName ?? '').toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [regions, searchQuery]
  );

  /*
  Returns a display colour for the derived risk level.
  */
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  return (
    <section id="map" className="py-9 px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-8"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center border border-cyan-400/30">
            <Map className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <h2 className="text-white">Interactive Ocean Map</h2>
            <p className="text-slate-400">Visualize mining zones, biodiversity, and protected areas</p>
          </div>
        </div>
      </motion.div>

      {error && <p className="mb-4 text-sm text-red-300">{error}</p>}

      <div className="grid lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-2"
        >
          <Card className="bg-[#071821]/80 border-cyan-400/30 p-6 rounded-3xl backdrop-blur-sm">
            <div className="mb-4 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400" />
              <Input
                placeholder="Search regions or oceans..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-slate-900/50 border-cyan-500/30 text-white placeholder:text-slate-500"
              />
            </div>

            <div className="mb-4 flex flex-wrap gap-2">
              <Button
                size="sm"
                variant={visibleLayers.biodiversity ? 'default' : 'outline'}
                onClick={() => toggleLayer('biodiversity')}
                className={visibleLayers.biodiversity ?
                  'bg-cyan-500/20 text-cyan-300 border-cyan-400/30' :
                  'text-slate-400 border-slate-600'
                }
              >
                <Layers className="w-4 h-4 mr-2" />
                Biodiversity
              </Button>
              <Button
                size="sm"
                variant={visibleLayers.mining ? 'default' : 'outline'}
                onClick={() => toggleLayer('mining')}
                className={visibleLayers.mining ?
                  'bg-cyan-500/20 text-cyan-300 border-cyan-400/30' :
                  'text-slate-400 border-slate-600'
                }
              >
                <AlertTriangle className="w-4 h-4 mr-2" />
                Mining Risk
              </Button>
              <Button
                size="sm"
                variant={visibleLayers.protected ? 'default' : 'outline'}
                onClick={() => toggleLayer('protected')}
                className={visibleLayers.protected ?
                  'bg-cyan-500/20 text-cyan-300 border-cyan-400/30' :
                  'text-slate-400 border-slate-600'
                }
              >
                <Shield className="w-4 h-4 mr-2" />
                Protected Areas
              </Button>
            </div>

            <div className="relative aspect-video bg-gradient-to-br from-blue-900/50 via-slate-800/50 to-cyan-900/30 rounded-2xl overflow-hidden border border-cyan-500/20">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <defs>
                  <pattern id="grid" width="5" height="5" patternUnits="userSpaceOnUse">
                    <path d="M 5 0 L 0 0 0 5" fill="none" stroke="rgba(6, 182, 212, 0.08)" strokeWidth="0.3"/>
                  </pattern>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                <rect width="100" height="100" fill="url(#grid)" />

                {!loading && filteredRegions.map((region) => (
                  <g key={region.id}>
                    {visibleLayers.mining && (
                      <circle
                        cx={region.x}
                        cy={region.y}
                        r="8"
                        fill={`${getRiskColor(region.miningRisk)}20`}
                        stroke={getRiskColor(region.miningRisk)}
                        strokeWidth="0.3"
                        opacity="0.6"
                      />
                    )}

                    {visibleLayers.protected && region.protected && (
                      <circle
                        cx={region.x}
                        cy={region.y}
                        r="6"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="0.5"
                        strokeDasharray="2,2"
                        opacity="0.8"
                      />
                    )}

                    {visibleLayers.biodiversity && (
                      <motion.circle
                        cx={region.x}
                        cy={region.y}
                        r="2.5"
                        fill="#06b6d4"
                        filter="url(#glow)"
                        className="cursor-pointer"
                        onClick={() => setSelectedRegion(region)}
                        whileHover={{ r: 3.5 }}
                        style={{ filter: 'drop-shadow(0 0 8px rgba(6, 182, 212, 0.8))' }}
                      />
                    )}
                  </g>
                ))}
              </svg>

              {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-950/30">
                  <p className="text-sm text-cyan-200">Loading region data...</p>
                </div>
              )}

              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.3, 0.7, 0.3],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <Card className="bg-[#071821]/80 border-cyan-400/30 p-6 rounded-3xl backdrop-blur-sm h-full">
            {selectedRegion ? (
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-cyan-400" />
                    <h3 className="text-white">{selectedRegion.name}</h3>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setSelectedRegion(null)}
                    className="text-slate-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-slate-400 text-sm mb-2">Status</p>
                    <div className="flex gap-2 flex-wrap">
                      <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-400/30">
                        {selectedRegion.biodiversity} biodiversity
                      </Badge>
                      <Badge
                        style={{
                          backgroundColor: `${getRiskColor(selectedRegion.miningRisk)}20`,
                          color: getRiskColor(selectedRegion.miningRisk),
                          borderColor: `${getRiskColor(selectedRegion.miningRisk)}50`
                        }}
                        className="border"
                      >
                        {selectedRegion.miningRisk} mining risk
                      </Badge>
                      {selectedRegion.protected && (
                        <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-400/30">
                          Protected Area
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div>
                    <p className="text-slate-400 text-sm mb-2">Ocean</p>
                    <p className="text-white text-sm">{selectedRegion.oceanName ?? 'N/A'}</p>
                  </div>

                  <div>
                    <p className="text-slate-400 text-sm mb-2">Coordinates</p>
                    <p className="text-white text-sm">{selectedRegion.coordinates}</p>
                  </div>

                  <div>
                    <p className="text-slate-400 text-sm mb-2">Region Details</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Fish className="w-4 h-4 text-cyan-400" />
                        <span className="text-slate-300">{selectedRegion.type ?? 'Unknown type'}</span>
                      </div>
                      <p className="text-slate-300 text-sm">{selectedRegion.description}</p>
                    </div>
                  </div>

                  <Button className="w-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 hover:bg-cyan-500/30">
                    View Full Report
                  </Button>
                </div>
              </div>
            ) : loading ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-8">
                <div className="w-16 h-16 rounded-full bg-cyan-500/10 flex items-center justify-center mb-4 border border-cyan-400/20">
                  <MapPin className="w-8 h-8 text-cyan-400/50" />
                </div>
                <p className="text-slate-400 mb-2">Loading regions</p>
                <p className="text-slate-500 text-sm">The map is waiting for the backend response</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center py-8">
                <div className="w-16 h-16 rounded-full bg-cyan-500/10 flex items-center justify-center mb-4 border border-cyan-400/20">
                  <MapPin className="w-8 h-8 text-cyan-400/50" />
                </div>
                <p className="text-slate-400 mb-2">No region selected</p>
                <p className="text-slate-500 text-sm">Click on a map marker to view details</p>
              </div>
            )}
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
