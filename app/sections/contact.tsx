'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { socialLinks } from '@/data/portfolio';
import { Mail, ArrowUpRight } from 'lucide-react';

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="contact" className="section-padding" aria-label="Contact section">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
        >
          <p className="text-sm text-foreground-dim tracking-widest uppercase mb-8">07 — Contact</p>

          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-foreground mb-8 tracking-tight">
            Let's work{' '}
            <span className="text-gradient">together</span>
          </h2>

          <p className="text-lg md:text-xl text-foreground-muted max-w-xl mb-12">
            Have a project in mind or just want to chat? I'm always open to discussing new opportunities.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-start gap-8"
          >
            <a
              href="mailto:workforpratyush@gmail.com"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-foreground text-background font-medium text-sm tracking-wide hover:bg-foreground/90 transition-colors"
            >
              <Mail className="w-4 h-4" />
              workforpratyush@gmail.com
            </a>

            <div className="flex items-center gap-4">
              {socialLinks.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('mailto') ? undefined : '_blank'}
                  rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                  className="p-3 rounded-full border border-border text-foreground-dim hover:text-foreground hover:border-foreground/30 transition-colors"
                  aria-label={link.label}
                >
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
