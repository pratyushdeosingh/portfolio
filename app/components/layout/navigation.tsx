'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { navLinks, projects, socialLinks } from '@/data/portfolio';
import { ProjectGlyph } from '@/app/components/ui/project-glyph';
import { RotatingBadge, Monogram } from '@/app/components/ui/monogram';
import { cn } from '@/app/lib/utils';

const EASE = [0.76, 0, 0.24, 1] as const;

/** Reads the `data-nav` theme of whatever section sits under the top-left corner of the viewport. */
function useNavTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const stack = document.elementsFromPoint(40, 40);
      for (const el of stack) {
        if (el.closest('header')) continue;
        const section = el.closest<HTMLElement>('[data-nav]');
        if (section) {
          setTheme(section.dataset.nav === 'dark' ? 'dark' : 'light');
          return;
        }
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return theme;
}

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState('#hero');
  const [hovered, setHovered] = useState<string | null>(null);
  const theme = useNavTheme();
  const onDark = isOpen || theme === 'dark';

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('main section[id]'));
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) if (entry.isIntersecting) setActive(`#${entry.target.id}`);
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = isOpen ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen]);

  const marked = hovered ?? active;

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <nav aria-label="Primary" className="flex items-start justify-between px-4 pt-4 md:px-6 md:pt-5">
          <a
            href="#hero"
            onClick={() => setIsOpen(false)}
            aria-label="Pratyush Deo Singh, home"
            className={cn(
              'flex flex-col leading-none transition-colors duration-500',
              onDark ? 'text-cream' : 'text-ink'
            )}
          >
            <span className="display-serif text-[15px] font-semibold tracking-[0.01em] md:text-lg">Pratyush</span>
            <span className="display-sans text-[15px] md:text-lg">Deo Singh</span>
          </a>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="eyebrow group inline-flex h-10 items-center gap-1.5 rounded-md bg-lime px-3.5 text-ink transition-transform hover:-translate-y-0.5"
            >
              Let&apos;s talk
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-45" />
            </a>
            <button
              type="button"
              onClick={() => setIsOpen(open => !open)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              aria-controls="site-menu"
              className={cn(
                'relative flex h-10 w-10 items-center justify-center rounded-md border transition-colors duration-500',
                onDark ? 'border-cream/40 bg-olive text-cream' : 'border-ink/20 bg-cream text-ink'
              )}
            >
              <span
                className={cn(
                  'absolute h-[1.5px] w-4 bg-current transition-transform duration-500',
                  isOpen ? 'rotate-45' : '-translate-y-[3px] translate-x-[2px] scale-x-75'
                )}
              />
              <span
                className={cn(
                  'absolute h-[1.5px] w-4 bg-current transition-transform duration-500',
                  isOpen ? '-rotate-45' : 'translate-y-[3px]'
                )}
              />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="site-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.75, ease: EASE }}
            className="fixed inset-0 z-40 overflow-y-auto bg-olive text-cream"
          >
            <div className="flex min-h-full flex-col px-4 pb-8 pt-28 md:px-10 lg:flex-row lg:items-center lg:gap-16 lg:pt-20">
              {/* Project tiles */}
              <div className="hidden flex-1 grid-cols-2 gap-4 lg:grid lg:max-w-xl">
                {projects.slice(0, 4).map((project, i) => (
                  <motion.a
                    key={project.title}
                    href="#projects"
                    onClick={() => setIsOpen(false)}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.07, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="group relative flex aspect-square flex-col justify-between overflow-hidden rounded-md bg-ink p-4"
                  >
                    <span className="eyebrow text-sage">{project.label}</span>
                    <ProjectGlyph
                      name={project.icon}
                      className="mx-auto h-20 w-20 text-cream/70 transition-all duration-500 group-hover:scale-110 group-hover:text-lime"
                    />
                    <span className="display-sans text-sm text-cream">{project.short}</span>
                  </motion.a>
                ))}
              </div>

              {/* Links */}
              <div className="flex flex-1 flex-col items-center justify-center text-center">
                <ul onMouseLeave={() => setHovered(null)}>
                  {navLinks.map((link, i) => (
                    <li key={link.href} className="overflow-hidden">
                      <motion.a
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        onMouseEnter={() => setHovered(link.href)}
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        transition={{ delay: 0.25 + i * 0.05, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        className="display-sans relative inline-block py-1 text-[clamp(2.5rem,7vw,5rem)]"
                      >
                        {link.label}
                        <span
                          className={cn(
                            'absolute left-[-4%] top-1/2 h-[0.09em] w-[108%] origin-left bg-lime transition-transform duration-500',
                            marked === link.href ? 'scale-x-100' : 'scale-x-0'
                          )}
                        />
                      </motion.a>
                    </li>
                  ))}
                </ul>

                <RotatingBadge text="PRATYUSH · DEO · SINGH · CS · VIT · " className="mt-10 h-20 w-20 text-lime">
                  <Monogram className="h-6 w-6 text-cream" />
                </RotatingBadge>

                <ul className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2">
                  {socialLinks.map(link => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target={link.href.startsWith('mailto') ? undefined : '_blank'}
                        rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                        className="eyebrow text-sage transition-colors hover:text-lime"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Telemetry-style bars */}
            <div className="pointer-events-none absolute bottom-6 right-6 hidden flex-col items-end gap-2 md:flex" aria-hidden="true">
              {[64, 40, 88, 24].map((w, i) => (
                <span
                  key={i}
                  className="animate-eq block h-1.5 bg-lime"
                  style={{ width: w, animationDelay: `${i * -0.35}s` }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
