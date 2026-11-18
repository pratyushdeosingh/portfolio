'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { cn } from '@/app/lib/utils';

const EASE = [0.16, 1, 0.3, 1] as const;

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}

/** Fades and lifts its children into place the first time they scroll into view. */
export function Reveal({ children, delay = 0, y = 32, className }: RevealProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -80px 0px' }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

/** A line of display type that slides up from behind a mask when it enters the viewport. */
export function MaskLine({
  children,
  delay = 0,
  className
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <span className={cn('-mb-[0.1em] block overflow-hidden pb-[0.1em]', className)}>
      <motion.span
        className="block"
        initial={reduce ? false : { y: '105%' }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/** Moves its children vertically at a different rate from the page scroll. */
export function Parallax({
  children,
  speed = 0.2,
  className
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [speed * 240, speed * -240]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
