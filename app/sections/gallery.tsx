'use client';

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity
} from 'framer-motion';
import { Code2, GraduationCap, HardHat, MapPin, ShieldAlert, type LucideIcon } from 'lucide-react';
import { useLayoutEffect, useRef, useState } from 'react';
import { projects } from '@/data/portfolio';
import { TopoLines } from '@/app/components/effects/topo-lines';
import { PhotoPlaceholder, type PlaceholderVariant } from '@/app/components/ui/photo-placeholder';
import { cn } from '@/app/lib/utils';

type Frame =
  | {
      kind: 'photo';
      caption: string;
      variant: PlaceholderVariant;
      icon?: LucideIcon;
      size: 'tall' | 'wide' | 'small';
      align: 'top' | 'center' | 'bottom';
      seed: number;
    }
  | { kind: 'quote'; text: string }
  | { kind: 'stat'; value: string; label: string };

const FRAMES: Frame[] = [
  { kind: 'photo', caption: 'VIT Chennai, 2025', variant: 'topo', icon: GraduationCap, size: 'tall', align: 'center', seed: 12 },
  { kind: 'quote', text: 'A strong interest in building things and understanding how they work at a deeper level.' },
  { kind: 'photo', caption: 'First lines of C++, 2023', variant: 'halftone', icon: Code2, size: 'small', align: 'bottom', seed: 3 },
  { kind: 'photo', caption: 'Hackathon nights, 2025', variant: 'lime', size: 'wide', align: 'top', seed: 58 },
  { kind: 'stat', value: String(projects.length).padStart(2, '0'), label: 'Projects shipped' },
  { kind: 'photo', caption: 'Building ARGUS', variant: 'duotone', icon: ShieldAlert, size: 'tall', align: 'bottom', seed: 9 },
  { kind: 'quote', text: 'I enjoy solving problems, experimenting with ideas, and continuously improving.' },
  { kind: 'photo', caption: 'Smart Safety Helmet', variant: 'topo', icon: HardHat, size: 'small', align: 'top', seed: 31 },
  { kind: 'photo', caption: 'Chennai, 2026', variant: 'halftone', icon: MapPin, size: 'wide', align: 'center', seed: 4 }
];

const photoCount = FRAMES.filter(f => f.kind === 'photo').length;

const sizeClass = {
  tall: 'w-[min(78vw,39svh)] aspect-[3/4]',
  wide: 'w-[min(85vw,53svh)] aspect-[4/3]',
  small: 'w-[min(70vw,30svh)] aspect-square'
};

const alignClass = { top: 'self-start mt-[14svh]', center: 'self-center', bottom: 'self-end mb-[12svh]' };

function FrameItem({ frame, index }: { frame: Frame; index: number }) {
  if (frame.kind === 'photo') {
    return (
      <figure className={cn('shrink-0', alignClass[frame.align])}>
        <figcaption className="eyebrow mb-2 flex justify-between gap-4 text-mute">
          <span>{frame.caption}</span>
          <span className="text-ink">{String(index).padStart(2, '0')}</span>
        </figcaption>
        <PhotoPlaceholder
          variant={frame.variant}
          icon={frame.icon}
          seed={frame.seed}
          label={frame.caption}
          className={sizeClass[frame.size]}
        />
      </figure>
    );
  }

  if (frame.kind === 'quote') {
    return (
      <blockquote className="w-[min(78vw,22rem)] shrink-0 self-center">
        <p className="font-serif text-2xl leading-snug text-ink md:text-3xl">&ldquo;{frame.text}&rdquo;</p>
      </blockquote>
    );
  }

  return (
    <div className="flex shrink-0 flex-col items-center self-center text-ink">
      <span className="display-sans text-[clamp(6rem,18svh,11rem)]">{frame.value}</span>
      <span className="eyebrow mt-2 flex items-center gap-2">
        <span className="h-px w-6 bg-ink" />
        {frame.label}
        <span className="h-px w-6 bg-ink" />
      </span>
    </div>
  );
}

function Track({ innerRef, style }: { innerRef?: React.Ref<HTMLDivElement>; style?: React.ComponentProps<typeof motion.div>['style'] }) {
  let photoIndex = 0;
  return (
    <motion.div ref={innerRef} style={style} className="flex h-full w-max items-stretch gap-[6vw] pl-4 pr-[12vw] md:pl-10">
      {/* Intro panel */}
      <div className="flex max-w-[80vw] shrink-0 flex-col justify-center">
        <h2 className="whitespace-nowrap text-ink">
          <span className="display-serif block text-[clamp(3.2rem,7vw,6.5rem)]">Between</span>
          <span className="display-sans block text-[clamp(3.2rem,7vw,6.5rem)]">Commits</span>
        </h2>
        <p className="mt-6 max-w-xs text-sm leading-relaxed text-mute">
          Campus, code, late-night builds and everything in between.
        </p>
      </div>

      {FRAMES.map((frame, i) => (
        <FrameItem key={i} frame={frame} index={frame.kind === 'photo' ? ++photoIndex : 0} />
      ))}
    </motion.div>
  );
}

/** Pinned section whose content travels sideways as you scroll down. */
export function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [distance, setDistance] = useState(0);
  const [current, setCurrent] = useState(1);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [reduce]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, v => -v * distance);

  // Lean the track slightly in the direction of travel, like motion blur at speed.
  const velocity = useVelocity(scrollYProgress);
  const skew = useSpring(useTransform(velocity, [-1.5, 0, 1.5], [4, 0, -4]), { stiffness: 260, damping: 40 });

  useMotionValueEvent(scrollYProgress, 'change', v => {
    setCurrent(Math.min(photoCount, Math.max(1, Math.round(v * (photoCount - 1)) + 1)));
  });

  if (reduce) {
    return (
      <section data-nav="light" aria-label="Moments" className="relative overflow-hidden bg-stone py-24">
        <div className="overflow-x-auto">
          <div className="h-[80svh]">
            <Track innerRef={trackRef} />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      data-nav="light"
      aria-label="Moments"
      className="relative bg-stone"
      style={{ height: `calc(100svh + ${distance}px)` }}
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="absolute inset-0 text-ink/[0.08]">
          <TopoLines seed={64} />
        </div>

        <div className="relative h-full py-[10svh]">
          <Track innerRef={trackRef} style={{ x, skewX: skew }} />
        </div>

        {/* Progress + counter */}
        <div className="absolute inset-x-4 bottom-8 flex items-center gap-4 md:inset-x-10">
          <span className="eyebrow tabular-nums text-ink">
            {String(current).padStart(2, '0')} / {String(photoCount).padStart(2, '0')}
          </span>
          <div className="h-[2px] flex-1 overflow-hidden bg-ink/15">
            <motion.div style={{ scaleX: scrollYProgress }} className="h-full origin-left bg-ink" />
          </div>
          <span className="flex items-center gap-1" aria-hidden="true">
            <span className="h-2 w-2 bg-ink" />
            <span className="h-2 w-2 bg-lime" />
            <span className="h-2 w-2 bg-ink" />
          </span>
        </div>
      </div>
    </section>
  );
}
