import { useEffect, useState } from 'react';
import { X, Filter, BookOpen, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';
import { timelineService, handleApiError } from '../../services';
import type { TimelineEvent } from '../../types/api';

export interface Infographic {
  id: number;
  title: string;
  category: 'Deep Sea Mining' | 'Ecosystems' | 'Legislation';
  imageUrl: string;
  summary: string;
  fullContent: string[];
  keyStats: string[];
}

const infographicData: Infographic[] = [
  {
    id: 1,
    title: 'Polymetallic Nodules',
    category: 'Deep Sea Mining',
    imageUrl: 'https://placehold.co/800x600/1e293b/FFF?text=Nodules',
    summary: 'The primary target for deep-sea mining: potato-sized rocks rich in battery metals.',
    fullContent: [
      'Polymetallic nodules form over millions of years on abyssal plains.',
      'They are rich in manganese, nickel, copper, and cobalt.',
      'Removing them also removes habitat for unique deep-sea species.'
    ],
    keyStats: [
      'Growth Rate: 1-10 mm per million years',
      'Depth: 4,000 - 6,000 meters',
      'Resource: Estimated 21 billion tonnes in CCZ'
    ]
  },
  {
    id: 2,
    title: 'Hydrothermal Vents',
    category: 'Ecosystems',
    imageUrl: 'https://placehold.co/800x600/064e3b/FFF?text=Vents',
    summary: 'Underwater geysers hosting unique life powered by chemosynthesis, not sunlight.',
    fullContent: [
      'Hydrothermal vents release superheated, mineral-rich water.',
      'They host endemic species found nowhere else.',
      'Mining these systems risks irreversible local extinction.'
    ],
    keyStats: [
      'Temperature: Up to 400°C',
      'Biodiversity: High endemism',
      'Depth: 1,500 - 4,000 meters'
    ]
  },
  {
    id: 3,
    title: 'The Precautionary Principle',
    category: 'Legislation',
    imageUrl: 'https://placehold.co/800x600/4c1d95/FFF?text=Precaution',
    summary: 'The legal argument for pausing exploitation until science catches up.',
    fullContent: [
      'The precautionary principle places the burden of proof on those proposing risky actions.',
      'It is central to the deep-sea mining moratorium debate.',
      'Many scientists argue the baseline science is still insufficient.'
    ],
    keyStats: [
      'Adoption: Rio Declaration (1992)',
      'Concept: "Do no harm" before acting',
      'Status: Central to current ISA debates'
    ]
  }
];

interface InteractiveTimelinesProps {
  onBack: () => void;
}

export function InteractiveTimeline({ onBack }: InteractiveTimelinesProps) {
  const [activeTab, setActiveTab] = useState<'timeline' | 'infographics'>('timeline');
  const [selectedInfographic, setSelectedInfographic] = useState<Infographic | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [timelineData, setTimelineData] = useState<TimelineEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadTimeline = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await timelineService.getTimelineEvents();
        setTimelineData(response.data ?? []);
      } catch (err) {
        setError(handleApiError(err));
      } finally {
        setLoading(false);
      }
    };

    void loadTimeline();
  }, []);

  const filteredInfographics = filterCategory === 'All'
    ? infographicData
    : infographicData.filter(item => item.category === filterCategory);

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'positive': return '#22c55e';
      case 'mixed': return '#eab308';
      case 'negative': return '#ef4444';
      default: return '#cbd5e1';
    }
  };

  return (
    <div className="min-h-screen bg-[#071821] text-white">
      <div className="sticky top-0 z-50 bg-[#071821]/80 backdrop-blur-lg border-b border-cyan-400/20">
        <div className="container mx-auto px-8 py-4">
          <Button
            onClick={onBack}
            variant="outline"
            className="border-cyan-400/30 text-cyan-300 hover:bg-cyan-500/20"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-8 py-12">
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 flex items-center justify-center border border-cyan-400/30">
              <BookOpen className="w-8 h-8 text-cyan-400" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Life Below Water: The Knowledge Hub</h1>
              <p className="text-slate-400 text-lg">
                An interactive deep dive into UN SDG 14, exploring the balance between deep-sea exploration, resource extraction, and ecosystem preservation.
              </p>
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <button
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                activeTab === 'timeline'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/30'
                  : 'bg-slate-800/50 text-slate-400 border border-slate-700 hover:bg-slate-800'
              }`}
              onClick={() => setActiveTab('timeline')}
            >
              History & Legislation
            </button>
            <button
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                activeTab === 'infographics'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/30'
                  : 'bg-slate-800/50 text-slate-400 border border-slate-700 hover:bg-slate-800'
              }`}
              onClick={() => setActiveTab('infographics')}
            >
              Ecosystems & Mining
            </button>
          </div>
        </header>

        {error && <div className="mb-6 text-center text-sm text-red-400">{error}</div>}

        {activeTab === 'timeline' && (
          <section>
            <div className="flex justify-center gap-8 mb-12 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-slate-300">Progress</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span className="text-slate-300">Contentious/Mixed</span>
              </div>
            </div>

            <div className="space-y-8">
              {loading && (
                <div className="bg-slate-900/50 border border-slate-700 rounded-2xl p-6 text-center text-slate-400">
                  Loading timeline events...
                </div>
              )}

              {!loading && timelineData.length === 0 && (
                <div className="bg-slate-900/50 border border-slate-700 rounded-2xl p-6 text-center text-slate-400">
                  No timeline events are available yet.
                </div>
              )}

              {!loading && timelineData.map((event, index) => (
                <div
                  key={event.id}
                  className="relative pl-8 border-l-4"
                  style={{ borderLeftColor: getImpactColor(event.impact) }}
                >
                  <div
                    className="absolute -left-3 top-0 w-5 h-5 rounded-full border-4 border-[#071821]"
                    style={{ backgroundColor: getImpactColor(event.impact) }}
                  ></div>

                  <div
                    className="bg-slate-900/50 border border-slate-700 rounded-2xl p-6 hover:border-cyan-400/30 transition-all"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <span className="text-cyan-400 font-bold text-2xl">{event.year}</span>
                    <h3 className="text-2xl font-bold text-white mt-2 mb-3">
                      {event.title}
                    </h3>
                    <p className="text-slate-300 mb-4 font-medium">
                      {event.description}
                    </p>
                    <div className="bg-slate-800/50 p-4 rounded-xl">
                      <strong className="text-cyan-300">Deep Dive:</strong>
                      <span className="text-slate-400 ml-2">{event.extendedDetails}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'infographics' && (
          <section>
            <div className="flex justify-center items-center gap-4 mb-12 flex-wrap">
              <div className="flex items-center gap-2 text-slate-400">
                <Filter size={20} />
                <span className="font-semibold">Filter by Topic:</span>
              </div>
              {['All', 'Deep Sea Mining', 'Ecosystems', 'Legislation'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`px-5 py-2 rounded-full border font-semibold text-sm transition-all ${
                    filterCategory === cat
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/30'
                      : 'bg-slate-800/50 text-slate-400 border-slate-700 hover:bg-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredInfographics.map((info) => (
                <div
                  key={info.id}
                  className="bg-slate-900/50 border border-slate-700 rounded-2xl overflow-hidden cursor-pointer hover:border-cyan-400/30 transition-all hover:shadow-lg hover:shadow-cyan-500/20"
                  onClick={() => setSelectedInfographic(info)}
                >
                  <div className="relative h-48">
                    <img src={info.imageUrl} alt={info.title} className="w-full h-full object-cover" />
                    <div className="absolute top-4 right-4 bg-cyan-500/20 backdrop-blur-md border border-cyan-400/30 px-3 py-1 rounded-full text-xs font-semibold text-cyan-300">
                      {info.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{info.title}</h3>
                    <p className="text-slate-400 mb-4 leading-relaxed">{info.summary}</p>
                    <div className="flex items-center gap-2 text-cyan-400 font-semibold">
                      <BookOpen size={16} />
                      <span>Read Full Analysis</span>
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {selectedInfographic && (
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedInfographic(null)}
          >
            <div
              className="bg-slate-900 border border-slate-700 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center hover:bg-slate-700 transition-colors"
                onClick={() => setSelectedInfographic(null)}
              >
                <X size={24} className="text-white" />
              </button>

              <div className="relative h-64">
                <img
                  src={selectedInfographic.imageUrl}
                  alt={selectedInfographic.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent flex flex-col justify-end p-8">
                  <span className="text-cyan-400 font-bold uppercase tracking-wider text-sm mb-2">
                    {selectedInfographic.category}
                  </span>
                  <h2 className="text-white text-4xl font-bold">
                    {selectedInfographic.title}
                  </h2>
                </div>
              </div>

              <div className="p-8 overflow-y-auto max-h-[calc(90vh-16rem)]">
                <div className="grid md:grid-cols-3 gap-4 mb-8">
                  {selectedInfographic.keyStats.map((stat, idx) => (
                    <div
                      key={idx}
                      className="bg-cyan-500/10 border border-cyan-400/30 rounded-xl p-4 text-center"
                    >
                      <div className="text-cyan-300 font-semibold text-sm">{stat}</div>
                    </div>
                  ))}
                </div>

                <div className="space-y-6 text-slate-300 leading-relaxed text-lg">
                  {selectedInfographic.fullContent.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
