'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { useRef } from 'react';
import { heroTagline, marqueeItems, socialLinks } from '@/data/portfolio';
import { ParticleField } from '@/app/components/effects/particle-field';
import { Magnetic } from '@/app/components/ui/magnetic';
import { Marquee } from '@/app/components/ui/marquee';
import { SocialIcon } from '@/app/components/ui/icons';

const EASE = [0.16, 1, 0.3, 1] as const;

function RevealLine({ children, delay }: { children: React.ReactNode; delay: number }) {
  const reduce = useReducedMotion();
  return (
    <span className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
      <motion.span
        className="block"
        initial={reduce ? false : { y: '110%' }}
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
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 140]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const fadeUp = (delay: number) => ({
    initial: reduce ? false : ({ opacity: 0, y: 20 } as const),
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease: EASE }
  });

  return (
    <section
      ref={ref}
      id="hero"
      className="relative flex min-h-[100dvh] flex-col overflow-hidden"
      aria-label="Introduction"
    >
      {/* Backdrop */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="bg-grid absolute inset-0" />
        <div className="animate-float-slow absolute left-1/2 top-[18%] h-[34rem] w-[34rem] -translate-x-[75%] rounded-full bg-primary/20 blur-[140px]" />
        <div className="animate-float-slow absolute right-[8%] top-[38%] h-[26rem] w-[26rem] rounded-full bg-indigo-500/15 blur-[130px] [animation-delay:-8s]" />
        <ParticleField className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent" />
      </div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="container-page relative z-10 flex flex-1 flex-col items-center justify-center pb-10 pt-28 text-center"
      >
        <motion.div
          {...fadeUp(0.3)}
          className="mb-8 inline-flex items-center gap-3 rounded-full border border-border bg-surface px-4 py-2 text-xs text-foreground-muted backdrop-blur-sm sm:text-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-pulse-ring absolute inset-0 rounded-full bg-emerald-400" />
            <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Open to internships &amp; collaborations
        </motion.div>

        <h1 className="text-[clamp(3.25rem,12vw,9.5rem)] font-semibold leading-[0.92] tracking-[-0.045em] text-foreground">
          <RevealLine delay={0.45}>Pratyush</RevealLine>
          <RevealLine delay={0.58}>
            <span className="text-gradient px-[0.06em] font-serif font-normal italic tracking-[-0.02em]">
              Deo Singh
            </span>
          </RevealLine>
        </h1>

        <motion.p
          {...fadeUp(0.95)}
          className="mt-8 font-mono text-xs uppercase tracking-[0.28em] text-foreground-dim sm:text-sm"
        >
          Computer Science · VIT Chennai
        </motion.p>

        <motion.p
          {...fadeUp(1.05)}
          className="mx-auto mt-6 max-w-xl text-balance text-base leading-relaxed text-foreground-muted md:text-lg"
        >
          {heroTagline}
        </motion.p>

        <motion.div {...fadeUp(1.2)} className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <Magnetic>
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-medium text-background transition-colors hover:bg-white"
            >
              View projects
              <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full border border-border-hover bg-surface px-7 py-3.5 text-sm font-medium text-foreground backdrop-blur-sm transition-colors hover:border-foreground/40 hover:bg-surface-hover"
            >
              Get in touch
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </Magnetic>
        </motion.div>

        <motion.ul {...fadeUp(1.35)} className="mt-10 flex items-center gap-2">
          {socialLinks.map(link => (
            <li key={link.label}>
              <a
                href={link.href}
                target={link.href.startsWith('mailto') ? undefined : '_blank'}
                rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                aria-label={link.label}
                className="flex h-10 w-10 items-center justify-center rounded-full text-foreground-dim transition-colors hover:bg-white/[0.06] hover:text-foreground"
              >
                <SocialIcon name={link.icon} className="h-[18px] w-[18px]" />
              </a>
            </li>
          ))}
        </motion.ul>
      </motion.div>

      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="relative z-10 border-y border-border bg-background/40 py-4 backdrop-blur-sm"
      >
        <Marquee speed={38} className="mask-fade-x">
          {marqueeItems.map(item => (
            <span
              key={item}
              className="mx-6 inline-flex items-center gap-12 font-mono text-xs uppercase tracking-[0.22em] text-foreground-dim"
            >
              {item}
              <span className="text-primary/60" aria-hidden="true">
                ✦
              </span>
            </span>
          ))}
        </Marquee>
      </motion.div>
    </section>
  );
}
