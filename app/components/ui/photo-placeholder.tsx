import { Camera, type LucideIcon } from 'lucide-react';
import { TopoLines } from '@/app/components/effects/topo-lines';
import { Monogram } from '@/app/components/ui/monogram';
import { cn } from '@/app/lib/utils';

export type PlaceholderVariant = 'topo' | 'halftone' | 'lime' | 'duotone';

interface PhotoPlaceholderProps {
  variant: PlaceholderVariant;
  icon?: LucideIcon;
  label?: string;
  seed?: number;
  className?: string;
}

/**
 * Stylised stand-in for a photo. Each variant has its own art; on hover the art zooms,
 * a light sweep passes across it and the corner tag slides in.
 * Replace with <Image> once real photos are available.
 */
export function PhotoPlaceholder({ variant, icon: Icon, label, seed = 1, className }: PhotoPlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={label ? `Photo placeholder: ${label}` : 'Photo placeholder'}
      className={cn('group/ph relative isolate overflow-hidden rounded-sm', className)}
    >
      <div className="absolute inset-0 transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/ph:scale-110">
        {variant === 'topo' && (
          <div className="absolute inset-0 bg-olive text-lime/60">
            <TopoLines seed={seed} />
          </div>
        )}
        {variant === 'halftone' && (
          <div className="absolute inset-0 bg-cream">
            <div className="absolute left-1/2 top-1/2 h-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime/70 blur-2xl" />
          </div>
        )}
        {variant === 'halftone' && (
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle, #282c20 1.3px, transparent 1.6px)',
              backgroundSize: '8px 8px',
              WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 35% 30%, #000 10%, transparent 75%)',
              maskImage: 'radial-gradient(ellipse 80% 70% at 35% 30%, #000 10%, transparent 75%)'
            }}
          />
        )}
        {variant === 'lime' && (
          <div className="absolute inset-0 bg-lime text-ink/25">
            <TopoLines seed={seed} />
          </div>
        )}
        {variant === 'duotone' && (
          <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_20%_10%,#535450_0%,#282c20_45%,#111112_100%)]">
            <div className="absolute inset-0 opacity-30 mix-blend-overlay [background-image:url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22160%22 height=%22160%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%222%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E')]" />
          </div>
        )}

        <div className="absolute inset-0 flex items-center justify-center">
          {Icon ? (
            <Icon
              strokeWidth={1}
              aria-hidden="true"
              className={cn(
                'h-1/4 w-1/4 transition-transform duration-700 group-hover/ph:-rotate-6',
                variant === 'lime' || variant === 'halftone' ? 'text-ink' : 'text-lime'
              )}
            />
          ) : (
            <Monogram className={cn('h-1/4 w-1/4', variant === 'lime' ? 'text-ink' : 'text-lime')} />
          )}
        </div>
      </div>

      {/* Light sweep on hover */}
      <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-cream/25 to-transparent transition-transform duration-1000 ease-out group-hover/ph:translate-x-full" />

      {/* Corner tag */}
      <span
        className={cn(
          'eyebrow absolute right-2 top-2 flex translate-y-[-150%] items-center gap-1 rounded-sm px-1.5 py-1 transition-transform duration-500 group-hover/ph:translate-y-0',
          variant === 'lime' ? 'bg-ink text-lime' : 'bg-lime text-ink'
        )}
      >
        <Camera className="h-3 w-3" aria-hidden="true" /> Photo soon
      </span>
    </div>
  );
}
