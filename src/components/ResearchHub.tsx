/*
React component for rendering a research hub section that includes 3 main features: 
- Datasets - allows users to browse, search and download a list of datasets
- Discussions - Displays current research discussion threads with replies / timestamps
- Upload - Form where users can upload new datasets with name, description and file
*/
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Upload, Users, MessageSquare, Database, Search } from 'lucide-react';
import { Badge } from './ui/badge';

/* defines an array of discussion thread objects with id, author, role, title, number of replies and timestamp */
const discussions = [
  {
    id: 1,
    author: 'Dr. Sarah Chen',
    role: 'Marine Biologist',
    title: 'Impact of mining on hydrothermal vent ecosystems',
    replies: 23,
    timestamp: '2 hours ago',
  },
  {
    id: 2,
    author: 'Prof. James Wilson',
    role: 'Ocean Policy Expert',
    title: 'Regulatory frameworks for sustainable deep-sea exploration',
    replies: 15,
    timestamp: '5 hours ago',
  },
  {
    id: 3,
    author: 'Dr. Maya Patel',
    role: 'Environmental Scientist',
    title: 'Latest findings on APEI effectiveness',
    replies: 31,
    timestamp: '1 day ago',
  },
];

/* defines an array of dataset objects with name, type, size and number of downloads */
const datasets = [
  {
    name: 'Pacific Biodiversity Survey 2024',
    type: 'CSV',
    size: '2.4 MB',
    downloads: 234,
    compliance: "[ UK GDPR ✅ ]"
  },
  {
    name: 'Sediment Plume Analysis',
    type: 'JSON',
    size: '1.8 MB',
    downloads: 156,
    compliance: "[ UK GDPR ✅ ]"
  },
  {
    name: 'Deep-Sea Species Database',
    type: 'Excel',
    size: '5.2 MB',
    downloads: 412,
    compliance: "[ UK GDPR ❌ ]"
  },
];



