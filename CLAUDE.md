# seifeldinali.com — architecture

Personal portfolio for Seifeldin Ali. Built as a public proof-of-competence
artifact: the source is meant to be read by reviewers, so it stays small and legible.

## Stack
- **Next.js 16** (App Router, React Server Components) — fully static (SSG); content is fixed.
- **TypeScript (strict)**.
- **Tailwind CSS v4** (CSS-first `@theme` tokens, no JS config).
- **Framer Motion** (`motion` v12) for entrance/scroll orchestration.
- **Netlify** via `@netlify/plugin-nextjs`. Personal domain: `seifeldinali.com`.

## Content
- `lib/projects.ts` — single typed content source: deep + compact projects, the stack-
  evolution timeline, and the `engineering` block (incl. the live-demo `demoUrl`). Drives
  routing, the work grids, case-study bodies, and per-page metadata. Edit facts here only.
- `lib/og.tsx` — shared layout for the generated OG images.

## Pages (`app/`)
- `page.tsx` — landing: hero · stack-evolution timeline · selected work (4 deep) ·
  also-shipped (3 compact, link out) · engineering teaser.
- `work/[slug]/page.tsx` — case-study template. `generateStaticParams` over the four known
  slugs; `dynamicParams = false` so unknown slugs 404. Per-page metadata.
- `engineering/page.tsx` — the inventory-ledger showcase. Leads with the embedded live demo
  (`LiveDemo`), then plain-language architecture, then the repo link.
- `about/page.tsx` — two-person-studio framing.
- `layout.tsx` — shell + fonts + metadata; skip-to-content link, degrade-visible `<noscript>`
  fallback for motion. `template.tsx` — subtle route-transition fade.
- `opengraph-image.tsx` (site) and `work/[slug]/opengraph-image.tsx` (per case study) —
  build-time OG images via `next/og`.

## Components (`components/`)
- `ui.tsx` — layout primitives: `Container`, `Section`, `SectionLabel`, `SpecRow`, `Chip`.
- `Nav.tsx`, `Footer.tsx` — shell. Footer is where the contact bar (email / phone /
  WhatsApp / LinkedIn + vCard + Iano profile-card link) will land.
- `Hero.tsx` — landing hero with a staggered load entrance.
- `StackTimeline.tsx` — the signature: the 2020→2026 axis (line draws, eras stagger in).
- `Reveal.tsx` — reusable entrance primitive (opacity + translateY, `useReducedMotion`-aware).
- `LiveDemo.tsx` — embeds the standalone inventory-ledger client, with a fallback card.

## Design system
- Tokens live in `app/globals.css` via Tailwind `@theme`: `background/foreground/muted/
  border/accent` (+ light/dark at the token layer). Reference tokens (`text-muted`,
  `border-border`, `text-accent`) — never raw colours or `opacity-*`.
- Typography: Fraunces (serif display, `font-serif`) · Geist (sans body) · Geist Mono (labels).
- Motion: animate transform/opacity only (60fps, no layout shift), once-fired, reduced-motion
  honoured everywhere. Entrance elements carry `data-reveal` so they degrade visible without JS.

## Conventions
- Content lives in `lib/`, never hard-coded in pages.
- Run `npm run typecheck` and `npm run lint` (and `npm run build`) before commit.
  Conventional commits.

## Source docs
- `docs/BUILD_PLAN.md` — the full plan: IA, milestones, design direction, decisions.
- `docs/case-studies.md` — source content for the seven projects.

## Build sequence (complete)
M0 scaffold → M1 content → M2 design system → M3 pages → M4 motion → M5 engineering demo
→ M6 polish. Motion was added late, on a working site, on purpose.
