'use client';

import { ArrowUp, ArrowUpRight, Check, Copy } from 'lucide-react';
import { useEffect, useState } from 'react';
import { contactEmail, navLinks, socialLinks } from '@/data/portfolio';
import { TopoLines } from '@/app/components/effects/topo-lines';
import { Signature } from '@/app/components/effects/signature';
import { Magnetic } from '@/app/components/ui/magnetic';
import { MaskLine } from '@/app/components/ui/reveal';

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

/** Contact + footer: a notched dark panel sitting on a cream band, with a lime base strip. */
export function Footer() {
  const time = useChennaiTime();
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${contactEmail}`;
    }
  };

  return (
    <footer id="contact" data-nav="light" className="relative bg-cream pt-24">
      <div className="px-2 md:px-4">
        <div className="relative">
          {/* Notch tab on top of the panel */}
          <div
            aria-hidden="true"
            className="absolute -top-5 left-1/2 h-6 w-[38%] min-w-40 -translate-x-1/2 rounded-t-2xl bg-olive"
          />
          <section
            data-nav="dark"
            aria-label="Contact"
            className="relative overflow-hidden rounded-t-[1.75rem] bg-olive px-4 pb-10 pt-20 text-cream md:px-10 md:pt-28"
          >
            <div className="absolute inset-0 text-cream/[0.06]">
              <TopoLines seed={93} />
            </div>

            <div className="relative flex flex-col items-center text-center">
              <Signature className="mb-2 w-40 md:w-52" strokeWidth={7} />
              <h2 className="text-[clamp(2.8rem,8.5vw,7.5rem)]">
                <MaskLine>
                  <span className="display-sans">Always </span>
                  <span className="display-serif text-lime">building</span>
                </MaskLine>
                <MaskLine delay={0.08}>
                  <span className="display-sans">the </span>
                  <span className="display-serif text-lime">next thing.</span>
                </MaskLine>
              </h2>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-cream/70 md:text-base">
                Internship, project, or just want to say hi? My inbox is open and I usually reply within a day.
              </p>

              <div className="mt-8 flex flex-col items-center gap-2 sm:flex-row">
                <Magnetic>
                  <a
                    href={`mailto:${contactEmail}`}
                    className="eyebrow group inline-flex h-12 items-center gap-2 rounded-md bg-lime px-5 text-ink"
                  >
                    {contactEmail}
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
                  </a>
                </Magnetic>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="eyebrow inline-flex h-12 items-center gap-2 rounded-md border border-cream/30 px-5 transition-colors hover:border-lime hover:text-lime"
                >
                  {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
                  <span aria-live="polite">{copied ? 'Copied' : 'Copy email'}</span>
                </button>
              </div>

              <div className="mt-20 grid w-full grid-cols-2 gap-8 text-left md:mt-24">
                <nav aria-label="Footer">
                  <p className="eyebrow mb-3 text-sage">Pages</p>
                  <ul className="space-y-1">
                    {navLinks.map(link => (
                      <li key={link.href}>
                        <a href={link.href} className="display-sans text-lg transition-colors hover:text-lime md:text-2xl">
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
                <div className="text-right">
                  <p className="eyebrow mb-3 text-sage">Follow on</p>
                  <ul className="space-y-1">
                    {socialLinks
                      .filter(link => !link.href.startsWith('mailto'))
                      .map(link => (
                        <li key={link.label}>
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="display-sans text-lg transition-colors hover:text-lime md:text-2xl"
                          >
                            {link.label}
                          </a>
                        </li>
                      ))}
                  </ul>
                  <p className="eyebrow mt-6 text-sage">Chennai, India{time && ` · ${time} IST`}</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 bg-lime px-4 py-3 text-ink md:px-6">
        <p className="eyebrow">© {new Date().getFullYear()} Pratyush Deo Singh. All rights reserved</p>
        <a href="#hero" className="eyebrow group inline-flex items-center gap-1.5">
          Back to top
          <ArrowUp className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </footer>
  );
}