/*
defines a local state where: 
- searchQuery stores what the user inputs into the dataset search bar
- setSearchQuery function is used to update the searchQuery state
*/
export function ResearchHub() {
  // search bar state
  const [searchQuery, setSearchQuery] = useState('');

  const [filterByDownloads, setFilterByDownloads] = useState(false);
  // const [filterByNew, setFilterByNew] = useState(false);
  const [TempFilterByDownloads, setTempFilterByDownloads] = useState(false);

  // controls whether the checkbox popup window is open or closed
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // stores which checkbox options were selected
  const [selected, setSelected] = useState<string[]>([]);

  // handles checking and unchecking options in the popup
  const toggleOption = (value: string) => {
    setSelected(prev =>
      prev.includes(value)
        ? prev.filter(v => v !== value)   // remove if already selected
        : [...prev, value]                // add if not selected
    );
  };



  /* 
  Creates a full-width section with top-bottom and side padding with dark slate background
  Centers the content and limits max width to keep content from stretching too wide 
  animation - fades in and slides up the entire section when it appears
  viewport - animates the first time the section comes into view, not every scroll
  */
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          {/* 
          Defines the Collaborative Research label that appears above the main title 
          contains a lucide-react Users icon and text is light cyan in colour 
          the label is contained within a rounded capsule shape with a light cyan border and darker background
          defines the main white title and subtitle below it
          */}
          <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/30 rounded-full px-4 py-2 mb-4">
            <Users className="w-4 h-4 text-teal-400" />
            <span className="text-teal-300 text-sm">Collaborative Research</span>
          </div>
          <h2 className="text-white mb-4">Join the Global Research Community</h2>
          <p className="text-slate-400 text-xl max-w-3xl mx-auto">
            Share datasets, collaborate with scientists, and contribute to ocean conservation
          </p>
        </motion.div>

        {/* 
        calls upon the Tabs component in tabs.tsx to create tabbed interface with 3 tabs for Datasets, Discussions and Upload
        default tab = Datasets so when page first loads, Datasets tab is shown
        TabsList defines the tab buttons container with grid layout, max width, centered horizontally, dark slate background, cyan border with rounded corners
        TabsTrigger creates a labeled button for each tab with lucide-react icon, padding, font size / weight, light slate text that changes to white when tab is active
        */}
        <Tabs defaultValue="datasets" className="w-full">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 mb-8 bg-slate-800/50 border border-cyan-500/20 rounded-lg overflow-hidden">
            <TabsTrigger
              value="datasets"
              className="flex items-center justify-center gap-2 h-9 px-3 text-sm font-medium text-slate-300 data-[state=active]:bg-cyan-500 data-[state=active]:text-white"
            >
              <Database className="w-3.5 h-3.5" />
              Datasets
            </TabsTrigger>

            <TabsTrigger
              value="discussions"
              className="flex items-center justify-center gap-2 h-9 px-3 text-sm font-medium text-slate-300 data-[state=active]:bg-cyan-500 data-[state=active]:text-white"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              Discussions
            </TabsTrigger>

            <TabsTrigger
              value="upload"
              className="flex items-center justify-center gap-2 h-9 px-3 text-sm font-medium text-slate-300 data-[state=active]:bg-cyan-500 data-[state=active]:text-white"
            >
              <Upload className="w-3.5 h-3.5" />
              Upload
            </TabsTrigger>
          </TabsList>

          {/* 
          defines the content for each tab by wrapping it in TabsContent component that matches the tab's value
          card container has semi-transparent dark slate background, cyan border and backdrop blur
          organises the search input and filter button side by side with a gap between them, bottom margin and padding

          search input: 
          - search input has a lucide-react search icon inside, placeholder text, background, border and white text
          - when the user types in the search input, the setSearchQuery function updates the searchQuery state

          filter button:
          - button has cyan background that darkens on hover and white text
          */}
          <TabsContent value="datasets">
            <Card className="bg-slate-800/50 border-cyan-500/20 backdrop-blur-sm p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    placeholder="Search datasets..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-slate-900/50 border-slate-700 text-white"
                  />
                </div>
                {/* open the popup when clicking Filter */}
                <Button
                  className="bg-cyan-500 hover:bg-cyan-600 text-white"
                  onClick={() => {
                    setTempFilterByDownloads(filterByDownloads);
                    setIsFilterOpen(true);
                  }}
                >
                  Filter
                </Button>
              </div>

              

              {/* 
              creates vertical list of dataset cards with spacing between them by mapping through the datasets array
              each dataset card starts slghtly left then fades into center when it appears, with a staggered effect based on items index
              each dataset card is rendered with a dark slate background that intensifies on hover, cyan border, padding

              on the left side of the card: 
              - dataset name is displayed in white with margin below
              - dataset type is shown within a badge with semi-transparent dark slate background and light slate text
              - dataset size and number of downloads are shown beside the badge in light slate text

              on the right side of the card: 
              - download button is styled with a cyan border, cyan text and dark background that lightens slightly on hover
              */}
              <div className="space-y-4">
                {(filterByDownloads
                ? datasets.sort((a, b) => b.downloads - a.downloads)   // sort only when ON
                : datasets  
                ).map((dataset, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="bg-slate-900/50 border-slate-700 hover:border-cyan-500/50 transition-all p-4">
                      <div className="flex items-center justify-between">
                        {/*left side */}
                        <div className="flex-1 flex flex-col">
                          <h4 className="text-white mb-1">{dataset.name}</h4>
                          <div className="flex items-center gap-3 text-sm text-slate-400">
                            <Badge variant="outline" className="bg-slate-700/50 text-slate-300">
                              {dataset.type}
                            </Badge>
                            <span>{dataset.size}</span>
                            <span>• {dataset.downloads} downloads</span>
                          </div>
                        </div>
                        {/*right side */}
                        <div className="flex flex-col items-center">

                          <p className="mb-2 text-xs text-cyan-300">
                            {dataset.compliance ?? "UK GDPR"}
                          </p>

                          <Button size="sm" variant="outline" className=" border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10">
                            Download
                          </Button>

                        </div >

                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* 
          section is displayed when the user select the 'Discussions' tab
          each dicussion card is styled with semi-transparent dark slate background that intensifies on hover, cyan border, padding
          the discussions array is mapped through to render each discussion card 
          animation - each card fades in and slides in from the left when it appears, with a staggered effect based on index

          on each discussion card:
          - discussion title is displayed in white with margin below
          - author name is shown in cyan with role beside it in light slate text
          - number of replies is shown within a badge with semi-transparent cyan background and text on the right side of the card 
          - timestamp is displayed in light slate text at the bottom

          at the bottom of the section, a full-width button is defined that allows users to start a new discussion
          */}
          <TabsContent value="discussions">
            <Card className="bg-slate-800/50 border-cyan-500/20 backdrop-blur-sm p-6">
              <div className="space-y-4">
                {discussions.map((discussion, index) => (
                  <motion.div
                    key={discussion.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="bg-slate-900/50 border-slate-700 hover:border-cyan-500/50 transition-all p-4 cursor-pointer">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="text-white mb-1">{discussion.title}</h4>
                          <p className="text-sm text-slate-400">
                            by <span className="text-cyan-400">{discussion.author}</span> • {discussion.role}
                          </p>
                        </div>
                        <Button size="sm" variant="outline" className=" border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10">
                            {discussion.replies} replies
                        </Button>
                      </div>
                      <p className="text-sm text-slate-500">{discussion.timestamp}</p>

                      <Button size="default" variant="outline" className=" border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10">
                        Reply
                      </Button>

                    </Card>
                  </motion.div>
                ))}
              </div>

              <Button className="w-full mt-6 bg-cyan-500 hover:bg-cyan-600 text-white">
                Start New Discussion
              </Button>
            </Card>
          </TabsContent>

          {/* 
          section is displayed when the user select the 'Upload' tab
          each upload card is styled with semi-transparent dark slate background that intensifies on hover, cyan border, padding

          the upload form contains:
          - input for dataset name with label, placeholder text, background, border and white text
          - textarea for dataset description with label, placeholder text, number of rows, background, border and white text
          - file upload area with dashed border, rounded corners, padding, centered text and icon, hover effect to change border colour
          - full-width button to submit the upload with cyan background that darkens on hover and white text
          */}
          <TabsContent value="upload">
            <Card className="bg-slate-800/50 border-cyan-500/20 backdrop-blur-sm p-6">
              <div className="space-y-6">
                <div>
                  <label className="text-white mb-2 block">Dataset Name</label>
                  <Input
                    placeholder="Enter dataset name"
                    className="bg-slate-900/50 border-slate-700 text-white"
                  />
                </div>

                <div>
                  <label className="text-white mb-2 block">Description</label>
                  <Textarea
                    placeholder="Describe your dataset and methodology..."
                    rows={4}
                    className="bg-slate-900/50 border-slate-700 text-white"
                  />
                </div>

                <div>
                  <label className="text-white mb-2 block">Upload File</label>
                  <div className="border-2 border-dashed border-slate-700 rounded-lg p-8 text-center hover:border-cyan-500/50 transition-colors cursor-pointer">
                    <Upload className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                    <p className="text-slate-300 mb-1">Click to upload or drag and drop</p>
                    <p className="text-slate-500 text-sm">CSV, JSON, or Excel (max 50MB)</p>
                  </div>
                </div>

                <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white">
                  Upload Dataset
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* 
      Popup overlay that appears on top of the page.
      It only gets rendered when isFilterOpen === true.
    */}
    {isFilterOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        
        {/* Popup card container */}
        <div className="bg-slate-900 border border-cyan-500/30 rounded-lg p-6 w-full max-w-sm">

          {/* Title of the popup */}
          <h3 className="text-white text-lg mb-3">Filter options</h3>

          {/* Checkbox list */}
          <div className="space-y-2 mb-4">

            Loop through your checkbox items
            <div>
              <label className="flex items-center gap-2 text-slate-300">

                {/* 
                  Checkbox input. 
                  "checked" shows whether this option is in the selected array.
                */}
                <input
                  type="checkbox"
                  checked={filterByDownloads}      
                  onChange={(e) => setFilterByDownloads(e.target.checked)}   // call toggle when clicked
                  className="h-4 w-4"
                />

                {/* Name of the checkbox option */}
                By Downloads (most popular)
              </label>
            </div>
            <div>
              <label className="flex items-center gap-2 text-slate-300">

                {/* 
                  Checkbox input. 
                  "checked" shows whether this option is in the selected array.
                */}
                <input
                  type="checkbox"
                  checked ={TempFilterByDownloads} 
                  onChange={(e) => setTempFilterByDownloads(e.target.checked)}   // call toggle when clicked
                  className="h-4 w-4"
                />

                {/* Name of the checkbox option */}
                new
              </label>
            </div>
          </div>

            {/* Buttons at the bottom of the popup */}
            <div className="flex justify-end gap-2">
              
              {/* Close popup without applying changes */}
              <Button
                variant="outline"
                className="border border-slate-600 text-slate-300"
                onClick={() => setIsFilterOpen(false)}
              >
                Cancel
              </Button>

              {/* Apply selections + close popup (you can add filtering logic later) */}
              <Button
                className="bg-cyan-500 hover:bg-cyan-600 text-white"
                onClick={() => {
                setFilterByDownloads(TempFilterByDownloads);
                setIsFilterOpen(false);
                }}
              >
                Apply
              </Button>

            </div>
          </div>
        </div>
      )}


    </section>
  );
}
