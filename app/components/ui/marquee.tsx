'use client';

import { cn } from '@/app/lib/utils';

interface MarqueeProps {
  children: React.ReactNode;
  speed?: number;
  direction?: 'left' | 'right';
  pauseOnHover?: boolean;
  className?: string;
}

export function Marquee({
  children,
  speed = 30,
  direction = 'left',
  pauseOnHover = false,
  className
}: MarqueeProps) {
  const animationDirection = direction === 'left' ? 'normal' : 'reverse';

  return (
    <div
      className={cn(
        'overflow-hidden whitespace-nowrap',
        pauseOnHover && 'group',
        className
      )}
    >
      <div
        className={cn(
          'inline-flex will-change-transform',
          pauseOnHover && 'group-hover:[animation-play-state:paused]'
        )}
        style={{
          animation: `marquee ${speed}s linear infinite`,
          animationDirection
        }}
      >
        <div className="inline-flex shrink-0">{children}</div>
        <div className="inline-flex shrink-0" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
