# Iano / Saif — Portfolio Site Build Plan

A flagship, public, Next.js portfolio built to the same bar as `inventory-ledger`: clean code, the stack you actually claim, designed restrained-but-animated, and shipped — not gold-plated.

---

## Locked decisions

| Decision | Call | Why |
|---|---|---|
| Stack | **Next.js (App Router, SSG-first)** | Dogfoods the stack the whole "deliberate evolution to Next" narrative rests on. The site embodies the claim instead of asserting it. |
| Repo | **Public** | A reviewer evaluating a web dev will read the source of the site making the claims. It becomes a third artifact alongside inventory-ledger and the live sites. |
| Hosting | **Netlify** | Managed deploy with previews and zero ops. The one page that *must* never go down shouldn't carry a self-hosted failure mode, and Netlify is already familiar (Namaa, iano.marketing live there). Next.js runs on it via the official adapter. |
| Domain | **Personal domain** (standalone, not a route under iano.marketing) | Reinforces the solo-portfolio goal — this is *your* front, distinct from the studio site. |
| Design | **Develop a direction — clean, typography-led, with purposeful motion** | Restraint is the flex for an engineer portfolio; motion is polish, not spectacle. The look should argue the same thing the copy does. |
| Language | **TypeScript (strict)** | Non-negotiable for the artifact bar. |
| Content | 4 deep case studies + 3 compact + inventory-ledger showcase | Already written and verified live. |

> **The one guardrail.** The instinct that turned a one-week SQLite POC into Postgres-serializable-offline-first is the same instinct that turns a content site into a six-week project that never ships. Pour the overbuild into what reviewers *read* — architecture, CLAUDE.md, commit hygiene. Starve it on what they don't — no CMS, no bespoke animation framework, no feature you can't tie to a signal. The content is done, so this build is genuinely bounded if you let it be.

---

## Information architecture

```
/                         Landing — the curated argument
  ├─ Hero                 Positioning statement, restrained entrance
  ├─ Through-line 1       Stack-evolution timeline 2020 → 2026 (animated on scroll)
  ├─ Featured work        4 deep case studies as cards
  ├─ Compact work         3 compact projects as cards → link out to live sites
  ├─ Engineering showcase Teaser for inventory-ledger → /engineering
  └─ About + contact

/work/octavia-carbon      Deep case study
/work/merx                Deep case study
/work/esto                Deep case study  (cross-links to /engineering)
/work/amana               Deep case study

/engineering              inventory-ledger deep-dive — the general reviewer showcase
                          (architecture, GitHub link, runnable browser demo)

/about                    Two-person-studio honest framing
```

**Routing rationale**

- **Deep case studies get their own routes** — depth, shareable links, per-page OG images and SEO. This is where Next.js earns its keep over a single-page scroll.
- **Compact projects stay as cards** on the landing, linking out to their live sites. No dedicated pages — that's what "compact" means, and it keeps the surface lean.
- **inventory-ledger gets a dedicated `/engineering` page**, because you want it as a general showcase, not only an Esto footnote. It's the page that proves the engineering depth your private repos can't.

---

## Through-lines (what separates this from a project grid)

A generic portfolio is a grid of cards. Yours has an argument. Two threads, both deserving explicit on-page treatment:

1. **Deliberate stack evolution (2020 → 2026).** A horizontal timeline: React/Emotion/MUI era → Next.js/TypeScript/full-stack era. Animated reveal on scroll. This is the single best visual asset on the site — it turns "I know a lot of tools" into "I made deliberate choices over time."
2. **Business-operations integration across all seven projects.** A one-liner thread (CRM, ERP, POS, payments, logistics) stated near the hero or as a section lead. Every project plugs into a real business process — that's the generalist's edge.

---

## Page templates — component breakdown

### Landing
- `Hero` — positioning headline, sub, restrained entrance animation
- `StackTimeline` — the 2020→2026 evolution, scroll-triggered
- `FeaturedGrid` — 4 `CaseStudyCard`s
- `CompactGrid` — 3 `CompactCard`s (link out)
- `EngineeringTeaser` — inventory-ledger pull-quote → `/engineering`
- `About` + `Contact` footer

### Case study template (`/work/[slug]`)
Maps 1:1 onto the structure already written:
- `CaseHero` — one-line positioning, client, year, status, live URL
- `Summary` / `Context` / `RoleTeam`
- `StackList` — chip row
- `KeyDecisions` — the "chose X over Y because Z" blocks (your strongest interview-defense material — give them weight)
- `Architecture`
- `Challenges`
- `LiveLink` + (Esto only) `EngineeringCrossLink` → `/engineering`

