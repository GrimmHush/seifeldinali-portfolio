# seifeldinali.com

Personal portfolio for Seifeldin Ali — co-founder of Iano. A public, Next.js 16 +
TypeScript site, built to be read by reviewers. See `CLAUDE.md` for architecture.

## Local development (Windows / PowerShell)

```powershell
npm install
npm run dev          # http://localhost:3000
npm run build        # production build (run before pushing)
npm run typecheck    # strict TS check
npm run lint
```

## First push to GitHub (GrimmHush)

```powershell
git init
git add .
git commit -m "chore: scaffold portfolio (M0)"
git branch -M main
git remote add origin https://github.com/GrimmHush/seifeldinali-portfolio.git
git push -u origin main
```

## Deploy to Netlify

1. Netlify → **Add new site → Import an existing project** → pick the GitHub repo.
2. Build settings are read from `netlify.toml` (command `npm run build`, the Next runtime
   plugin auto-applies). No manual config needed.
3. **Domain → Add a domain → `seifeldinali.com`**, then point your registrar's DNS at
   Netlify (their dashboard gives the exact records).

That's M0: an empty-but-live site at the real domain. Everything after is filling it in.

## What's a stub right now (by milestone)

- **M1** — case-study bodies (`app/work/[slug]/page.tsx`) and About, filled from the
  case-study doc. Content edited in `lib/projects.ts`.
- **M3** — real design on the hero, timeline, and cards.
- **M4** — motion.
- **M5** — the inventory-ledger live demo (deploy its browser client standalone) wired
  into `/engineering`.

## Before going public — confirm

- **Name spelling** in metadata/nav ("Seif El Din Ali") — inferred from the domain.
- **Contact details** for the footer bar — the design reference showed the co-founder's
  card; these should be your own email / phone / WhatsApp / LinkedIn + your profile-card link.
