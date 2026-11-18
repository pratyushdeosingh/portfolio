import { Navigation } from '@/app/components/layout/navigation';
import { Footer } from '@/app/components/layout/footer';
import { HeroSection } from '@/app/sections/hero';
import { StatementSection } from '@/app/sections/statement';
import { JourneySection } from '@/app/sections/journey';
import { SplitSection } from '@/app/sections/split';
import { ProjectsSection } from '@/app/sections/projects';
import { SkillsSection } from '@/app/sections/skills';
import { FAQSection } from '@/app/sections/faq';

export default function HomePage() {
  return (
    <>
      <a
        href="#main-content"
        className="eyebrow sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:rounded-md focus:bg-lime focus:px-4 focus:py-3 focus:text-ink"
      >
        Skip to main content
      </a>
      <Navigation />

      <main id="main-content">
        <HeroSection />
        <StatementSection />
        <JourneySection />
        <SplitSection />
        <ProjectsSection />
        <SkillsSection />
        <FAQSection />
      </main>

      <Footer />
    </>
  );
}
