import { cn } from '@/app/lib/utils';

/** Slanted, heavy "PD" initials used as the site mark. */
export function Monogram({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={cn('h-8 w-8', className)}>
      <text
        x="32"
        y="44"
        textAnchor="middle"
        fill="currentColor"
        style={{ fontFamily: 'var(--font-mona)', fontWeight: 900, fontStretch: '125%', fontSize: 34, fontStyle: 'italic', letterSpacing: '-0.06em' }}
        transform="skewX(-10) translate(7 0)"
      >
        PD
      </text>
    </svg>
  );
}

/** Text that runs around a circle, slowly rotating, with an optional centre mark. */
export function RotatingBadge({
  text,
  className,
  children
}: {
  text: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={cn('relative flex h-24 w-24 items-center justify-center', className)}>
      <svg viewBox="0 0 100 100" className="animate-spin-slow absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <path id="badge-circle" d="M50 50m-38 0a38 38 0 1 1 76 0a38 38 0 1 1-76 0" />
        </defs>
        <text className="fill-current" style={{ fontSize: 8.5, fontWeight: 700 }}>
          <textPath href="#badge-circle" textLength={236} lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </svg>
      {children}
    </div>
  );
}
