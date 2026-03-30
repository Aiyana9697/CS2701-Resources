/*
renders a "Learning Modules" section for the dashboard, which includes:
1. An "Educational Portal" subsection that showcases different portals (Student Portal, Teacher Resources, Interactive Timelines, Infographics Hub, Guided Learning Paths, Knowledge Quizzes) with images, descriptions, and an "Enter Portal" button for each. The portals are displayed in a responsive grid layout with entry animations and hover effects.
2. A "Continue Learning" subsection that displays in-progress learning modules in a horizontally scrollable carousel, with module details, progress bars, and a "Continue" button for each. 
Completed modules are displayed in a grid below. The section uses framer-motion for animations and has navigation buttons to scroll through the carousel.

*/
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { 
  GraduationCap, 
  ChevronLeft, 
  ChevronRight,
  Fish,
  Waves,
  Anchor,
  Compass,
  Ship,
  Microscope, 
  BookOpen,
  ArrowRight,
  Clock,
  BarChart3,
  Lightbulb,
  Award,
  Users, 
} from 'lucide-react';
import { ImageWithFallback } from '../ImageWithFallback';
import StudentPortalImage from '../../assets/StudentPortal.jpeg';
import TeacherResourcesImage from '../../assets/TeacherResources.jpeg';
import InteractiveTimelinesImage from '../../assets/InteractiveTimelines.jpeg';
import InfographicsHubImage from '../../assets/InfographicsHub.jpeg';
import GuidedLearningPathsImage from '../../assets/GuidedLearningPaths.jpeg';
import KnowledgeQuizzesImage from '../../assets/KnowledgeQuizzes.jpeg';

interface LearningModule {
  id: string;
  icon: any;
  title: string;
  progress: number;
  status: 'in-progress' | 'completed' | 'not-started';
  lessons: number;
  duration: string;
}
const educationalPortals = [
  {
    icon: GraduationCap,
    title: 'Student Portal',
    description: 'Interactive learning modules, quizzes, and deep-sea exploration resources tailored for students.',
    image: StudentPortalImage,
    color: 'cyan'
  },
  {
    icon: Users,
    title: 'Teacher Resources',
    description: 'Lesson plans, educational materials, and classroom activities for marine conservation education.',
    image: TeacherResourcesImage,
    color: 'blue'
  },
  {
    icon: Clock,
    title: 'Interactive Timelines',
    description: 'Explore the history of ocean exploration, ISA milestones, UNCLOS, AREA2030, and key environmental events.',
    image: InteractiveTimelinesImage,
    color: 'teal'
  },
  {
    icon: BarChart3,
    title: 'Infographics Hub',
    description: 'Visual explanations of sediment plumes, sustainable mining practices, and ecosystem protection.',
    image: InfographicsHubImage,
    color: 'indigo'
  },
  {
    icon: Lightbulb,
    title: 'Guided Learning Paths',
    description: 'Structured courses from marine biology basics to advanced conservation strategies.',
    image: GuidedLearningPathsImage,
    color: 'purple'
  },
  {
    icon: Award,
    title: 'Knowledge Quizzes',
    description: 'Test your deep-sea knowledge with interactive quizzes and earn achievement badges.',
    image: KnowledgeQuizzesImage,
    color: 'emerald'
  },
];


const learningModules: LearningModule[] = [
  {
    id: '1',
    icon: Fish,
    title: 'Marine Species Basics',
    progress: 75,
    status: 'in-progress',
    lessons: 8,
    duration: '2h 30m'
  },
  {
    id: '2',
    icon: Waves,
    title: 'Ocean Currents & Climate',
    progress: 100,
    status: 'completed',
    lessons: 6,
    duration: '1h 45m'
  },
  {
    id: '3',
    icon: Anchor,
    title: 'Deep-Sea Mining Impact',
    progress: 40,
    status: 'in-progress',
    lessons: 10,
    duration: '3h 15m'
  },
  {
    id: '4',
    icon: Compass,
    title: 'Navigation & Mapping',
    progress: 0,
    status: 'not-started',
    lessons: 7,
    duration: '2h 00m'
  },
  {
    id: '5',
    icon: Ship,
    title: 'Sustainable Exploration',
    progress: 100,
    status: 'completed',
    lessons: 5,
    duration: '1h 30m'
  },
  {
    id: '6',
    icon: Microscope,
    title: 'Marine Biology Research',
    progress: 60,
    status: 'in-progress',
    lessons: 9,
    duration: '2h 45m'
  },
];

