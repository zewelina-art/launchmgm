import React from 'react';
import { motion } from 'motion/react';

export const HeroGraphic: React.FC = () => {
  return (
    <div className="w-full h-full bg-ink overflow-hidden relative flex items-center justify-center">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-ink via-ink to-ember/20" />

      {/* Decorative grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'linear-gradient(rgba(250,246,238,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(250,246,238,0.15) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Animated circles */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.14, 0.08] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute w-[600px] h-[600px] rounded-full border border-ember/20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      />
      <motion.div
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.06, 0.12, 0.06] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute w-[800px] h-[800px] rounded-full border border-ember/10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      />

      {/* Floating accent dots */}
      {[
        { x: '15%', y: '25%', size: 8, delay: 0 },
        { x: '80%', y: '30%', size: 5, delay: 1 },
        { x: '70%', y: '70%', size: 10, delay: 2 },
        { x: '25%', y: '75%', size: 6, delay: 0.5 },
        { x: '50%', y: '15%', size: 7, delay: 1.5 },
      ].map((dot, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -12, 0], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut', delay: dot.delay }}
          className="absolute rounded-full bg-ember"
          style={{
            left: dot.x,
            top: dot.y,
            width: dot.size,
            height: dot.size,
          }}
        />
      ))}

      {/* City name watermark */}
      <div className="relative text-center select-none pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.8em] text-ember mb-3 font-body">
            Montgomery, Alabama
          </p>
          <h2
            className="font-display font-black text-paper leading-none tracking-tight"
            style={{ fontSize: 'clamp(3rem, 10vw, 8rem)' }}
          >
            Launch
            <span className="text-ember">MGM</span>
          </h2>
          <p className="text-paper/40 text-sm uppercase tracking-[0.4em] mt-4 font-body">
            Your business starts here
          </p>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-ink to-transparent" />
    </div>
  );
};
