import {
  ArrowUpRight,
  Code2,
  Globe,
  HardHat,
  Landmark,
  ShieldAlert,
  Stethoscope,
  type LucideIcon
} from 'lucide-react';
import { projects } from '@/data/portfolio';
import { Accent, Reveal, SectionHeading } from '@/app/components/ui/reveal';
import { SpotlightCard } from '@/app/components/ui/spotlight-card';

const projectIcons: Record<string, LucideIcon> = {
  shield: ShieldAlert,
  landmark: Landmark,
  stethoscope: Stethoscope,
  helmet: HardHat,
  globe: Globe,
  code: Code2
};

export function ProjectsSection() {
  return (
    <section id="projects" className="section-padding" aria-label="Projects">
      <div className="container-page">
        <SectionHeading
          index="04"
          label="Projects"
          description="Things I've built solo and with teams, from fraud detection and fintech agents to embedded hardware."
        >
          Featured <Accent>work</Accent>
        </SectionHeading>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {projects.map((project, index) => {
            const Icon = projectIcons[project.icon] ?? Code2;
            return (
              <Reveal key={project.title} delay={index * 0.1} className="h-full">
                <SpotlightCard className="group flex h-full flex-col p-7 hover:-translate-y-1 md:p-8">
                  <div className="mb-10 flex items-start justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-primary-muted text-primary transition-transform duration-500 group-hover:scale-110">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="font-mono text-xs text-foreground-dim">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <h3 className="text-2xl font-semibold leading-tight tracking-tight text-foreground">
                    {project.title}
                  </h3>
                  <p className="mt-4 leading-relaxed text-foreground-muted">{project.description}</p>

                  <ul className="mt-6 flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <li
                        key={tag}
                        className="rounded-full border border-border px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-foreground-dim"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex flex-wrap gap-x-6 gap-y-3 pt-8">
                    {project.actions.map(action => (
                      <a
                        key={action.label}
                        href={action.href}
                        target={action.external ? '_blank' : undefined}
                        rel={action.external ? 'noopener noreferrer' : undefined}
                        className="group/link inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-primary"
                      >
                        {action.label}
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                      </a>
                    ))}
                  </div>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
