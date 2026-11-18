'use client';

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useRef } from 'react';
import { aboutParagraphs } from '@/data/portfolio';
import { TopoLines } from '@/app/components/effects/topo-lines';
import { Marquee } from '@/app/components/ui/marquee';
import { Monogram, RotatingBadge } from '@/app/components/ui/monogram';
import { Reveal } from '@/app/components/ui/reveal';
import { cn } from '@/app/lib/utils';

/** Words wrapped in *asterisks* render in the lime serif voice. */
const STATEMENT = '*Building* things, *understanding* how they work, and *levelling up* one commit at a time.';

const ROW_A = ['Build', 'Break', 'Learn', 'Repeat'];
const ROW_B = ['C++', 'Python', 'DSA', 'React', 'Java', 'Next.js'];

function Word({
  word,
  accent,
  progress,
  range
}: {
  word: string;
  accent: boolean;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span
      style={{ opacity }}
      className={cn('mr-[0.22em] inline-block', accent ? 'display-serif text-lime' : 'display-sans text-cream')}
    >
      {word}
    </motion.span>
  );
}

export function StatementSection() {
  const textRef = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: textRef, offset: ['start 0.85', 'end 0.5'] });

  const words: { word: string; accent: boolean }[] = [];
  STATEMENT.split(/(\*[^*]+\*)/).forEach(chunk => {
    if (!chunk.trim()) return;
    const accent = chunk.startsWith('*');
    chunk
      .replace(/\*/g, '')
      .trim()
      .split(/\s+/)
      .forEach(word => words.push({ word, accent }));
  });

  return (
    <section id="about" data-nav="dark" aria-label="About me" className="relative overflow-hidden bg-olive pb-28 md:pb-40">
      <div className="absolute inset-0 text-cream/[0.06]">
        <TopoLines seed={23} />
      </div>

      {/* Giant moving type */}
      <div className="relative pt-24 md:pt-32" aria-hidden="true">
        <Marquee speed={40} className="text-cream/90">
          {ROW_A.map(word => (
            <span key={word} className="display-serif px-[0.25em] text-[clamp(4rem,13vw,12rem)]">
              {word}
              <span className="px-[0.25em] text-lime">·</span>
            </span>
          ))}
        </Marquee>
        <Marquee speed={46} direction="right" className="text-cream/90">
          {ROW_B.map(word => (
            <span key={word} className="display-sans px-[0.25em] text-[clamp(4rem,13vw,12rem)]">
              {word}
              <span className="px-[0.25em] text-lime">/</span>
            </span>
          ))}
        </Marquee>
      </div>

      <div className="container-page relative mt-20 flex flex-col items-center md:mt-28">
        <RotatingBadge text="BUILD · BREAK · LEARN · REPEAT · " className="mb-12 h-20 w-20 text-sage">
          <Monogram className="h-6 w-6 text-lime" />
        </RotatingBadge>

        <p
          ref={textRef}
          className="max-w-5xl text-center text-[clamp(2.4rem,6.4vw,6rem)] leading-[0.95]"
          aria-label={STATEMENT.replace(/\*/g, '')}
        >
          {words.map((w, i) =>
            reduce ? (
              <span
                key={i}
                className={cn('mr-[0.22em] inline-block', w.accent ? 'display-serif text-lime' : 'display-sans text-cream')}
              >
                {w.word}
              </span>
            ) : (
              <Word
                key={i}
                word={w.word}
                accent={w.accent}
                progress={scrollYProgress}
                range={[i / words.length, (i + 1) / words.length]}
              />
            )
          )}
        </p>

        <div className="mt-20 grid w-full max-w-5xl gap-8 border-t border-dashed border-cream/25 pt-10 md:grid-cols-3">
          {aboutParagraphs.map((paragraph, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <span className="eyebrow text-lime">{String(i + 1).padStart(2, '0')}</span>
              <p className="mt-3 text-sm leading-relaxed text-cream/75 md:text-[15px]">{paragraph}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