### Contact (`Contact` — landing footer + `/about`)
Reuses the digital-business-card pattern iano.marketing already serves on its profile pages — a proven component, not a new invention. A horizontal action bar of clickable items, each firing the right intent, plus a vCard save and a link to the Iano profile card.
- `email` → `mailto:saifadel97@gmail.com`
- `phone` → `tel:+254795029950`
- `whatsapp` → `https://wa.me/254795029950`
- `linkedin` → `https://www.linkedin.com/in/seifeldin-ali-2b8591195/`
- `Save Contact` → downloads a `.vcf` vCard (name, email, phone, URLs) so a reviewer can one-tap save you to their phone
- `Iano profile card` → clickable link to `iano.marketing/profile/saif`
- A11y: real `<a>` elements with discernible labels, focus-visible states, and `aria-label`s on icon-only actions
The general reviewer showcase — built to *show*, not just link. A bare repo link buries your strongest individual-competence signal behind a click; this page makes it legible up front.
- `RepoHero` — what inventory-ledger is and why it exists (the private-client-repos context that makes a public artifact necessary)
- `LiveDemo` — **lead with this.** Deploy the offline-first browser client standalone (its own Netlify site / subdomain) and feature it prominently. Letting a reviewer toggle offline, queue movements, and watch conflict resolution happen is worth more than any paragraph. Shown, not told.
- `ArchitectureSummary` — append-only movement log as source of truth (stock derived, never stored), the three-layer overdraw proof — in plain language, so the signal lands without a click
- `GitHubLink` — for reviewers who want the code; the CLAUDE.md is what makes that click rewarding
- Honest "known trade-offs" note — signals the judgment to know your own system's edges

---

## Design direction

**Aesthetic:** clean, editorial, typography-led. Confident type scale, generous whitespace, a tight palette (one accent), instant load. The restraint *is* the argument — it mirrors "the generalist who picks the right tool and doesn't over-decorate."

**Motion (the part you want done well):**
- Page/route transitions, staggered scroll reveals, the timeline animation, a restrained hero entrance.
- Framer Motion for orchestration; plain CSS for anything a transition can handle (lighter).
- **Best-practice floor:** respect `prefers-reduced-motion`, keep everything 60fps, never block content render on animation, no layout shift.
- Motion is added *after* a working site exists (see milestones) so it enhances rather than blocks.

**Best-practices checklist (the artifact bar):**
- Semantic HTML, real accessibility (focus states, contrast, reduced-motion, keyboard nav)
- Per-page metadata + OG images — and note: unlike the CRA marketing sites (Sahara Winds ships no SSR meta), Next.js gives you proper SSG meta here. That contrast is itself a quiet competence signal.
- Lighthouse ~100 across the board; responsive from 320px up
- `README` + `CLAUDE.md` architecture note; conventional commits; one real Playwright smoke test (signals testing instinct without overbuilding)

---

## Milestone sequence (ship early, guard against drift)

| # | Milestone | Outcome |
|---|---|---|
| **M0** | Scaffold Next.js + deploy empty to Netlify **day one** | Live URL exists immediately. Nothing can "drift" if it's already shipping. |
| **M1** | All routes + real copy, unstyled | The whole site is navigable and content-complete. Shippable, if ugly. |
| **M2** | Design system — tokens, type scale, layout primitives | The visual language, before any page is "designed." |
| **M3** | Build landing + case study template, wire content | The site looks like the site. |
| **M4** | Motion layer | Animations on a site that already works. |
| **M5** | `/engineering` + inventory-ledger integration | The showcase reviewers came for. |
| **M6** | Polish — a11y pass, Lighthouse, OG images, README/CLAUDE.md | The artifact-quality finish. |

Animation lands at M4, *after* a working site at M3 — that ordering is the single most effective guard against the overbuild trap. A plain site that ships beats a beautiful one that doesn't.

---

## Resolved
- **Hosting** → Netlify
- **Domain** → standalone personal domain (name TBD — the only thing still needed before M0 can point at the real target)
- **Contact** → digital-business-card bar (clickable email/phone/WhatsApp/LinkedIn) + vCard save + link to Iano profile card
- **inventory-ledger** → dedicated `/engineering` page leading with a standalone-deployed live demo, repo link for code-readers, architecture summarised in-page

## Still needed before M0
- The actual personal domain name (so the day-one Netlify deploy points at the real target). Everything else is decided.
