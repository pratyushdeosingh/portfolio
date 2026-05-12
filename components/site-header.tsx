'use client';

import { useEffect, useState } from 'react';

import { navLinks } from '@/data/portfolio';
import { CloseIcon, MenuIcon } from '@/components/icons';

export function SiteHeader() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const sections = navLinks
      .map(({ href }) => document.querySelector(href))
      .filter((element): element is HTMLElement => element instanceof HTMLElement);

    if (!sections.length) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting);

        if (visibleEntry) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      {
        root: null,
        rootMargin: '-20% 0px -55% 0px',
        threshold: 0.1
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  const navigate = (href: string) => {
    const target = document.querySelector(href);

    if (target instanceof HTMLElement) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className={`fixed-nav glass ${isScrolled ? 'scrolled' : ''}`} aria-label="Main navigation" id="main-nav">
        <div className="nav-container">
          <div className="nav-brand">
            <a href="#hero" aria-label="Home" onClick={(event) => { event.preventDefault(); navigate('#hero'); }}>
              PDS
            </a>
          </div>

          <ul className="nav-links" role="menubar">
            {navLinks.map((item) => {
              const isActive = activeSection === item.href.slice(1);

              return (
                <li key={item.href} role="none">
                  <a
                    href={item.href}
                    className={`nav-link ${isActive ? 'active' : ''}`}
                    role="menuitem"
                    data-section={item.href.slice(1)}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={(event) => {
                      event.preventDefault();
                      navigate(item.href);
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <button
            className="hamburger"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
            type="button"
            onClick={() => setIsMenuOpen((value) => !value)}
          >
            <MenuIcon className="hamburger-icon hamburger-menu" aria-hidden="true" />
            <CloseIcon className="hamburger-icon hamburger-close" aria-hidden="true" />
          </button>
        </div>
      </nav>

      <div
        className={`mobile-nav glass ${isMenuOpen ? 'open' : ''}`}
        id="mobile-nav"
        aria-hidden={!isMenuOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <button className="mobile-nav-close" aria-label="Close menu" type="button" onClick={() => setIsMenuOpen(false)}>
          <CloseIcon aria-hidden="true" />
        </button>

        <ul className="mobile-nav-links" role="menubar">
          {navLinks.map((item) => {
            const isActive = activeSection === item.href.slice(1);

            return (
              <li key={item.href} role="none">
                <a
                  href={item.href}
                  className={`mobile-nav-link ${isActive ? 'active' : ''}`}
                  role="menuitem"
                  data-section={item.href.slice(1)}
                  aria-current={isActive ? 'page' : undefined}
                  onClick={(event) => {
                    event.preventDefault();
                    navigate(item.href);
                  }}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      <div
        className={`mobile-nav-overlay ${isMenuOpen ? 'open' : ''}`}
        id="mobile-nav-overlay"
        aria-hidden={!isMenuOpen}
        onClick={() => setIsMenuOpen(false)}
      />
    </>
  );
}
