/* 
React component for rendering an interactive ocean map which visually displays different ocean regions as clickable dots 
each region shows: 
- the name of the region
- biodiversity level (high, mediumm low) by colour 
- protected status with a green dashed ring 
*/ 
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Map, Info, ZoomIn } from 'lucide-react';
import { Button } from './ui/button';

/* 
defines the structure and required properties of a single ocean region displayed on the iteractive map 
*/ 
interface MapRegion {
  id: string;
  name: string;
  biodiversity: 'high' | 'medium' | 'low';
  protected: boolean;
  x: number;
  y: number;
}
/* 
creates an array containing 5 objects representing an ocean region that will be rendered on the map 
*/ 
const oceanRegions: MapRegion[] = [
  { id: '1', name: 'Pacific Deep Zone', biodiversity: 'high', protected: true, x: 20, y: 35 },
  { id: '2', name: 'Atlantic Trench', biodiversity: 'high', protected: true, x: 50, y: 30 },
  { id: '3', name: 'Indian Basin', biodiversity: 'medium', protected: false, x: 65, y: 55 },
  { id: '4', name: 'Arctic Shelf', biodiversity: 'low', protected: true, x: 45, y: 10 },
  { id: '5', name: 'Southern Ocean', biodiversity: 'medium', protected: false, x: 40, y: 85 },
];

/* 
State 1: 
- holds the region the user has clicked 
- MapRegion | null: initally nothing is selected so value is null, value becomes MapRegion object, after user clicks a region 

State 2: 
- holds which region the user's mouse is currently hovering over
- only stores the region's id 

Helper function: 
- returns the appropriate olor style based on biodiversity level 
*/ 
export function InteractiveMap() {
  const [selectedRegion, setSelectedRegion] = useState<MapRegion | null>(null); // state 1 
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null); // state 2 

  const getBiodiversityColor = (level: string) => { // helper function
    switch (level) {
      case 'high': return 'bg-emerald-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };


  /* 
  Creates a full-width section with top-bottom and side padding with dark slate background
  Centers the content and limits max width to keep content from stretching too wide 
  animation - fades in and slides up the entire section when it appears
  viewport - animates the first time the section comes into view, not every scroll
  */
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-blue-950 to-slate-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          {/* 
          Defines the Interactive Map label that appears above the main title 
          contains a lucide-react Map icon and text is light cyan in colour 
          the label is contained within a rounded capsule shape with a light cyan border and darker background
          defines the main white title and subtitle below it
          */}
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-4 py-2 mb-4">
            <Map className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-300 text-sm">Interactive Map</span>
          </div>
          <h2 className="text-white mb-4">Interactive Ocean Map</h2>
          <p className="text-slate-400 text-xl max-w-3xl mx-auto">
            Explore seabed regions, biodiversity hotspots, and protected marine areas
          </p>
        </motion.div>
          
        {/* 
        Defines a 3-column grid where : 
        - 2 left columns contain the interactive map a
        - rightmost column contains the regional details + legend cards 
        Defines a map card container positioned across 2 columns with a dark background with cyan borders
        Defines the map's background with a 19:6 ratio and diagonal gradient going from deep blue to slate
        */}
        <div className="grid lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2 bg-slate-800/50 border-cyan-500/20 backdrop-blur-sm p-0 overflow-hidden">
            <div className="relative aspect-video bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900">
              
              {/*
              svg - defines the SVG map element that fills the entire maps container and sets the coordinate system to 100x100
              pattern - defines a reusable SVG pattern named "grid" which has 10x10 cells 
              rect - draws a rectangle covering the entire map area and fills it with the grid pattern               
              */}
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <defs>
                  <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(6, 182, 212, 0.1)" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#grid)"/>

                {/*
                Loops through every region in oceanRegions array and renders an SVG circle for each one
                g - Svg group element that groups the main circle + optional protected ring 
                defines an interactive circle for each region at the coordinates extracted from the oceanRegions array 
                if the user hover overs the region, radius = 4 else = 3 (circles grows on hover) 
                
                getBiodiversityColor(): 
                - returns a colour class based on the regions biovdiversity level 
                - defines the cursor as pointer to indicate the circle is clickable

                adds a cyan glow to the interactive circles 
                when the user clicks on a region, it sets that region as the selected region
                when the user hovers over a region, it sets the regions id as the hovered region and the circle grows
                when the user stops hovering over a region, it resets the hovered region to null
                addds an additional scaling animation to make hovering feel smooth & responsive 
                */}
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

                    {/*
                    if the region is protected: 
                    - a larger circle with a redius of 5 is drawn where only the stroke is visible (not filled) 
                    - stroke is semi-transparent green and has a dashed pattern
                    */}
                    {region.protected && (
                      <circle
                        cx={region.x}
                        cy={region.y}
                        r="5"
                        fill="none"
                        stroke="rgba(16, 185, 129, 0.6)"
                        strokeWidth="0.5"
                        strokeDasharray="2,2"
                      />
                    )}
                  </g>
                ))}
              </svg>

              {/* 
              defines a zoom button container with a dark slate background and cyan border in the map's top-right corner 
              lucide-react's ZoomIn icon is displayed inside the container
              */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <Button size="sm" className="bg-slate-700/80 hover:bg-slate-600 border-cyan-500/30">
                  <ZoomIn className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>

          {/* 
          renders a regional details card where details on the selected region is displayed
          creates a card witha blurry, semi-transparent dark slate border with a cyan border 
          header includes lucide-react Info icon and 'Regional Details' title
          */}
          <div className="space-y-4">
            <Card className="bg-slate-800/50 border-cyan-500/20 backdrop-blur-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <Info className="w-5 h-5 text-cyan-400" />
                <h3 className="text-white">Region Details</h3>
              </div>
              
              {/* 
              initalises a conditional rending depending on if a region is or is not selected

              When a region is selected: 
              - the region info is faded in 
              - the region name is displayed in a cyan colour 
              - the biodiversity badge is displayed in a colour dependent on the biodiversity level
              - the protected area badge is displayed (only if true)
              - user message is displayed prompting them to click on other markers 
              
              When a region has not been selected: 
              - user message is displayed prompting them to click a map marker
              */}
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
                    Click on more map markers to explore different ocean regions and their conservation status.
                  </p>
                </motion.div>
              ) : (
                <p className="text-slate-400 text-sm">
                  Select a region on the map to view details about biodiversity and protection status.
                </p>
              )}
            </Card>

            {/* 
            renders a Legend card explaining the meaning of the colours / symbols used on the map 
            creates a card witha blurry, semi-transparent dark slate border with a cyan border 
            displays the heading 'Legend' and the 3 legend items displaying a coloured or dashed circle and label
            */}
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
