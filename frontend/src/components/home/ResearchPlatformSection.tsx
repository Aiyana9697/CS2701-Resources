/*
Renders an interactive research platform section with 3 main components:
1) Dataset Upload - lets authenticated users submit datasets to the backend
2) Discussion Forum - currently uses mock threads because no discussion API exists yet
3) Incident Reporting - submits incident reports and shows live incident stats
*/

import { useEffect, useMemo, useState } from 'react';
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
  Download,
  FileText,
  Send,
  MapPin,
  Camera,
  CheckCircle2,
  Search
} from 'lucide-react';
import {
  API_ROOT_URL,
  authService,
  datasetService,
  handleApiError,
  incidentService,
  regionService,
} from '../../services';
import type { Dataset, IncidentCategory, IncidentReport, Region } from '../../types/api';

type DiscussionThread = {
  author: string;
  topic: string;
  replies: number;
  time: string;
};

const discussionThreads: DiscussionThread[] = [
  { author: 'Dr. Sarah Chen', topic: 'CCZ Biodiversity Analysis', replies: 12, time: '2h ago' },
  { author: 'Prof. James Wilson', topic: 'Sediment Plume Modeling', replies: 8, time: '5h ago' },
  { author: 'Dr. Maria Santos', topic: 'APEI Protection Strategies', replies: 15, time: '1d ago' },
];

const incidentCategoryOptions: { value: IncidentCategory; label: string }[] = [
  { value: 'POLLUTION', label: 'Pollution' },
  { value: 'ILLEGAL_FISHING', label: 'Illegal Mining / Fishing' },
  { value: 'HABITAT_DESTRUCTION', label: 'Habitat Damage' },
  { value: 'SPECIES_THREAT', label: 'Species Threat' },
  { value: 'OTHER', label: 'Other' },
];

