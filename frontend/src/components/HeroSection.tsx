import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Waves, ChevronDown } from 'lucide-react';
import './HeroSection.css';

export function HeroSection() {
  return (
    <section className="hero-section">
      {/* Animated particles */}
      <div className="particles">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="particle"
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
              duration: 10 + Math.random() * 10 ,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>



      {/* Content */}
      <div className="content">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
         
          <motion.div
            className="logo-wrapper"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Waves className="w-8 h-8 text-cyan-300" />
          </motion.div>


          <h1>Discover, Conserve, and Collaborate for Our Deep-Sea Future</h1>
          <p>
            A unified digital platform bridging science, policy, and public awareness
          </p>


          <div className="buttons">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="hero-button explore">Explore Data</Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="hero-button join">Join the Mission</Button>
            </motion.div>
          </div>
        </motion.div>




        <div className="scroll-down">
          <ChevronDown className="w-8 h-8" />
        </div>
      </div>
    </section>
  );
}
