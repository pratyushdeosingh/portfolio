'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { faqItems } from '@/data/portfolio';
import { MaskLine, Reveal } from '@/app/components/ui/reveal';
import { cn } from '@/app/lib/utils';

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" data-nav="light" aria-label="Frequently asked questions" className="bg-stone py-28 md:py-40">
      <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <h2 className="text-ink lg:sticky lg:top-28 lg:self-start">
          <MaskLine className="display-serif text-[clamp(3rem,7vw,6rem)]">Good</MaskLine>
          <MaskLine delay={0.08} className="display-sans text-[clamp(3rem,7vw,6rem)]">
            Questions
          </MaskLine>
        </h2>

        <Reveal>
          <ul className="border-t border-dashed border-ink/40">
            {faqItems.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <li key={item.question} className="border-b border-dashed border-ink/40">
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${index}`}
                      id={`faq-button-${index}`}
                      className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                    >
                      <span className="display-sans text-lg leading-tight text-ink md:text-2xl">{item.question}</span>
                      <span
                        className={cn(
                          'flex h-10 w-10 shrink-0 items-center justify-center rounded-md transition-all duration-500',
                          isOpen ? 'rotate-45 bg-ink text-lime' : 'bg-lime text-ink group-hover:rotate-90'
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
                        <p className="max-w-xl pb-7 pr-12 leading-relaxed text-mute">{item.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
