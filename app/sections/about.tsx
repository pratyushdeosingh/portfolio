import { aboutParagraphs, highlights } from '@/data/portfolio';
import { Accent, Reveal, SectionHeading } from '@/app/components/ui/reveal';

export function AboutSection() {
  return (
    <section id="about" className="section-padding" aria-label="About me">
      <div className="container-page">
        <div className="grid gap-x-16 lg:grid-cols-[1fr_1.1fr]">
          <SectionHeading index="01" label="About" className="lg:sticky lg:top-32 lg:self-start">
            A student who loves <Accent>building things</Accent> and knowing why they work
          </SectionHeading>

          <div>
            <div className="space-y-6">
              {aboutParagraphs.map((paragraph, index) => (
                <Reveal key={index} delay={index * 0.08}>
                  <p
                    className={
                      index === 0
                        ? 'text-xl leading-relaxed text-foreground md:text-2xl'
                        : 'text-lg leading-relaxed text-foreground-muted'
                    }
                  >
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.15}>
              <dl className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
                {highlights.map(item => (
                  <div key={item.label} className="flex flex-col gap-2 bg-background-elevated p-6">
                    <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">{item.label}</dt>
                    <dd className="text-lg font-medium leading-snug tracking-tight text-foreground">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
