/*
UI component that renders 40 floating particles that moves slowly and randomly around the screen
uses framer-motion for smooth animations
each particle is a small circle with a cyan colour and some transparency
particles start at random positions within the viewport and animate to new random positions continuously
*/
import { motion } from "framer-motion";

/*
defines the container div that fills the entire parent element using absolute positioning
creates an array of 40 empty elements and maps over them to render 40 motion.div particles: 
- key is used to give each particle a unique identifier
- className styles each particle as a small circle with semi-transparent cyan colour 
- each particle is given a random initial position using Math.random() 
- particles animate to a new random position and opacity is changed over time to make them appear and disappear smoothly

typeof window check whether the code in running in the browser (where window is defined) or server (where window is undefined)
this prevents errors by ensuring window isnt used when its unavailable 
fallback value (1000) is used when real screen size is undefined so code can still calculate random position without crashing

transition - each paricle moves for 10 - 30 seconds before repeating the animation infinitely with a linear easing for smooth movement
*/
export function FloatingParticles() {
  return (
    <div className="absolute inset-0">
      {[...Array(40)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-cyan-300/70 rounded-full"
          initial={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
          }}
          animate={{
            y: [null, Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000)],
            x: [null, Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000)],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 10 + Math.random() * 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}