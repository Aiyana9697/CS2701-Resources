import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Upload, Users, MessageSquare, Database, Search } from 'lucide-react';
import { Badge } from './ui/badge';

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

const datasets = [
  {
    name: 'Pacific Biodiversity Survey 2024',
    type: 'CSV',
    size: '2.4 MB',
    downloads: 234,
  },
  {
    name: 'Sediment Plume Analysis',
    type: 'JSON',
    size: '1.8 MB',
    downloads: 156,
  },
  {
    name: 'Deep-Sea Species Database',
    type: 'Excel',
    size: '5.2 MB',
    downloads: 412,
  },
];

export function ResearchHub() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/30 rounded-full px-4 py-2 mb-4">
            <Users className="w-4 h-4 text-teal-400" />
            <span className="text-teal-300 text-sm">Collaborative Research</span>
          </div>
          <h2 className="text-white mb-4">Join the Global Research Community</h2>
          <p className="text-slate-400 text-xl max-w-3xl mx-auto">
            Share datasets, collaborate with scientists, and contribute to ocean conservation
          </p>
        </motion.div>

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
                <Button className="bg-cyan-500 hover:bg-cyan-600 text-white">
                  Filter
                </Button>
              </div>

              <div className="space-y-4">
                {datasets.map((dataset, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="bg-slate-900/50 border-slate-700 hover:border-cyan-500/50 transition-all p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="text-white mb-1">{dataset.name}</h4>
                          <div className="flex items-center gap-3 text-sm text-slate-400">
                            <Badge variant="outline" className="bg-slate-700/50 text-slate-300">
                              {dataset.type}
                            </Badge>
                            <span>{dataset.size}</span>
                            <span>• {dataset.downloads} downloads</span>
                          </div>
                        </div>
                        <Button size="sm" variant="outline" className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10">
                          Download
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </Card>
          </TabsContent>

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
                        <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30">
                          {discussion.replies} replies
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-500">{discussion.timestamp}</p>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <Button className="w-full mt-6 bg-cyan-500 hover:bg-cyan-600 text-white">
                Start New Discussion
              </Button>
            </Card>
          </TabsContent>

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
    </section>
  );
}
