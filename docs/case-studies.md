> **Note (provenance).** This file was bundled from the project *snapshot* plus the edits
> agreed in planning (Octavia handoff framing; Esto offline-first bridge + inventory-ledger
> link). Your live `iano-portfolio-projects.md` may be further along — **reconcile or replace
> this file with your live version before running M1.**

# Iano — Project Writeups

## Deep-dive projects

---

## Octavia Carbon

**Above the fold**

- **One-line positioning:** Marketing and integrated e-commerce website for a Direct Air Capture (DAC) climate-tech company.
- **Client:** Octavia Carbon
- **Year / duration:** 2025
- **Status:** Built & handed off — live site has since evolved independently
- **Live URL:** https://octaviacarbon.com

**Summary:** A production marketing-plus-commerce website for Octavia Carbon, a Direct Air Capture company working on carbon removal. The build pairs a Next.js 14 front end with a headless commerce and CRM stack — Shopify Storefront API for e-commerce, HubSpot for lead capture, and SendGrid for email — deployed by Iano on a DigitalOcean server.

**Context:** Octavia Carbon needed a public-facing site that could both explain its DAC technology to a non-technical audience and support real transactions — selling and capturing interest in its carbon-removal services — rather than a static brochure site.

**Role & team:** Iano — a two-person Marketing Agency I co-founded. Both founders engineered the build. 

**Outcome / signal:** Concrete scope — a single site that combines marketing content, integrated e-commerce (Shopify), CRM-connected contact and newsletter forms (HubSpot, SendGrid), and analytics, built by Iano.

**Technical deep-dive**

- **Stack:** Next.js 14 · Tailwind CSS · Framer Motion · React Hooks · Shopify Storefront API · HubSpot CRM · Google Analytics · SendGrid · DigitalOcean · PM2

- **Key decisions:**
  - Chose **Next.js over plain React** because the site is marketing-led and needs SSR/SEO and fast first paint.
  - Chose the **Shopify Storefront API (headless) over a custom commerce backend** because it offloads catalog, cart, and payments to a proven platform while keeping a bespoke front end.
  - Chose **HubSpot for forms/CRM over rolling our own** so leads land directly in the client's existing sales pipeline. 
  - Chose a **DigitalOcean server with PM2 over serverless** for predictable cost and full control of the deploy.

- **Architecture & integrations:** A Next.js app shell with dark/light mode and Framer Motion animations, wired to several third parties: Shopify Storefront API powers the commerce layer, HubSpot receives contact-form leads, SendGrid handles newsletter/transactional email, and Google Analytics covers tracking. Deployment was on a DigitalOcean droplet with PM2 (`pm2 reload` on each release).

- **Challenges overcome:**
  - Making several independent third-party APIs (Shopify, HubSpot, SendGrid, GA) behave as one coherent experience.
  - Keeping the site SEO-friendly and fast while leaning on Framer Motion animations and rich imagery.
---

## merx

**Above the fold**

- **One-line positioning:** Self-hosted, multi-tenant ERP platform with pluggable Accounting, Inventory, and Supply modules.
- **Client:** MERX Systems — an Iano product
- **Year / duration:** 2026 - Actively developed
- **Status:** Built + maintained by Iano
- **Live URL:** https://merx.systems

**Summary:** MERX is a self-hosted, multi-tenant ERP platform built as a Turborepo monorepo on Next.js 15 and Postgres. It ships three first-party business modules — Accounting, Inventory, and Supply — on top of a pluggable module system, so new capabilities self-register into the shell without touching the core. Tenant isolation, role-based permissions, an audit log, and a branded PDF document engine are built into the platform layer.

**Context:** Businesses needed an ERP they could run themselves — covering accounting, inventory, and supply — without SaaS lock-in, and extensible enough to add their own modules rather than being boxed into a fixed feature set.

**Role & team:** Iano — a two-person Marketing Agency I co-founded. Both founders engineered the build.

**Outcome / signal:** Concrete scope — a multi-tenant ERP with three working business modules, strict TypeScript, RBAC, audit logging, a document/PDF engine, and a full self-hostable production stack (Docker + Caddy auto-HTTPS), plus unit and end-to-end test suites (Vitest + Playwright).

**Technical deep-dive**

- **Stack:** Next.js 15 (App Router, RSC, Server Actions) · TypeScript (strict) · pnpm + Turborepo · PostgreSQL 16 · Drizzle ORM · Redis 7 + BullMQ · MinIO (S3-compatible) · Auth.js v5 · Tailwind + shadcn/ui + Radix · react-hook-form + Zod · @react-pdf/renderer + Puppeteer · Nodemailer + React Email · Caddy · Vitest + Playwright

