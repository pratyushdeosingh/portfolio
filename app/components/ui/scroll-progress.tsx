'use client';

import { useScrollProgress } from '@/app/hooks';

export function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-1 bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-150 ease-out"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
}
