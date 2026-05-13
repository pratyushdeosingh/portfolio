'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/app/lib/utils';

interface AccordionProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index?: number;
}

export function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
  index
}: AccordionProps) {
  return (
    <div className="glass-card rounded-xl overflow-hidden">
      <button
        onClick={onToggle}
        className={cn(
          'w-full flex items-center justify-between px-6 py-5 text-left transition-colors',
          isOpen && 'bg-primary/5'
        )}
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          {index !== undefined && (
            <span className="text-xs font-mono text-muted-foreground">
              ({String(index + 1).padStart(2, '0')})
            </span>
          )}
          <span className="font-medium text-foreground">{question}</span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="px-6 pb-5 pt-0">
              <p className="text-muted-foreground leading-relaxed">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
