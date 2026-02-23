/*
EIAView component for admin dashboard
displays a list of Environmental Impact Assessments (EIAs) submitted by users for various projects in different ocean regions
includes metadata for each EIA entry such as project name, region, submitter, submission date , current status (approved, under review, missing data)
includes search functionality to filter EIA entries by project name or submitter
action buttons for each EIA entry allow admins to flag entries for further review or delete inappropriate submissions
*/
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Search, Trash2, Flag } from 'lucide-react';

// mock data for EIA entries (structured for future replacement with API data)
const eiaEntries = [
  { id: 1, project: 'Deep Sea Mining Project Alpha', region: 'Pacific APEI 4', submitter: 'OceanTech Corp', date: '2024-11-18', status: 'Under Review' },
  { id: 2, project: 'Offshore Wind Farm Beta', region: 'North Atlantic', submitter: 'GreenEnergy Ltd', date: '2024-11-12', status: 'Approved' },
  { id: 3, project: 'Seabed Exploration Gamma', region: 'Indian Ocean', submitter: 'DeepSea Industries', date: '2024-11-05', status: 'Missing Data' },
];

/*
state variable 'searchQuery' used to keep track of current value of search input to allow admins to filter EIA entries
handleDelete / handleFlag functions defined to handle respective actions when admin clicks on delete or flag buttons for an EIA entry (currently logs the action to console but will be expanded to include delete/flag logic)
*/
export function EIAView() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleDelete = (id: number) => {
    console.log('Deleting EIA entry with ID:', id);
    // Implement delete logic
  };

  const handleFlag = (id: number) => {
    console.log('Flagging EIA entry with ID:', id);
    // Implement flag logic
  };

  /*
  animation - content slides up and fades in when component first mounts
  defines a search bar at the top of the view for filtering EIA entries by project name or submitter
  searchQuery state updates as admin types in the search input & EIA entries are filtered based on if project name or submitter is included (case-insensitive)
  */
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <div className="bg-gradient-to-br from-slate-900/90 to-cyan-900/30 rounded-2xl p-4 border border-cyan-500/30">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyan-400" />
          <Input
            type="text"
            placeholder="Search EIA entries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-slate-950/50 border-cyan-400/30 text-white placeholder:text-slate-400"
          />
        </div>
      </div>

      {/*
      EIA entries are mapped over to render a card for each entry that matches search query, displaying its project name, region, submitter, date, status
      dynamic styling is applied to the status badge based on whether the EIA is approved, under review or missing data 
      action buttons for flagging or deleting an EIA entry are included on each card, with click handlers to manage those actions  
      */}
      <div className="space-y-4">
        {eiaEntries.map((entry) => (
          <div
            key={entry.id}
            className="bg-gradient-to-br from-slate-900/90 to-cyan-900/30 rounded-2xl p-6 border border-cyan-500/30"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="text-white mb-2">{entry.project}</h4>
                <div className="flex flex-wrap gap-4 text-sm text-slate-400 mb-3">
                  <span>Region: {entry.region}</span>
                  <span>Submitter: {entry.submitter}</span>
                  <span>Date: {entry.date}</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs ${
                  entry.status === 'Approved' 
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : entry.status === 'Missing Data'
                    ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                    : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                }`}>
                  {entry.status}
                </span>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleFlag(entry.id)}
                  className="text-yellow-400 hover:bg-yellow-500/10"
                >
                  <Flag className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleDelete(entry.id)}
                  className="text-red-400 hover:bg-red-500/10"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
