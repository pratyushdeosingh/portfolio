import { ArrowUpRight, Braces } from 'lucide-react';
import { marqueeItems, skillGroups } from '@/data/portfolio';
import { TopoLines } from '@/app/components/effects/topo-lines';
import { Marquee } from '@/app/components/ui/marquee';
import { MaskLine, Reveal } from '@/app/components/ui/reveal';
import { cn } from '@/app/lib/utils';

const tilts = ['md:-rotate-3', 'md:rotate-2', 'md:rotate-1', 'md:-rotate-2'];

export function SkillsSection() {
  return (
    <section id="skills" data-nav="light" aria-label="Technical skills" className="relative overflow-hidden bg-cream">
      <div className="absolute inset-0 text-ink/[0.07]">
        <TopoLines seed={77} />
      </div>

      <div className="container-page relative grid gap-16 py-28 md:py-40 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <Reveal>
            <p className="eyebrow mb-5 flex items-center gap-2 text-ink">
              <Braces className="h-3.5 w-3.5" aria-hidden="true" /> Toolkit
            </p>
          </Reveal>
          <h2 className="text-ink">
            <MaskLine className="display-sans text-[clamp(3rem,7.5vw,6.5rem)]">What I</MaskLine>
            <MaskLine delay={0.06} className="display-sans text-[clamp(3rem,7.5vw,6.5rem)]">
              Build
            </MaskLine>
            <MaskLine delay={0.12} className="display-serif text-[clamp(3rem,7.5vw,6.5rem)]">
              With
            </MaskLine>
          </h2>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-sm text-sm leading-relaxed text-mute md:text-base">
              The languages, concepts and tools I reach for most, and how comfortable I am with each of them right now.
            </p>
            <a
              href="#projects"
              className="eyebrow group mt-8 inline-flex h-10 items-center gap-1.5 rounded-md bg-lime px-4 text-ink transition-transform hover:-translate-y-0.5"
            >
              See them in action
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-45" />
            </a>
          </Reveal>
        </div>

        <ul className="grid gap-5 sm:grid-cols-2">
          {skillGroups.map((group, i) => (
            <li key={group.title} className={cn(i % 2 === 1 && 'sm:translate-y-10')}>
              <Reveal delay={i * 0.08}>
                <article
                  className={cn(
                    'rounded-md p-5 transition-transform duration-500 hover:rotate-0',
                    tilts[i],
                    i === 1 ? 'bg-ink text-cream' : i === 2 ? 'bg-lime text-ink' : 'bg-olive text-cream'
                  )}
                >
                  <div className="flex items-baseline justify-between">
                    <h3 className="display-sans text-lg">{group.title}</h3>
                    <span className="display-serif text-3xl">{group.proficiency}</span>
                  </div>
                  <div className="mt-3 h-1 overflow-hidden rounded-full bg-current/15">
                    <div
                      className={cn('h-full rounded-full', i === 2 ? 'bg-ink' : 'bg-lime')}
                      style={{ width: `${group.proficiency}%` }}
                    />
                  </div>
                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {group.tags.map(tag => (
                      <li
                        key={tag}
                        className={cn(
                          'rounded-sm px-2 py-1 text-xs',
                          i === 2 ? 'bg-ink/10' : 'bg-cream/10'
                        )}
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>

      <div className="relative border-y border-ink bg-lime py-3">
        <Marquee speed={30}>
          {marqueeItems.map(item => (
            <span key={item} className="display-sans inline-flex items-center gap-6 px-3 text-sm text-ink">
              {item}
              <span aria-hidden="true">✦</span>
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
