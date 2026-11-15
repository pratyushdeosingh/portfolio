import { aboutParagraphs, stats } from '@/data/portfolio';
import { AnimatedCounter } from '@/app/components/ui/animated-counter';
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
                {stats.map(stat => (
                  <div key={stat.label} className="flex flex-col-reverse gap-2 bg-background-elevated p-6">
                    <dt className="text-sm text-foreground-dim">{stat.label}</dt>
                    <dd className="text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
                      <AnimatedCounter target={stat.value} suffix={stat.suffix} duration={1.6} />
                    </dd>
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
