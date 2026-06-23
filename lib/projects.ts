// Single source of truth for project content.
// Drives routing, the work grids, per-page metadata, and the case-study bodies.
// Edit project facts here — never inline in a page.

export type Challenge = {
  // Optional lead label (Esto's challenges carry them; others read as a single statement).
  heading?: string;
  body: string;
};

// A showcase image: a path under public/work/<slug>/, with descriptive alt text.
export type ProjectImage = {
  src: string;
  alt: string;
  caption?: string;
};

// Cover thumbnail (01-cover.webp) — the card thumbnail and case-study lead image.
const cover = (slug: string, name: string): ProjectImage => ({
  src: `/work/${slug}/01-cover.webp`,
  alt: `${name} product screenshot`,
});

// Gallery shots (02.webp … NN.webp), in numeric order.
const gallery = (slug: string, count: number, name: string): ProjectImage[] =>
  Array.from({ length: count }, (_, i) => {
    const n = String(i + 2).padStart(2, "0");
    return { src: `/work/${slug}/${n}.webp`, alt: `${name} screenshot ${i + 1}` };
  });

export type DeepProject = {
  slug: string;
  name: string;
  positioning: string;
  client: string;
  year: string;
  status: string;
  liveUrl: string;
  summary: string;
  context: string;
  roleTeam: string;
  outcome: string;
  stack: string[];
  keyDecisions: string[];
  architecture: string;
  challenges: Challenge[];
  cover?: ProjectImage;
  gallery?: ProjectImage[];
  // Esto bridges to the public offline-sync proof on /demonstration.
  crossLinkEngineering?: boolean;
};

export type CompactProject = {
  slug: string;
  name: string;
  positioning: string;
  liveUrl: string;
  stack: string[];
  status: string;
  detail: string;
  cover?: ProjectImage;
  gallery?: ProjectImage[];
};

export type StackEra = {
  period: string;
  title: string;
  stack: string[];
  summary: string;
};

// Identical across every project — stated once, referenced per project.
export const ROLE_TEAM =
  "Iano, a two-person marketing agency I co-founded. Both founders engineered the build.";

