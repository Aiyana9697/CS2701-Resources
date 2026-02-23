/*
renders the "Saved Items" section of the dashboard, which displays a horizontally scrollable list of items that the user has bookmarked for quick access
Each item is represented as a card with a thumbnail image, title, type badge (indicating whether it's a region, dataset, lesson, or species), date it was saved
Section includes left and right navigation buttons to scroll through the items, and uses framer-motion for entry animations and hover effects on the cards.
*/
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ImageWithFallback } from '../ImageWithFallback';
import InteractiveTimelinesImage from '../../assets/InteractiveTimelines.jpeg';
import TeacherResourcesImage from '../../assets/TeacherResources.jpeg';
import StudentPortalImage from '../../assets/StudentPortal.jpeg';
import GuidedLearningPathImage from '../../assets/GuidedLearningPaths.jpeg';
import InfographicsHubImage from '../../assets/InfographicsHub.jpeg';
import { 
  Bookmark, 
  ChevronLeft, 
  ChevronRight,
  MapPin,
  Database,
  BookOpen,
  Fish
} from 'lucide-react';

interface SavedItem {
  id: string;
  type: 'region' | 'dataset' | 'lesson' | 'species';
  title: string;
  thumbnail: string;
  date: string;
}

const savedItems: SavedItem[] = [
  {
    id: '1',
    type: 'region',
    title: 'Clarion-Clipperton Zone',
    thumbnail: InteractiveTimelinesImage,
    date: '2 days ago'
  },
  {
    id: '2',
    type: 'dataset',
    title: 'Pacific Biodiversity Survey 2024',
    thumbnail: TeacherResourcesImage,
    date: '3 days ago'
  },
  {
    id: '3',
    type: 'lesson',
    title: 'Marine Species Basics - Module 3',
    thumbnail: StudentPortalImage,
    date: '5 days ago'
  },
  {
    id: '4',
    type: 'species',
    title: 'Deep-sea Anglerfish',
    thumbnail: GuidedLearningPathImage,
    date: '1 week ago'
  },
  {
    id: '5',
    type: 'region',
    title: 'Mid-Atlantic Ridge',
    thumbnail: InfographicsHubImage,
    date: '1 week ago'
  },
  {
    id: '6',
    type: 'lesson',
    title: 'Sustainable Exploration Practices',
    thumbnail: StudentPortalImage,
    date: '2 weeks ago'
  },
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'region': return MapPin;
    case 'dataset': return Database;
    case 'lesson': return BookOpen;
    case 'species': return Fish;
    default: return Bookmark;
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'region': return 'bg-blue-500/20 text-blue-300 border-blue-400/30';
    case 'dataset': return 'bg-purple-500/20 text-purple-300 border-purple-400/30';
    case 'lesson': return 'bg-cyan-500/20 text-cyan-300 border-cyan-400/30';
    case 'species': return 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30';
    default: return 'bg-slate-500/20 text-slate-300 border-slate-400/30';
  }
};

export function SavedItems() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-16 px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center border border-cyan-400/30">
              <Bookmark className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <h2 className="text-white">Saved Items</h2>
              <p className="text-slate-400">Quick access to your bookmarked content</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => scroll('left')}
              className="bg-[#071821]/90 border-cyan-400/30 text-cyan-400 hover:bg-cyan-500/20"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => scroll('right')}
              className="bg-[#071821]/90 border-cyan-400/30 text-cyan-400 hover:bg-cyan-500/20"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </motion.div>

      <div
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {savedItems.map((item, index) => {
          const Icon = getTypeIcon(item.type);
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex-shrink-0 w-72"
            >
              <Card className="bg-[#071821]/80 border-cyan-400/30 rounded-3xl overflow-hidden hover:border-cyan-400/60 transition-all hover:shadow-lg hover:shadow-cyan-500/20 group cursor-pointer">
                <div className="relative h-40 overflow-hidden">
                  <ImageWithFallback
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071821] via-[#071821]/50 to-transparent" />
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-cyan-500/20 backdrop-blur-md border border-cyan-400/30 flex items-center justify-center">
                    <Bookmark className="w-4 h-4 text-cyan-400 fill-cyan-400" />
                  </div>
                </div>
          
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className={getTypeColor(item.type)}>
                      <Icon className="w-3 h-3 mr-1" />
                      {item.type}
                    </Badge>
                    <span className="text-slate-500 text-xs">{item.date}</span>
                  </div>
                  <h4 className="text-white text-sm line-clamp-2">{item.title}</h4>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
