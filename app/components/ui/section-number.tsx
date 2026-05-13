'use client';

interface SectionNumberProps {
  number: number;
  className?: string;
}

export function SectionNumber({ number, className }: SectionNumberProps) {
  return (
    <span
      className={`text-xs font-mono text-muted-foreground tracking-wider ${className}`}
    >
      ({String(number).padStart(2, '0')})
    </span>
  );
}
