/*
Renders an interactive research platform section with 3 main components: 
1) Dataset Upload - allows users to enter metadata and upload reearch datasets (currently a placeholder for file upload functionality
2) Discussion Forum - displays discussion threads and allows users to post new questions (currently uses mock data, no posting functionality yet)
3) Incident Reporting - provides a form for users to report environmental incidents, with a success message upon submission and displays basic stats when form is not active
*/

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Label } from '../ui/label';
import { 
  FlaskConical, 
  Upload, 
  MessageSquare, 
  AlertCircle,
  Database,
  Send,
  MapPin,
  Camera,
  CheckCircle2
} from 'lucide-react';

/* State variables: 
1) showIncidentForm - controls whether the incident report form is visible or not
2) incidentSubmitted - tracks whether  incident report form has been submitted to show a success message
*/
export function ResearchPlatform() {
  const [showIncidentForm, setShowIncidentForm] = useState(false);
  const [incidentSubmitted, setIncidentSubmitted] = useState(false);

  /*
  prevents browser from refreshing the page when the incident report form is submitted 
  sets incidentSubmitted to true to trigger display of success message 
  uses setTimeout to reset form state after 3 seconds
  */ 
  const handleIncidentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIncidentSubmitted(true);
    setTimeout(() => {
      setShowIncidentForm(false);
      setIncidentSubmitted(false);
    }, 3000);
  };

  /*
  animation - content slides up and fades in when component first mounts
  defines the structure of the ResearchPlatform component, which includes:
  - a header section with an icon, title and description
  - a grid layout with two main cards for dataset upload and discussion forum
  - an incident reporting section with a form that toggles visibility based on user interaction
  */
  return (
    <section id="research" className="py-9 px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center border border-cyan-400/30">
            <FlaskConical className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <h2 className="text-white">Collaborative Research Platform</h2>
            <p className="text-slate-400">Share data, collaborate with peers, and contribute to marine science</p>
          </div>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">


        {/* Upload Datasets: 
        animation - content slides in from left and fades in when it comes into view
        defines a card layout for dataset upload with input fields for title and description, drag-and-drop area for file uploads, and submit button (currently non-functional)
        input fields have placeholder text to guide users on what info to provide
        */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <Card className="bg-gradient-to-br from-[#071821]/90 to-blue-900/20 border-cyan-400/30 p-6 rounded-3x1 h-full">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center border border-cyan-400/30">
                <Database className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="text-white">Upload Datasets</h3>
            </div>
            
            <p className="text-slate-400 text-sm mb-2">
              Share marine life observations, mining zone data, or environmental measurements with the global research community.
            </p>

            <div className="space-y-3">
              <div>
                <Label className="text-slate-300 text-sm">Dataset Title</Label>
                <Input 
                  placeholder="e.g. Deep-sea Species Survey 2025"
                  className="mt-1.5 bg-slate-900/50 border-cyan-500/30 text-white placeholder:text-slate-500"
                />
              </div>

              <div>
                <Label className="text-slate-300 text-sm">Description</Label>
                <Textarea 
                  placeholder="Describe your dataset..."
                  className="mt-1.5 bg-slate-900/50 border-cyan-500/30 text-white placeholder:text-slate-500 resize-none"
                  rows={3}
                />
              </div>

              <div className="border-2 border-dashed border-cyan-500/30 rounded-2xl p-6 text-center hover:border-cyan-500/50 transition-all cursor-pointer">
                <Upload className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                <p className="text-sm text-slate-400">Click to upload or drag and drop</p>
                <p className="text-xs text-slate-500 mt-1">CSV, Excel, or JSON files</p>
              </div>
              <Button className="w-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 hover:bg-cyan-500/30">
                <Upload className="w-4 h-4 mr-2" />
                Upload Dataset
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Discussion Forum: 
        animation - content slides in from right and fades in when it comes into view
        defines a card layout for the discussion forum with a header, description, list of discussion threads (currently mock data)
        renders a list of discussion threads where each thread displays the author, topic, replies and time of last activity
        defines an input area for posting new questions (posting functionality not implemented yet)

        */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <Card className="bg-gradient-to-br from-[#071821]/90 to-purple-900/20 border-purple-400/30 p-6 rounded-3xl h-full">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center border border-purple-400/30">
                <MessageSquare className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-white">Discussion Forum</h3>
            </div> 
            <p className="text-slate-400 text-sm mb-2">
              Collaborate with peers, review research, and engage in scientific discussions.
            </p>

            <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
              {[
                { author: 'Dr. Sarah Chen', topic: 'CCZ Biodiversity Analysis', replies: 12, time: '2h ago' },
                { author: 'Prof. James Wilson', topic: 'Sediment Plume Modeling', replies: 8, time: '5h ago' },
                { author: 'Dr. Maria Santos', topic: 'APEI Protection Strategies', replies: 15, time: '1d ago' },
              ].map((discussion, index) => (

                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-slate-900/50 border border-purple-500/20 p-3 rounded-xl hover:border-purple-500/40 transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-1">
                    <h4 className="text-white text-sm">{discussion.topic}</h4>
                    <Badge className="bg-purple-500/20 text-purple-300 text-xs">
                      {discussion.replies} replies
                    </Badge>
                  </div>
                  <p className="text-slate-400 text-xs">{discussion.author} · {discussion.time}</p>
                </motion.div>
              ))}
            </div>

            <div className="flex gap-2">
              <Input 
                placeholder="Ask a question..."
                className="bg-slate-900/50 border-purple-500/30 text-white placeholder:text-slate-500"
              />
              <Button className="bg-purple-500/20 text-purple-300 border border-purple-400/30 hover:bg-purple-500/30">
                <Send className="w-3.5 h-3.5" />
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>


      {/* Incident Reporting: 
      animation - content slides up and fades in when it comes into view
      defines a card layout for incident reporting with a header, description, button to toggle visibility of incident report form
      when the form is active (showIncidentForm = true), it displays a form with input fields for location, category, severity, description and evidence upload (currently non-functional)
      when form is submitted (incidentSubmitted = true), a success / thank you message is shown which resets after 3 seconds (handled by handleIncidentSubmit function)
      with basic stats about incident reports when form is not active
      */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <Card className="bg-gradient-to-br from-[#071821]/90 to-red-900/20 border-red-400/30 p-6 rounded-3xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center border border-red-400/30">
                <AlertCircle className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <h3 className="text-white">Submit Incident Report</h3>
                <p className="text-slate-400 text-sm">Report pollution, illegal mining, or environmental concerns</p>
              </div>
            </div>
            
            {!showIncidentForm && (
              <Button 
                onClick={() => setShowIncidentForm(true)}
                className="bg-red-500/20 text-red-300 border border-red-400/30 hover:bg-red-500/30"
              >
                <AlertCircle className="w-4 h-4 mr-2" />
                Report Incident
              </Button>
            )}
          </div>

          {showIncidentForm && (
            <motion.form
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              onSubmit={handleIncidentSubmit}
              className="space-y-4 mt-4"
            >
              {incidentSubmitted ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center justify-center py-8"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4 border border-emerald-400/30">
                    <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h4 className="text-white mb-2">Report Submitted Successfully</h4>
                  <p className="text-slate-400 text-sm text-center">
                    Thank you for your contribution. Our team will review your report shortly.
                  </p>
                </motion.div>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Label className="text-slate-300 text-sm">Location</Label>
                    <div className="relative mt-1.5">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-red-400" />
                      <Input 
                        placeholder="Enter coordinates or region name"
                        className="pl-10 bg-slate-900/50 border-red-500/30 text-white placeholder:text-slate-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-slate-300 text-sm">Incident Category</Label>
                    <select 
                      className="w-full mt-1.5 bg-slate-900/50 border border-red-500/30 text-white rounded-lg px-3 py-2 text-sm"
                      required
                    >
                      <option value="">Select category</option>
                      <option value="pollution">Pollution</option>
                      <option value="illegal-mining">Illegal Mining</option>
                      <option value="habitat-damage">Habitat Damage</option>
                      <option value="species-threat">Species Threat</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <Label className="text-slate-300 text-sm">Severity</Label>
                    <select 
                      className="w-full mt-1.5 bg-slate-900/50 border border-red-500/30 text-white rounded-lg px-3 py-2 text-sm"
                      required
                    >
                      <option value="">Select severity</option>
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="critical">Critical</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <Label className="text-slate-300 text-">Description</Label>
                    <Textarea 
                      placeholder="Provide detailed information about the incident..."
                      className="mt-1.5 bg-slate-900/50 border-red-500/30 text-white placeholder:text-slate-500 resize-none"
                      rows={4}
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label className="text-slate-300 text-sm">Upload Evidence (Optional)</Label>
                    <div className="mt-1.5 border-2 border-dashed border-red-500/30 rounded-xl p-4 text-center hover:border-red-500/50 transition-all cursor-pointer">
                      <Camera className="w-6 h-6 text-red-400 mx-auto mb-2" />
                      <p className="text-sm text-slate-400">Upload photos or videos</p>
                    </div>
                  </div>

                  <div className="md:col-span-2 flex gap-2">
                    <Button 
                      type="button"
                      variant="outline"
                      onClick={() => setShowIncidentForm(false)}
                      className="flex-1 border-slate-600 text-slate-400 hover:bg-slate-800"
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit"
                      className="flex-1 bg-red-500/20 text-red-300 border border-red-400/30 hover:bg-red-500/30"
                    >
                      Submit Report
                    </Button>
                  </div>
                </div>
              )}
            </motion.form>
          )}

          {!showIncidentForm && (
            <div className="grid md:grid-cols-3 gap-4 mt-4">
              {[
                { label: 'Reports This Month', value: '24', change: '+8%' },
                { label: 'Under Investigation', value: '12', change: '-3%' },
                { label: 'Resolved', value: '89', change: '+15%' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-slate-900/50 border border-red-500/20 p-4 rounded-xl"
                >
                  <p className="text-slate-400 text-sm mb-1">{stat.label}</p>
                  <div className="flex items-end justify-between">
                    <span className="text-white">{stat.value}</span>
                    <span className="text-xs text-red-300">{stat.change}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </Card>
      </motion.div>
    </section>
  );
}
