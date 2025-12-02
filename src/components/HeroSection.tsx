/* 
React component that renders the hero section which: 
- displays animated floating particles in the background 
- shows a centered wave icon that animates up and down
- displays a headline, subtext, and 2 call-to-action buttons with hover effects
- animates the content as it appears using framer-motion
- shows a downward pointing chevron icon at the bottom to indicate scrolllng
*/ 
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Waves, ChevronDown } from 'lucide-react';
import { FloatingParticles } from './ui/FloatingParticles';

/* 
defines the main content wrapper that centers content, places it above the floating particles & paddes the section horizontally
calls upon the FloatingParticles component to render animated particles in background
*/ 
export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-cyan-400 via-blue-600 to-blue-950">
      <FloatingParticles />

      {/* animation - fades in and moves content up slightly when section appears, lasts 0.8s */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* creates a circular container with  wave icon centered inside that animates up and down repeatedly */}
          <motion.div
            className="inline-block mb-6"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-16 h-16 mx-auto bg-cyan-400/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-cyan-300/30">
              <Waves className="w-8 h-8 text-cyan-300" />
            </div>
          </motion.div>

          {/* defines a main headline with margin and subtext below */}
          <h1 className="text-white mb-6">
            Discover, Conserve, and Collaborate for Our Deep-Sea Future
          </h1>

          <p className="text-cyan-100 text-xl mb-10 max-w-3xl mx-auto">
            A unified digital platform bridging science, policy, and public awareness
          </p>

          {/* defines the call-to-action button containers with gaps between them and scaling animations on hover and tap */}
          <div className="flex flex-wrap gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-white shadow-lg shadow-cyan-500/50">
                Explore Data
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-sm">
                Join the Mission
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* defines a downward  chevron icon at bottom center that animates up and down to indicate scrolling */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-8 h-8 text-cyan-300" />
        </motion.div>
      </div>
    </section>
  );
}
