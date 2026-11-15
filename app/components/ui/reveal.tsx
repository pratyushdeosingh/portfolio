'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/app/lib/utils';

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}

/** Fades and lifts its children into place the first time they scroll into view. */
export function Reveal({ children, delay = 0, y = 28, className }: RevealProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '0px 0px -80px 0px' }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

interface SectionHeadingProps {
  index: string;
  label: string;
  children: React.ReactNode;
  description?: string;
  className?: string;
}

export function SectionHeading({ index, label, children, description, className }: SectionHeadingProps) {
  return (
    <Reveal className={cn('mb-14 lg:mb-20', className)}>
      <div className="mb-6 flex items-center gap-4 font-mono text-xs uppercase tracking-[0.25em] text-foreground-dim">
        <span className="text-primary">{index}</span>
        <span className="h-px w-10 bg-border-hover" />
        <span>{label}</span>
      </div>
      <h2 className="max-w-3xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-foreground md:text-5xl lg:text-6xl">
        {children}
      </h2>
      {description && (
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground-muted">{description}</p>
      )}
    </Reveal>
  );
}

/** Serif italic accent used inside headings. */
export function Accent({ children }: { children: React.ReactNode }) {
  return <span className="text-gradient pr-[0.08em] font-serif font-normal italic">{children}</span>;
}
