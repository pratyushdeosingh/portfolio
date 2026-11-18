'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Monogram } from '@/app/components/ui/monogram';

/** Full-screen lime intro that counts up, then wipes away upward. */
export function Loader() {
  const [visible, setVisible] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(false);
      return;
    }

    document.documentElement.style.overflow = 'hidden';
    const start = performance.now();
    const duration = 1300;
    let frame = 0;

    let done: ReturnType<typeof setTimeout> | undefined;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setCount(Math.round((1 - Math.pow(1 - t, 3)) * 100));
      if (t < 1) frame = requestAnimationFrame(tick);
      else done = setTimeout(() => setVisible(false), 250);
    };
    frame = requestAnimationFrame(tick);
    // Safety net: never hold the page behind the loader, even if frames are throttled.
    const fallback = setTimeout(() => setVisible(false), 3500);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(done);
      clearTimeout(fallback);
      document.documentElement.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    if (!visible) document.documentElement.style.overflow = '';
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          aria-hidden="true"
          initial={{ clipPath: 'inset(0 0 0% 0)' }}
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-lime text-ink"
        >
          <motion.div
            initial={{ scale: 0.6, opacity: 0, rotate: -8 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Monogram className="h-14 w-14" />
          </motion.div>
          <div className="absolute inset-x-0 bottom-8 flex items-end justify-between px-6 md:px-10">
            <span className="eyebrow">Loading Pratyush</span>
            <span className="display-sans text-5xl tabular-nums md:text-7xl">{count}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
