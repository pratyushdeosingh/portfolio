import { ArrowUpRight } from 'lucide-react';
import { TopoLines } from '@/app/components/effects/topo-lines';
import { Parallax, Reveal } from '@/app/components/ui/reveal';

const SIDES = [
  {
    top: 'The',
    bottom: 'Work',
    scribble: 'built',
    text: 'Fraud detection, agentic finance, health records and hardware, built solo and with teams.',
    href: '#projects'
  },
  {
    top: 'The',
    bottom: 'Stack',
    scribble: 'tools',
    text: 'The languages, concepts and tools I reach for, and the ones I am getting better at.',
    href: '#skills'
  }
];

/** Two big stacked titles, each with a lime scribble that appears on hover. */
export function SplitSection() {
  return (
    <section data-nav="light" aria-label="Explore" className="relative overflow-hidden bg-stone py-28 md:py-40">
      <div className="absolute inset-0 text-ink/[0.07]">
        <TopoLines seed={5} />
      </div>

      {/* Oversized code glyphs at the edges */}
      <div className="pointer-events-none absolute inset-y-0 -left-[4vw] hidden items-center sm:flex" aria-hidden="true">
        <Parallax speed={0.35}>
          <span className="display-serif block text-[30vw] leading-none text-lime md:text-[22vw]">{'{'}</span>
        </Parallax>
      </div>
      <div className="pointer-events-none absolute inset-y-0 -right-[4vw] hidden items-center sm:flex" aria-hidden="true">
        <Parallax speed={-0.35}>
          <span className="display-serif block text-[30vw] leading-none text-lime md:text-[22vw]">{'}'}</span>
        </Parallax>
      </div>

      <div className="container-page relative grid gap-16 sm:grid-cols-2 sm:gap-6 md:max-w-4xl">
        {SIDES.map((side, i) => (
          <Reveal key={side.bottom} delay={i * 0.1}>
            <a href={side.href} className="group flex flex-col items-center text-center">
              <span className="relative text-ink">
                <span className="display-serif block text-[clamp(3.5rem,9vw,7rem)]">{side.top}</span>
                <span className="display-sans block text-[clamp(3.5rem,9vw,7rem)]">{side.bottom}</span>
                <span
                  aria-hidden="true"
                  className="absolute left-1/2 top-[38%] -translate-x-1/2 -rotate-12 scale-75 font-serif text-[clamp(2.5rem,6vw,4.5rem)] italic text-lime opacity-0 [-webkit-text-stroke:1.5px_var(--color-ink)] transition-all duration-500 group-hover:scale-100 group-hover:opacity-100"
                >
                  {side.scribble}
                </span>
              </span>
              <span className="mt-6 block border-t border-dashed border-ink/30 pt-4 text-sm leading-relaxed text-mute sm:max-w-[16rem]">
                {side.text}
              </span>
              <span className="mt-6 flex h-10 w-10 items-center justify-center rounded-md bg-lime text-ink transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-45">
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="sr-only">Go to {side.bottom.toLowerCase()}</span>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
