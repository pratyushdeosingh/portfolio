'use client';

import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { navLinks, socialLinks } from '@/data/portfolio';
import { SocialIcon } from '@/app/components/ui/icons';

function useChennaiTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: 'Asia/Kolkata'
      }).format(new Date());

    setTime(format());
    const id = setInterval(() => setTime(format()), 30_000);
    return () => clearInterval(id);
  }, []);

  return time;
}

export function Footer() {
  const time = useChennaiTime();

  return (
    <footer className="border-t border-border">
      <div className="container-page py-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-lg font-semibold tracking-tight text-foreground">Pratyush Deo Singh</p>
            <p className="mt-2 text-sm text-foreground-dim">
              Chennai, India{time && <span> · {time} IST</span>}
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-foreground-muted">
              {navLinks.map(link => (
                <li key={link.href}>
                  <a href={link.href} className="transition-colors hover:text-foreground">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <ul className="flex items-center gap-1">
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
          </ul>
        </div>

        <div className="mt-12 flex items-center justify-between border-t border-border pt-6 text-xs text-foreground-dim">
          <p>© {new Date().getFullYear()} Pratyush Deo Singh</p>
          <a href="#hero" className="group inline-flex items-center gap-2 transition-colors hover:text-foreground">
            Back to top
            <ArrowUp className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
