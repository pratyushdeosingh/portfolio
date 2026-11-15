'use client';

import { cn } from '@/app/lib/utils';

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/** Bordered card with a soft glow that follows the pointer. */
export function SpotlightCard({ children, className, ...props }: SpotlightCardProps) {
  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  return (
    <div
      onPointerMove={handleMove}
      className={cn(
        'spotlight rounded-2xl border border-border bg-surface transition-[border-color,transform] duration-500 hover:border-border-hover',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
