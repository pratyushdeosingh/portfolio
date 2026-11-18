'use client';

import { ArrowUpRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Menu } from '@/app/components/layout/menu';
import { cn } from '@/app/lib/utils';

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

      <Menu open={isOpen} active={active} onClose={() => setIsOpen(false)} />
    </>
  );
}
