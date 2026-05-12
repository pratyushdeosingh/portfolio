# Pratyush Deo Singh - Portfolio

A modern portfolio built with **Next.js**, **React**, and **TypeScript**. It keeps the same dark, glassy aesthetic but moves the site into a cleaner component-based architecture with smoother motion and better maintainability.

## Stack

- Next.js App Router
- React 19
- TypeScript
- CSS with a custom design system

## Run locally

```bash
npm install
npm run dev
```

Use this to run it on `localhost:3000` and expose it for LAN/device testing:

```bash
npm run dev:host
```

## Build

```bash
npm run build
```

## Type-check

```bash
npm run typecheck
```

## Deploy to Netlify

The repo includes `netlify.toml` for Next.js hosting. Netlify should use the build command above and the `@netlify/plugin-nextjs` adapter.

## Content

- Hero with particle animation
- About section
- Skills grid
- Featured projects
- Education timeline
- Contact links

## Edit content

- Update text/data in `data/portfolio.ts`
- Update layout/meta in `app/layout.tsx`
- Update visuals in `app/globals.css`

## UI and animation notes

- Scroll reveals use `data-animate` and optional `data-stagger`
- Hero particles auto-pause when the tab is hidden or the hero leaves viewport
- Reduced-motion settings disable heavy motion automatically

## Live site

https://pratyushdeosingh.netlify.app