- **Key decisions:**
  - Chose a **pluggable module registry over a monolith** — each module ships a manifest (`{ key, nav, permissions, templates, hooks }`) and the Next.js shell auto-mounts navigation, routes, permissions, and PDF templates at boot, so adding a module is `cp` + manifest, not core surgery.
  - Chose **`AsyncLocalStorage`-based tenant isolation over ad-hoc filtering** — a `TenantContext` is set per request and every query is scoped by `org_id` via `requireOrgId()`, making isolation a platform guarantee rather than a per-query discipline.
  - Chose **Drizzle ORM over a heavier ORM** for type-safe, migration-first schema work with `drizzle-kit`.
  - Chose **self-hosted Docker + Caddy over a managed SaaS deploy** to deliver the "run it yourself, auto-HTTPS on your own domain" promise.

- **Architecture & integrations:** A single Next.js shell (`apps/web`) hosts all modules; shared packages provide the database (`db`), auth/RBAC/audit (`auth`, `core`), UI primitives (`ui`), and the PDF engine (`docs`). Tenant context flows through `AsyncLocalStorage`; RBAC is permission-string based (e.g. `accounting.write`) resolved per membership, throwing `ForbiddenError` when missing. Documents are React-PDF templates registered by key and rendered with shared brand styling. Background work runs on Redis + BullMQ; files live in MinIO; email goes through Nodemailer/React Email; Caddy fronts the production stack with automatic HTTPS.

- **Challenges overcome:**
  - **Guaranteeing tenant isolation** across every query without leaking data — solved with a request-scoped `TenantContext` and mandatory `org_id` scoping enforced in `@merx/core`.
  - **Making the platform genuinely extensible** — solved with self-registering module manifests that the shell auto-mounts at boot, so modules contribute nav, routes, permissions, and document templates declaratively.
  - **A reusable, on-brand document pipeline** — solved with a keyed React-PDF template registry (with a Puppeteer fallback) shared across modules.
---

## Esto

**Above the fold**

- **One-line positioning:** Multi-tenant restaurant POS, inventory, and digital-menu platform spanning web and a native Android client.
- **Client:** Esto — an Iano product/SaaS
- **Year / duration:** 2025 - Actively developed — 219+ commits, v1.0.1 released
- **Status:** Built + maintained by Iano
- **Live URL:** https://esto.solutions

**Summary:** Esto is a multi-tenant restaurant platform that goes well beyond a digital menu — it includes point-of-sale, inventory management, an analytics dashboard, shift handling, and a native Android client with a cloud-mode printing pipeline. The POS is offline-first — it keeps taking orders through a connection drop and reconciles on reconnect. Tenants are served from their own subdomains, and branding is JSON-configurable so new clients ship without forking the codebase.

**Context:** Restaurants needed more than an online menu — they needed an operational system (ordering, POS, inventory, printing, reporting) that could be stood up quickly per venue, in multiple languages, without rebuilding for each client.

**Role & team:** Iano — a two-person Marketing Agency I co-founded. Both founders engineered the build.

**Outcome / signal:** Concrete scope and maturity — a production multi-tenant system (TypeScript ~97%) with a tagged v1.0.1 release, a native Android client, cloud printing, multi-currency and configurable tax, and a sustained commit history reflecting enterprise hardening.

**Technical deep-dive**

- **Stack:** Next.js 14 · TypeScript · Tailwind CSS · Kotlin (Android client) · Cloudflare (tenant routing) · Docker · multi-language (English / Arabic) · WhatsApp ordering integration

- **Key decisions:**
  - Chose **multi-tenancy via subdomain → path rewrite (Cloudflare) over separate per-client deployments** so every tenant runs on one codebase and one deploy.
  - Chose a **native Android client (Kotlin) over web-only** to drive a reliable cloud-mode printing pipeline that browsers can't handle well.
  - Chose **JSON-config-driven branding (`config/brand.ts`, `data/menu.json`) over per-client code forks** so onboarding a venue is configuration, not engineering.

- **Architecture & integrations:** A Next.js multi-tenant web app where tenant subdomains are rewritten to internal paths at the Cloudflare edge; a Kotlin Android client handles the cloud printing pipeline; menus and branding are data-driven via JSON; ordering can flow through WhatsApp; an analytics dashboard surfaces usage; the stack ships via Docker Compose.

