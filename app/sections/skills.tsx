'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { skillGroups } from '@/data/portfolio';

export function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="section-padding" aria-label="Technical skills section">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
        >
          <p className="text-sm text-foreground-dim tracking-widest uppercase mb-8">03 — Skills</p>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-16 tracking-tight">
            Technologies & Tools
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {skillGroups.map((group, index) => (
              <motion.div
                key={group.title as string}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              >
                <h3 className="text-lg font-medium text-foreground mb-4 tracking-wide">
                  {group.title as string}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {group.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-4 py-2 text-sm text-foreground-muted border border-border rounded-full hover:border-foreground/20 hover:text-foreground transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
