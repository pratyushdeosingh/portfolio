'use client';

import { useEffect } from 'react';

export function ScrollReveal() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-animate]'));

    if (!elements.length) {
      return undefined;
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return undefined;
    }

    elements.forEach((element) => {
      const stagger = Number(element.dataset.stagger ?? '0');

      if (!Number.isNaN(stagger) && stagger > 0) {
        element.style.transitionDelay = `${stagger * 80}ms`;
      }

      element.style.willChange = 'opacity, transform';
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            entry.target.addEventListener(
              'transitionend',
              () => {
                (entry.target as HTMLElement).style.willChange = 'auto';
              },
              { once: true }
            );
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return null;
}
