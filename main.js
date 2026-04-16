/**
 * Particle System for Hero Section
 * Canvas 2D-based particle animation with mouse interaction
 */

class Particle {
    constructor(canvas, mouse) {
        this.canvas = canvas;
        this.mouse = mouse;
        this.reset();
    }

    reset() {
        this.x = Math.random() * this.canvas.width;
        this.y = Math.random() * this.canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
        this.baseColor = Math.random() > 0.5 ? '#06b6d4' : '#3b82f6';
        this.alpha = Math.random() * 0.5 + 0.3;
        this.speed = Math.random() * 0.5 + 0.2;
    }

    update() {
        this.x += this.vx * this.speed;
        this.y += this.vy * this.speed;

        const dx = this.mouse.x - this.x;
        const dy = this.mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 150;

        if (distance < maxDistance) {
            const force = (maxDistance - distance) / maxDistance;
            const angle = Math.atan2(dy, dx);
            this.vx -= Math.cos(angle) * force * 0.02;
            this.vy -= Math.sin(angle) * force * 0.02;
        }

        const maxSpeed = 1.5;
        const currentSpeed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        if (currentSpeed > maxSpeed) {
            this.vx = (this.vx / currentSpeed) * maxSpeed;
            this.vy = (this.vy / currentSpeed) * maxSpeed;
        }

        if (this.x < 0 || this.x > this.canvas.width) {
            this.vx *= -1;
            this.x = Math.max(0, Math.min(this.x, this.canvas.width));
        }
        if (this.y < 0 || this.y > this.canvas.height) {
            this.vy *= -1;
            this.y = Math.max(0, Math.min(this.y, this.canvas.height));
        }
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.baseColor;
        ctx.globalAlpha = this.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
    }
}

class ParticleSystem {
    constructor() {
        this.canvas = document.getElementById('particle-canvas');
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: -1000, y: -1000 };
        this.animationId = null;
        this.isActive = false;
        this.resizeTimeout = null;

        this.checkReducedMotion();
        this.detectMobile();
        
        if (!this.reducedMotion) {
            this.init();
        } else {
            this.canvas.style.display = 'none';
        }
    }

    checkReducedMotion() {
        this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    detectMobile() {
        const isMobile = window.innerWidth < 768;
        this.maxParticles = isMobile ? 50 : 100;
    }

    init() {
        this.resize();
        this.createParticles();
        this.bindEvents();
        this.start();
    }

    resize() {
        const hero = document.getElementById('hero');
        if (hero) {
            this.canvas.width = hero.offsetWidth;
            this.canvas.height = hero.offsetHeight;
        }
    }

    createParticles() {
        this.particles = [];
        for (let i = 0; i < this.maxParticles; i++) {
            this.particles.push(new Particle(this.canvas, this.mouse));
        }
    }

    bindEvents() {
        window.addEventListener('resize', () => {
            clearTimeout(this.resizeTimeout);
            this.resizeTimeout = setTimeout(() => {
                this.detectMobile();
                this.resize();
                this.createParticles();
            }, 250);
        });

        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
        });

        this.canvas.addEventListener('mouseleave', () => {
            this.mouse.x = -1000;
            this.mouse.y = -1000;
        });

        const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        motionQuery.addEventListener('change', (e) => {
            this.reducedMotion = e.matches;
            if (this.reducedMotion) {
                this.stop();
                this.canvas.style.display = 'none';
            } else {
                this.canvas.style.display = 'block';
                this.start();
            }
        });
    }

    drawConnections() {
        const maxDistance = 100;
        const maxConnections = 3;

        for (let i = 0; i < this.particles.length; i++) {
            let connections = 0;
            for (let j = i + 1; j < this.particles.length; j++) {
                if (connections >= maxConnections) break;

                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < maxDistance) {
                    const alpha = (1 - distance / maxDistance) * 0.3;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.stroke();
                    connections++;
                }
            }
        }
    }

    animate() {
        if (!this.isActive) return;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach(particle => {
            particle.update();
            particle.draw(this.ctx);
        });

        this.drawConnections();

        this.animationId = requestAnimationFrame(() => this.animate());
    }

    start() {
        if (this.isActive || this.reducedMotion) return;
        this.isActive = true;
        this.animate();
    }

    stop() {
        this.isActive = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }
}

