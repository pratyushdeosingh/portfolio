'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { testimonials } from '@/data/portfolio';

export function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="testimonials" className="section-padding" aria-label="Testimonials">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
        >
          <p className="text-sm text-foreground-dim tracking-widest uppercase mb-8">05 — Testimonials</p>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-16 tracking-tight">
            What People Say
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name + index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
                className="border border-border rounded-2xl p-8"
              >
                <p className="text-foreground-muted leading-relaxed mb-6 italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold text-sm">
                    {testimonial.initials}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{testimonial.name}</p>
                    <p className="text-xs text-foreground-dim">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
