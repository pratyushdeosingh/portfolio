'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { timelineEntries } from '@/data/portfolio';

export function ExperienceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experience" className="section-padding" aria-label="Experience and education">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
        >
          <p className="text-sm text-foreground-dim tracking-widest uppercase mb-8">02 — Experience</p>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-16 tracking-tight">
            Education & Journey
          </h2>

          <div className="space-y-12">
            {timelineEntries.map((entry, index) => (
              <motion.div
                key={entry.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
                className="border-t border-border pt-8"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl md:text-2xl font-semibold text-foreground">{entry.title}</h3>
                    <p className="text-foreground-muted mt-1">{entry.organization}</p>
                  </div>
                  <span className="text-sm text-foreground-dim font-mono">{entry.period}</span>
                </div>
                <p className="text-foreground-muted leading-relaxed max-w-2xl">{entry.description}</p>
                {entry.tags && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {entry.tags.map(tag => (
                      <span key={tag} className="text-xs text-foreground-dim border border-border px-3 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
