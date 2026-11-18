import { cn } from '@/app/lib/utils';

/**
 * Topographic contour lines, generated deterministically so server and client render the same SVG.
 * Each "peak" is a set of nested, wobbly closed curves.
 */

const W = 1600;
const H = 1000;
const SAMPLES = 72;

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const r1 = (n: number) => Math.round(n * 10) / 10;

/** Closed Catmull-Rom spline through the points, expressed as cubic Béziers. */
function smoothClosedPath(points: [number, number][]) {
  const n = points.length;
  let d = `M${r1(points[0][0])} ${r1(points[0][1])}`;
  for (let i = 0; i < n; i++) {
    const p0 = points[(i - 1 + n) % n];
    const p1 = points[i];
    const p2 = points[(i + 1) % n];
    const p3 = points[(i + 2) % n];
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += `C${r1(c1x)} ${r1(c1y)} ${r1(c2x)} ${r1(c2y)} ${r1(p2[0])} ${r1(p2[1])}`;
  }
  return d + 'Z';
}

const cache = new Map<number, string[]>();

export function buildContours(seed: number) {
  const hit = cache.get(seed);
  if (hit) return hit;

  const rand = mulberry32(seed);
  const paths: string[] = [];
  const peaks = 5;

  for (let p = 0; p < peaks; p++) {
    const cx = (rand() * 1.2 - 0.1) * W;
    const cy = (rand() * 1.2 - 0.1) * H;
    const rings = 5 + Math.floor(rand() * 6);
    const base = 30 + rand() * 60;
    const step = 34 + rand() * 30;
    const stretch = 0.65 + rand() * 0.7;
    const tilt = rand() * Math.PI;
    const phases = [rand(), rand(), rand(), rand()].map(v => v * Math.PI * 2);

    for (let k = 0; k < rings; k++) {
      const radius = base + k * step;
      const wobble = 0.12 + k * 0.025;
      const pts: [number, number][] = [];
      for (let i = 0; i < SAMPLES; i++) {
        const t = (i / SAMPLES) * Math.PI * 2;
        const noise =
          1 +
          wobble *
            (0.55 * Math.sin(2 * t + phases[0] + k * 0.18) +
              0.3 * Math.sin(3 * t + phases[1] - k * 0.12) +
              0.18 * Math.sin(5 * t + phases[2] + k * 0.3) +
              0.08 * Math.sin(7 * t + phases[3]));
        const x = Math.cos(t) * radius * noise;
        const y = Math.sin(t) * radius * noise * stretch;
        pts.push([cx + x * Math.cos(tilt) - y * Math.sin(tilt), cy + x * Math.sin(tilt) + y * Math.cos(tilt)]);
      }
      paths.push(smoothClosedPath(pts));
    }
  }

  cache.set(seed, paths);
  return paths;
}

interface TopoLinesProps {
  seed?: number;
  className?: string;
}

export function TopoLines({ seed = 7, className }: TopoLinesProps) {
  const paths = buildContours(seed);
  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className={cn('pointer-events-none absolute inset-0 h-full w-full', className)}
      fill="none"
      stroke="currentColor"
    >
      {paths.map((d, i) => (
        <path key={i} d={d} strokeWidth={1} vectorEffect="non-scaling-stroke" />
      ))}
    </svg>
  );
}
