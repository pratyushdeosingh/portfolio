'use client';

import { useEffect, useRef } from 'react';
import { buildContours } from '@/app/components/effects/topo-lines';
import { cn } from '@/app/lib/utils';

/*
 * Hero portrait with a "paint the helmet on" interaction.
 *
 * A placeholder bust (swap for a real cut-out photo later) sits under a faint helmet outline.
 * Wherever the pointer moves, a soft brush reveals the full livery helmet on a canvas,
 * and the reveal fades back out over a second or two. With no pointer (touch, idle),
 * the brush traces a slow loop on its own so the effect is still visible.
 */

const VB_W = 400;
const VB_H = 480;

const HELMET =
  'M200 34C288 34 334 108 334 204C334 270 321 332 292 374C262 391 138 391 108 374C79 332 66 270 66 204C66 108 112 34 200 34Z';
const VISOR =
  'M98 158C140 143 260 143 302 158C309 184 307 210 298 230C252 243 148 243 102 230C93 210 91 184 98 158Z';
const SHOULDERS = 'M18 480C28 404 98 362 200 354C302 362 372 404 382 480Z';

function liveryMarkup() {
  // Re-use the topographic generator as the helmet's "blob" livery.
  const contours = buildContours(303)
    .map(d => `<path d="${d}"/>`)
    .join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${VB_W} ${VB_H}">
  <defs>
    <clipPath id="h"><path d="${HELMET}"/></clipPath>
    <linearGradient id="v" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#3b3c38"/><stop offset=".45" stop-color="#111112"/><stop offset="1" stop-color="#282c20"/>
    </linearGradient>
    <linearGradient id="s" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#000" stop-opacity=".35"/><stop offset=".3" stop-color="#000" stop-opacity="0"/>
      <stop offset=".7" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".35"/>
    </linearGradient>
  </defs>
  <g clip-path="url(#h)">
    <rect width="${VB_W}" height="${VB_H}" fill="#d2ff00"/>
    <g transform="translate(-136 -20) scale(0.42)" fill="none" stroke="#111112" stroke-width="26" stroke-linecap="round">${contours}</g>
    <rect width="${VB_W}" height="${VB_H}" fill="url(#s)"/>
    <path d="M70 300C140 322 260 322 330 300L330 400L70 400Z" fill="#111112"/>
    <rect x="150" y="318" width="100" height="10" rx="5" fill="#d2ff00"/>
  </g>
  <path d="${VISOR}" fill="url(#v)" stroke="#111112" stroke-width="5"/>
  <path d="M118 168C160 158 214 156 252 160" fill="none" stroke="#f4f4ed" stroke-opacity=".55" stroke-width="6" stroke-linecap="round"/>
  <path d="${HELMET}" fill="none" stroke="#111112" stroke-width="5"/>
  <text x="200" y="110" text-anchor="middle" font-family="Arial Black, Arial, sans-serif" font-weight="900" font-style="italic" font-size="34" fill="#111112">PD</text>
</svg>`;
}

export function HelmetPortrait({ className }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!wrap || !canvas || !ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mask = document.createElement('canvas');
    const mctx = mask.getContext('2d');
    if (!mctx) return;

    const img = new Image();
    let ready = false;
    img.onload = () => {
      ready = true;
      if (reduce) drawStatic();
    };
    img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(liveryMarkup())}`;

    let w = 0;
    let h = 0;
    let dpr = 1;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      for (const c of [canvas, mask]) {
        c.width = Math.round(w * dpr);
        c.height = Math.round(h * dpr);
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      mctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reduce && ready) drawStatic();
    };

    // Reduced motion: show a fixed, partially revealed helmet instead of animating.
    function drawStatic() {
      if (w < 1 || h < 1) return;
      mctx!.clearRect(0, 0, w, h);
      const g = mctx!.createRadialGradient(w * 0.62, h * 0.35, 0, w * 0.62, h * 0.35, w * 0.35);
      g.addColorStop(0, 'rgba(0,0,0,1)');
      g.addColorStop(1, 'rgba(0,0,0,0)');
      mctx!.fillStyle = g;
      mctx!.fillRect(0, 0, w, h);
      compose();
    }

    function compose() {
      if (w < 1 || h < 1) return;
      ctx!.clearRect(0, 0, w, h);
      if (!ready) return;
      ctx!.globalCompositeOperation = 'source-over';
      ctx!.drawImage(img, 0, 0, w, h);
      ctx!.globalCompositeOperation = 'destination-in';
      ctx!.drawImage(mask, 0, 0, w, h);
      ctx!.globalCompositeOperation = 'source-over';
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    if (reduce) return () => ro.disconnect();

    const pointer = { x: 0, y: 0, active: false, last: 0 };
    let prev: { x: number; y: number } | null = null;
    let visible = true;
    let frame = 0;
    const start = performance.now();

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
      pointer.last = performance.now();
    };

    const brush = (x: number, y: number, r: number) => {
      const g = mctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, 'rgba(0,0,0,0.9)');
      g.addColorStop(0.55, 'rgba(0,0,0,0.55)');
      g.addColorStop(1, 'rgba(0,0,0,0)');
      mctx.fillStyle = g;
      mctx.beginPath();
      mctx.arc(x, y, r, 0, Math.PI * 2);
      mctx.fill();
    };

    const loop = (now: number) => {
      frame = requestAnimationFrame(loop);
      if (!visible || w < 1 || h < 1) return;

      // Fade the existing reveal a little every frame.
      mctx.globalCompositeOperation = 'destination-out';
      mctx.fillStyle = 'rgba(0,0,0,0.035)';
      mctx.fillRect(0, 0, w, h);
      mctx.globalCompositeOperation = 'source-over';

      let target: { x: number; y: number };
      if (pointer.active && now - pointer.last < 2200) {
        target = { x: pointer.x, y: pointer.y };
      } else {
        // Idle: trace a slow loop around the head.
        const t = (now - start) / 1000;
        target = {
          x: w * (0.5 + 0.26 * Math.sin(t * 0.9)),
          y: h * (0.4 + 0.2 * Math.sin(t * 1.7 + 1))
        };
      }

      const r = w * 0.13;
      if (prev) {
        const dx = target.x - prev.x;
        const dy = target.y - prev.y;
        const steps = Math.min(24, Math.max(1, Math.ceil(Math.hypot(dx, dy) / (r * 0.25))));
        for (let i = 1; i <= steps; i++) brush(prev.x + (dx * i) / steps, prev.y + (dy * i) / steps, r);
      } else {
        brush(target.x, target.y, r);
      }
      prev = target;
      compose();
    };

    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    io.observe(wrap);
    window.addEventListener('pointermove', onMove, { passive: true });
    frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
      io.disconnect();
      ro.disconnect();
    };
  }, []);

  return (
    <div ref={wrapRef} className={cn('relative aspect-[400/480]', className)}>
      {/* Placeholder bust: halftone silhouette standing in for a portrait photo */}
      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        className="absolute inset-0 h-full w-full"
        role="img"
        aria-label="Portrait placeholder with a helmet that paints in under the cursor"
      >
        <defs>
          <pattern id="halftone" width="7" height="7" patternUnits="userSpaceOnUse">
            <circle cx="3.5" cy="3.5" r="1.6" fill="#282c20" />
          </pattern>
          <radialGradient id="bust-shade" cx="0.42" cy="0.3" r="0.8">
            <stop offset="0" stopColor="#535450" />
            <stop offset="0.6" stopColor="#343a26" />
            <stop offset="1" stopColor="#1b1c1a" />
          </radialGradient>
          <linearGradient id="bust-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0.75" stopColor="#fff" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <mask id="bust-mask">
            <rect width={VB_W} height={VB_H} fill="url(#bust-fade)" />
          </mask>
        </defs>

        <g mask="url(#bust-mask)">
          <path d={SHOULDERS} fill="url(#bust-shade)" />
          <path d="M168 270h64v96c-20 10-44 10-64 0Z" fill="#343a26" />
          <ellipse cx="200" cy="198" rx="74" ry="94" fill="url(#bust-shade)" />
          <path d={SHOULDERS} fill="url(#halftone)" opacity="0.35" />
          <ellipse cx="200" cy="198" rx="74" ry="94" fill="url(#halftone)" opacity="0.3" />
          {/* Collar line */}
          <path d="M150 362C176 392 224 392 250 362" fill="none" stroke="#d2ff00" strokeWidth="3" strokeOpacity="0.7" />
        </g>

        {/* Faint glassy helmet outline, always visible */}
        <path d={HELMET} fill="#f4f4ed" fillOpacity="0.16" stroke="#111112" strokeOpacity="0.18" strokeWidth="1.5" />
        <path d={VISOR} fill="none" stroke="#111112" strokeOpacity="0.14" strokeWidth="1.5" />
      </svg>

      <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" />
    </div>
  );
}