export const deepProjects: DeepProject[] = [
  {
    slug: "octavia-carbon",
    name: "Octavia Carbon",
    positioning:
      "Marketing + integrated e-commerce site for a Direct Air Capture climate-tech company.",
    client: "Octavia Carbon",
    year: "2025",
    status: "Built and handed off; the live site has since evolved independently",
    liveUrl: "https://octaviacarbon.com",
    summary:
      "A production marketing-plus-commerce website for Octavia Carbon, a Direct Air Capture company working on carbon removal. The build pairs a Next.js 14 front end with a headless commerce and CRM stack (Shopify Storefront API for e-commerce, HubSpot for lead capture, and SendGrid for email), deployed by Iano on a DigitalOcean server.",
    context:
      "Octavia Carbon needed a public-facing site that could both explain its DAC technology to a non-technical audience and support real transactions, selling and capturing interest in its carbon-removal services, rather than a static brochure site.",
    roleTeam: ROLE_TEAM,
    outcome:
      "Concrete scope: a single site that combines marketing content, integrated e-commerce (Shopify), CRM-connected contact and newsletter forms (HubSpot, SendGrid), and analytics, built by Iano.",
    stack: [
      "Next.js 14",
      "Tailwind CSS",
      "Framer Motion",
      "React Hooks",
      "Shopify Storefront API",
      "HubSpot CRM",
      "Google Analytics",
      "SendGrid",
      "DigitalOcean",
      "PM2",
    ],
    keyDecisions: [
      "Chose Next.js over plain React because the site is marketing-led and needs SSR/SEO and fast first paint.",
      "Chose the Shopify Storefront API (headless) over a custom commerce backend because it offloads catalog, cart, and payments to a proven platform while keeping a bespoke front end.",
      "Chose HubSpot for forms/CRM over rolling our own so leads land directly in the client's existing sales pipeline.",
      "Chose a DigitalOcean server with PM2 over serverless for predictable cost and full control of the deploy.",
    ],
    architecture:
      "A Next.js app shell with dark/light mode and Framer Motion animations, wired to several third parties: Shopify Storefront API powers the commerce layer, HubSpot receives contact-form leads, SendGrid handles newsletter/transactional email, and Google Analytics covers tracking. Deployment was on a DigitalOcean droplet with PM2 (`pm2 reload` on each release).",
    challenges: [
      {
        body: "Making several independent third-party APIs (Shopify, HubSpot, SendGrid, GA) behave as one coherent experience.",
      },
      {
        body: "Keeping the site SEO-friendly and fast while leaning on Framer Motion animations and rich imagery.",
      },
    ],
    cover: cover("octavia-carbon", "Octavia Carbon"),
    gallery: gallery("octavia-carbon", 11, "Octavia Carbon"),
  },
  {
    slug: "merx",
    name: "MERX",
    positioning:
      "Self-hosted, multi-tenant ERP platform with pluggable Accounting, Inventory, and Supply modules.",
    client: "MERX Systems, an Iano product",
    year: "2026, actively developed",
    status: "Built + maintained by Iano",
    liveUrl: "https://merx.systems",
    summary:
      "MERX is a self-hosted, multi-tenant ERP platform built as a Turborepo monorepo on Next.js 15 and Postgres. It ships three first-party business modules (Accounting, Inventory, and Supply) on top of a pluggable module system, so new capabilities self-register into the shell without touching the core. Tenant isolation, role-based permissions, an audit log, and a branded PDF document engine are built into the platform layer.",
    context:
      "Businesses needed an ERP they could run themselves, covering accounting, inventory, and supply, without SaaS lock-in, and extensible enough to add their own modules rather than being boxed into a fixed feature set.",
    roleTeam: ROLE_TEAM,
    outcome:
      "Concrete scope: a multi-tenant ERP with three working business modules, strict TypeScript, RBAC, audit logging, a document/PDF engine, and a full self-hostable production stack (Docker + Caddy auto-HTTPS), plus unit and end-to-end test suites (Vitest + Playwright).",
    stack: [
      "Next.js 15 (App Router, RSC, Server Actions)",
      "TypeScript (strict)",
      "pnpm + Turborepo",
      "PostgreSQL 16",
      "Drizzle ORM",
      "Redis 7 + BullMQ",
      "MinIO (S3-compatible)",
      "Auth.js v5",
      "Tailwind + shadcn/ui + Radix",
      "react-hook-form + Zod",
      "@react-pdf/renderer + Puppeteer",
      "Nodemailer + React Email",
      "Caddy",
      "Vitest + Playwright",
    ],
    keyDecisions: [
      "Chose a pluggable module registry over a monolith: each module ships a manifest ({ key, nav, permissions, templates, hooks }) and the Next.js shell auto-mounts navigation, routes, permissions, and PDF templates at boot, so adding a module is `cp` + manifest, not core surgery.",
      "Chose AsyncLocalStorage-based tenant isolation over ad-hoc filtering: a TenantContext is set per request and every query is scoped by org_id via requireOrgId(), making isolation a platform guarantee rather than a per-query discipline.",
      "Chose Drizzle ORM over a heavier ORM for type-safe, migration-first schema work with drizzle-kit.",
      "Chose self-hosted Docker + Caddy over a managed SaaS deploy to deliver the “run it yourself, auto-HTTPS on your own domain” promise.",
    ],
    architecture:
      "A single Next.js shell (`apps/web`) hosts all modules; shared packages provide the database (`db`), auth/RBAC/audit (`auth`, `core`), UI primitives (`ui`), and the PDF engine (`docs`). Tenant context flows through AsyncLocalStorage; RBAC is permission-string based (e.g. `accounting.write`) resolved per membership, throwing ForbiddenError when missing. Documents are React-PDF templates registered by key and rendered with shared brand styling. Background work runs on Redis + BullMQ; files live in MinIO; email goes through Nodemailer/React Email; Caddy fronts the production stack with automatic HTTPS.",
    challenges: [
      {
        heading: "Guaranteeing tenant isolation",
        body: "Across every query, without leaking data, this is solved with a request-scoped TenantContext and mandatory org_id scoping enforced in @merx/core.",
      },
      {
        heading: "Making the platform genuinely extensible",
        body: "Solved with self-registering module manifests that the shell auto-mounts at boot, so modules contribute nav, routes, permissions, and document templates declaratively.",
      },
      {
        heading: "A reusable, on-brand document pipeline",
        body: "Solved with a keyed React-PDF template registry (with a Puppeteer fallback) shared across modules.",
      },
    ],
    cover: cover("merx", "MERX"),
    gallery: gallery("merx", 24, "MERX"),
  },
  {
    slug: "esto",
    name: "Esto",
    positioning:
      "Multi-tenant restaurant POS, inventory, and digital-menu platform spanning web and a native Android client.",
    client: "Esto, an Iano product",
    year: "2025, actively developed",
    status: "Built + maintained by Iano · 219+ commits, v1.0.1 released",
    liveUrl: "https://esto.solutions",
    summary:
      "Esto is a multi-tenant restaurant platform that goes well beyond a digital menu: it includes point-of-sale, inventory management, an analytics dashboard, shift handling, and a native Android client with a cloud-mode printing pipeline. The POS is offline-first, so it keeps taking orders through a connection drop and reconciles on reconnect. Tenants are served from their own subdomains, and branding is JSON-configurable so new clients ship without forking the codebase.",
    context:
      "Restaurants needed more than an online menu; they needed an operational system (ordering, POS, inventory, printing, reporting) that could be stood up quickly per venue, in multiple languages, without rebuilding for each client.",
    roleTeam: ROLE_TEAM,
    outcome:
      "Concrete scope and maturity: a production multi-tenant system (TypeScript ~97%) with a tagged v1.0.1 release, a native Android client, cloud printing, multi-currency and configurable tax, and a sustained commit history reflecting enterprise hardening.",
    stack: [
      "Next.js 14",
      "TypeScript",
      "Tailwind CSS",
      "Kotlin (Android client)",
      "Cloudflare (tenant routing)",
      "Docker",
      "Multi-language (English / Arabic)",
      "WhatsApp ordering integration",
    ],
    keyDecisions: [
      "Chose multi-tenancy via subdomain → path rewrite (Cloudflare) over separate per-client deployments so every tenant runs on one codebase and one deploy.",
      "Chose a native Android client (Kotlin) over web-only to drive a reliable cloud-mode printing pipeline that browsers can't handle well.",
      "Chose JSON-config-driven branding (`config/brand.ts`, `data/menu.json`) over per-client code forks so onboarding a venue is configuration, not engineering.",
    ],
    architecture:
      "A Next.js multi-tenant web app where tenant subdomains are rewritten to internal paths at the Cloudflare edge; a Kotlin Android client handles the cloud printing pipeline; menus and branding are data-driven via JSON; ordering can flow through WhatsApp; an analytics dashboard surfaces usage; the stack ships via Docker Compose.",
    challenges: [
      {
        heading: "Offline-first POS reliability",
        body: "A venue can't stop taking orders when its connection drops, so order writes queue on the client and reconcile on reconnect rather than blocking on the network. Esto's source is private, but the same class of offline-sync engineering is demonstrated end-to-end in a public, runnable proof-of-concept called inventory-ledger: an append-only movement log as the source of truth, with IndexedDB queuing, crash recovery, and merge-time conflict resolution.",
      },
      {
        heading: "Shift-close reliability",
        body: "Hardened the shift-close pipeline after investigation (SHIFT_BUG_INVESTIGATION.md), bumping desktop to 1.0.1.",
      },
      {
        heading: "POS enterprise hardening",
        body: "Added configurable tax, multi-currency, and atomic concurrency handling to make the POS production-safe.",
      },
      {
        heading: "Analytics correctness",
        body: "Fixed a bug where unique visitors were stuck at 1 on the dashboard overview.",
      },
    ],
    cover: cover("esto", "Esto"),
    gallery: gallery("esto", 13, "Esto"),
    crossLinkEngineering: true,
  },
  {
    slug: "amana",
    name: "Amana",
    positioning:
      "Three-sided delivery logistics platform: a REST API, web dashboard, and native rider app in one monorepo.",
    client: "Amana for Ghost Burgers",
    year: "2025, actively developed",
    status: "Built + maintained by Iano",
    liveUrl: "https://amana.ke",
    summary:
      "Amana is a three-sided delivery logistics platform connecting restaurants, riders, and customers, delivered as a single monorepo with a Node.js/Express API, a Next.js admin dashboard, and a React Native (Expo) rider app. It runs real-time order and rider tracking over WebSockets, takes payments through M-Pesa, and handles routing via Google Maps, all deployable as a containerized stack.",
    context:
      "A delivery operation needed one connected system covering order intake, dispatch, live rider tracking, payments, and admin oversight, instead of stitching together separate restaurant, rider, and back-office tools.",
    roleTeam: ROLE_TEAM,
    outcome:
      "Concrete scope: a production-shaped monorepo spanning three runtimes (Express API, Next.js dashboard, React Native rider app) with real-time tracking, M-Pesa payments, OTP auth, role-scoped APIs, and a full deploy story (Docker, PM2, Nginx, EAS builds).",
    stack: [
      "Express",
      "Socket.IO",
      "Mongoose / MongoDB 7",
      "Redis 7",
      "Next.js 16",
      "React 19",
      "Tailwind CSS 4",
      "Zustand",
      "React Native 0.83",
      "Expo 55",
      "Expo Router",
      "M-Pesa (Safaricom Daraja)",
      "Google Maps Platform",
      "Cloudinary",
      "Turborepo + pnpm workspaces",
      "Docker",
      "PM2",
      "Nginx",
      "GitHub Actions",
    ],
    keyDecisions: [
      "Chose a Turborepo monorepo over separate repos so the API, dashboard, rider app, and shared validation/config evolve together with shared schemas (`packages/shared`).",
      "Chose Socket.IO over polling to power real-time order status and rider location updates.",
      "Chose M-Pesa (Daraja) STK-push as the payment rail, matching the Kenyan market.",
      "Chose a native React Native rider app over a mobile web view for reliable background location, notifications, and on-the-road performance.",
    ],
    architecture:
      "Three apps sit under `apps/`: an Express REST + WebSocket API (`config`, `middleware`, `models`, `routes`, `services`, `socket`, scheduled `jobs`), a Next.js admin dashboard, and an Expo rider app (Zustand stores, location/notification/socket services), alongside shared `packages/`. MongoDB is the primary store with Redis for caching; real-time events flow through Socket.IO; payments via M-Pesa STK-push with a callback endpoint; geocoding/directions via Google Maps; media via Cloudinary; JWT access/refresh auth with OTP verification. Deploy: API on PM2 + Nginx, dashboard via Docker, mobile via EAS build/submit.",
    challenges: [
      {
        heading: "Coordinating three runtimes in one codebase",
        body: "Solved with Turborepo + pnpm workspaces and shared validation/config packages.",
      },
      {
        heading: "Real-time, role-aware data flow",
        body: "Orders, riders, and admin each see the right live view, scoped by role through the API and Socket.IO channels.",
      },
    ],
    cover: cover("amana", "Amana"),
    gallery: gallery("amana", 9, "Amana"),
  },
];

