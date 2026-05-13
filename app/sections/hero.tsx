'use client';

import { motion } from 'framer-motion';
import { heroTagline } from '@/data/portfolio';

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background-elevated" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-[96px]" />
      </div>

      <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-sm md:text-base text-foreground-muted tracking-widest uppercase mb-8"
        >
          Computer Science Student at VIT Chennai
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-bold mb-8 text-foreground leading-[0.9] tracking-tighter"
        >
          Pratyush
          <br />
          <span className="text-gradient">Deo Singh</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-lg md:text-xl text-foreground-muted max-w-xl mx-auto leading-relaxed"
        >
          {heroTagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="#projects"
            className="px-8 py-4 rounded-full bg-foreground text-background font-medium text-sm tracking-wide hover:bg-foreground/90 transition-colors"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="px-8 py-4 rounded-full border border-border text-foreground font-medium text-sm tracking-wide hover:border-foreground/30 transition-colors"
          >
            Get in Touch
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <a href="#about" className="flex flex-col items-center gap-2 text-foreground-dim hover:text-foreground transition-colors">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-8 bg-foreground-dim animate-pulse" />
        </a>
      </motion.div>
    </section>
  );
}
