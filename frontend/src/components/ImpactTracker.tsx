import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, Globe, Shield, Activity } from "lucide-react";
import "./ImpactTracker.css";

const timeSeriesData = [
  { month: "Jan", assessments: 12, reports: 8 },
  { month: "Feb", assessments: 15, reports: 11 },
  { month: "Mar", assessments: 18, reports: 14 },
  { month: "Apr", assessments: 22, reports: 17 },
  { month: "May", assessments: 25, reports: 20 },
  { month: "Jun", assessments: 28, reports: 23 },
];

const countryData = [
  { country: "Norway", contributions: 45 },
  { country: "Japan", contributions: 38 },
  { country: "USA", contributions: 52 },
  { country: "UK", contributions: 31 },
  { country: "Australia", contributions: 28 },
];

const protectionData = [
  { name: "Protected", value: 35, color: "#10b981" },
  { name: "Under Review", value: 25, color: "#f59e0b" },
  { name: "Monitored", value: 20, color: "#06b6d4" },
  { name: "Unprotected", value: 20, color: "#ef4444" },
];

const stats = [
  { icon: Shield, label: "Protected Areas", value: "1,247", change: "+12%" },
  { icon: Globe, label: "Active Projects", value: "89", change: "+8%" },
  { icon: Activity, label: "EIA Assessments", value: "156", change: "+15%" },
  { icon: TrendingUp, label: "Research Papers", value: "2,341", change: "+23%" },
];

export function ImpactTracker() {
  return (
    <section className="impact-section">
      <div className="impact-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="impact-header"
        >
          <div className="impact-badge">
            <TrendingUp className="icon" />
            <span>Impact Analytics</span>
          </div>
          <h2>Global Ocean Conservation Impact</h2>
          <p>
            Real-time data on environmental assessments, protection efforts,
            and research contributions
          </p>
        </motion.div>

        {/* Stats */}
        <div className="stats-grid">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="stat-card"
              >
                <div className="stat-card-header">
                  <div className="stat-icon-box">
                    <Icon className="icon" />
                  </div>
                  <span className="stat-change">{stat.change}</span>
                </div>
                <p className="stat-label">{stat.label}</p>
                <p className="stat-value">{stat.value}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Charts */}
        <div className="charts-grid">
          {/* Time Series */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="chart-card"
          >
            <h3>Environmental Impact Assessments</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={timeSeriesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "1px solid #06b6d4",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="assessments"
                  stroke="#06b6d4"
                  strokeWidth={2}
                  dot={{ fill: "#06b6d4", r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="reports"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ fill: "#10b981", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Country Bar Chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="chart-card"
          >
            <h3>Country Contributions Ranking</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={countryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="country" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "1px solid #06b6d4",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                />
                <Bar dataKey="contributions" fill="#06b6d4" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Pie Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="chart-card pie-chart-card"
        >
          <h3>Ocean Area Protection Status</h3>
          <div className="pie-chart-wrapper">
            <ResponsiveContainer width="100%" height={300} className="pie-chart">
              <PieChart>
                <Pie
                  data={protectionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {protectionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "1px solid #06b6d4",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="pie-legend">
              {protectionData.map((item, index) => (
                <div key={index} className="pie-legend-item">
                  <div
                    className="legend-dot"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="legend-name">{item.name}</span>
                  <span className="legend-value">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