export const compactProjects: CompactProject[] = [
  {
    slug: "iano-marketing",
    name: "Iano Marketing",
    positioning:
      "The studio's own agency site and digital portfolio, with per-person profile cards.",
    liveUrl: "https://iano.marketing",
    stack: ["React (Create React App)"],
    status: "Built + maintained by Iano",
    detail:
      "Serving as the Agency's marketing website and digital portfolio, iano.marketing is a dynamic showcase of the Nairobi-based team's creative capabilities. The site acts as a live demonstration of their expertise in UI/UX design, web development, and digital branding, offering prospective clients a curated look at their past work and core services. Through its sleek design and unconventional copy, the platform not only outlines their marketing and media production offerings but also perfectly encapsulates the distinct brand voice they build for their partners.",
    cover: cover("iano-marketing", "Iano Marketing"),
    gallery: gallery("iano-marketing", 4, "Iano Marketing"),
  },
  {
    slug: "namaa",
    name: "Namaa",
    positioning: "Marketing + enquiry site for a Kenya-based tropical-fruit exporter.",
    liveUrl: "https://namaafruits.com",
    stack: ["React (Create React App)"],
    status: "Built + maintained by Iano",
    detail:
      "A product-led enquiry form lets international buyers select specific produce (avocado, mango, pineapple, etc.) to request quotes, tailored to a cold-chain export workflow.",
    cover: cover("namaa", "Namaa"),
    gallery: gallery("namaa", 5, "Namaa"),
  },
  {
    slug: "sahara-winds",
    name: "Sahara Winds",
    positioning:
      "Marketing + enquiry site for a Nairobi-based air & sea freight company.",
    liveUrl: "https://saharawinds.ke",
    stack: ["React (Create React App)"],
    status: "Built + maintained by Iano",
    detail:
      "Service-segmented site (air/sea freight, air charter, warehousing & cold storage, road/rail, customs clearance) with a topic-routed inquiry form feeding the right service line.",
    cover: cover("sahara-winds", "Sahara Winds"),
    gallery: gallery("sahara-winds", 4, "Sahara Winds"),
  },
];

