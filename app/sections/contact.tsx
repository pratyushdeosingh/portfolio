'use client';

import { ArrowUpRight, Check, Copy, Mail } from 'lucide-react';
import { useState } from 'react';
import { contactEmail, socialLinks } from '@/data/portfolio';
import { SocialIcon } from '@/app/components/ui/icons';
import { Magnetic } from '@/app/components/ui/magnetic';
import { Accent, Reveal } from '@/app/components/ui/reveal';

export function ContactSection() {
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
    <section id="contact" className="section-padding" aria-label="Contact">
      <div className="container-page">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-border bg-background-elevated px-6 py-16 text-center md:px-16 md:py-24">
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
              <div className="bg-grid absolute inset-0 opacity-70" />
              <div className="absolute left-1/2 top-0 h-72 w-[40rem] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/25 blur-[120px]" />
            </div>

            <div className="relative">
              <div className="mb-8 flex items-center justify-center gap-4 font-mono text-xs uppercase tracking-[0.25em] text-foreground-dim">
                <span className="text-primary">06</span>
                <span className="h-px w-10 bg-border-hover" />
                <span>Contact</span>
              </div>

              <h2 className="mx-auto max-w-3xl text-balance text-5xl font-semibold leading-[1] tracking-tight text-foreground md:text-7xl">
                Let&apos;s build something <Accent>together</Accent>
              </h2>

              <p className="mx-auto mt-8 max-w-lg text-lg leading-relaxed text-foreground-muted">
                Have an internship, a project, or just want to say hi? My inbox is open and I usually reply within a
                day.
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Magnetic>
                  <a
                    href={`mailto:${contactEmail}`}
                    className="group inline-flex items-center gap-2.5 rounded-full bg-foreground px-7 py-4 text-sm font-medium text-background transition-colors hover:bg-white"
                  >
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    {contactEmail}
                  </a>
                </Magnetic>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="inline-flex items-center gap-2 rounded-full border border-border-hover px-6 py-4 text-sm font-medium text-foreground transition-colors hover:border-foreground/40 hover:bg-surface-hover"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                  ) : (
                    <Copy className="h-4 w-4" aria-hidden="true" />
                  )}
                  <span aria-live="polite">{copied ? 'Copied' : 'Copy email'}</span>
                </button>
              </div>

              <ul className="mx-auto mt-14 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
                {socialLinks
                  .filter(link => !link.href.startsWith('mailto'))
                  .map(link => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between rounded-xl border border-border bg-surface px-5 py-4 text-sm text-foreground-muted transition-colors hover:border-border-hover hover:text-foreground"
                      >
                        <span className="flex items-center gap-3">
                          <SocialIcon name={link.icon} className="h-4 w-4" />
                          {link.label}
                        </span>
                        <ArrowUpRight className="h-4 w-4 text-foreground-dim transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
