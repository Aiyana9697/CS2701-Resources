/*
datasets view component for admin dashboard 
displays a list of datasets uploaded by users including metadata (uploader name, upload date, file size, verification status) 
includes search bar to filter datasets by name or uploader
includes action buttons for each dataset to allow admins to flag or delete inappropriate content
*/
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Search, Trash2, Flag } from 'lucide-react';

// mock data for datasets (structured for future replacement with API data)
const datasets = [
  { id: 1, name: 'Pacific Ocean Temperature Data', uploader: 'Dr. Sarah Ocean', date: '2024-11-20', size: '2.4 GB', status: 'Verified' },
  { id: 2, name: 'Marine Biodiversity Survey 2024', uploader: 'John Maritime', date: '2024-11-15', size: '1.8 GB', status: 'Pending Review' },
  { id: 3, name: 'Coral Reef Health Assessment', uploader: 'Emma Waters', date: '2024-11-10', size: '890 MB', status: 'Flagged' },
];

/*
state variable 'searchQuery' is used to keep track of current value of search input to allow admins to filter displayed datasets
handleDelete / handleFlag functions defined to handle respective actions when admin clicks on delete or flag buttons for a dataset (currently logs the action to console but will be expanded to include delete/flag logic)
*/
export function DatasetsView() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleDelete = (id: number) => {
    console.log('Deleting dataset with ID:', id);
    // Implement delete logic
  };

  const handleFlag = (id: number) => {
    console.log('Flagging dataset with ID:', id);
    // Implement flag logic
  };

  /*
  animation - content slides up and fades in when component first mounts
  defines a search bar at the top of the view for filtering datasets by name or uploader
  searchQuery state updates as admin types in the search input & datasets are filtered based on if dataset name or uploader is included (case-insensitive)
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
            placeholder="Search datasets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-slate-950/50 border-cyan-400/30 text-white placeholder:text-slate-400"
          />
        </div>
      </div>

      {/*
      datasets is mapped over to render a card for each dataset that matches search query, displaying its name, uploader, date, size, verification status
      dynamic styling is applied to the verification status badge based on whether the dataset is verified, pending review or flagged 
      action buttons for flagging or deleting a dataset are included on each card, with click handlers to manage those actions
      */}
      <div className="space-y-4">
        {datasets.map((dataset) => (
          <div
            key={dataset.id}
            className="bg-gradient-to-br from-slate-900/90 to-cyan-900/30 rounded-2xl p-6 border border-cyan-500/30"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="text-white mb-2">{dataset.name}</h4>
                <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                  <span>Uploader: {dataset.uploader}</span>
                  <span>Date: {dataset.date}</span>
                  <span>Size: {dataset.size}</span>
                </div>
                <div className="mt-3">
                  <span className={`px-3 py-1 rounded-full text-xs ${
                    dataset.status === 'Verified' 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                      : dataset.status === 'Flagged'
                      ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                      : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                  }`}>
                    {dataset.status}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleFlag(dataset.id)}
                  className="text-yellow-400 hover:bg-yellow-500/10"
                >
                  <Flag className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleDelete(dataset.id)}
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
