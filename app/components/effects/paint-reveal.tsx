'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/app/lib/utils';

/*
 * Paints a second, styled copy of its children in under the pointer.
 *
 * `children` renders the plain layer. `overlay` renders an identical copy with a different
 * treatment, stacked exactly on top and masked by a trail of soft circles that follows
 * the pointer and shrinks away over time. With no pointer (touch, idle) the brush drifts
 * across the element by itself so the effect is still visible.
 */

const TRAIL = 18;

interface PaintRevealProps {
  children: React.ReactNode;
  overlay: React.ReactNode;
  className?: string;
  /** Element whose pointer movement drives the brush (defaults to the window). */
  areaRef?: React.RefObject<HTMLElement | null>;
}

export function PaintReveal({ children, overlay, className, areaRef }: PaintRevealProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = overlayRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const points: { x: number; y: number; life: number }[] = [];
    const pointer = { x: 0, y: 0, last: -Infinity };
    let visible = true;
    let frame = 0;
    let lastMask = '';
    const start = performance.now();

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      const rect = el.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.last = performance.now();
    };

    const loop = (now: number) => {
      frame = requestAnimationFrame(loop);
      if (!visible) return;

      const { width: w, height: h } = el.getBoundingClientRect();
      if (w < 1 || h < 1) return;
      const radius = Math.min(150, Math.max(40, w * 0.075));

      let x: number;
      let y: number;
      if (now - pointer.last < 2000) {
        x = pointer.x;
        y = pointer.y;
      } else {
        const t = (now - start) / 1000;
        x = w * (0.5 + 0.46 * Math.sin(t * 0.6));
        y = h * (0.5 + 0.38 * Math.sin(t * 1.25 + 0.6));
      }

      const prev = points[points.length - 1];
      if (!prev || Math.hypot(prev.x - x, prev.y - y) > radius * 0.18) points.push({ x, y, life: 1 });
      else prev.life = 1;

      for (const p of points) p.life -= 0.018;
      while (points.length && (points[0].life <= 0 || points.length > TRAIL)) points.shift();

      const mask = points.length
        ? points
            .map(p => {
              const r = Math.max(1, radius * (0.35 + 0.65 * p.life));
              return `radial-gradient(circle at ${p.x.toFixed(1)}px ${p.y.toFixed(1)}px, #000 0, #000 ${(r * 0.55).toFixed(1)}px, transparent ${r.toFixed(1)}px)`;
            })
            .join(',')
        : 'linear-gradient(transparent, transparent)';

      if (mask !== lastMask) {
        el.style.maskImage = mask;
        el.style.webkitMaskImage = mask;
        lastMask = mask;
      }
    };

    const area = areaRef?.current ?? window;
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    io.observe(el);
    area.addEventListener('pointermove', onMove as EventListener, { passive: true });
    frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      area.removeEventListener('pointermove', onMove as EventListener);
      io.disconnect();
    };
  }, [areaRef]);

  return (
    <div className={cn('relative', className)}>
      {children}
      <div
        ref={overlayRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 select-none"
        style={{ maskImage: 'linear-gradient(transparent, transparent)', WebkitMaskImage: 'linear-gradient(transparent, transparent)' }}
      >
        {overlay}
      </div>
    </div>
  );
}
