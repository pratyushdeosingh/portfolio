'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { faqItems } from '@/data/portfolio';
import { Accent, Reveal, SectionHeading } from '@/app/components/ui/reveal';
import { cn } from '@/app/lib/utils';

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="section-padding" aria-label="Frequently asked questions">
      <div className="container-page">
        <div className="grid gap-x-16 lg:grid-cols-[1fr_1.3fr]">
          <SectionHeading index="05" label="FAQ" className="lg:sticky lg:top-32 lg:self-start">
            Common <Accent>questions</Accent>
          </SectionHeading>

          <Reveal>
            <ul className="border-t border-border">
              {faqItems.map((item, index) => {
                const isOpen = openIndex === index;
                return (
                  <li key={item.question} className="border-b border-border">
                    <h3>
                      <button
                        type="button"
                        onClick={() => setOpenIndex(isOpen ? null : index)}
                        aria-expanded={isOpen}
                        aria-controls={`faq-panel-${index}`}
                        id={`faq-button-${index}`}
                        className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                      >
                        <span
                          className={cn(
                            'text-lg font-medium transition-colors md:text-xl',
                            isOpen ? 'text-foreground' : 'text-foreground-muted group-hover:text-foreground'
                          )}
                        >
                          {item.question}
                        </span>
                        <span
                          className={cn(
                            'flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-500',
                            isOpen
                              ? 'rotate-45 border-primary/50 bg-primary-muted text-primary'
                              : 'border-border text-foreground-dim group-hover:border-border-hover'
                          )}
                        >
                          <Plus className="h-4 w-4" aria-hidden="true" />
                        </span>
                      </button>
                    </h3>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={`faq-panel-${index}`}
                          role="region"
                          aria-labelledby={`faq-button-${index}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="max-w-xl pb-7 pr-12 leading-relaxed text-foreground-muted">{item.answer}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
