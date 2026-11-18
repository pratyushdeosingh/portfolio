'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { useRef } from 'react';
import { heroTagline, projects } from '@/data/portfolio';
import { TopoLines } from '@/app/components/effects/topo-lines';
import { Monogram, RotatingBadge } from '@/app/components/ui/monogram';
import { ProjectGlyph } from '@/app/components/ui/project-glyph';

const EASE = [0.16, 1, 0.3, 1] as const;
// Starts after the loader has wiped away.
const START = 1.9;

function Line({ children, delay, className }: { children: React.ReactNode; delay: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <span className={`-mb-[0.08em] block overflow-hidden pb-[0.08em] ${className ?? ''}`}>
      <motion.span
        className="block"
        initial={reduce ? false : { y: '105%' }}
        animate={{ y: 0 }}
        transition={{ duration: 1.1, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const nameY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 120]);
  const nameOpacity = useTransform(scrollYProgress, [0, 0.6], [1, reduce ? 1 : 0]);
  const nameScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 0.9]);
  const topoY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -120]);
  const featured = projects[0];

  const fade = (delay: number) => ({
    initial: reduce ? false : ({ opacity: 0, y: 16 } as const),
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease: EASE }
  });

  return (
    <section
      ref={ref}
      id="hero"
      data-nav="light"
      aria-label="Introduction"
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-cream"
    >
      <motion.div style={{ y: topoY }} className="absolute inset-0 text-ink/[0.09]">
        <TopoLines seed={11} />
      </motion.div>

      {/* Soft lime blob behind the name, echoing the contour peaks */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[46%] h-[40vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-[45%_55%_60%_40%/50%_40%_60%_50%] bg-lime/60 blur-3xl"
      />

      <motion.div
        style={{ y: nameY, scale: nameScale, opacity: nameOpacity }}
        className="container-page relative z-10 flex flex-1 flex-col items-center justify-center pb-40 pt-28 text-center"
      >
        <motion.p {...fade(START)} className="eyebrow mb-6 flex items-center gap-3 text-mute">
          <span className="h-px w-8 bg-mute/50" />
          Computer Science · VIT Chennai
          <span className="h-px w-8 bg-mute/50" />
        </motion.p>

        <h1 className="text-ink">
          <Line delay={START + 0.05} className="display-serif text-[clamp(3.6rem,16vw,15rem)]">
            Pratyush
          </Line>
          <Line delay={START + 0.15} className="display-sans text-[clamp(3.4rem,15.5vw,14.5rem)]">
            Deo Singh
          </Line>
        </h1>

        <motion.p
          {...fade(START + 0.45)}
          className="mx-auto mt-8 max-w-md text-balance text-sm leading-relaxed text-mute md:text-base"
        >
          {heroTagline}
        </motion.p>
      </motion.div>

      {/* Bottom-left "now building" widget */}
      <motion.a
        {...fade(START + 0.6)}
        href="#projects"
        className="group absolute bottom-5 left-4 z-10 hidden w-[10.5rem] sm:block rounded-md border border-ink/15 bg-cream/80 p-2.5 backdrop-blur-sm transition-colors hover:border-ink/40 md:left-6"
      >
        <span className="eyebrow block text-mute">Now building</span>
        <span className="mt-2 flex aspect-[4/3] items-center justify-center rounded-sm bg-olive">
          <ProjectGlyph name={featured.icon} className="h-10 w-10 text-lime transition-transform duration-500 group-hover:scale-110" />
        </span>
        <span className="mt-2 flex items-center justify-between">
          <span className="display-sans text-xs">{featured.short}</span>
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-45" />
        </span>
      </motion.a>

      {/* Bottom-centre badge */}
      <motion.div {...fade(START + 0.7)} className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 sm:block">
        <RotatingBadge text="OPEN TO INTERNSHIPS · CLASS OF 2029 · " className="h-24 w-24 text-ink">
          <Monogram className="h-7 w-7 text-ink" />
        </RotatingBadge>
      </motion.div>

      {/* Bottom-right scroll cue */}
      <motion.a
        {...fade(START + 0.8)}
        href="#about"
        className="eyebrow absolute bottom-6 right-4 z-10 flex items-center gap-2 text-ink md:right-6"
      >
        Scroll
        <span className="flex h-9 w-9 items-center justify-center rounded-md bg-ink text-lime">
          <ArrowDown className="h-4 w-4" />
        </span>
      </motion.a>
    </section>
  );
}