export function LearningModules() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30';
      case 'in-progress':
        return 'bg-cyan-500/20 text-cyan-300 border-cyan-400/30';
      case 'not-started':
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
      default:
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'in-progress':
        return 'In Progress';
      case 'not-started':
        return 'Not Started';
      default:
        return 'Unknown';
    }
  };

  const inProgressModules = learningModules.filter(m => m.status === 'in-progress');
  const completedModules = learningModules.filter(m => m.status === 'completed');

  return (
    <section id="learn" className="py-9 px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center border border-cyan-400/30">
            <BookOpen className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <h2 className="text-white">Educational Portal</h2>
            <p className="text-slate-400">Making complex marine data and science accessible to everyone</p>
          </div>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {educationalPortals.map((portal, index) => {
          const Icon = portal.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-[#071821]/80 border-cyan-400/30 rounded-3xl overflow-hidden h-full flex flex-col group hover:border-cyan-400/60 transition-all duration-500 hover:shadow-lg hover:shadow-cyan-500/20">
                {/* Image Header */}
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={portal.image}
                    alt={portal.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071821] via-[#071821]/50 to-transparent" />
                  
                  {/* Icon */}
                  <div className="absolute top-4 left-4 w-14 h-14 rounded-2xl bg-cyan-500/20 backdrop-blur-md border border-cyan-400/30 flex items-center justify-center">
                    <Icon className="w-7 h-7 text-cyan-400" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-white mb-3">{portal.title}</h3>
                  <p className="text-slate-400 text-sm mb-6 flex-1 leading-relaxed">
                    {portal.description}
                  </p>

                  <Button 
                    className="w-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-400/30 hover:from-cyan-500/30 hover:to-blue-500/30 group/btn"
                  >
                    <span>Enter Portal</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

    <section className="py-16 px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center border border-cyan-400/30">
            <GraduationCap className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <h2 className="text-white">Learning Modules</h2>
            <p className="text-slate-400">Continue your ocean exploration journey</p>
          </div>
        </div>
      </motion.div>

      {/* Continue Learning Section */}
      <div className="mb-10">
        <h3 className="text-white mb-4">Continue Learning</h3>
        <div className="relative">
          <Button
            size="sm"
            variant="outline"
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-[#071821]/90 border-cyan-400/30 text-cyan-400 hover:bg-cyan-500/20 backdrop-blur-sm"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {inProgressModules.map((module, index) => {
              const Icon = module.icon;
              return (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex-shrink-0 w-80"
                >
                  <Card className="bg-gradient-to-br from-[#071821]/90 to-cyan-900/20 border-cyan-400/30 p-6 rounded-3xl hover:border-cyan-400/60 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 h-full">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 flex items-center justify-center border border-cyan-400/30">
                        <Icon className="w-6 h-6 text-cyan-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white mb-1">{module.title}</h4>
                        <p className="text-slate-400 text-sm">
                          {module.lessons} lessons · {module.duration}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">Progress</span>
                        <span className="text-cyan-300">{module.progress}%</span>
                      </div>
                      <Progress value={module.progress} className="h-2" />
                    </div>

                    <div className="flex items-center justify-between">
                      <Badge className={getStatusColor(module.status)}>
                        {getStatusLabel(module.status)}
                      </Badge>
                      <Button
                        size="sm"
                        className="bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 hover:bg-cyan-500/30"
                      >
                        Continue
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          <Button
            size="sm"
            variant="outline"
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-[#071821]/90 border-cyan-400/30 text-cyan-400 hover:bg-cyan-500/20 backdrop-blur-sm"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Completed Modules Grid */}
      <div>
        <h3 className="text-white mb-4">Completed Modules</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {completedModules.map((module, index) => {
            const Icon = module.icon;
            return (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-[#071821]/60 border-emerald-400/30 p-4 rounded-2xl hover:border-emerald-400/50 transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center border border-emerald-400/30">
                      <Icon className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white text-sm">{module.title}</h4>
                      <p className="text-emerald-300 text-xs">✓ Completed</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  </section>
  );
}
