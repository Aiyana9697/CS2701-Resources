/*
renders the "My Stats" section of the dashboard, which includes two main parts:
1. KPI Stats - a grid of cards showing key performance indicators like modules completed, regions explored, species viewed, and saved items, each with an icon, value, label, and trend percentage 
2. Analytical Metrics - a grid of circular progress bars visualizing metrics like ocean knowledge score, learning streak, engagement level, and impact contribution, with animated filling when scrolled into view uses framer-motion for animations and react-circular-progressbar for the circular progress bars */


import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Card } from '../ui/card';
import { 
  GraduationCap, 
  Map, 
  Fish, 
  Bookmark,
  TrendingUp,
  Activity,
} from 'lucide-react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const statsData = [
  { icon: GraduationCap, label: 'Modules Completed', value: '6', trend: '+12%', color: 'cyan' },
  { icon: Map, label: 'Regions Explored', value: '15', trend: '+8%', color: 'blue' },
  { icon: Fish, label: 'Species Viewed', value: '48', trend: '+24%', color: 'teal' },
  { icon: Bookmark, label: 'Saved Items', value: '23', trend: '+5%', color: 'purple' },
];

const metricsData = [
  { label: 'Ocean Knowledge Score', value: 78, maxValue: 100, color: '#06b6d4' },
  { label: 'Learning Streak', value: 12, maxValue: 30, color: '#3b82f6', unit: 'days' },
  { label: 'Engagement Level', value: 85, maxValue: 100, color: '#8b5cf6' },
  { label: 'Impact Contribution', value: 64, maxValue: 100, color: '#10b981' },
];

export function MyStats() {
  const metricsRef = useRef(null);
  const isInView = useInView(metricsRef, { once: true, amount: 0.3 });

  return (
    <section id="dashboard" className="py-9 px-8 scroll-mt-20">
      {/* KPI Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center border border-cyan-400/30">
            <Activity className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <h2 className="text-white">My Stats</h2>
            <p className="text-slate-400">
              Track your learning progress and ocean exploration performance
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statsData.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >                
                <Card className="bg-gradient-to-br from-[#071821]/90 to-cyan-900/20 border-cyan-400/30 p-5 rounded-2xl hover:border-cyan-400/60 transition-all hover:shadow-lg hover:shadow-cyan-500/20">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-10 h-10 rounded-xl bg-${stat.color}-500/20 flex items-center justify-center border border-${stat.color}-400/30`}>
                      <Icon className={`w-5 h-5 text-${stat.color}-400`} />
                    </div>
                    <div className="flex items-center gap-1 text-xs">
                      <TrendingUp className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">{stat.trend}</span>
                    </div>
                  </div>
                  <p className="text-3xl text-white mb-1">{stat.value}</p>
                  <p className="text-slate-400 text-sm">{stat.label}</p>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Analytical Metrics */}
      <motion.div
        ref={metricsRef}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center border border-cyan-400/30">
            <TrendingUp className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <h2 className="text-white">Performance Metrics</h2>
            <p className="text-slate-400">
              Visual insights into your engagement, streaks, and impact
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metricsData.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
            >
              <Card className="bg-[#071821]/80 border-cyan-400/30 p-6 rounded-3xl hover:border-cyan-400/60 transition-all">
                <div className="flex flex-col items-center">
                  <div className="w-32 h-32 mb-4">
                    <CircularProgressbar
                      value={isInView ? metric.value : 0}
                      text={metric.unit ? `${metric.value}${metric.unit}` : `${metric.value}%`}
                      styles={buildStyles({
                        pathTransitionDuration: 1.5,
                        pathColor: metric.color,
                        textColor: '#fff',
                        trailColor: 'rgba(6, 182, 212, 0.1)',
                        textSize: '16px',
                      })}
                    />
                  </div>
                  <h4 className="text-white text-center mb-2">{metric.label}</h4>
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-cyan-400" />
                    <span className="text-slate-400 text-sm">
                      {metric.value}/{metric.maxValue}
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
