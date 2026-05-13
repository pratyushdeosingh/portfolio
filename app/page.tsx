import { Navigation } from '@/app/components/layout/navigation';
import { Footer } from '@/app/components/layout/footer';
import { HeroSection } from '@/app/sections/hero';
import { AboutSection } from '@/app/sections/about';
import { ExperienceSection } from '@/app/sections/experience';
import { SkillsSection } from '@/app/sections/skills';
import { ProjectsSection } from '@/app/sections/projects';
import { TestimonialsSection } from '@/app/sections/testimonials';
import { FAQSection } from '@/app/sections/faq';
import { ContactSection } from '@/app/sections/contact';

export default function HomePage() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-foreground focus:text-background focus:rounded-lg focus:font-medium"
      >
        Skip to main content
      </a>
      <Navigation />

      <main id="main-content">
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection />
        <TestimonialsSection />
        <FAQSection />
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}
