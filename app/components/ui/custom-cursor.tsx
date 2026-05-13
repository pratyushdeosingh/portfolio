'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useSpring } from 'framer-motion';
import { useReducedMotion } from '@/app/hooks';

export function CustomCursor() {
  const prefersReducedMotion = useReducedMotion();
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cursorRef = useRef({ x: 0, y: 0 });

  const springConfig = { damping: 25, stiffness: 300 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorRef.current = { x: e.clientX, y: e.clientY };
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [cursorX, cursorY, isVisible, prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <>
      <style jsx global>{`
        @media (hover: hover) and (pointer: fine) {
          * {
            cursor: none !important;
          }
        }
      `}</style>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%'
        }}
      >
        <motion.div
          animate={{
            width: isHovering ? 48 : 12,
            height: isHovering ? 48 : 12,
            opacity: isVisible ? 1 : 0
          }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="rounded-full bg-primary"
          style={{
            boxShadow: isHovering
              ? '0 0 30px rgba(6, 182, 212, 0.5)'
              : '0 0 15px rgba(6, 182, 212, 0.3)'
          }}
        />
      </motion.div>
    </>
  );
}
