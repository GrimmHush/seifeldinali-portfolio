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
- **Vercel** — zero-config Next.js hosting.

## Highlights

- **Single typed content source** (`lib/projects.ts`) drives routing, the work grids,
  case-study bodies, and per-page metadata.
- **Per-page metadata + generated OG images** (`next/og`) — proper SSG meta on every route.
- **`/demonstration`** embeds a [live, standalone offline-first demo](https://inventory-ledger-demo.vercel.app)
  of [inventory-ledger](https://github.com/GrimmHush/inventory-ledger) — shown, not just linked.
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

Hosted on Vercel, which detects Next.js with zero config (`npm run build`, Node 24 via
`engines.node`). Pushes to `main` trigger a deploy.

The contact form posts to `app/api/contact/route.ts`, which emails submissions via
[Resend](https://resend.com). Set the environment variables from `.env.example` in
Vercel (Project → Settings → Environment Variables) — at minimum `RESEND_API_KEY`.

## Project structure

```
app/            routes, layout, route transition, OG image generators
components/     shell (Nav/Footer), primitives (ui.tsx), Hero, StackTimeline, Reveal, LiveDemo
lib/            projects.ts (content) · og.tsx (OG layout)
docs/           BUILD_PLAN.md · case-studies.md
```
