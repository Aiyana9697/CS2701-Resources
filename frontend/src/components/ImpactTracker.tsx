/* 
React componenent that renders a dashboard section containing: 
- 4 animiated statistic summary cards showing the current values and short term percentage changes for protected areas / active projects / EIA assessments / research papers
- line chart showing monthly trends for assessments and reports 
- bar chart ranking countries by their number of contributions
- pie chart showing proportions of ocean area that are currently protected, under review, mmonitored or unprotected
*/
import { motion } from 'framer-motion';
import { Card } from './ui/card';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Globe, Shield, Activity } from 'lucide-react';

/* timeSeriesData stores an array of the monthly time series of assessments / reports used by the LineChart */
const timeSeriesData = [
  { month: 'Jan', assessments: 12, reports: 8 },
  { month: 'Feb', assessments: 15, reports: 11 },
  { month: 'Mar', assessments: 18, reports: 14 },
  { month: 'Apr', assessments: 22, reports: 17 },
  { month: 'May', assessments: 25, reports: 20 },
  { month: 'Jun', assessments: 28, reports: 23 },
];

/* countryData stores an array of countries and their contribution values used by the BarChart */
const countryData = [
  { country: 'Norway', contributions: 45 },
  { country: 'Japan', contributions: 38 },
  { country: 'USA', contributions: 52 },
  { country: 'UK', contributions: 31 },
  { country: 'Australia', contributions: 28 },
];

/* protectionData stores an array of pie's segments with name, value and color used by the PieChart */
const protectionData = [
  { name: 'Protected', value: 35, color: '#10b981' },
  { name: 'Under Review', value: 25, color: '#f59e0b' },
  { name: 'Monitored', value: 20, color: '#06b6d4' },
  { name: 'Unprotected', value: 20, color: '#ef4444' },
];

/* 
array of 4 objects representing a card displaying an icon, label, value, % change and direction of trend 
used to render the top stats cards  
*/
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

/* 
Creates a full-width section with top-bottom and side padding with dark slate background
Centers the content and limits max width to keep content from stretching too wide 
animation - fades in and slides up the entire section when it appears
viewport - animates the first time the section comes into view, not every scroll
*/
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
           {/* 
          Defines the Impact Analytics label that appears above the main title 
          contains a lucide-react trending icon with the text light cyan in colour 
          the label is contained within a rounded capsule shape with a light cyan border and darker background
          defines the main white title and subtitle below it
          */}
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-4 py-2 mb-4">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-300 text-sm">Impact Analytics</span>
          </div>
          <h2 className="text-white mb-4">Global Ocean Conservation Impact</h2>
          <p className="text-slate-400 text-xl max-w-3xl mx-auto">
            Real-time data on environmental assessments, protection efforts, and research contributions
          </p>
        </motion.div>

        {/* 
        Creates / defines a grid layout for the topic cards: 
        - 1 column on small screens 
        - 2 columns on medium screens
        - 4 columns on large screens
        - gap between grid items

        stats array is mapped (iterated) over to create a card for each stat 
        Icon is extracted from each stat object to be used within the card
        Animation: 
        - each card fades in and slides up when it appears once
        - depending on the index of the card, each card appears 0.1s after the previous one for a staggered effect
        */}

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

        {/* 
        Charts Grid with a 1 column on small screens & 2 columns on large screens
        grid contains Line / Bar chart components 
        */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">

          {/* 
          Defines the Line Chart named 'Environmental Impact Assessments'
          animation - fades in and shifts the section from left to right when it appears
          */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {/* 
            wraps the line chart in a styled container with a semi-transparent dark border, cyan border, padding around the content
            reponsive container ensures the chart stretches to cards full width, has a height of 300px and automatically resizes with layout 
            defines a cartesian line graph that uses timeSeriesData array: 
            - Draws a horizontal / vertical dashed-patten grid lines in a slate colour
            - X-axis = month field (hence Y-axis = n. of assessments & reports) 
            - both axis' stroke is in light slate colour
            tooltip defines a pop up component when hovering over the chart with a dark background, cyan border with rounded corners & white text
            */}
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
                  {/* 
                  generates a small label under the chart that matches the colour of the lines
                  each line visualises the assessment / report values from the timeSeriesData array: 
                  - type: smooth curved line is used to join the data points (rather than sharp edges) 
                  - dataKey: defines what property in the timeSeriesData array to read for this line 
                  - stroke: defines the colour of the lines stroke (cyan and green respectively)
                  - strokeWidth: defines the thickiness of the line
                  - dot: adds circular dot on each data point with a radius of 4, in the same colour of the line
                  */}
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



          {/* 
          Defines the Bar Chart named 'Country Contributions Ranking'
          animation - fades in and shifts the section from right to left when it appears
          */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {/* 
            wraps the line chart in a styled container with a semi-transparent dark border, cyan border, padding around the content
            reponsive container ensures the chart stretches to cards full width, has a height of 300px and automatically resizes with layout 
            defines a cartesian bar chart that uses countryData array: 
            - Draws a horizontal / vertical dashed-patten grid lines in a slate colour
            - X-axis = country field (hence Y-axis = n. of contributions) 
            - both axis' stroke is in light slate colour
            tooltip element defines a pop up component when hovering over the chart with a dark background, cyan border with rounded corners & white text
            bar element visualises the contributions value for each country using bars with rounded top corners & flat bottom edges, in cyan
            */}
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

        


        {/* 
        Defines the Pie chart named 'Ocean Area Protection Status'
        animation - fades in and shifts the section up when it appears
        */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* 
            wraps the line chart in a styled container with a semi-transparent dark border, cyan border, padding around the content
            content is stacked vertically on small screens and displayed side-to-side on large screens woth a gap between them
            reponsive container ensures the chart stretches to cards full width, has a height of 300px and automatically resizes with layout 
            defines a pie chart that uses protectionData array: 
            - centers the pie chart and removes the default label lines connecting the pie segments label to the pie
            - defines the pie segments labels consisting of the segments name + percentage 
            */}
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
                    {/* 
                    iterates through protectionData and creates one pie chart segment for each data item 
                    gives each segment its own colour defined in the array 
                    */}
                    {protectionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>

                  {/* Defines pop up component when hovering over  chart with a dark background, cyan border with rounded corners & white text */}
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#1e293b', 
                      border: '1px solid #06b6d4',
                      borderRadius: '8px',
                      color: '#fff',
                    }}
                    labelStyle={{ color: '#fff' }}   
                    itemStyle={{ color: '#fff' }}
                  />
                </PieChart>
              </ResponsiveContainer>

              {/* Defines a legend that shows a small coloured dot, the segments label and the numberic percentage*/}
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
