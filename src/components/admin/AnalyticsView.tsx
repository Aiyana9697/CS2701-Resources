/*
analytics view component for admin dashboard 
displays key metrics and insights on platform usage, user engagement, data contributions
*/
import { motion } from 'framer-motion';
import { Eye, TrendingUp, Users } from 'lucide-react';

// mock data for analytics (structured for future replacement with API data)
const analytics = {
  mostViewedRegions: [
    { region: 'Pacific APEI 4', views: 1248, change: '+12%' },
    { region: 'Atlantic CCZ', views: 987, change: '+8%' },
    { region: 'Indian Ocean Ridge', views: 756, change: '-3%' },
  ],
  activeContributors: [
    { name: 'Dr. Sarah Ocean', contributions: 45, trend: 'up' },
    { name: 'John Maritime', contributions: 32, trend: 'up' },
    { name: 'Marine Research Team', contributions: 28, trend: 'stable' },
  ],
};

/*
animations - content slides up and fades in when component first mounts
defines a repsonsive grid layour with 1 column on small screens and 2 columns on medium+ screens
analytics data is displayed in two main sections: Most Viewed Regions and Active Contributors

mostViewedRegions is mapped over to create cards for each region, showing region name, number of views, percentage change in views (green for positive change / red for negative)
activeContributors is mapped over to create cards for each contributor, showing name, number of contributions and trend icon (green up arrow for increasing contributions / gray stable icon for no change)
*/
export function AnalyticsView() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Most Viewed Regions */}
        <div className="bg-gradient-to-br from-slate-900/90 to-cyan-900/30 rounded-2xl p-6 border border-cyan-500/30">
          <h3 className="text-cyan-300 mb-4 flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Most Viewed Regions
          </h3>
          <div className="space-y-3">
            {analytics.mostViewedRegions.map((region, index) => (
              <div key={index} className="bg-slate-950/50 rounded-xl p-4 border border-cyan-500/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white">{region.region}</span>
                  <span className={`text-sm ${region.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                    {region.change}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full"
                      style={{ width: `${(region.views / 1500) * 100}%` }}
                    />
                  </div>
                  <span className="text-cyan-400 text-sm">{region.views}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Contributors */}
        <div className="bg-gradient-to-br from-slate-900/90 to-cyan-900/30 rounded-2xl p-6 border border-cyan-500/30">
          <h3 className="text-cyan-300 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Most Active Contributors
          </h3>
          <div className="space-y-3">
            {analytics.activeContributors.map((contributor, index) => (
              <div key={index} className="bg-slate-950/50 rounded-xl p-4 border border-cyan-500/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-white">{contributor.name}</p>
                      <p className="text-slate-400 text-sm">{contributor.contributions} contributions</p>
                    </div>
                  </div>
                  <TrendingUp className={`w-5 h-5 ${contributor.trend === 'up' ? 'text-green-400' : 'text-slate-400'}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
