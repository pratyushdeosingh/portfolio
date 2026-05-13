'use client';

import { useEffect, useState, useCallback } from 'react';
import { useReducedMotion } from '@/app/hooks';

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';

interface TextScrambleProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  triggerOnView?: boolean;
}

export function TextScramble({
  text,
  className = '',
  delay = 0,
  duration = 1500,
  triggerOnView = true
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(text);
  const [hasAnimated, setHasAnimated] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const scramble = useCallback(() => {
    if (prefersReducedMotion) {
      setDisplayText(text);
      return;
    }

    const length = text.length;
    const steps = 20;
    const stepDuration = duration / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const revealed = Math.floor(progress * length);

      let result = '';
      for (let i = 0; i < length; i++) {
        if (text[i] === ' ') {
          result += ' ';
        } else if (i < revealed) {
          result += text[i];
        } else {
          result += chars[Math.floor(Math.random() * chars.length)];
        }
      }

      setDisplayText(result);

      if (currentStep >= steps) {
        clearInterval(interval);
        setDisplayText(text);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, [text, duration, prefersReducedMotion]);

  useEffect(() => {
    if (!triggerOnView) {
      const timer = setTimeout(() => scramble(), delay);
      return () => clearTimeout(timer);
    }
  }, [triggerOnView, delay, scramble]);

  useEffect(() => {
    if (triggerOnView && !hasAnimated) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setHasAnimated(true);
            observer.disconnect();
            const timer = setTimeout(() => scramble(), delay);
            return () => clearTimeout(timer);
          }
        },
        { threshold: 0.5 }
      );

      const element = document.getElementById(`scramble-${text.slice(0, 10)}`);
      if (element) observer.observe(element);

      return () => observer.disconnect();
    }
  }, [triggerOnView, hasAnimated, delay, scramble, text]);

  return (
    <span
      id={`scramble-${text.slice(0, 10)}`}
      className={`font-mono ${className}`}
      aria-label={text}
    >
      {displayText}
    </span>
  );
}