/*
State variables:
1) showIncidentForm - controls whether the incident report form is visible or not
2) incidentSubmitted - tracks whether the incident report form has been submitted
*/
export function ResearchPlatform() {
  const currentUser = authService.getCurrentUser();

  const [showIncidentForm, setShowIncidentForm] = useState(false);
  const [incidentSubmitted, setIncidentSubmitted] = useState(false);

  const [regions, setRegions] = useState<Region[]>([]);
  const [recentDatasets, setRecentDatasets] = useState<Dataset[]>([]);
  const [incidents, setIncidents] = useState<IncidentReport[]>([]);

  const [sectionError, setSectionError] = useState('');
  const [uploadMessage, setUploadMessage] = useState('');
  const [incidentError, setIncidentError] = useState('');

  const [datasetTitle, setDatasetTitle] = useState('');
  const [datasetDescription, setDatasetDescription] = useState('');
  const [datasetSearch, setDatasetSearch] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploadingDataset, setIsUploadingDataset] = useState(false);
  const [isLoadingDatasets, setIsLoadingDatasets] = useState(false);
  const [downloadingDatasetId, setDownloadingDatasetId] = useState<number | null>(null);
  const [datasetLibraryMessage, setDatasetLibraryMessage] = useState('');

  const [incidentLocation, setIncidentLocation] = useState('');
  const [incidentTitle, setIncidentTitle] = useState('');
  const [incidentCategory, setIncidentCategory] = useState<IncidentCategory | ''>('');
  const [incidentSeverity, setIncidentSeverity] = useState('');
  const [incidentDescription, setIncidentDescription] = useState('');
  const [isSubmittingIncident, setIsSubmittingIncident] = useState(false);

  const loadResearchData = async (searchTerm = datasetSearch) => {
    try {
      setSectionError('');
      setIsLoadingDatasets(true);

      const [regionsResponse, datasetsResponse, incidentsResponse] = await Promise.all([
        regionService.getRegions(),
        datasetService.getDatasets({
          search: searchTerm.trim() || undefined,
          page: 0,
          size: 8,
          sortBy: 'createdAt',
          sortOrder: 'DESC',
        }),
        incidentService.getIncidents(),
      ]);

      setRegions(regionsResponse.data ?? []);
      setRecentDatasets(datasetsResponse.data?.content ?? []);
      setIncidents(incidentsResponse.data ?? []);
    } catch (error) {
      setSectionError(handleApiError(error));
    } finally {
      setIsLoadingDatasets(false);
    }
  };

  useEffect(() => {
    void loadResearchData();
  }, []);

  const resolvedIncidents = useMemo(
    () => incidents.filter((incident) => incident.status === 'APPROVED' || incident.status === 'REJECTED').length,
    [incidents]
  );

  const underInvestigationCount = useMemo(
    () => incidents.filter((incident) => incident.status === 'SUBMITTED' || incident.status === 'UNDER_REVIEW').length,
    [incidents]
  );

  const reportsThisMonthCount = useMemo(() => {
    const now = new Date();
    return incidents.filter((incident) => {
      const dateValue = incident.createdAt ?? incident.submittedAt;
      if (!dateValue) {
        return false;
      }

      const createdDate = new Date(dateValue);
      return createdDate.getMonth() === now.getMonth() && createdDate.getFullYear() === now.getFullYear();
    }).length;
  }, [incidents]);

  const handleDatasetUpload = async () => {
    const fallbackRegion = regions[0];

    if (!currentUser?.id) {
      setUploadMessage('You need to be logged in to upload a dataset.');
      return;
    }

    if (!datasetTitle.trim() || !datasetDescription.trim()) {
      setUploadMessage('Please add a dataset title and description.');
      return;
    }

    if (!selectedFile) {
      setUploadMessage('Please choose a dataset file first.');
      return;
    }

    if (!fallbackRegion) {
      setUploadMessage('No regions are available yet. Please try again later.');
      return;
    }

    try {
      setIsUploadingDataset(true);
      setUploadMessage('');

      await datasetService.uploadDataset({
        name: datasetTitle.trim(),
        description: datasetDescription.trim(),
        category: 'RESEARCH',
        regionId: fallbackRegion.id,
        fileUrl: `/uploads/${selectedFile.name}`,
        fileSize: selectedFile.size,
        speciesIds: [],
      });

      setDatasetTitle('');
      setDatasetDescription('');
      setSelectedFile(null);
      setUploadMessage('Dataset uploaded successfully.');
      await loadResearchData();
    } catch (error) {
      setUploadMessage(handleApiError(error));
    } finally {
      setIsUploadingDataset(false);
    }
  };

  const handleDatasetSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    await loadResearchData(datasetSearch);
  };

  const formatFileSize = (bytes: number) => {
    if (!bytes) {
      return 'Unknown size';
    }

    const units = ['B', 'KB', 'MB', 'GB'];
    let size = bytes;
    let unitIndex = 0;

    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex += 1;
    }

    return `${size.toFixed(size >= 10 || unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`;
  };

  const handleDatasetDownload = async (dataset: Dataset) => {
    try {
      setDownloadingDatasetId(dataset.id);
      setDatasetLibraryMessage('');
      await datasetService.downloadDataset(dataset.id);

      if (dataset.fileUrl) {
        const fileUrl = dataset.fileUrl.startsWith('http')
          ? dataset.fileUrl
          : `${API_ROOT_URL}${dataset.fileUrl}`;
        window.open(fileUrl, '_blank', 'noopener,noreferrer');
      }

      setDatasetLibraryMessage(`Download started for ${dataset.name}.`);
      await loadResearchData(datasetSearch);
    } catch (error) {
      setDatasetLibraryMessage(handleApiError(error));
    } finally {
      setDownloadingDatasetId(null);
    }
  };

  /*
  Prevents browser refresh when the incident report form is submitted.
  Submits the report to the backend and briefly shows a success message.
  */
  const handleIncidentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const fallbackRegion = regions[0];
    const matchedRegion = regions.find(
      (region) => region.name.toLowerCase() === incidentLocation.trim().toLowerCase()
    );
    const selectedRegion = matchedRegion ?? fallbackRegion;

    if (!currentUser?.id) {
      setIncidentError('You need to be logged in to submit an incident report.');
      return;
    }

    if (!incidentTitle.trim() || !incidentCategory || !incidentDescription.trim()) {
      setIncidentError('Please complete the incident title, category, and description.');
      return;
    }

    if (!selectedRegion) {
      setIncidentError('No regions are available yet. Please try again later.');
      return;
    }

    try {
      setIsSubmittingIncident(true);
      setIncidentError('');

      await incidentService.submitIncident({
        userId: currentUser.id,
        contractorId: 1,
        regionId: selectedRegion.id,
        regionName: selectedRegion.name,
        reportType: incidentCategory,
        title: incidentTitle.trim(),
        summaryText: incidentDescription.trim(),
      });

      setIncidentSubmitted(true);
      setIncidentLocation('');
      setIncidentTitle('');
      setIncidentCategory('');
      setIncidentSeverity('');
      setIncidentDescription('');
      await loadResearchData();

      window.setTimeout(() => {
        setShowIncidentForm(false);
        setIncidentSubmitted(false);
      }, 3000);
    } catch (error) {
      setIncidentError(handleApiError(error));
    } finally {
      setIsSubmittingIncident(false);
    }
  };

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
        {sectionError && <p className="text-sm text-red-300">{sectionError}</p>}
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
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
                  value={datasetTitle}
                  onChange={(e) => setDatasetTitle(e.target.value)}
                  placeholder="e.g. Deep-sea Species Survey 2025"
                  className="mt-1.5 bg-slate-900/50 border-cyan-500/30 text-white placeholder:text-slate-500"
                />
              </div>

              <div>
                <Label className="text-slate-300 text-sm">Description</Label>
                <Textarea
                  value={datasetDescription}
                  onChange={(e) => setDatasetDescription(e.target.value)}
                  placeholder="Describe your dataset..."
                  className="mt-1.5 bg-slate-900/50 border-cyan-500/30 text-white placeholder:text-slate-500 resize-none"
                  rows={3}
                />
              </div>

              <label className="block border-2 border-dashed border-cyan-500/30 rounded-2xl p-6 text-center hover:border-cyan-500/50 transition-all cursor-pointer">
                <Upload className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                <p className="text-sm text-slate-400">
                  {selectedFile ? selectedFile.name : 'Click to upload or drag and drop'}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  {selectedFile ? `${Math.round(selectedFile.size / 1024)} KB selected` : 'CSV, Excel, or JSON files'}
                </p>
                <input
                  type="file"
                  accept=".csv,.json,.xlsx,.xls"
                  className="hidden"
                  onChange={(e) => setSelectedFile(e.target.files?.[0] ?? null)}
                />
              </label>

              <Button
                type="button"
                disabled={isUploadingDataset}
                onClick={() => void handleDatasetUpload()}
                className="w-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 hover:bg-cyan-500/30"
              >
                <Upload className="w-4 h-4 mr-2" />
                {isUploadingDataset ? 'Uploading...' : 'Upload Dataset'}
              </Button>

              {uploadMessage && (
                <p className={`text-sm ${uploadMessage.includes('successfully') ? 'text-emerald-300' : 'text-red-300'}`}>
                  {uploadMessage}
                </p>
              )}

              <div className="pt-3 border-t border-cyan-500/20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/20 flex items-center justify-center border border-cyan-400/30">
                    <FileText className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="text-white text-sm">Dataset Library</h4>
                    <p className="text-xs text-slate-400">Browse existing research files and download available datasets.</p>
                  </div>
                </div>

                <form onSubmit={(e) => void handleDatasetSearch(e)} className="flex gap-2 mb-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400" />
                    <Input
                      value={datasetSearch}
                      onChange={(e) => setDatasetSearch(e.target.value)}
                      placeholder="Search datasets..."
                      className="pl-9 bg-slate-900/50 border-cyan-500/30 text-white placeholder:text-slate-500"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isLoadingDatasets}
                    className="bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 hover:bg-cyan-500/30"
                  >
                    Search
                  </Button>
                </form>

                {datasetLibraryMessage && (
                  <p className={`mb-3 text-sm ${datasetLibraryMessage.includes('started') ? 'text-emerald-300' : 'text-red-300'}`}>
                    {datasetLibraryMessage}
                  </p>
                )}

                {isLoadingDatasets ? (
                  <div className="rounded-xl border border-cyan-500/20 bg-slate-900/40 px-3 py-4 text-sm text-slate-400">
                    Loading datasets...
                  </div>
                ) : recentDatasets.length === 0 ? (
                  <div className="rounded-xl border border-cyan-500/20 bg-slate-900/40 px-3 py-4 text-sm text-slate-400">
                    No datasets found.
                  </div>
                ) : (
                  <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
                    {recentDatasets.map((dataset) => (
                      <div
                        key={dataset.id}
                        className="rounded-xl border border-cyan-500/20 bg-slate-900/40 px-3 py-3"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="text-sm text-white">{dataset.name}</p>
                            <p className="text-xs text-slate-400 line-clamp-2">{dataset.description}</p>
                          </div>
                          <Badge className="bg-cyan-500/20 text-cyan-300 shrink-0">
                            {dataset.status}
                          </Badge>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 mt-3 text-xs text-slate-400">
                          <span>{dataset.regionName ?? 'Region pending'}</span>
                          <span>•</span>
                          <span>{dataset.category}</span>
                          <span>•</span>
                          <span>{formatFileSize(dataset.fileSize)}</span>
                          <span>•</span>
                          <span>{dataset.downloadCount ?? 0} downloads</span>
                        </div>

                        <Button
                          type="button"
                          size="sm"
                          disabled={downloadingDatasetId === dataset.id}
                          onClick={() => void handleDatasetDownload(dataset)}
                          className="mt-3 w-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 hover:bg-cyan-500/30"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          {downloadingDatasetId === dataset.id ? 'Preparing...' : 'Download'}
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Card>
        </motion.div>

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
              {discussionThreads.map((discussion, index) => (
                <motion.div
                  key={discussion.topic}
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
              onSubmit={(e) => void handleIncidentSubmit(e)}
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
                    <Label className="text-slate-300 text-sm">Incident Title</Label>
                    <Input
                      value={incidentTitle}
                      onChange={(e) => setIncidentTitle(e.target.value)}
                      placeholder="e.g. Suspicious sediment discharge near survey area"
                      className="mt-1.5 bg-slate-900/50 border-red-500/30 text-white placeholder:text-slate-500"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label className="text-slate-300 text-sm">Location</Label>
                    <div className="relative mt-1.5">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-red-400" />
                      <Input
                        value={incidentLocation}
                        onChange={(e) => setIncidentLocation(e.target.value)}
                        placeholder={regions[0]?.name ? `Enter coordinates or region name, e.g. ${regions[0].name}` : 'Enter coordinates or region name'}
                        className="pl-10 bg-slate-900/50 border-red-500/30 text-white placeholder:text-slate-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-slate-300 text-sm">Incident Category</Label>
                    <select
                      value={incidentCategory}
                      onChange={(e) => setIncidentCategory(e.target.value as IncidentCategory | '')}
                      className="w-full mt-1.5 bg-slate-900/50 border border-red-500/30 text-white rounded-lg px-3 py-2 text-sm"
                      required
                    >
                      <option value="">Select category</option>
                      {incidentCategoryOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label className="text-slate-300 text-sm">Severity</Label>
                    <select
                      value={incidentSeverity}
                      onChange={(e) => setIncidentSeverity(e.target.value)}
                      className="w-full mt-1.5 bg-slate-900/50 border border-red-500/30 text-white rounded-lg px-3 py-2 text-sm"
                      required
                    >
                      <option value="">Select severity</option>
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                      <option value="Critical">Critical</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <Label className="text-slate-300 text-sm">Description</Label>
                    <Textarea
                      value={incidentDescription}
                      onChange={(e) => setIncidentDescription(e.target.value)}
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

                  {incidentError && (
                    <div className="md:col-span-2">
                      <p className="text-sm text-red-300">{incidentError}</p>
                    </div>
                  )}

                  <div className="md:col-span-2 flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setShowIncidentForm(false);
                        setIncidentError('');
                      }}
                      className="flex-1 border-slate-600 text-slate-400 hover:bg-slate-800"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmittingIncident}
                      className="flex-1 bg-red-500/20 text-red-300 border border-red-400/30 hover:bg-red-500/30"
                    >
                      {isSubmittingIncident ? 'Submitting...' : 'Submit Report'}
                    </Button>
                  </div>
                </div>
              )}
            </motion.form>
          )}

          {!showIncidentForm && (
            <div className="grid md:grid-cols-3 gap-4 mt-4">
              {[
                { label: 'Reports This Month', value: String(reportsThisMonthCount), change: 'Live data' },
                { label: 'Under Investigation', value: String(underInvestigationCount), change: 'Live data' },
                { label: 'Resolved', value: String(resolvedIncidents), change: 'Live data' },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
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
