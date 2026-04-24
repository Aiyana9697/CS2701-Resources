import { useEffect, useState } from 'react';
import { X, Filter, BookOpen, ArrowRight } from 'lucide-react';
import { timelineService, handleApiError } from '../../services';

export interface TimelineEvent {
  id: number;
  year: string;
  title: string;
  description: string;
  extendedDetails: string;
  impact: 'positive' | 'mixed' | 'negative' | string;
}

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
  { id: 1, title: 'Polymetallic Nodules', category: 'Deep Sea Mining', imageUrl: 'https://placehold.co/800x600/1e293b/FFF?text=Nodules', summary: 'The primary target for deep-sea mining: potato-sized rocks rich in battery metals.', fullContent: ['Polymetallic nodules form over millions of years on abyssal plains.', 'They are rich in manganese, nickel, copper, and cobalt.', 'Removing them also removes habitat for unique deep-sea species.'], keyStats: ['Growth Rate: 1-10 mm per million years', 'Depth: 4,000 - 6,000 meters', 'Resource: Estimated 21 billion tonnes in CCZ'] },
  { id: 2, title: 'Hydrothermal Vents', category: 'Ecosystems', imageUrl: 'https://placehold.co/800x600/064e3b/FFF?text=Vents', summary: 'Underwater geysers hosting unique life powered by chemosynthesis, not sunlight.', fullContent: ['Hydrothermal vents release superheated, mineral-rich water.', 'They host endemic species found nowhere else.', 'Mining these systems risks irreversible local extinction.'], keyStats: ['Temperature: Up to 400°C', 'Biodiversity: High endemism', 'Depth: 1,500 - 4,000 meters'] },
  { id: 3, title: 'The Precautionary Principle', category: 'Legislation', imageUrl: 'https://placehold.co/800x600/4c1d95/FFF?text=Precaution', summary: 'The legal argument for pausing exploitation until science catches up.', fullContent: ['The precautionary principle places the burden of proof on those proposing risky actions.', 'It is central to the deep-sea mining moratorium debate.', 'Many scientists argue the baseline science is still insufficient.'], keyStats: ['Adoption: Rio Declaration (1992)', 'Concept: "Do no harm" before acting', 'Status: Central to current ISA debates'] },
];

export function InteractiveTimeline() {
  const [activeTab, setActiveTab] = useState<'timeline' | 'infographics'>('timeline');
  const [selectedInfographic, setSelectedInfographic] = useState<Infographic | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [timelineData, setTimelineData] = useState<TimelineEvent[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadTimeline = async () => {
      try {
        setError('');
        const response = await timelineService.getTimelineEvents();
        setTimelineData(response.data ?? []);
      } catch (err) {
        setError(handleApiError(err));
      }
    };

    void loadTimeline();
  }, []);

  const filteredInfographics =
    filterCategory === 'All'
      ? infographicData
      : infographicData.filter((item) => item.category === filterCategory);

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'positive':
        return 'border-l-green-500';
      case 'mixed':
        return 'border-l-yellow-500';
      case 'negative':
        return 'border-l-red-500';
      default:
        return 'border-l-slate-300';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <header className="text-center mb-16 border-b border-slate-200 pb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
          Life Below Water: The Knowledge Hub
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto">
          An interactive deep dive into UN SDG 14, exploring the balance between deep-sea exploration, resource extraction, and ecosystem preservation.
        </p>
        <div className="flex justify-center gap-4 mt-10">
          {['timeline', 'infographics'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as 'timeline' | 'infographics')}
              className={`px-6 py-3 rounded-full border font-semibold transition ${activeTab === tab ? 'bg-sky-600 text-white border-sky-600 shadow-md' : 'bg-white text-slate-500 border-slate-300 hover:bg-slate-100'}`}
            >
              {tab === 'timeline' ? 'History & Legislation' : 'Ecosystems & Mining'}
            </button>
          ))}
        </div>
      </header>

      {error && <div className="mb-6 text-center text-sm text-red-500">{error}</div>}

      {activeTab === 'timeline' && (
        <section>
          <div className="flex justify-center gap-8 mb-12 text-sm">
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-green-500" /><span>Progress</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-yellow-500" /><span>Contentious/Mixed</span></div>
          </div>
          <div className="relative max-w-3xl mx-auto pl-8 border-l-2 border-slate-200">
            {timelineData.map((event) => (
              <div key={event.id} className="mb-12 relative">
                <div className="absolute -left-[1.35rem] top-1 w-5 h-5 rounded-full border-4 border-white bg-sky-600" />
                <div className={`bg-white p-6 rounded-xl shadow transition hover:translate-x-2 border-l-4 ${getImpactColor(event.impact)}`}>
                  <span className="text-xs uppercase font-bold text-slate-500 block mb-2">{event.year}</span>
                  <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                  <p className="font-medium mb-4 text-slate-700">{event.description}</p>
                  <div className="bg-slate-50 p-4 rounded text-sm text-slate-600">
                    <strong>Deep Dive:</strong> {event.extendedDetails}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {activeTab === 'infographics' && (
        <section>
          <div className="flex flex-wrap justify-center items-center gap-3 mb-12">
            <div className="flex items-center gap-2 text-slate-500 font-semibold"><Filter size={18} /><span>Filter:</span></div>
            {['All', 'Deep Sea Mining', 'Ecosystems', 'Legislation'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-4 py-2 rounded-full border text-sm font-semibold transition ${filterCategory === cat ? 'bg-slate-900 text-white' : 'bg-white text-slate-500 border-slate-300 hover:bg-slate-100'}`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredInfographics.map((info) => (
              <div key={info.id} onClick={() => setSelectedInfographic(info)} className="bg-white rounded-2xl overflow-hidden shadow border border-slate-200 cursor-pointer transition hover:-translate-y-2 hover:shadow-xl flex flex-col">
                <div className="relative h-52 overflow-hidden">
                  <img src={info.imageUrl} alt={info.title} className="w-full h-full object-cover transition duration-500 hover:scale-105" />
                  <div className="absolute top-4 right-4 bg-black/70 text-white text-xs px-2 py-1 rounded">{info.category}</div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{info.title}</h3>
                  <p className="text-sm text-slate-500 mb-4">{info.summary}</p>
                  <div className="mt-auto flex items-center gap-2 text-sky-600 font-semibold text-sm">
                    <BookOpen size={16} />
                    Read Full Analysis
                    <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {selectedInfographic && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur flex items-center justify-center z-50 p-4" onClick={() => setSelectedInfographic(null)}>
          <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl relative shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSelectedInfographic(null)} className="absolute top-5 right-5 bg-white w-10 h-10 rounded-full flex items-center justify-center shadow hover:rotate-90 transition"><X /></button>
            <div className="relative h-64">
              <img src={selectedInfographic.imageUrl} className="w-full h-full object-cover" />
              <div className="absolute bottom-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent">
                <span className="text-sky-400 uppercase text-xs font-bold">{selectedInfographic.category}</span>
                <h2 className="text-white text-3xl font-bold">{selectedInfographic.title}</h2>
              </div>
            </div>
            <div className="p-8">
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                {selectedInfographic.keyStats.map((stat, i) => (
                  <div key={i} className="bg-slate-100 p-4 rounded border-l-4 border-sky-600 text-sm font-semibold text-slate-700">{stat}</div>
                ))}
              </div>
              <div className="text-slate-700 leading-relaxed space-y-6">
                {selectedInfographic.fullContent.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
