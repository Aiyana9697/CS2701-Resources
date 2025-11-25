import { motion } from 'framer-motion';
import { Card } from './ui/card';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Globe, Shield, Activity } from 'lucide-react';

const timeSeriesData = [
  { month: 'Jan', assessments: 12, reports: 8 },
  { month: 'Feb', assessments: 15, reports: 11 },
  { month: 'Mar', assessments: 18, reports: 14 },
  { month: 'Apr', assessments: 22, reports: 17 },
  { month: 'May', assessments: 25, reports: 20 },
  { month: 'Jun', assessments: 28, reports: 23 },
];

const countryData = [
  { country: 'Norway', contributions: 45 },
  { country: 'Japan', contributions: 38 },
  { country: 'USA', contributions: 52 },
  { country: 'UK', contributions: 31 },
  { country: 'Australia', contributions: 28 },
];

const protectionData = [
  { name: 'Protected', value: 35, color: '#10b981' },
  { name: 'Under Review', value: 25, color: '#f59e0b' },
  { name: 'Monitored', value: 20, color: '#06b6d4' },
  { name: 'Unprotected', value: 20, color: '#ef4444' },
];

const stats = [
  {
    icon: Shield,
    label: 'Protected Areas',
    value: '1,247',
    change: '+12%',
    trend: 'up',
  },
  {
    icon: Globe,
    label: 'Active Projects',
    value: '89',
    change: '+8%',
    trend: 'up',
  },
  {
    icon: Activity,
    label: 'EIA Assessments',
    value: '156',
    change: '+15%',
    trend: 'up',
  },
  {
    icon: TrendingUp,
    label: 'Research Papers',
    value: '2,341',
    change: '+23%',
    trend: 'up',
  },
];

export function ImpactTracker() {
  return (
    <section className="py-20 px-6 bg-slate-950">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-4 py-2 mb-4">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-300 text-sm">Impact Analytics</span>
          </div>
          <h2 className="text-white mb-4">Global Ocean Conservation Impact</h2>
          <p className="text-slate-400 text-xl max-w-3xl mx-auto">
            Real-time data on environmental assessments, protection efforts, and research contributions
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-slate-900/50 border-cyan-500/20 backdrop-blur-sm p-6 hover:border-cyan-500/50 transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-cyan-400" />
                    </div>
                    <span className="text-emerald-400 text-sm">{stat.change}</span>
                  </div>
                  <p className="text-slate-400 text-sm mb-1">{stat.label}</p>
                  <p className="text-white text-3xl">{stat.value}</p>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Charts Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Time Series Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="bg-slate-900/50 border-cyan-500/20 backdrop-blur-sm p-6">
              <h3 className="text-white mb-6">Environmental Impact Assessments</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={timeSeriesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="month" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: '1px solid #06b6d4',
                      borderRadius: '8px',
                      color: '#fff',
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="assessments"
                    stroke="#06b6d4"
                    strokeWidth={2}
                    dot={{ fill: '#06b6d4', r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="reports"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={{ fill: '#10b981', r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>

          {/* Country Contributions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="bg-slate-900/50 border-cyan-500/20 backdrop-blur-sm p-6">
              <h3 className="text-white mb-6">Country Contributions Ranking</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={countryData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="country" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: '1px solid #06b6d4',
                      borderRadius: '8px',
                      color: '#fff',
                    }}
                  />
                  <Bar dataKey="contributions" fill="#06b6d4" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>
        </div>

        {/* Protection Status Pie Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card className="bg-slate-900/50 border-cyan-500/20 backdrop-blur-sm p-6">
            <h3 className="text-white mb-6 text-center">Ocean Area Protection Status</h3>
            <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
              <ResponsiveContainer width={500} height={300} className="max-w-md">
                <PieChart>
                  <Pie
                    data={protectionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill= "#06b6d4"
                    dataKey="value"
                  >
                    {protectionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#1e293b', 
                      border: '1px solid #06b6d4',
                      borderRadius: '8px',
                      color: '#fff',
                    }}
                    labelStyle={{ color: '#cbd5e1' }}   
                    itemStyle={{ color: '#cbd5e1' }}
                  />
                </PieChart>
              </ResponsiveContainer>

              <div className="space-y-3">
                {protectionData.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-slate-300">{item.name}</span>
                    <span className="text-slate-500">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