class ScrollAnimator {
    constructor() {
        this.elements = document.querySelectorAll('[data-animate]');
        this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.observer = null;
        this.observedElements = new Set();

        if (!this.reducedMotion && this.elements.length > 0) {
            this.init();
        } else if (this.reducedMotion) {
            this.elements.forEach(el => el.classList.add('is-visible'));
        }
    }

    init() {
        this.elements.forEach(el => {
            el.style.willChange = 'transform, opacity';
        });

        this.observer = new IntersectionObserver(
            (entries) => this.handleIntersection(entries),
            { root: null, rootMargin: '0px', threshold: 0.15 }
        );

        this.observe();

        window.matchMedia('(prefers-reduced-motion: reduce)')
            .addEventListener('change', (e) => {
                if (e.matches) this.disableAnimations();
            });
    }

    observe() {
        this.elements.forEach(el => {
            if (!this.observedElements.has(el)) {
                this.observer.observe(el);
                this.observedElements.add(el);
            }
        });
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                entry.target.addEventListener('transitionend', () => {
                    entry.target.style.willChange = 'auto';
                }, { once: true });
                this.observer.unobserve(entry.target);
                this.observedElements.delete(entry.target);
            }
        });
    }

    disableAnimations() {
        this.elements.forEach(el => {
            el.classList.add('is-visible');
            el.style.willChange = 'auto';
        });
        if (this.observer) this.observer.disconnect();
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new ParticleSystem();
        new ScrollAnimator();
        initNavigation();
    });
} else {
    new ParticleSystem();
    new ScrollAnimator();
    initNavigation();
}

/**
 * Navigation System
 * Handles scroll spy, smooth scroll, mobile menu, and scroll-based effects
 */
function initNavigation() {
    const nav = document.getElementById('main-nav');
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
    const mobileNavClose = document.querySelector('.mobile-nav-close');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const sections = document.querySelectorAll('section[id]');

    if (!nav) return;

    function updateNavBackground() {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateNavBackground();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    updateNavBackground();

    function openMobileMenu() {
        mobileNav.classList.add('open');
        mobileNavOverlay.classList.add('open');
        hamburger.setAttribute('aria-expanded', 'true');
        mobileNav.setAttribute('aria-hidden', 'false');
        mobileNavOverlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        mobileNav.classList.remove('open');
        mobileNavOverlay.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        mobileNav.setAttribute('aria-hidden', 'true');
        mobileNavOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', () => {
        const isOpen = mobileNav.classList.contains('open');
        if (isOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });

    mobileNavClose.addEventListener('click', closeMobileMenu);
    mobileNavOverlay.addEventListener('click', closeMobileMenu);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
            closeMobileMenu();
        }
    });

    function handleNavLinkClick(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const navHeight = nav.offsetHeight;
            const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            if (mobileNav.classList.contains('open')) {
                closeMobileMenu();
            }
        }
    }

    navLinks.forEach(link => {
        link.addEventListener('click', handleNavLinkClick);
    });

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', handleNavLinkClick);
    });

    const observerOptions = {
        root: null,
        rootMargin: `-${nav.offsetHeight}px 0px -50% 0px`,
        threshold: 0
    };

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;

                navLinks.forEach(link => {
                    link.classList.remove('active');
                    link.removeAttribute('aria-current');
                    if (link.getAttribute('data-section') === sectionId) {
                        link.classList.add('active');
                        link.setAttribute('aria-current', 'page');
                    }
                });

                mobileNavLinks.forEach(link => {
                    link.classList.remove('active');
                    link.removeAttribute('aria-current');
                    if (link.getAttribute('data-section') === sectionId) {
                        link.classList.add('active');
                        link.setAttribute('aria-current', 'page');
                    }
                });
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(section => observer.observe(section));
}
