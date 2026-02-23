/*
alters view for the admin dashboard 
displays a list of system / admin alterts with details such as type, severity, date and message
each alert is styled based on its severity level (high, medium, low) using different colors & icons
*/
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { AlertTriangle } from 'lucide-react';

// mock data for alters (structured for future replacement with API data)
const alerts = [
  { id: 1, type: 'missing', message: 'EIA Project "Seabed Exploration Gamma" missing environmental impact data', severity: 'high', date: '2024-11-20' },
  { id: 2, type: 'compliance', message: 'Dataset "Coral Reef Assessment" flagged for review - possible data integrity issues', severity: 'medium', date: '2024-11-19' },
  { id: 3, type: 'missing', message: '5 user profiles incomplete - missing institutional affiliations', severity: 'low', date: '2024-11-18' },
];

/*
animation - content slides up and fades in when component first mounts 
alterts list is mapped over to create individual alert cards, each styled based on severity level using conditional classes for colors and icons 
defines the metadata for each alert including type, message, severity and date
*/ 
export function AlertsView() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`bg-gradient-to-br from-slate-900/90 to-cyan-900/30 rounded-2xl p-6 border ${
            alert.severity === 'high'
              ? 'border-red-500/50'
              : alert.severity === 'medium'
              ? 'border-yellow-500/50'
              : 'border-cyan-500/30'
          }`}
        >
          <div className="flex items-start gap-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              alert.severity === 'high'
                ? 'bg-red-500/20'
                : alert.severity === 'medium'
                ? 'bg-yellow-500/20'
                : 'bg-cyan-500/20'
            }`}>
              <AlertTriangle className={`w-5 h-5 ${
                alert.severity === 'high'
                  ? 'text-red-400'
                  : alert.severity === 'medium'
                  ? 'text-yellow-400'
                  : 'text-cyan-400'
              }`} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-2 py-1 rounded text-xs uppercase ${
                  alert.severity === 'high'
                    ? 'bg-red-500/20 text-red-400'
                    : alert.severity === 'medium'
                    ? 'bg-yellow-500/20 text-yellow-400'
                    : 'bg-cyan-500/20 text-cyan-400'
                }`}>
                  {alert.severity}
                </span>
                <span className="text-slate-400 text-sm">{alert.date}</span>
              </div>
              <p className="text-white">{alert.message}</p>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="border-cyan-400/30 text-cyan-300 hover:bg-cyan-500/10"
            >
              Resolve
            </Button>
          </div>
        </div>
      ))}
    </motion.div>
  );
}
