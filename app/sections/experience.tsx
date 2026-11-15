import { GraduationCap } from 'lucide-react';
import { timelineEntries } from '@/data/portfolio';
import { Accent, Reveal, SectionHeading } from '@/app/components/ui/reveal';

export function ExperienceSection() {
  return (
    <section id="experience" className="section-padding" aria-label="Experience and education">
      <div className="container-page">
        <SectionHeading index="02" label="Experience">
          Education &amp; <Accent>journey</Accent>
        </SectionHeading>

        <ol className="relative ml-5 border-l border-border pl-10 md:ml-6 md:pl-14">
          {timelineEntries.map((entry, index) => (
            <li key={entry.title} className="relative pb-12 last:pb-0">
              <span className="absolute -left-[calc(2.5rem+1.25rem+0.5px)] top-0 flex h-10 w-10 items-center justify-center rounded-full border border-border-hover bg-background-elevated text-primary md:-left-[calc(3.5rem+1.25rem+0.5px)]">
                <GraduationCap className="h-[18px] w-[18px]" aria-hidden="true" />
              </span>

              <Reveal delay={index * 0.1}>
                <p className="mb-3 font-mono text-xs uppercase tracking-[0.22em] text-primary">{entry.period}</p>
                <h3 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">{entry.title}</h3>
                <p className="mt-1 text-lg text-foreground-muted">{entry.organization}</p>
                <p className="mt-5 max-w-2xl leading-relaxed text-foreground-muted">{entry.description}</p>
                {entry.tags && (
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {entry.tags.map(tag => (
                      <li
                        key={tag}
                        className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-foreground-muted"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                )}
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
