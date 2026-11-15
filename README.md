# Pratyush Deo Singh — Portfolio

Personal portfolio built with **Next.js**, **React**, **TypeScript** and **Tailwind CSS**.

Live site: https://pratyushdeosingh.netlify.app

## Stack

- Next.js 15 (App Router, static export)
- React 19 + TypeScript
- Tailwind CSS 4
- Framer Motion for animation, Lenis for smooth scrolling
- Lucide icons

## Run locally

```bash
npm install
npm run dev
```

To expose it on your network for testing on other devices:

```bash
npm run dev:host
```

## Build and type-check

```bash
npm run build
npm run typecheck
```

## Project structure

```
app/
  layout.tsx            Fonts, metadata, global wrappers
  page.tsx              Section order
  globals.css           Design tokens and utilities
  sections/             Hero, About, Experience, Skills, Projects, FAQ, Contact
  components/
    layout/             Navigation and footer
    effects/            Particle background, smooth scrolling
    ui/                 Reveal, cards, icons, marquee, counters
data/portfolio.ts       All site content
public/                 Favicon, OG image, manifest
```

## Edit content

All text, projects, skills, links and stats live in `data/portfolio.ts`.
Colours and fonts are defined at the top of `app/globals.css`.

## Motion

Animations respect the visitor's reduced-motion setting, and the hero particle
canvas pauses whenever it is off screen.
