import { useState } from 'react';
import { motion } from 'framer-motion';
import './ResearchHub.css';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
// import { Textarea } from './ui/textarea';
import { Upload, Users, MessageSquare, Database, Search } from 'lucide-react';
// import { Badge } from './ui/badge';
import './ResearchHub.css';

export function ResearchHub() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <section className="research-section">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="research-header"
        >
          <div className="badge">
            <Users />
            <span>Collaborative Research</span>
          </div>
          <h2>Join the Global Research Community</h2>
          <p>Share datasets, collaborate with scientists, and contribute to ocean conservation</p>
        </motion.div>

        <Tabs defaultValue="datasets" className="w-full">
          <TabsList className="tabs-list">
            <TabsTrigger value="datasets" className="tab-trigger">
              <Database />
              Datasets
            </TabsTrigger>
            <TabsTrigger value="discussions" className="tab-trigger">
              <MessageSquare />
              Discussions
            </TabsTrigger>
            <TabsTrigger value="upload" className="tab-trigger">
              <Upload />
              Upload
            </TabsTrigger>
          </TabsList>

          <TabsContent value="datasets">
            <Card className="card">
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                <div className="input-wrapper">
                  <Search />
                  <Input
                    placeholder="Search datasets..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button className="button">Filter</Button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {/* Map over datasets */}
              </div>
            </Card>
          </TabsContent>

          {/* Discussions Tab */}
          <TabsContent value="discussions">
            <Card className="card">
              {/* Map over discussions */}
            </Card>
          </TabsContent>

          {/* Upload Tab */}
          <TabsContent value="upload">
            <Card className="card">
              <div className="upload-area">
                <Upload />
                <p>Click to upload or drag and drop</p>
                <p>CSV, JSON, or Excel (max 50MB)</p>
              </div>
              <Button className="button">Upload Dataset</Button>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
