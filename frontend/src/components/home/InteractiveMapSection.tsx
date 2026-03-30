/*
Renders an interactive ocean map that allows users to: 
- search for ocean regions by name or contractor 
- toggle different information layers (biodiversity, mining risk, protected areas)
- click map markers to view details about a region 
- view data such as biodiversity level, species, mining risk and contractor
*/
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Map, Search, Layers, MapPin, X, Fish, AlertTriangle, Shield } from 'lucide-react';

/*
Interface defines the structure and required properties of a region displayed on the iteractive map 
*/
interface MapRegion {
  id: string;
  name: string;
  biodiversity: 'high' | 'medium' | 'low';
  miningRisk: 'high' | 'medium' | 'low';
  protected: boolean;
  species: string[];
  contractor: string;
  x: number;
  y: number;
}

/* Defines an array of MapRegions objects using the interface */
const regions: MapRegion[] = [
  {
    id: '1',
    name: 'Clarion-Clipperton Zone',
    biodiversity: 'high',
    miningRisk: 'high',
    protected: false,
    species: ['Abyssal Octopus', 'Glass Sponges', 'Sea Cucumbers'],
    contractor: 'Ocean Minerals Inc.',
    x: 25,
    y: 45
  },
  {
    id: '2',
    name: 'APEI-3',
    biodiversity: 'high',
    miningRisk: 'low',
    protected: true,
    species: ['Deep-sea Coral', 'Hydrothermal Vent Fauna', 'Giant Tube Worms'],
    contractor: 'N/A - Protected',
    x: 55,
    y: 35
  },
  {
    id: '3',
    name: 'Pacific Abyssal Plain',
    biodiversity: 'medium',
    miningRisk: 'medium',
    protected: false,
    species: ['Grenadier Fish', 'Xenophyophores'],
    contractor: 'DeepTech Mining Ltd.',
    x: 70,
    y: 55
  },
  {
    id: '4',
    name: 'Mid-Atlantic Ridge',
    biodiversity: 'high',
    miningRisk: 'high',
    protected: false,
    species: ['Black Smoker Shrimp', 'Vent Crabs', 'Sulfur Bacteria'],
    contractor: 'Atlantic Resources Group',
    x: 45,
    y: 25
  },
  {
    id: '5',
    name: 'APEI-7',
    biodiversity: 'high',
    miningRisk: 'low',
    protected: true,
    species: ['Bioluminescent Jellyfish', 'Deep-sea Anglerfish'],
    contractor: 'N/A - Protected',
    x: 30,
    y: 70
  },
];

