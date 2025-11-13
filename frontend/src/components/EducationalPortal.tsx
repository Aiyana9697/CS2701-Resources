import { motion } from 'framer-motion';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Microscope, Fish, Leaf, Waves, ChevronRight, GraduationCap } from 'lucide-react';
import MarineSpeciesImage from '../assets/Marine Species Protection.jpeg';
import SedimentPlumesImage from '../assets/Sediment Plumes.jpeg';
import ProtectedAreasImage from '../assets/APEIs & Protected Areas.jpeg';
import SustainabilityImage from '../assets/Sustainability Framework.jpeg';
import { ImageWithFallback } from './ImageWithFallback';

const educationalTopics = [
  {
    icon: Waves,
    title: 'Sediment Plumes',
    description: 'Understanding the environmental impact of deep-sea mining on sediment distribution and marine ecosystems.',
    level: 'Intermediate',
    duration: '15 min read',
    image: SedimentPlumesImage,
  },
  {
    icon: Fish,
    title: 'Marine Species Protection',
    description: 'Explore the diverse marine life in deep-sea environments and conservation strategies.',
    level: 'Beginner',
    duration: '12 min read',
    image: MarineSpeciesImage,
  },
  {
    icon: Microscope,
    title: 'APEIs & Protected Areas',
    description: 'Areas of Particular Environmental Interest and their role in sustainable ocean management.',
    level: 'Advanced',
    duration: '20 min read',
    image: ProtectedAreasImage,
  },
  {
    icon: Leaf,
    title: 'Sustainability Framework',
    description: 'Learn about SDG14 implementation and sustainable deep-sea exploration practices.',
    level: 'Intermediate',
    duration: '18 min read',
    image: SustainabilityImage,
  },
];

const getLevelColor = (level: string) => {
  switch (level) {
    case 'Beginner': return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
    case 'Intermediate': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
    case 'Advanced': return 'bg-red-500/20 text-red-300 border-red-500/30';
    default: return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
  }
};

export function EducationalPortal() {
  return (
    <section className="py-20 px-6 bg-slate-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-4 py-2 mb-4">
            <GraduationCap className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-300 text-sm">Educational Portal</span>
          </div>
          <h2 className="text-white mb-4">Learn About Ocean Conservation</h2>
          <p className="text-slate-400 text-xl max-w-3xl mx-auto">
            Interactive resources, infographics, and expert insights on deep-sea ecosystems
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {educationalTopics.map((topic, index) => {
            const Icon = topic.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-slate-800/50 border-cyan-500/20 backdrop-blur-sm overflow-hidden h-full flex flex-col group hover:border-cyan-500/50 transition-all duration-300">
                  <div className="relative h-48 overflow-hidden">
                    <ImageWithFallback
                      src={topic.image}
                      alt={topic.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-800 to-transparent" />
                    <div className="absolute top-4 left-4 w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-cyan-400/30">
                      <Icon className="w-6 h-6 text-cyan-400" />
                    </div>
                  </div>
                  
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-white mb-2">{topic.title}</h3>
                    <p className="text-slate-400 text-sm mb-4 flex-1">{topic.description}</p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="outline" className={getLevelColor(topic.level)}>
                        {topic.level}
                      </Badge>
                      <span className="text-slate-500 text-sm">{topic.duration}</span>
                    </div>

                    <Button 
                      variant="ghost" 
                      className="w-full justify-between text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10"
                    >
                      Start Learning
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-white">
            View All Resources
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
