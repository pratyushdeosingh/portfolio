'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { useRef } from 'react';
import { heroTagline, projects } from '@/data/portfolio';
import { TopoLines } from '@/app/components/effects/topo-lines';
import { HelmetPortrait } from '@/app/components/effects/helmet-portrait';
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

      <div className="container-page relative z-10 grid flex-1 grid-cols-1 lg:grid-cols-[1.1fr_1fr]">
        {/* Copy */}
        <motion.div
          style={{ y: nameY, scale: nameScale, opacity: nameOpacity }}
          className="flex flex-col items-center justify-center pb-6 pt-28 text-center lg:items-start lg:pb-40 lg:text-left"
        >
          <motion.p {...fade(START)} className="eyebrow mb-6 flex items-center gap-3 text-mute">
            <span className="h-px w-8 bg-mute/50" />
            Computer Science · VIT Chennai
          </motion.p>

          <h1 className="text-ink">
            <Line delay={START + 0.05} className="display-serif text-[clamp(3.4rem,14vw,10.5rem)] lg:text-[clamp(4rem,9.5vw,10.5rem)]">
              Pratyush
            </Line>
            <Line delay={START + 0.15} className="display-sans text-[clamp(3.2rem,13.5vw,10rem)] lg:text-[clamp(3.8rem,9vw,10rem)]">
              Deo Singh
            </Line>
          </h1>

          <motion.p
            {...fade(START + 0.45)}
            className="mt-8 max-w-md text-balance text-sm leading-relaxed text-mute md:text-base"
          >
            {heroTagline}
          </motion.p>
        </motion.div>

        {/* Portrait with the helmet reveal */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: START + 0.2, ease: EASE }}
          className="relative flex min-h-[62svh] items-end justify-center lg:min-h-0"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-[18%] left-1/2 h-[55%] w-[80%] -translate-x-1/2 rounded-[45%_55%_60%_40%/50%_40%_60%_50%] bg-lime/50 blur-3xl"
          />
          <HelmetPortrait className="relative h-[min(60svh,110vw)] lg:h-[min(84svh,52vw)]" />

          <p className="eyebrow absolute left-0 top-[16%] hidden max-w-[11rem] items-start gap-2 text-ink xl:flex">
            <span className="relative mt-0.5 flex h-2 w-2 shrink-0">
              <span className="absolute inset-0 animate-ping rounded-full bg-lime" />
              <span className="relative h-2 w-2 rounded-full bg-ink" />
            </span>
            <span className="[@media(hover:none)]:hidden">Move your cursor to paint the helmet</span>
            <span className="hidden [@media(hover:none)]:inline">Watch the helmet paint itself</span>
          </p>

          <motion.div {...fade(START + 0.7)} className="absolute bottom-24 right-0 hidden lg:block">
            <RotatingBadge text="OPEN TO INTERNSHIPS · CLASS OF 2029 · " className="h-24 w-24 text-ink">
              <Monogram className="h-7 w-7 text-ink" />
            </RotatingBadge>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom-left "now building" widget */}
      <motion.a
        {...fade(START + 0.6)}
        href="#projects"
        className="group absolute bottom-5 left-4 z-10 hidden w-[10.5rem] rounded-md border border-ink/15 bg-cream/80 p-2.5 backdrop-blur-sm transition-colors hover:border-ink/40 sm:block md:left-6"
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

      {/* Scroll cue */}
      <motion.a
        {...fade(START + 0.8)}
        href="#about"
        className="eyebrow absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 text-ink lg:left-[calc(55%-5rem)] lg:translate-x-0"
      >
        Scroll
        <span className="flex h-9 w-9 items-center justify-center rounded-md bg-ink text-lime">
          <ArrowDown className="h-4 w-4" />
        </span>
      </motion.a>
    </section>
  );
}
