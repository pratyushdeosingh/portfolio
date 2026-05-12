'use client';

import { useEffect, useRef } from 'react';

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  speed: number;
  alpha: number;
  color: string;
};

function createParticle(width: number, height: number): Particle {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
    size: Math.random() * 2 + 1,
    speed: Math.random() * 0.5 + 0.2,
    alpha: Math.random() * 0.5 + 0.3,
    color: Math.random() > 0.5 ? '#06b6d4' : '#3b82f6'
  };
}

export function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return undefined;
    }

    const context = canvas.getContext('2d');

    if (!context) {
      return undefined;
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
      canvas.style.display = 'none';
      return undefined;
    }

    const hero = canvas.closest<HTMLElement>('#hero');
    const particles: Particle[] = [];
    const mouse = { x: -1000, y: -1000 };
    let animationFrame = 0;
    let resizeTimeout: number | undefined;

    const getDimensions = () => {
      const width = hero?.clientWidth ?? canvas.clientWidth;
      const height = hero?.clientHeight ?? canvas.clientHeight;
      return { width, height };
    };

    const resize = () => {
      const { width, height } = getDimensions();
      const ratio = window.devicePixelRatio || 1;

      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const createParticles = () => {
      const { width, height } = getDimensions();
      const count = window.innerWidth < 768 ? 40 : 70;

      particles.length = 0;

      for (let index = 0; index < count; index += 1) {
        particles.push(createParticle(width, height));
      }
    };

    const updateMouse = (event: PointerEvent) => {
      const { width, height } = getDimensions();
      const rect = canvas.getBoundingClientRect();

      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;

      if (mouse.x < 0 || mouse.x > width || mouse.y < 0 || mouse.y > height) {
        mouse.x = -1000;
        mouse.y = -1000;
      }
    };

    const resetMouse = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const drawConnections = () => {
      const { width, height } = getDimensions();
      const maxDistance = 110;

      for (let i = 0; i < particles.length; i += 1) {
        let connections = 0;

        for (let j = i + 1; j < particles.length; j += 1) {
          if (connections >= 3) {
            break;
          }

          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            const alpha = (1 - distance / maxDistance) * 0.28;
            context.beginPath();
            context.moveTo(particles[i].x, particles[i].y);
            context.lineTo(particles[j].x, particles[j].y);
            context.strokeStyle = `rgba(6, 182, 212, ${alpha})`;
            context.lineWidth = 0.5;
            context.stroke();
            connections += 1;
          }
        }

        if (particles[i].x < 0 || particles[i].x > width) {
          particles[i].vx *= -1;
        }

        if (particles[i].y < 0 || particles[i].y > height) {
          particles[i].vy *= -1;
        }
      }
    };

    const animate = () => {
      const { width, height } = getDimensions();

      context.clearRect(0, 0, width, height);

      particles.forEach((particle) => {
        particle.x += particle.vx * particle.speed;
        particle.y += particle.vy * particle.speed;

        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          const force = (150 - distance) / 150;
          const angle = Math.atan2(dy, dx);
          particle.vx -= Math.cos(angle) * force * 0.02;
          particle.vy -= Math.sin(angle) * force * 0.02;
        }

        const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);

        if (speed > 1.5) {
          particle.vx = (particle.vx / speed) * 1.5;
          particle.vy = (particle.vy / speed) * 1.5;
        }

        if (particle.x < 0 || particle.x > width) {
          particle.vx *= -1;
          particle.x = Math.max(0, Math.min(particle.x, width));
        }

        if (particle.y < 0 || particle.y > height) {
          particle.vy *= -1;
          particle.y = Math.max(0, Math.min(particle.y, height));
        }

        context.beginPath();
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        context.fillStyle = particle.color;
        context.globalAlpha = particle.alpha;
        context.fill();
        context.globalAlpha = 1;
      });

      drawConnections();

      animationFrame = window.requestAnimationFrame(animate);
    };

    resize();
    createParticles();
    animate();

    const handleResize = () => {
      window.clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(() => {
        resize();
        createParticles();
      }, 200);
    };

    hero?.addEventListener('pointermove', updateMouse);
    hero?.addEventListener('pointerleave', resetMouse);
    window.addEventListener('resize', handleResize);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      hero?.removeEventListener('pointermove', updateMouse);
      hero?.removeEventListener('pointerleave', resetMouse);
      window.removeEventListener('resize', handleResize);

      if (resizeTimeout) {
        window.clearTimeout(resizeTimeout);
      }
    };
  }, []);

  return <canvas ref={canvasRef} id="particle-canvas" aria-hidden="true" />;
}
