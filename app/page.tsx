import { ArrowRightIcon, ExternalLinkIcon, projectIconMap, socialIconMap, SparkleIcon } from '@/components/icons';
import { HeroParticles } from '@/components/hero-particles';
import { ScrollReveal } from '@/components/scroll-reveal';
import { SiteHeader } from '@/components/site-header';
import {
  aboutParagraphs,
  heroTagline,
  projects,
  skillGroups,
  socialLinks,
  timelineEntries
} from '@/data/portfolio';

export default function HomePage() {
  return (
    <>
      <SiteHeader />

      <main id="main-content">
        <section id="hero" aria-label="Hero section">
          <HeroParticles />
          <div className="hero-gradient-overlay" aria-hidden="true" />
          <div className="container hero-content" data-animate="fade-up">
            <p className="hero-eyebrow glass-light">
              <SparkleIcon aria-hidden="true" />
              Computer Science Student · VIT Chennai
            </p>
            <h1>Pratyush Deo Singh</h1>
            <p className="subtitle">Builder. Problem solver. Future software engineer.</p>
            <p className="tagline">{heroTagline}</p>
            <div className="cta-buttons">
              <a href="#projects" className="btn btn-primary">
                See My Projects
                <ArrowRightIcon aria-hidden="true" />
              </a>
              <a href="#contact" className="btn btn-secondary">
                Contact Me
              </a>
            </div>
          </div>
        </section>

        <section id="about" aria-label="About me section">
          <div className="container" data-animate="fade-up">
            <h2>About Me</h2>
            <div className="about-container bio-only">
              <div className="bio-content full-width glass">
                {aboutParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="skills" aria-label="Technical skills section">
          <div className="container" data-animate="fade-up">
            <h2>Technical Skills</h2>
            <div className="skills-grid">
              {skillGroups.map((group, index) => (
                <article
                  key={group.title}
                  className="skill-card"
                  data-animate="fade-up"
                  data-stagger={index + 1}
                  tabIndex={0}
                  aria-label={`${group.title}: ${group.tags.join(', ')}`}
                  style={{ transitionDelay: `${index * 90}ms` }}
                >
                  <h3>{group.title}</h3>
                  <div className="skill-tags">
                    {group.tags.map((tag) => (
                      <span key={tag} className="skill-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" aria-label="Projects section">
          <div className="container">
            <h2 data-animate="fade-up">Featured Projects</h2>
            <p className="section-subtitle" data-animate="fade-up">
              A selection of my recent work and learning projects
            </p>

            <div className="projects-grid">
              {projects.map((project, index) => {
                const ProjectIcon = projectIconMap[project.icon];

                return (
                  <article
                    key={project.title}
                    className="project-card glass"
                    data-animate="fade-up"
                    data-stagger={index + 1}
                    style={{ transitionDelay: `${index * 110}ms` }}
                  >
                    <div className="project-image">
                      <div className="project-placeholder" aria-hidden="true">
                        <ProjectIcon />
                      </div>
                    </div>

                    <div className="project-content">
                      <h3>{project.title}</h3>
                      <p className="project-description">{project.description}</p>

                      <div className="project-tech">
                        {project.tags.map((tag) => (
                          <span key={tag} className="tech-tag">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="project-links">
                        {project.actions.map((action) => (
                          <a
                            key={action.href}
                            href={action.href}
                            className="project-link"
                            target={action.href.startsWith('mailto:') ? undefined : '_blank'}
                            rel={action.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                          >
                            {action.label}
                            <ExternalLinkIcon aria-hidden="true" />
                          </a>
                        ))}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="experience" aria-label="Education and experience section">
          <div className="container">
            <h2 data-animate="fade-up">Education & Experience</h2>
            <div className="timeline-container" data-animate="fade-up">
              <div className="timeline-line" aria-hidden="true" />

              {timelineEntries.map((entry, index) => (
                <article
                  key={entry.title}
                  className={`timeline-entry ${index % 2 === 0 ? 'left' : 'right'}`}
                  data-animate="fade-up"
                  tabIndex={0}
                  aria-label={`${entry.title}: ${entry.organization}, ${entry.period}`}
                  style={{ transitionDelay: `${index * 120}ms` }}
                >
                  <div className="timeline-card glass">
                    <div className="timeline-dot" aria-hidden="true" />
                    <h3>{entry.title}</h3>
                    <h4>{entry.organization}</h4>
                    <span className="period">{entry.period}</span>
                    <p className="description">{entry.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" aria-label="Contact section">
          <div className="container" data-animate="fade-up">
            <h2>Get In Touch</h2>
            <div className="contact-card glass">
              <a className="email-link" href="mailto:workforpratyush@gmail.com">
                workforpratyush@gmail.com
              </a>

              <div className="social-icons-container">
                {socialLinks.map((link) => {
                  const Icon = socialIconMap[link.icon];

                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      className="social-icon-link"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                      title={link.label}
                    >
                      <Icon aria-hidden="true" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container site-footer__inner">
          <p>Built with Next.js and React by Pratyush Deo Singh.</p>
          <div className="site-footer__links">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </footer>

      <ScrollReveal />
    </>
  );
}