// The deliberate-evolution through-line: marketing React → full-stack Next.js.
export const stackTimeline: StackEra[] = [
  {
    period: "2020 →",
    title: "Marketing & enquiry sites",
    stack: ["React (CRA)", "Emotion", "MUI", "Framer Motion"],
    summary:
      "Client-facing React sites (Iano, Namaa, Sahara Winds) focused on content, motion, and lead capture.",
  },
  {
    period: "→ 2026",
    title: "Full-stack products",
    stack: [
      "Next.js",
      "TypeScript (strict)",
      "PostgreSQL",
      "Turborepo",
      "React Native",
      "Docker",
    ],
    summary:
      "Multi-tenant platforms wired into real business operations (ERP, POS, logistics, payments), offline-first where it counts.",
  },
];

// /demonstration — the inventory-ledger showcase.
export const engineering = {
  name: "inventory-ledger",
  repoUrl: "https://github.com/GrimmHush/inventory-ledger",
  // Standalone Vercel deploy of the web/ Vite client (VITE_DEMO_OFFLINE mode):
  // a backend-free, permanently-offline showcase of the offline-first sync engine.
  demoUrl: "https://inventory-ledger-demo.vercel.app",
  intro:
    "The general-reviewer showcase, shown rather than just linked. Client repos are private; this one is public, so the engineering is legible. It's the same class of offline-sync work that keeps Esto's POS taking orders through a connection drop, extracted into a runnable proof.",
  architectureSummary:
    "Stock is never stored as a number; it's derived by folding an append-only log of movements (in / out / adjust). The ledger is the single source of truth, so every quantity is auditable and every change reversible. The browser client queues movements in IndexedDB while offline and flushes on reconnect, running the same pure merge in the browser that the server runs. Each operation reports its own outcome (applied, superseded, duplicate, or rejected) instead of throwing.",
  conflictNote:
    "Movements are conflict-free: appending to a log has no winner, so concurrent offline edits just merge, deduplicated by movement ID. Item metadata (names, SKUs) uses last-write-wins by updatedAt, reporting stale edits as superseded. Overdraw is caught at merge time: two offline withdrawals that are each valid alone but together overdraw will fold in all known movements, detect the overdraw, and reject the second. On Postgres that guarantee is additionally enforced inside a single Serializable transaction so concurrent withdrawals can't both pass.",
  tradeOffs:
    "The project deliberately defers multi-user/organization scoping, multiple warehouse locations, and double-entry accounting, spending its depth on offline-sync safety rather than feature breadth.",
};

export function getDeepProject(slug: string): DeepProject | undefined {
  return deepProjects.find((p) => p.slug === slug);
}

export function getCompactProject(slug: string): CompactProject | undefined {
  return compactProjects.find((p) => p.slug === slug);
}

// Resolves a slug to either project kind for the shared /work/[slug] route.
export type ResolvedProject =
  | { kind: "deep"; project: DeepProject }
  | { kind: "compact"; project: CompactProject };

export function getProject(slug: string): ResolvedProject | undefined {
  const deep = getDeepProject(slug);
  if (deep) return { kind: "deep", project: deep };
  const compact = getCompactProject(slug);
  if (compact) return { kind: "compact", project: compact };
  return undefined;
}
