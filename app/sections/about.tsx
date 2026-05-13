'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { aboutParagraphs } from '@/data/portfolio';

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="section-padding" aria-label="About me section">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
        >
          <p className="text-sm text-foreground-dim tracking-widest uppercase mb-8">01 — About</p>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-12 tracking-tight">
            A driven student with a passion for{' '}
            <span className="text-gradient">building things</span>
          </h2>

          <div className="space-y-8 max-w-3xl">
            {aboutParagraphs.map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 + index * 0.15 }}
                className="text-lg md:text-xl text-foreground-muted leading-relaxed"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
