import { Code2, Globe, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-foreground-dim">
            Pratyush Deo Singh — 2026
          </p>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/pratyushdeosingh"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground-dim hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <Code2 className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com/in/pratyushdeosingh"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground-dim hover:text-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <Globe className="w-4 h-4" />
            </a>
            <a
              href="mailto:workforpratyush@gmail.com"
              className="text-foreground-dim hover:text-foreground transition-colors"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
