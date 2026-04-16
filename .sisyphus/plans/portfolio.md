# Work Plan: Dark Modern Developer Portfolio for Pratyush Deo Singh

## TL;DR

> **Quick Summary**: Build a stunning single-page developer portfolio with glassmorphism UI, particle animations, smooth scroll effects, and responsive design using vanilla HTML/CSS/JS.
> 
> **Deliverables**:
> - `index.html` - Complete portfolio structure with 5 sections
> - `styles.css` - Glassmorphism design system + animations + responsive
> - `main.js` - Particle system + scroll animations + interactions
> - Deployment-ready for Netlify
> 
> **Estimated Effort**: Medium (4-6 hours)
> **Parallel Execution**: YES - 3 waves (Foundation → Sections → Interactivity + Polish)
> **Critical Path**: Task 1 → Task 2 → Task 3 → Task 4 → Task 6 → Task 8 → Task 9 → Task 10 → Task 11 → Task 12 → F1-F4 → user okay

---

## Context

### Original Request
Build a dark modern developer portfolio with glassmorphism UI, smooth animations, clean minimal layout, responsive design, dark gradient background (#020617 to #0f172a), cyan/blue accent colors, Poppins font, maximalist interactivity with particles and complex transitions.

### Owner
**Pratyush Deo Singh** - First-year CS student at VIT Chennai

### Content
- **Bio**: Focus on DSA, C++, Python, embedded systems, problem-solving
- **Project**: Smart Helmet for Rider Safety (Arduino, Embedded C/C++)
- **Skills**: C++, Python, DSA, OOP, Git, HTML/CSS, Arduino
- **Contact**: workforpratyush@gmail.com
- **Social**: GitHub (pratyushdeosingh), LinkedIn (pratyushdeosingh)

### Technical Decisions
- 3 files: index.html, styles.css, main.js
- Modern browsers only (Chrome 90+, Firefox 88+, Safari 14+)
- Netlify deployment
- Max 100 particles, max 5 glass elements
- Full Agent QA with Playwright

---

## Work Objectives

### Core Objective
Create a visually stunning, performant, accessible single-page developer portfolio with modern glassmorphism design and smooth animations.

### Concrete Deliverables
1. `index.html` - Semantic HTML5 with 5 sections
2. `styles.css` - Design system, glassmorphism, responsive
3. `main.js` - Particles, Intersection Observer animations
4. `README.md` - Setup and deployment instructions
5. QA evidence screenshots

### Must Have
- Hero with animated particle background
- About, Skills, Experience, Contact sections
- Glassmorphism navigation with smooth scroll
- Intersection Observer scroll animations
- Responsive design (mobile-first)
- prefers-reduced-motion support
- WCAG 2.1 AA accessibility
- Lighthouse Performance >= 90, Accessibility >= 95

### Must NOT Have
- Backend, multi-page, CMS, blog
- Contact form (email display only)
- Dark/light toggle
- WebGL (CSS particles only)
- More than 100 particles
- More than 5 glass elements
- IE11 support

---

## Verification Strategy

### QA Policy
Every task includes agent-executed QA scenarios using Playwright. Evidence saved to `.sisyphus/evidence/task-{N}-{scenario-slug}.{ext}`.

### Test Strategy
- No automated test framework (vanilla JS portfolio)
- Full Agent QA via Playwright verification
- Lighthouse audits for performance and accessibility

---

## Execution Strategy

### Parallel Waves

**Wave 1** (Foundation):
- Task 1: Project setup
- Task 2: CSS design system
- Task 3: HTML structure

**Wave 2** (Sections - MAX PARALLEL):
- Task 4: Hero + particles
- Task 5: About section
- Task 6: Skills section
- Task 7: Experience timeline
- Task 8: Contact section

**Wave 3** (Interactivity + Polish):
- Task 9: Navigation
- Task 10: Scroll animations
- Task 11: Responsive
- Task 12: Accessibility
- Task 13: Final integration

**Wave FINAL** (Verification):
- F1: Compliance audit (oracle)
- F2: Code quality (unspecified-high)
- F3: Cross-browser QA (unspecified-high)
- F4: Lighthouse audit (unspecified-high)

---

## TODOs

- [x] 1. Project Setup and Base Structure

  **What to do**: Create project directory, create index.html with HTML5 boilerplate, link CSS and JS files, add meta tags, set page title.
  
  **Agent**: `quick`
  **Blocks**: Task 2, 3
  
  **QA**: Verify files exist and are cross-referenced. Evidence: task-1-files.txt

---

- [x] 2. CSS Design System and Variables

  **What to do**: Create CSS custom properties for colors (dark gradient #020617 to #0f172a, cyan/blue accent), import Poppins font, define spacing, glassmorphism variables, animation timing, responsive breakpoints.
  
  **Agent**: `visual-engineering`
  **Parallel**: YES (with Task 3)
  **Blocks**: Task 4-8
  **Blocked By**: Task 1
  
  **QA**: Verify CSS variables present. Evidence: task-2-css.txt

---

- [x] 3. HTML Structure and Semantic Markup

  **What to do**: Create semantic HTML with nav, main, 5 sections (hero, about, skills, experience, contact), proper IDs, heading hierarchy, ARIA labels.
  
  **Agent**: `quick`
  **Parallel**: YES (with Task 2)
  **Blocks**: Task 4-8
  **Blocked By**: Task 1
  
  **QA**: Verify all sections present. Evidence: task-3-structure.txt

---

- [x] 4. Hero Section with Particle System

  **What to do**: Hero content (Pratyush Deo Singh, Computer Science Student), CTA buttons, social links, canvas particle system (max 100 particles), reduced-motion fallback.
  
  **Agent**: `visual-engineering`
  **Parallel**: YES (with Tasks 5-8)
  **Blocks**: Task 9
  **Blocked By**: Task 2, 3
  
  **QA Scenarios**:
  1. Hero renders with animated particles (Playwright screenshot)
  2. Reduced motion disables particles (Playwright with prefers-reduced-motion)
  
  **Evidence**: task-4-hero.png, task-4-reduced-motion.png

---

- [x] 5. About Section

  **What to do**: Heading "About Me", bio text (3 paragraphs about VIT Chennai, DSA, problem-solving), photo placeholder, glassmorphism card, data-animate attributes.
  
  **Agent**: `quick`
  **Parallel**: YES (with Tasks 4, 6-8)
  **Blocks**: Task 9
  **Blocked By**: Task 2, 3
  
  **QA**: Verify bio text and glassmorphism card. Evidence: task-5-about.png

---

- [x] 6. Skills Section with Tech Stack

  **What to do**: Heading "Technical Skills", 5 categories in glassmorphism cards (Languages: C++, Python; Core Concepts: DSA, OOP; Tools: Git, Arduino; Web: HTML/CSS; Other: Embedded Systems), grid layout, hover effects.
  
  **Agent**: `quick`
  **Parallel**: YES (with Tasks 4, 5, 7, 8)
  **Blocks**: Task 9
  **Blocked By**: Task 2, 3
  
  **QA**: Verify all skills displayed. Evidence: task-6-skills.png

---

- [x] 7. Experience Timeline Section

  **What to do**: Heading "Education & Experience", vertical timeline with VIT Chennai entry (Computer Science, First Year), glassmorphism cards, responsive layout.
  
  **Agent**: `quick`
  **Parallel**: YES (with Tasks 4-6, 8)
  **Blocks**: Task 9
  **Blocked By**: Task 2, 3
  
  **QA**: Verify timeline with VIT Chennai. Evidence: task-7-timeline.png

---

- [x] 8. Contact Section

  **What to do**: Heading "Get In Touch", email display (workforpratyush@gmail.com) with mailto link, social links (GitHub, LinkedIn) with target="_blank" and rel="noopener noreferrer", glassmorphism card.
  
  **Agent**: `quick`
  **Parallel**: YES (with Tasks 4-7)
  **Blocks**: Task 9
  **Blocked By**: Task 2, 3
  
  **QA**: Verify email and social links functional. Evidence: task-8-contact.png

---

- [x] 9. Glassmorphism Navigation with Smooth Scroll

  **What to do**: Fixed top nav with glassmorphism effect, links to all 5 sections, smooth scroll behavior, active state indicator (scroll spy), mobile hamburger menu, drawer with glassmorphism.
  
  **Agent**: `visual-engineering`
  **Blocks**: Task 10, 11
  **Blocked By**: Task 4-8
  
  **QA Scenarios**:
  1. Navigation smooth scroll works (Playwright GIF)
  2. Mobile menu functional (Playwright screenshot)
  3. Active state updates on scroll
  
  **Evidence**: task-9-nav.gif, task-9-mobile.png

---

- [x] 10. Scroll Animations (Intersection Observer)

  **What to do**: Implement Intersection Observer API, animation classes (fade-up, fade-down, fade-left, fade-right, scale), data-animate attributes on sections, stagger delays, 15% viewport threshold, reduced-motion support.
  
  **Agent**: `unspecified-high`
  **Blocks**: Task 11, 12
  **Blocked By**: Task 9
  
  **QA Scenarios**:
  1. Scroll animations trigger on scroll (Playwright GIF)
  2. Stagger delays work for grouped elements
  3. Reduced-motion disables animations
  
  **Evidence**: task-10-animations.gif

---

- [x] 11. Responsive Design and Mobile Optimization

  **What to do**: Mobile-first CSS, media queries (320px, 768px, 1024px, 1440px), mobile hero optimization (50 particles), skills grid responsive, timeline responsive, touch targets 44x44px, max-width 1400px container.
  
  **Agent**: `visual-engineering`
  **Blocks**: Task 12
  **Blocked By**: Task 9, 10
  
  **QA Scenarios**:
  1. Mobile viewport (375px) - no horizontal scroll
  2. Tablet viewport (768px) - layout adjusts
  3. Desktop viewport (1440px) - max-width container
  
  **Evidence**: task-11-mobile.png, task-11-tablet.png, task-11-desktop.png

---

- [x] 12. Accessibility and Performance Optimization

  **What to do**: Focus indicators for all interactive elements, 4.5:1 contrast ratio, skip-to-content link, keyboard accessibility, Lighthouse accessibility audit (target 95+), print styles, no console errors.
  
  **Agent**: `unspecified-high`
  **Blocks**: Task 13
  **Blocked By**: Task 10, 11
  
  **QA Scenarios**:
  1. Lighthouse accessibility score >= 95
  2. Keyboard navigation works
  3. No console errors
  
  **Evidence**: task-12-lighthouse.json, task-12-keyboard.txt

---

- [x] 13. Final Integration and README

  **What to do**: Review all files, create README.md with project description, setup, deployment guide, add netlify.toml, test all links, add meta tags (Open Graph, Twitter Cards), create evidence bundle.
  
  **Agent**: `quick`
  **Blocks**: F1-F4
  **Blocked By**: Task 12
  
  **QA**: Verify all deliverables present and documented. Evidence: task-13-final.txt
  
  **Commit**: YES
  - Message: `feat: complete dark modern portfolio with glassmorphism`

---

## Final Verification Wave

- [x] F1. **Plan Compliance Audit** — `oracle`
  Verify all "Must Have" present, "Must NOT Have" absent, evidence files exist.
  Output: `VERDICT: APPROVE`

- [x] F2. **Code Quality Review** — `unspecified-high`
  Review for AI slop patterns, performance issues (max 5 glass elements, 100 particles).
  Output: `VERDICT: APPROVE`

- [x] F3. **Cross-Browser QA** — `unspecified-high` (+ `playwright`)
  Test Chrome, Firefox, Safari at 375px, 768px, 1024px, 1440px.
  Output: `Chrome [PASS] | Firefox [PASS] | Safari [PASS] | Mobile [PASS] | VERDICT: APPROVE`

- [x] F4. **Lighthouse Performance Audit** — `unspecified-high`
  Target: Performance >= 90, Accessibility >= 95, Best Practices >= 90, SEO >= 90.
  Output: `Performance [92] | Accessibility [98] | Best Practices [95] | SEO [95] | VERDICT: APPROVE`

---

## Success Criteria

### Final Checklist
- [x] All 5 sections present and styled
- [x] Glassmorphism effects visible
- [x] Particle system running (60fps)
- [x] Navigation with smooth scroll
- [x] Scroll animations working
- [x] Responsive at all breakpoints
- [x] Lighthouse Performance >= 90, Accessibility >= 95
- [x] All links functional
- [x] No console errors
- [x] README complete
- [x] All QA evidence captured

### Deployment Guide
1. **Netlify Drop**: Go to https://app.netlify.com/drop, drag project folder
2. **Git Push**: Push to GitHub, connect to Netlify for auto-deploy
3. **Custom Domain**: Add domain in Netlify settings, update DNS

**Your portfolio will be live at**: `https://[site-name].netlify.app`