/*
State Variable 1 'selectedRegion': 
- stores the region the user has clicked on 
- initally null (as nothing has been selected yet)

State Variable 2 'searchQuery': 
- stores the text where user types in the search bar 
- used to filter which regions appear
- initally an empty string (has no input has been given)

State Variable 3 'visisbleLayers': 
- tracks which map layers are currently visible (biodiversity, mining, protected)
- all layers initalised to true (as they are visible)
*/
export function InteractiveMap() {
  const [selectedRegion, setSelectedRegion] = useState<MapRegion | null>(null); // State 1 
  const [searchQuery, setSearchQuery] = useState(''); // State 2
  const [visibleLayers, setVisibleLayers] = useState({
    biodiversity: true, mining: true, protected: true, // State 3 
  });

  /*
  toggleLayer function recieves a layer name (biodiversity, mining, protected)
  react passes the previous visibleLaters state into the function
  new object is created by copying all previous layer values
  selected layer is dynamically updated to flip its value between true and false 
  */
  const toggleLayer = (layer: keyof typeof visibleLayers) => {
    setVisibleLayers(prev => ({ ...prev, [layer]: !prev[layer] }));
  };

  /*
  filteredRegions function filters regions array to list regions matching user’s input
  regions.filter() - returns an array containing only items that meets a condition 
  
  region.name.toLowerCase().includes(): 
  - converts the region's name to lowercase 
  - checks whether search query is found anywhere in the name 
  
  region.contractor.toLowerCase().includes(): 
  - converts the region contractor's name to lowercase 
  - checks whether search query is found anywhere in the name 
  
  overall purpose - allows users to seach by region or contractors name and filters the regions accordingly
  */
  const filteredRegions = regions.filter(region =>
    region.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    region.contractor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  /*
  defines a function 'getRiskColour' that passes in a string input for risk 
  switch statement compares the value of risk to high / medium / low
  depending on the risk value, a colour is returned (red, orange, green)
  if input is neither high / medium / low, grey is retured 
  */
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  /*
  creates a section of the page for the interactive map with padding 
  header animation - fades in and slides upwards when in view, occurs the first time section is scrolled 
  margin is added below the animated header

  horizonal layout is defined with map icon / text centered vertically and space between icon-title 
  defines a container for the icom with cyan background, border, colour & centered-positioned
  */
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

      {/* 
      defines a grid layout with 3 columns for the map, regional details panel and search bar
      animates container for map - fades in & slides slightly to the right
      on large screens the map spans over 2 grid columns 
      */}
      <div className="grid lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-2"
        >
        {/* 
        defines main card container for the map 
        */}
        <Card className="bg-[#071821]/80 border-cyan-400/30 p-6 rounded-3xl backdrop-blur-sm">

            {/* Search Bar: 
            - includes a search icon & input field for users to type in their query
            - 'searchQuery' state updates as user types, which filters the regions on the map
            */}
            <div className="mb-4 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400" />
              <Input
                placeholder="Search regions or contractors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-slate-900/50 border-cyan-500/30 text-white placeholder:text-slate-500"
              />
            </div>

            {/* Layers Toggle: 
            includes buttons for each layer (biodiversity, mining risk, protected areas) with corresponding icons
            button styles change based on whether the layer is currently visible (using 'visibleLayers' state): 
            - active layer is filled / highlighted
            - active layer is outlines / muted
            clicking a button calls 'toggleLayer' function to update the visibility of that layer on the map
            */}
            <div className="mb-4 flex flex-wrap gap-2">
              <Button
                size="sm"
                variant={visibleLayers.biodiversity ? "default" : "outline"}
                onClick={() => toggleLayer('biodiversity')}
                className={visibleLayers.biodiversity ? 
                  "bg-cyan-500/20 text-cyan-300 border-cyan-400/30" : 
                  "text-slate-400 border-slate-600"
                }
              >
                <Layers className="w-4 h-4 mr-2" />
                Biodiversity
              </Button>
              <Button
                size="sm"
                variant={visibleLayers.mining ? "default" : "outline"}
                onClick={() => toggleLayer('mining')}
                className={visibleLayers.mining ? 
                  "bg-cyan-500/20 text-cyan-300 border-cyan-400/30" : 
                  "text-slate-400 border-slate-600"
                }
              >
                <AlertTriangle className="w-4 h-4 mr-2" />
                Mining Risk
              </Button>
              <Button
                size="sm"
                variant={visibleLayers.protected ? "default" : "outline"}
                onClick={() => toggleLayer('protected')}
                className={visibleLayers.protected ? 
                  "bg-cyan-500/20 text-cyan-300 border-cyan-400/30" : 
                  "text-slate-400 border-slate-600"
                }
              >
                <Shield className="w-4 h-4 mr-2" />
                Protected Areas
              </Button>
            </div>

            {/* 
            defines the map container with a ratio of 16:9, gradient background, rounded edges and cyan border
            an SVG element is used to create the map visuals, including a grid pattern / markers for each region
            a glowing effect is applied to biodiversity markers using an SVG filter
            a grid pattern is defined and fills the entire map with the grid pattern 
            */}
            <div className="relative aspect-video bg-gradient-to-br from-blue-900/50 via-slate-800/50 to-cyan-900/30 rounded-2xl overflow-hidden border border-cyan-500/20">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                {/* Grid pattern */}
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

                {/* Region markers: 
                interates over the filteredRegions array to display markers for each region that matches the search query
                */}
                {filteredRegions.map((region) => (
                  <g key={region.id}>
                    
                    {/* Mining risk zone (if visible)
                    - a circle is drawn around the region with a color corresponding to the mining risk level (using 'getRiskColor' function)
                    - the circle has a low opacity to create a heatmap effect, with a stroke to define the boundary of the risk zone
                    */}
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
                    
                    {/* Protected area ring (if visible) 
                    - if region is protected & protected layer is toggled on, dashed green circle is drawn around region to indicate its protected
                    */}
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

                    {/* Biodiversity marker 
                    - if biodiversity layer is toggled on, a glowing cyan circle is drawn at the region's coordinates to indicate its biodiversity level
                    - clicking it sets the 'selectedRegion' state to that region, which triggers regional details panel to show info about the region
                    - when hovering, marker slightly increases in size to indicate interactivity
                    */}
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

              {/* Floating particles */}
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

        {/* Region Details Panel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          {/* 
          defines main card container for regional details with dark background, cyan glwing border, rounded edges
          uses conditional rendering where: 
          - if a region is selected (selectedRegion not null), it displays details of that region
          - otherwise shows placeholder message prompting  user to click on a map marker

          when a region is selected: 
          - header section displays the region name with a map pin icon, and a close button to deselect the region (sets selectedRegion back to null)
          - status section shows badges for biodiversity level, mining risk (with dynamic color), and protected status (if applicable)
          - contractor section shows the name of the contractor operating in that region
          - species section lists the species found in that region with a fish icon
          - a button is provided to view the full report for that region (functionality to be implemented in the future)
          */}
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
                          Protected APEI
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div>
                    <p className="text-slate-400 text-sm mb-2">Contractor</p>
                    <p className="text-white text-sm">{selectedRegion.contractor}</p>
                  </div>

                  <div>
                    <p className="text-slate-400 text-sm mb-2">Species Found</p>
                    <div className="space-y-2">
                      {selectedRegion.species.map((species, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          <Fish className="w-4 h-4 text-cyan-400" />
                          <span className="text-slate-300">{species}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 hover:bg-cyan-500/30">
                    View Full Report
                  </Button>
                </div>
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