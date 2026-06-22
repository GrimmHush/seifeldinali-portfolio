# seifeldinali.com

Personal portfolio for **Seifeldin Ali** — co-founder of Iano. A public, statically
generated Next.js 16 + TypeScript site, built to be read by reviewers: the source is
itself part of the proof, so it stays small and legible.

The architecture is documented in [`CLAUDE.md`](./CLAUDE.md).

## Stack

- **Next.js 16** — App Router, React Server Components, fully static (SSG).
- **TypeScript** (strict).
- **Tailwind CSS v4** — CSS-first `@theme` design tokens.
- **Framer Motion** (`motion`) — restrained entrance/scroll motion, reduced-motion aware.
- **Netlify** via `@netlify/plugin-nextjs`.

## Highlights

- **Single typed content source** (`lib/projects.ts`) drives routing, the work grids,
  case-study bodies, and per-page metadata.
- **Per-page metadata + generated OG images** (`next/og`) — proper SSG meta on every route.
- **`/engineering`** embeds a live, standalone offline-first demo of
  [inventory-ledger](https://github.com/GrimmHush/inventory-ledger) — shown, not just linked.
- **Accessibility floor:** semantic HTML, skip-to-content, visible focus, `prefers-reduced-
  motion` respected, motion that degrades visible without JavaScript.

## Local development

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npm run typecheck    # strict TS
npm run lint
npm run test:e2e     # Playwright smoke test (run npx playwright install first)
```

## Deploy

Hosted on Netlify. Build settings come from `netlify.toml`; the official Next.js runtime
plugin is applied automatically. Pushes to `main` trigger a deploy.

## Project structure

```
app/            routes, layout, route transition, OG image generators
components/     shell (Nav/Footer), primitives (ui.tsx), Hero, StackTimeline, Reveal, LiveDemo
lib/            projects.ts (content) · og.tsx (OG layout)
docs/           BUILD_PLAN.md · case-studies.md
```
