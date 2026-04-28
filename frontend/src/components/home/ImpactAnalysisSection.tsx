/*
ImpactAnalysis section for the homepage
displays a list of environmental / impact reports with their title, who uploaded it,
and an impact level with corresponding colour coding
includes a search bar to filter reports by title
*/
import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Search } from 'lucide-react';
import { handleApiError, impactService } from '../../services';
import type { ImpactReport } from '../../types/api';

type ImpactLevel = 'Green' | 'Yellow' | 'Red';

interface DisplayImpactReport {
  id: number;
  title: string;
  impact: ImpactLevel;
  uploadedBy: string;
}

const impactColors: Record<ImpactLevel, string> = {
  Green: '#10b981',
  Yellow: '#f59e0b',
  Red: '#ef4444',
};

export function ImpactAnalysis() {
  const [reports, setReports] = useState<DisplayImpactReport[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const mapImpactLevel = (impact: ImpactReport['impact']): ImpactLevel => {
    const normalized = impact.toUpperCase();
    if (normalized === 'LOW') return 'Green';
    if (normalized === 'MODERATE' || normalized === 'MEDIUM') return 'Yellow';
    return 'Red';
  };

  useEffect(() => {
    const loadReports = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await impactService.getReports({ page: 0, size: 6 });
        const mappedReports: DisplayImpactReport[] = (response.data?.content ?? []).map((report: ImpactReport) => ({
          id: report.id,
          title: report.title,
          impact: mapImpactLevel(report.impact),
          uploadedBy: report.uploadedBy,
        }));
        setReports(mappedReports);
      } catch (err) {
        setError(handleApiError(err));
      } finally {
        setLoading(false);
      }
    };

    void loadReports();
  }, []);

  const filteredReports = useMemo(
    () => reports.filter((report) => report.title.toLowerCase().includes(search.toLowerCase())),
    [reports, search]
  );

  return (
    <section id="impact" className="py-9 px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center border border-cyan-400/30">
            <TrendingUp className="w-6 h-6 text-cyan-400" />
          </div>

          <div>
            <h2 className="text-white">Impact Analysis</h2>
            <p className="text-slate-400">
              Track environmental impact assessments and protected areas
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search reports..."
            className="bg-slate-800 px-4 py-2 rounded-md w-80 text-sm outline-none border border-slate-700 text-white"
          />
        </div>

        {loading ? (
          <div className="p-4 bg-slate-900 border border-slate-700 rounded-xl shadow-md text-slate-400">
            Loading impact reports...
          </div>
        ) : error ? (
          <div className="p-4 bg-slate-900 border border-red-500/40 rounded-xl shadow-md text-red-300">
            {error}
          </div>
        ) : filteredReports.length === 0 ? (
          <div className="p-4 bg-slate-900 border border-slate-700 rounded-xl shadow-md text-slate-400">
            No impact reports found.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredReports.map((report) => (
              <div
                key={report.id}
                className="p-4 bg-slate-900 border border-slate-700 rounded-xl shadow-md"
              >
                <h4 className="font-semibold text-white">{report.title}</h4>
                <p className="text-sm text-slate-400">Uploaded by: {report.uploadedBy}</p>
                <span
                  className="mt-3 inline-block px-2 py-1 text-xs rounded-md text-black"
                  style={{ background: impactColors[report.impact] }}
                >
                  {report.impact}
                </span>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
}
