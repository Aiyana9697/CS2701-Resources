/*
ImpactAnalysis section for the homepage
displays a list of environemental / impact reports with their title, who uploaded it, and an impact level (Green/Yellow/Red) with corresponding color coding
includes a search bar to filter reports by title
*/
import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp} from 'lucide-react';

// mock data for reports - (structured for future replacement with API data)
type ImpactLevel = "Green" | "Yellow" | "Red"; 
const reportsMock: {id: number,title: string, impact:ImpactLevel, uploadedBy:string} []= [
  { id: 1, title: "EIA - Pacific Region", impact: "Green", uploadedBy: "Norway" },
  { id: 2, title: "REMP - Atlantic Zone", impact: "Yellow", uploadedBy: "Japan" },
  { id: 3, title: "APEI - Deep Ridge", impact: "Red", uploadedBy: "USA" },
];

// maps each impact level to a specific color for visual representation in the UI
const impactColors: Record<ImpactLevel, string> = {
  Green: "#10b981", 
  Yellow: "#f59e0b",
  Red: "#ef4444", 
};

/*
state management: 
- 'reports' state holds the list of impact reports (initialised with mock data for now)
- 'search' state holds the current search query entered by the user to filter reports by title
*/
export function ImpactAnalysis() {
  const [reports] = useState(reportsMock);  
  const [search, setSearch] = useState(""); 

  /*
  defines the structure of the ImpactAnalysis component, which includes:
- a title for the section
- a search bar with an icon to allow users to filter reports by title (updates 'search' state on input change)
- a grid layout that displays the list of reports, which is filtered based on the current search query (case-insensitive match on report titles)
- each report card displays the report title, who uploaded it, and a colored badge indicating the impact level (using the 'impactColors' mapping for background color)
  */
  return (
     <section id="impact" className="py-9 px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-8"
      >
       <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center border border-cyan-400/30">
            <TrendingUp className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <h2 className="text-white">Impact Analysis</h2>
            <p className="text-slate-400">Track environmental impact assessments and protected areas</p>
          </div>
        </div>
      </motion.div>
      
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {reports 
        .filter((r) => r.title.toLowerCase().includes(search.toLowerCase()))
        .map((r) => (
          <div
            key={r.id} 
            className="p-4 bg-slate-900 border border-slate-700 rounded-xl shadow-md"
          >
            <h4 className="font-semibold">{r.title}</h4>
            <p className="text-sm text-slate-400">Uploaded by: {r.uploadedBy}</p>
            <span
              className="mt-3 inline-block px-2 py-1 text-xs rounded-md text-black"
              style={{ background: impactColors[r.impact] }}
            >
              {r.impact}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}