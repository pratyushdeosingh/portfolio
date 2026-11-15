import { Braces, BrainCircuit, Globe, Wrench, type LucideIcon } from 'lucide-react';
import { skillGroups } from '@/data/portfolio';
import { Accent, Reveal, SectionHeading } from '@/app/components/ui/reveal';
import { SpotlightCard } from '@/app/components/ui/spotlight-card';

const groupIcons: Record<string, LucideIcon> = {
  Languages: Braces,
  'Web Development': Globe,
  'Core Concepts': BrainCircuit,
  'Tools & Technologies': Wrench
};

export function SkillsSection() {
  return (
    <section id="skills" className="section-padding" aria-label="Technical skills">
      <div className="container-page">
        <SectionHeading
          index="03"
          label="Skills"
          description="The languages, concepts and tools I reach for most, and the ones I'm actively getting better at."
        >
          Technologies &amp; <Accent>tools</Accent>
        </SectionHeading>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {skillGroups.map((group, index) => {
            const Icon = groupIcons[group.title] ?? Braces;
            return (
              <Reveal key={group.title} delay={index * 0.08} className="h-full">
                <SpotlightCard className="h-full p-7 md:p-8">
                  <div className="mb-8 flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-primary-muted text-primary">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="font-mono text-xs text-foreground-dim">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="mb-5 text-xl font-semibold tracking-tight text-foreground">{group.title}</h3>
                  <ul className="flex flex-wrap gap-2">
                    {group.tags.map(tag => (
                      <li
                        key={tag}
                        className="rounded-full border border-border bg-white/[0.02] px-3.5 py-1.5 text-sm text-foreground-muted transition-colors hover:border-primary/40 hover:text-foreground"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
