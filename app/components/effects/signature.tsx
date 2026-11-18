'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/app/lib/utils';

/** A hand-drawn style "P" scrawl with a flourish, drawn on as it scrolls into view. */
const STROKES = [
  'M42 172C56 124 70 66 86 26C91 15 101 12 113 18C137 30 129 71 96 83C80 89 66 87 60 80',
  'M60 80C95 92 112 64 128 52C126 80 132 96 146 86C160 76 166 46 178 40C170 78 166 120 150 150C142 164 134 152 146 132C162 104 196 70 222 58C214 82 220 96 236 88C256 78 262 52 276 46C268 74 280 88 300 74C318 60 330 40 352 30',
  'M28 148C120 134 252 124 384 108C334 126 302 138 290 150'
];

interface SignatureProps {
  className?: string;
  strokeWidth?: number;
  delay?: number;
}

export function Signature({ className, strokeWidth = 6, delay = 0 }: SignatureProps) {
  const reduce = useReducedMotion();

  return (
    <svg
      viewBox="0 0 400 200"
      fill="none"
      aria-hidden="true"
      className={cn('text-lime', className)}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {STROKES.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          strokeWidth={strokeWidth}
          initial={reduce ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          transition={{ duration: i === 1 ? 1.4 : 0.6, delay: delay + [0, 0.55, 1.9][i], ease: 'easeInOut' }}
        />
      ))}
    </svg>
  );
}
