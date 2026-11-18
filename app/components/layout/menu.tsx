'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  aboutParagraphs,
  contactEmail,
  faqItems,
  navLinks,
  projects,
  skillGroups,
  socialLinks
} from '@/data/portfolio';
import { TopoLines } from '@/app/components/effects/topo-lines';
import { Monogram, RotatingBadge } from '@/app/components/ui/monogram';
import { ProjectGlyph } from '@/app/components/ui/project-glyph';
import { cn } from '@/app/lib/utils';

const EASE = [0.22, 1, 0.36, 1] as const;
const WIPE = [0.76, 0, 0.24, 1] as const;

function useChennaiTime() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'Asia/Kolkata' }).format(
        new Date()
      );
    setTime(format());
    const id = setInterval(() => setTime(format()), 30_000);
    return () => clearInterval(id);
  }, []);
  return time;
}

/** What the right-hand panel shows for each link. */
function Preview({ href }: { href: string }) {
  switch (href) {
    case '#about':
      return (
        <>
          <PreviewTitle top="Who" bottom="I am" />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-cream/70">{aboutParagraphs[0]}</p>
        </>
      );
    case '#projects':
      return (
        <>
          <PreviewTitle top={String(projects.length).padStart(2, '0')} bottom="Projects" />
          <ul className="mt-6 grid grid-cols-2 gap-2">
            {projects.slice(0, 4).map(p => (
              <li key={p.title} className="flex items-center gap-2 rounded-sm bg-cream/[0.06] px-3 py-2.5">
                <ProjectGlyph name={p.icon} className="h-4 w-4 shrink-0 text-lime" />
                <span className="display-sans truncate text-xs text-cream">{p.short}</span>
              </li>
            ))}
          </ul>
        </>
      );
    case '#skills':
      return (
        <>
          <PreviewTitle top="The" bottom="Toolkit" />
          <ul className="mt-6 space-y-3">
            {skillGroups.map(g => (
              <li key={g.title}>
                <div className="eyebrow mb-1.5 flex justify-between text-cream/70">
                  <span>{g.title}</span>
                  <span className="text-lime">{g.proficiency}</span>
                </div>
                <div className="h-1 overflow-hidden rounded-full bg-cream/10">
                  <motion.div
                    className="h-full rounded-full bg-lime"
                    initial={{ width: 0 }}
                    animate={{ width: `${g.proficiency}%` }}
                    transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </>
      );
    case '#faq':
      return (
        <>
          <PreviewTitle top={String(faqItems.length).padStart(2, '0')} bottom="Questions" />
          <p className="mt-6 max-w-sm font-serif text-xl leading-snug text-cream/85">&ldquo;{faqItems[1].question}&rdquo;</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-cream/60">{faqItems[1].answer}</p>
        </>
      );
    case '#contact':
      return (
        <>
          <PreviewTitle top="Say" bottom="Hello" />
          <p className="mt-6 text-sm leading-relaxed text-cream/70">My inbox is open and I usually reply within a day.</p>
          <span className="eyebrow mt-5 inline-flex items-center gap-1.5 rounded-sm bg-lime px-3 py-2 text-ink">
            {contactEmail}
            <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </>
      );
    default:
      return (
        <>
          <PreviewTitle top="Start" bottom="Here" />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-cream/70">
            Computer Science at VIT Chennai. Building things and learning how they work underneath.
          </p>
          <RotatingBadge text="OPEN TO INTERNSHIPS · CLASS OF 2029 · " className="mt-6 h-20 w-20 text-lime">
            <Monogram className="h-6 w-6 text-cream" />
          </RotatingBadge>
        </>
      );
  }
}

function PreviewTitle({ top, bottom }: { top: string; bottom: string }) {
  return (
    <h3 className="leading-none">
      <span className="display-serif block text-[clamp(2.5rem,4.5vw,4.25rem)] text-lime">{top}</span>
      <span className="display-sans block text-[clamp(2.5rem,4.5vw,4.25rem)] text-cream">{bottom}</span>
    </h3>
  );
}

interface MenuProps {
  open: boolean;
  active: string;
  onClose: () => void;
}

export function Menu({ open, active, onClose }: MenuProps) {
  const [hovered, setHovered] = useState<string | null>(null);
  const time = useChennaiTime();
  const preview = hovered ?? active;

  useEffect(() => {
    if (!open) setHovered(null);
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="site-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          data-lenis-prevent
          initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
          animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          exit={{ clipPath: 'inset(0% 0% 100% 0%)', transition: { duration: 0.7, ease: WIPE, delay: 0.1 } }}
          transition={{ duration: 0.8, ease: WIPE }}
          className="fixed inset-0 z-40 overflow-y-auto bg-olive text-cream"
        >
          <motion.div
            className="absolute inset-0 text-cream/[0.05]"
            initial={{ y: -60 }}
            animate={{ y: 0 }}
            transition={{ duration: 1.2, ease: EASE }}
          >
            <TopoLines seed={57} />
          </motion.div>

          <div className="container-page relative flex min-h-full flex-col pb-5 pt-24">
            <div className="grid flex-1 items-center gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
              {/* Links */}
              <nav aria-label="Menu">
                <ul onMouseLeave={() => setHovered(null)} className="border-t border-dashed border-cream/15">
                  {navLinks.map((link, i) => {
                    const isActive = active === link.href;
                    return (
                      <li key={link.href} className="overflow-hidden border-b border-dashed border-cream/15">
                        <motion.a
                          href={link.href}
                          onClick={onClose}
                          onMouseEnter={() => setHovered(link.href)}
                          onFocus={() => setHovered(link.href)}
                          aria-current={isActive ? 'true' : undefined}
                          initial={{ y: '110%' }}
                          animate={{ y: 0 }}
                          exit={{ y: '-110%', transition: { duration: 0.4, ease: WIPE, delay: i * 0.03 } }}
                          transition={{ duration: 0.9, ease: EASE, delay: 0.35 + i * 0.06 }}
                          className="group flex items-center gap-4 py-2 md:gap-8 md:py-[1.4vh]"
                        >
                          <span className="eyebrow flex w-10 shrink-0 items-center gap-1.5 text-sage">
                            {isActive && <span className="h-1.5 w-1.5 rounded-full bg-lime" />}
                            {String(i + 1).padStart(2, '0')}
                          </span>

                          {/* Rolling label: bold sans rolls up into lime serif */}
                          <span className="relative block h-[1em] flex-1 overflow-hidden text-[clamp(2.2rem,min(5.4vw,7.2vh),4.75rem)] leading-none">
                            <span className="block transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full group-focus-visible:-translate-y-full">
                              <span className="display-sans block h-[1em]">{link.label}</span>
                              <span className="display-serif block h-[1em] text-lime">{link.label}</span>
                            </span>
                          </span>

                          <span className="flex h-10 w-10 shrink-0 -translate-x-3 items-center justify-center rounded-md bg-lime text-ink opacity-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100">
                            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                          </span>
                        </motion.a>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* Live preview of the hovered section */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, transition: { duration: 0.25 } }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.55 }}
                className="relative hidden min-h-[26rem] overflow-hidden rounded-md bg-ink p-8 lg:block"
                aria-hidden="true"
              >
                <div className="absolute inset-0 text-lime/[0.08]">
                  <TopoLines seed={88} />
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={preview}
                    initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -16, filter: 'blur(6px)' }}
                    transition={{ duration: 0.45, ease: EASE }}
                    className="relative"
                  >
                    <Preview href={preview} />
                  </motion.div>
                </AnimatePresence>
                <span className="eyebrow absolute bottom-6 right-8 text-sage">
                  {String(navLinks.findIndex(l => l.href === preview) + 1).padStart(2, '0')} /{' '}
                  {String(navLinks.length).padStart(2, '0')}
                </span>
              </motion.div>
            </div>

            {/* Footer row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              transition={{ duration: 0.8, delay: 0.75 }}
              className="mt-8 flex flex-col gap-4 border-t border-cream/15 pt-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <ul className="flex flex-wrap gap-x-6 gap-y-2">
                {socialLinks.map(link => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.href.startsWith('mailto') ? undefined : '_blank'}
                      rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                      className="eyebrow text-sage transition-colors duration-300 hover:text-lime"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <p className="eyebrow text-sage">
                Chennai, India{time && <span className="text-cream"> · {time} IST</span>}
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