- **Challenges overcome:**
  - **Offline-first POS reliability:** a venue can't stop taking orders when its connection drops, so order writes queue on the client and reconcile on reconnect rather than blocking on the network. Esto's source is private, but the same class of offline-sync engineering is demonstrated end-to-end in a public, runnable proof-of-concept — [inventory-ledger](https://github.com/GrimmHush/inventory-ledger) — an append-only movement log as the source of truth, with IndexedDB queuing, crash recovery, and merge-time conflict resolution.
  - **Shift-close reliability:** hardened the shift close pipeline after investigation (`SHIFT_BUG_INVESTIGATION.md`), bumping desktop to 1.0.1.
  - **POS enterprise hardening:** added configurable tax, multi-currency, and atomic concurrency handling to make the POS production-safe.
  - **Analytics correctness:** fixed a bug where unique visitors were stuck at 1 on the dashboard overview.
---

## Amana

**Above the fold**

- **One-line positioning:** Full-stack delivery logistics platform connecting restaurants, riders, and customers — REST API, web admin dashboard, and a native rider app, in one monorepo.
- **Client:** Amana - Ghost Burgers
- **Year / duration:** 2025 - Actively developed
- **Status:** Built + maintained by Iano
- **Live URL:** https://amana.ke

**Summary:** Amana is a three-sided delivery logistics platform — restaurants, riders, and customers — delivered as a single monorepo with a Node.js/Express API, a Next.js admin dashboard, and a React Native (Expo) rider app. It runs real-time order and rider tracking over WebSockets, takes payments through M-Pesa, and handles routing via Google Maps, all deployable as a containerized stack.

**Context:** A delivery operation needed one connected system covering order intake, dispatch, live rider tracking, payments, and admin oversight — instead of stitching together separate restaurant, rider, and back-office tools.

**Role & team:** Iano — a two-person Marketing Agency I co-founded. Both founders engineered the build.

**Outcome / signal:** Concrete scope — a production-shaped monorepo spanning three runtimes (Express API, Next.js dashboard, React Native rider app) with real-time tracking, M-Pesa payments, OTP auth, role-scoped APIs, and a full deploy story (Docker, PM2, Nginx, EAS builds).

**Technical deep-dive**

- **Stack:** Express · Socket.IO · Mongoose / MongoDB 7 · Redis 7 · Next.js 16 · React 19 · Tailwind CSS 4 · Zustand · React Native 0.83 · Expo 55 · Expo Router · M-Pesa (Safaricom Daraja) · Google Maps Platform · Cloudinary · Turborepo + pnpm workspaces · Docker · PM2 · Nginx · GitHub Actions

- **Key decisions:**
  - Chose a **Turborepo monorepo over separate repos** so the API, dashboard, rider app, and shared validation/config evolve together with shared schemas (`packages/shared`).
  - Chose **Socket.IO over polling** to power real-time order status and rider location updates.
  - Chose **M-Pesa (Daraja) STK-push** as the payment rail, matching the Kenyan market.
  - Chose a **native React Native rider app over a mobile web view** for reliable background location, notifications, and on-the-road performance.

- **Architecture & integrations:** Three apps under `apps/` — an Express REST + WebSocket API (`config`, `middleware`, `models`, `routes`, `services`, `socket`, scheduled `jobs`), a Next.js admin dashboard, and an Expo rider app (Zustand stores, location/notification/socket services) — plus shared `packages/`. MongoDB is the primary store with Redis for caching; real-time events flow through Socket.IO; payments via M-Pesa STK-push with a callback endpoint; geocoding/directions via Google Maps; media via Cloudinary; JWT access/refresh auth with OTP verification. Deploy: API on PM2 + Nginx, dashboard via Docker, mobile via EAS build/submit.

- **Challenges overcome:**
  - **Coordinating three runtimes in one codebase** — solved with Turborepo + pnpm workspaces and shared validation/config packages.
  - **Real-time, role-aware data flow** — orders, riders, and admin each see the right live view, scoped by role through the API and Socket.IO channels.
---

## Short-form projects

---

### Iano Marketing

- **One-liner:** The studio's own agency website and digital portfolio, including per-person profile/business-card pages.
- **Stack:** React (Create React App)
- **Status:** Built + maintained by Iano
- **Live URL:** https://iano.marketing
- **One detail:** Serves shareable individual profile pages (e.g. `/profile/modasser`) that double as digital business cards with save-contact and direct WhatsApp/LinkedIn links.

---

### Namaa

- **One-liner:** Marketing and enquiry website for Namaa Fruits Ltd, a Kenya-based tropical-fruit exporter.
- **Stack:** React (Create React App)
- **Status:** Built + maintained by Iano
- **Live URL:** https://namaafruits.com
- **One detail:** A product-led enquiry form lets international buyers select specific produce (avocado, mango, pineapple, etc.) to request quotes, tailored to a cold-chain export workflow.

---

### Sahara Winds

- **One-liner:** Marketing and enquiry website for Saharawinds Ltd, a Nairobi-based air & sea freight and logistics company.
- **Stack:** React (Create React App)
- **Status:** Built + maintained by Iano
- **Live URL:** https://saharawinds.ke
- **One detail:** Service-segmented site (air/sea freight, air charter, warehousing & cold storage, road/rail, customs clearance) with a topic-routed inquiry form feeding the right service line.
