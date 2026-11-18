# Pratyush Deo Singh — Portfolio

Personal portfolio of a Computer Science student at VIT Chennai, built with **Next.js**, **React**,
**TypeScript** and **Tailwind CSS**.

Live site: https://pratyushdeosingh.vercel.app
Mirror on GitHub Pages: https://pratyushdeosingh.github.io/portfolio/

## Design

A bold editorial look: a lime, olive and cream palette, heavy uppercase type paired with a
high-contrast serif, and generated topographic contour lines in the background.

| Token  | Hex       |
| ------ | --------- |
| Lime   | `#D2FF00` |
| Olive  | `#282C20` |
| Cream  | `#F4F4ED` |
| Stone  | `#DDE1D2` |
| Ink    | `#111112` |

Fonts: **Mona Sans** (variable width and weight) and **Playfair Display**.

## Highlights

- **Paint-on name.** Moving the cursor over the hero name paints a lime, contour-striped copy of it in
  under a soft brush trail that fades away. On touch screens, or when the cursor is idle, the brush
  drifts across the name on its own.
- **Sideways gallery.** A pinned section whose frames travel horizontally as you scroll down, with a
  progress counter and a slight lean in the direction of travel. Photo placeholders have their own
  zoom, light-sweep and tag animations, ready to be swapped for real images.
- **Full-screen menu.** Indexed links that roll from bold sans into lime serif on hover, next to a live
  preview panel that changes with the hovered section.
- **Adaptive navigation.** The logo and menu button switch between light and dark depending on the
  section underneath.
- **Intro loader, scroll-linked statement, staggered project grid, tilted skill cards** and a notched
  contact panel in the footer.
- **Generated contour lines.** Deterministic topographic SVGs, so server and client render identically.

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

Stop the dev server before running `npm run build`: both use the `.next` folder, and building while the
dev server runs corrupts its cache. If that happens, delete `.next` and start the dev server again.

## Deployment

Both hosts deploy automatically on every push to `main`:

- **Vercel** builds from the repository root and serves the site at the domain root.
- **GitHub Pages** runs `.github/workflows/deploy-pages.yml`, which builds with `GITHUB_PAGES=true`. That
  flag makes `next.config.ts` add the `/portfolio` base path the Pages URL needs. Nothing else differs.

To test the Pages build locally:

```bash
GITHUB_PAGES=true npm run build
```

## Project structure

```
app/
  layout.tsx            Fonts, metadata, loader, smooth scrolling
  page.tsx              Section order
  globals.css           Design tokens and utilities
  sections/
    hero.tsx            Name with the paint-on reveal
    statement.tsx       Marquee type and scroll-lit statement (About)
    gallery.tsx         Pinned sideways-scrolling gallery
    journey.tsx         Education and highlights
    split.tsx           "The Work / The Stack" links
    projects.tsx        Projects grid
    skills.tsx          Skill cards and marquee
    faq.tsx             FAQ accordion
  components/
    layout/             Navigation, full-screen menu, footer (contact)
    effects/            Loader, paint reveal, topographic lines, smooth scroll
    ui/                 Reveal/parallax helpers, photo placeholder, monogram badge, icons, marquee
data/portfolio.ts       All site content
public/                 Favicon, OG image, manifest
```

## Edit content

All text, projects, skills, links and FAQ entries live in `data/portfolio.ts`.
Colours and fonts are defined at the top of `app/globals.css`.

To add real photos, replace `PhotoPlaceholder` in `app/sections/gallery.tsx` with images.

## Motion and accessibility

Every animation respects the visitor's reduced-motion setting: the paint reveal and loader are skipped, and
the gallery becomes a normal horizontal scroller. Canvas and mask effects pause while off screen, and the
loader always clears within a few seconds.

## Versions

Each design iteration is its own commit on `main`, so any earlier look can be restored with `git checkout <commit>`.
