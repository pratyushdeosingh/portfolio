'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { useRef } from 'react';
import { heroTagline } from '@/data/portfolio';
import { TopoLines, buildContours } from '@/app/components/effects/topo-lines';
import { PaintReveal } from '@/app/components/effects/paint-reveal';
import { Monogram, RotatingBadge } from '@/app/components/ui/monogram';
import { cn } from '@/app/lib/utils';

const EASE = [0.16, 1, 0.3, 1] as const;
// Starts after the loader has wiped away.
const START = 1.9;

// Lime "livery" fill with dark contour stripes, used for the painted copy of the name.
const LIVERY = (() => {
  const paths = buildContours(303)
    .map(d => `<path d='${d}'/>`)
    .join('');
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 1000'><rect width='1600' height='1000' fill='#d2ff00'/><g fill='none' stroke='#111112' stroke-width='14'>${paths}</g></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
})();

const liveryStyle: React.CSSProperties = {
  backgroundImage: LIVERY,
  backgroundSize: '1200px 750px',
  backgroundPosition: 'center',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
  WebkitTextStroke: '1.5px #111112'
};

function Line({
  children,
  delay,
  className,
  style
}: {
  children: React.ReactNode;
  delay: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const reduce = useReducedMotion();
  return (
    <span className={cn('-mb-[0.08em] block overflow-hidden pb-[0.08em]', className)}>
      <motion.span
        className="block"
        style={style}
        initial={reduce ? false : { y: '105%' }}
        animate={{ y: 0 }}
        transition={{ duration: 1.1, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

function NameLines({ painted = false }: { painted?: boolean }) {
  const style = painted ? liveryStyle : undefined;
  return (
    <>
      <Line delay={START + 0.05} style={style} className="display-serif text-[clamp(3.6rem,16vw,15rem)]">
        Pratyush
      </Line>
      <Line delay={START + 0.15} style={style} className="display-sans text-[clamp(3.4rem,15.5vw,14.5rem)]">
        Deo Singh
      </Line>
    </>
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

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[46%] h-[40vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-[45%_55%_60%_40%/50%_40%_60%_50%] bg-lime/50 blur-3xl"
      />

      <motion.div
        style={{ y: nameY, scale: nameScale, opacity: nameOpacity }}
        className="container-page relative z-10 flex flex-1 flex-col items-center justify-center pb-36 pt-28 text-center"
      >
        <motion.p {...fade(START)} className="eyebrow mb-6 flex items-center gap-3 text-mute">
          <span className="h-px w-8 bg-mute/50" />
          Computer Science · VIT Chennai
          <span className="h-px w-8 bg-mute/50" />
        </motion.p>

        <h1 className="text-ink">
          <PaintReveal areaRef={ref} overlay={<NameLines painted />}>
            <NameLines />
          </PaintReveal>
        </h1>

        <motion.p
          {...fade(START + 0.45)}
          className="mx-auto mt-8 max-w-md text-balance text-sm leading-relaxed text-mute md:text-base"
        >
          {heroTagline}
        </motion.p>

        <motion.p {...fade(START + 0.6)} className="eyebrow mt-8 flex items-center gap-2 text-ink">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="absolute inset-0 animate-ping rounded-full bg-lime" />
            <span className="relative h-2 w-2 rounded-full bg-ink" />
          </span>
          <span className="[@media(hover:none)]:hidden">Move your cursor over my name</span>
          <span className="hidden [@media(hover:none)]:inline">Watch my name paint itself</span>
        </motion.p>
      </motion.div>

      <motion.div {...fade(START + 0.7)} className="absolute bottom-6 left-4 z-10 hidden sm:block md:left-6">
        <RotatingBadge text="OPEN TO INTERNSHIPS · CLASS OF 2029 · " className="h-24 w-24 text-ink">
          <Monogram className="h-7 w-7 text-ink" />
        </RotatingBadge>
      </motion.div>

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
