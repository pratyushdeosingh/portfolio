'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
          aria-hidden="true"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <h1 className="text-2xl sm:text-3xl font-bold text-gradient mb-4">
              Pratyush Deo Singh
            </h1>
            <div className="w-48 h-1 bg-border rounded-full mx-auto overflow-hidden">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
                className="h-full bg-primary rounded-full"
              />
            </div>
            <p className="mt-4 text-sm text-muted-foreground font-mono">
              Loading experience...
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
