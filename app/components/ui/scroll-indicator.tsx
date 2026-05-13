'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface ScrollIndicatorProps {
  className?: string;
}

export function ScrollIndicator({ className }: ScrollIndicatorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`flex flex-col items-center gap-2 ${className}`}
    >
      <span className="text-sm font-medium text-muted-foreground">
        Scroll to explore
      </span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown className="w-6 h-6 text-muted-foreground" />
      </motion.div>
    </motion.div>
  );
}
