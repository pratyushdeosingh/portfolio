import { ArrowUpRight } from 'lucide-react';
import { projects } from '@/data/portfolio';
import { ProjectGlyph } from '@/app/components/ui/project-glyph';
import { MaskLine, Reveal } from '@/app/components/ui/reveal';
import { cn } from '@/app/lib/utils';

/** Staggered grid of project cards; hovering swaps the glyph for the full description. */
export function ProjectsSection() {
  return (
    <section id="projects" data-nav="dark" aria-label="Projects" className="relative bg-ink py-28 text-cream md:py-40">
      <div className="container-page">
        <div className="mb-16 flex flex-col gap-8 md:mb-24 md:flex-row md:items-end md:justify-between">
          <h2>
            <MaskLine className="display-sans text-[clamp(3rem,8vw,7rem)]">Projects</MaskLine>
            <MaskLine delay={0.08} className="display-serif text-[clamp(3rem,8vw,7rem)] text-lime">
              Hall of Fame
            </MaskLine>
          </h2>
          <Reveal className="max-w-xs text-sm leading-relaxed text-sage">
            From fraud intelligence and agentic finance to a crash-detecting helmet: the things I have built solo and
            with teams.
          </Reveal>
        </div>

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <li key={project.title} className={cn(index % 3 === 1 && 'lg:translate-y-24', index % 2 === 1 && 'sm:max-lg:translate-y-16')}>
              <Reveal delay={(index % 3) * 0.08} className="h-full">
                <article className="group relative flex h-full flex-col rounded-md border border-mute/60 bg-ink-soft p-4 transition-colors duration-500 hover:border-lime/70">
                  <div className="flex items-center justify-between">
                    <span className="eyebrow text-sage">{project.label}</span>
                    <span className="eyebrow text-lime">No. {String(index + 1).padStart(2, '0')}</span>
                  </div>

                  {/* Art / description swap */}
                  <div className="relative my-4 aspect-[4/3] overflow-hidden rounded-sm bg-olive">
                    <div className="absolute inset-0 flex items-center justify-center transition-all duration-500 [@media(hover:hover)]:group-hover:scale-90 [@media(hover:hover)]:group-hover:opacity-0">
                      <div className="absolute h-[70%] w-[70%] rounded-[45%_55%_60%_40%/50%_40%_60%_50%] bg-lime/90 transition-transform duration-700 group-hover:rotate-45" />
                      <ProjectGlyph name={project.icon} className="relative h-1/3 w-1/3 text-ink" />
                    </div>
                    <p className="absolute inset-0 hidden items-center p-5 text-sm leading-relaxed text-cream/90 opacity-0 transition-opacity duration-500 [@media(hover:hover)]:flex [@media(hover:hover)]:group-hover:opacity-100">
                      {project.description}
                    </p>
                  </div>

                  <p className="mb-4 text-sm leading-relaxed text-sage [@media(hover:hover)]:hidden">{project.description}</p>

                  <h3 className="display-sans text-xl leading-tight">{project.title}</h3>

                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {project.tags.map(tag => (
                      <li key={tag} className="eyebrow rounded-sm bg-cream/[0.07] px-2 py-1 text-cream/70">
                        {tag}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex flex-wrap gap-2 pt-5">
                    {project.actions.map(action => (
                      <a
                        key={action.label}
                        href={action.href}
                        target={action.external ? '_blank' : undefined}
                        rel={action.external ? 'noopener noreferrer' : undefined}
                        className="eyebrow group/link inline-flex h-8 items-center gap-1 rounded-sm border border-cream/25 px-2.5 text-cream transition-colors hover:border-lime hover:bg-lime hover:text-ink"
                      >
                        {action.label}
                        <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover/link:rotate-45" />
                      </a>
                    ))}
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
      <div className="h-0 lg:h-24" aria-hidden="true" />
    </section>
  );
}
