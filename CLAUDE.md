# seifeldinali.com — architecture

Personal portfolio for Seif El Din Ali. Built as a public proof-of-competence
artifact: the source is meant to be read by reviewers, so it stays small and legible.

## Stack
- **Next.js 16** (App Router, React Server Components) — mostly static; content is fixed.
- **TypeScript (strict)**.
- **Tailwind CSS v4**.
- **Netlify** via `@netlify/plugin-nextjs`. Personal domain: `seifeldinali.com`.

## Layout
- `lib/projects.ts` — single typed content source. Drives routing, the work grids, and
  per-page metadata. One place to edit project facts.
- `app/page.tsx` — landing: hero · stack-evolution timeline · selected work (4 deep) ·
  also-shipped (3 compact, link out) · engineering teaser.
- `app/work/[slug]/page.tsx` — case-study template. `generateStaticParams` over the four
  known slugs; `dynamicParams = false` so unknown slugs 404. Per-page metadata.
- `app/engineering/page.tsx` — the inventory-ledger showcase. Leads with a standalone-
  deployed live demo, then a plain-language architecture summary, then the repo link.
- `app/about/page.tsx` — two-person-studio framing.
- `components/Nav.tsx`, `components/Footer.tsx` — shell. Footer is where the contact bar
  (email / phone / WhatsApp / LinkedIn + vCard + Iano profile-card link) lands.

## Conventions
- Content lives in `lib/`, never hard-coded in pages.
- Run `npm run typecheck` and `npm run lint` before commit. Conventional commits.

## Build sequence (see build plan)
M0 scaffold → M1 content → M2 design system → M3 pages → M4 motion → M5 engineering demo
→ M6 polish. Motion is added late, on a working site, on purpose.
