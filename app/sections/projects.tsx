'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { projects } from '@/data/portfolio';
import { ArrowUpRight } from 'lucide-react';

export function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="projects" className="section-padding" aria-label="Projects section">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
        >
          <p className="text-sm text-foreground-dim tracking-widest uppercase mb-8">04 — Projects</p>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-16 tracking-tight">
            Featured Work
          </h2>

          <div className="space-y-0">
            {projects.map((project, index) => (
              <motion.a
                key={project.title}
                href={project.actions[0]?.href || '#'}
                target={project.actions[0]?.external ? '_blank' : undefined}
                rel={project.actions[0]?.external ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
                className="group block border-t border-border py-8 md:py-12 transition-colors hover:bg-background-elevated/50"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-sm font-mono text-foreground-dim">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h3 className="text-2xl md:text-3xl font-semibold text-foreground group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                    </div>
                    <p className="text-foreground-muted max-w-xl">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.tags.map(tag => (
                        <span key={tag} className="text-xs text-foreground-dim">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="shrink-0 mt-4 md:mt-0">
                    <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center group-hover:border-foreground/30 transition-colors">
                      <ArrowUpRight className="w-5 h-5 text-foreground-dim group-hover:text-foreground transition-colors" />
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}
            <div className="border-t border-border" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
