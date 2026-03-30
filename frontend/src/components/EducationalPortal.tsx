/* 
React component for an educational portal displaying a grid of cards on marine-specific educational topics 
each card includes: 
- background image called upon from assets folder
- Licude-react icons 
- title & description
- colour coded difficulty level badge (beginner / intermediate / advanced) 
- estimated reading duration 
- a 'Start Learning' button with an arrow icon
*/

import { motion } from 'framer-motion';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Microscope, Fish, Leaf, Waves, ChevronRight, GraduationCap } from 'lucide-react';
import MarineSpeciesImage from '../assets/MarineSpeciesProtection.jpeg';
import SedimentPlumesImage from '../assets/SedimentPlumes.jpeg';
import ProtectedAreasImage from '../assets/APEIs&ProtectedAreas.jpeg';
import SustainabilityImage from '../assets/SustainabilityFramework.jpeg';
import { ImageWithFallback } from './ImageWithFallback';

/* 
Array of objects representing topics shown in educational portal 
each object dessribes one topic card
*/
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

/* 
Utility function that takes in a topic's difficulty level and returns corresponding style for the level badge
if the function takes in a level that is not recognised, it returns a default grey style
*/
const getLevelColor = (level: string) => {
  switch (level) {
    case 'Beginner': return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
    case 'Intermediate': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
    case 'Advanced': return 'bg-red-500/20 text-red-300 border-red-500/30';
    default: return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
  }
};


/* 
Renders the header area including the background, title, subtitle, animation of the topic cards
*/
export function EducationalPortal() {

  /* 
  Creates a full-width section with top-bottom and side padding with dark slate background
  Centers the content and limits max width to keep content from stretching too wide 
  animation - fades in and slides up the entire section when it appears
  viewport - animates the first time the section comes into view, not every scroll
  */
  return (
    <section className="py-20 px-6 bg-slate-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          {/* 
          Defines the Educational Portal label that appears above the main title 
          contains a lucide-react graduation cap icon and text is light cyan in colour 
          the label is contained within a rounded capsule shape with a light cyan border and darker background
          defines the main white title and subtitle below it
          */}
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-4 py-2 mb-4">
            <GraduationCap className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-300 text-sm">Educational Portal</span>
          </div>

          <h2 className="text-white mb-4">Learn About Ocean Conservation</h2>
          <p className="text-slate-400 text-xl max-w-3xl mx-auto">
            Interactive resources, infographics, and expert insights on deep-sea ecosystems
          </p>
        </motion.div>

        {/* 
        Creates / defines a grid layout for the topic cards: 
        - 1 column on small screens 
        - 2 columns on medium screens
        - 4 columns on large screens
        - gap between grid items

        EducationalTopics array is mapped (iterated) over to create a card for each topic 
        Icon is extracted from each topic object to be used within the card
        Animation: 
        - each card fades in and slides up when it appears once
        - depending on the index of the card, each card appears 0.1s after the previous one for a staggered effect
        */}
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
                {/* 
                defines the card's layout and styles: 
                - semi-transparennt dark slate background with cynan border which intensifies on hover
                - Image has a fixed image area and calls the ImageWithFallback component to display a fallback image if the main image fails to load
                - Image has a dark-transparent gradient overlay 
                - Icon is placed within a rounded circle at the image's top-left corner
                */}
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

                  {/* 
                  defines a container for the card's content with padding and flex layout to ensure the 'Start Learning' button is at the bottom of the container 
                  topic title is displayed in white with margin below
                  topic description is displayed in light slate colour with flex layout to ensure the card heights are equal 
                  getLevelColour() function is called to get the corresponding styles for the difficulty level badge
                  Start Learning button is styled with cyan text, hover effects and contains arrow icon
                  */}
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

        {/* 
        renders 'View All Resources' button at the bottom of the section 
        animation - fades in the button once when section appears 
        button is large sized with white text, cyan background and hover effects
        */}
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
