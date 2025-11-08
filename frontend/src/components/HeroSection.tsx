import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Waves, ChevronDown } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-cyan-400 via-blue-600 to-blue-950">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-cyan-300/30 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              x: [null, Math.random() * window.innerWidth],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Wave animation overlay */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-32"
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Waves className="w-full h-full text-blue-950/30" strokeWidth={0.5} />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-block mb-6"
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="w-16 h-16 mx-auto bg-cyan-400/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-cyan-300/30">
              <Waves className="w-8 h-8 text-cyan-300" />
            </div>
          </motion.div>

          <h1 className="text-white mb-6">
            Discover, Conserve, and Collaborate for Our Deep-Sea Future
          </h1>
          
          <p className="text-cyan-100 text-xl mb-10 max-w-3xl mx-auto">
            A unified digital platform bridging science, policy, and public awareness
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-white border-0 shadow-lg shadow-cyan-500/50">
                Explore Data
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-sm">
                Join the Mission
              </Button>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <ChevronDown className="w-8 h-8 text-cyan-300" />
        </motion.div>
      </div>
    </section>
  );
}
