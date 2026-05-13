'use client';

import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { faqItems } from '@/data/portfolio';
import { ChevronDown } from 'lucide-react';

export function FAQSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="section-padding" aria-label="Frequently asked questions">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
        >
          <p className="text-sm text-foreground-dim tracking-widest uppercase mb-8">06 — FAQ</p>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-16 tracking-tight">
            Common Questions
          </h2>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <motion.div
                key={item.question}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="border border-border rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                  aria-expanded={openIndex === index}
                >
                  <span className="text-foreground font-medium pr-4">{item.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-foreground-dim shrink-0 transition-transform duration-300 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-5">
                    <p className="text-foreground-muted leading-relaxed">{item.answer}</p>
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
