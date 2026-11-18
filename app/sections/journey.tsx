import { GraduationCap, MapPin, Target, Wrench } from 'lucide-react';
import { highlights, timelineEntries } from '@/data/portfolio';
import { TopoLines } from '@/app/components/effects/topo-lines';
import { MaskLine, Parallax, Reveal } from '@/app/components/ui/reveal';

const highlightIcons = [Target, Wrench, MapPin];

function Caption({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow mb-2 text-mute">{children}</p>;
}

/** Scattered "photo wall" of education and highlights, each card drifting at its own speed. */
export function JourneySection() {
  const [degree, school] = timelineEntries;

  return (
    <section
      id="journey"
      data-nav="light"
      aria-label="Education and journey"
      className="relative overflow-hidden bg-cream py-28 md:py-40"
    >
      <div className="absolute inset-0 text-ink/[0.08]">
        <TopoLines seed={41} />
      </div>

      <div className="container-page relative">
        <h2 className="mb-16 text-ink md:mb-24">
          <MaskLine className="display-sans text-[clamp(3rem,9vw,8rem)]">The</MaskLine>
          <MaskLine delay={0.08} className="display-serif text-[clamp(3rem,9vw,8rem)]">
            Journey
          </MaskLine>
        </h2>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-6">
          {/* Degree card */}
          <Parallax speed={0.15} className="md:col-span-4 md:col-start-2">
            <Reveal>
              <Caption>
                Chennai, {degree.period.replace(/\s/g, '')}
              </Caption>
              <article className="rounded-md bg-olive p-6 text-cream">
                <div className="flex aspect-[4/3] items-center justify-center rounded-sm bg-ink">
                  <span className="display-serif text-[5.5rem] text-lime">VIT</span>
                </div>
                <h3 className="display-sans mt-5 text-xl">{degree.title}</h3>
                <p className="mt-1 text-sm text-sage">{degree.organization}</p>
                <p className="mt-4 text-sm leading-relaxed text-cream/75">{degree.description}</p>
                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {degree.tags.map(tag => (
                    <li key={tag} className="eyebrow rounded-sm bg-cream/10 px-2 py-1 text-cream/80">
                      {tag}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          </Parallax>

          {/* Quote */}
          <Parallax speed={-0.1} className="flex flex-col justify-center md:col-span-4 md:col-start-8">
            <Reveal delay={0.1}>
              <blockquote className="font-serif text-2xl leading-snug text-ink md:text-3xl">
                I enjoy <strong className="font-semibold italic">solving problems</strong>, experimenting with ideas,
                and <strong className="font-semibold italic">continuously improving</strong>.
              </blockquote>
            </Reveal>
          </Parallax>

          {/* School card */}
          <Parallax speed={0.3} className="md:col-span-3 md:col-start-6 md:-mt-10">
            <Reveal delay={0.05}>
              <Caption>School, {school.period.replace(/\s/g, '')}</Caption>
              <article className="rounded-md bg-cream p-5 shadow-[0_20px_60px_-30px_rgba(17,17,18,0.45)]">
                <div className="flex aspect-square items-center justify-center rounded-sm bg-lime">
                  <GraduationCap className="h-16 w-16 text-ink" strokeWidth={1.2} aria-hidden="true" />
                </div>
                <h3 className="display-sans mt-4 text-base">{school.title}</h3>
                <p className="mt-1 text-sm text-mute">{school.organization}</p>
                <p className="mt-3 text-sm leading-relaxed text-mute">{school.description}</p>
              </article>
            </Reveal>
          </Parallax>

          {/* Highlights */}
          <div className="grid gap-6 sm:grid-cols-3 md:col-span-10 md:col-start-2 md:mt-10">
            {highlights.map((item, i) => {
              const Icon = highlightIcons[i] ?? Target;
              return (
                <Parallax key={item.label} speed={[0.05, 0.2, 0.1][i]}>
                  <Reveal delay={i * 0.08}>
                    <Caption>{item.label}</Caption>
                    <div className="group flex items-end justify-between gap-4 rounded-md border border-ink/15 bg-cream/70 p-5 backdrop-blur-sm transition-colors hover:bg-ink hover:text-cream">
                      <p className="display-sans text-lg leading-tight">{item.value}</p>
                      <Icon
                        className="h-6 w-6 shrink-0 text-mute transition-colors group-hover:text-lime"
                        aria-hidden="true"
                      />
                    </div>
                  </Reveal>
                </Parallax>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
