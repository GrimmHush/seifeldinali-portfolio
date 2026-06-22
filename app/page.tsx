import Link from "next/link";
import { deepProjects, compactProjects } from "@/lib/projects";

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-6">
      {/* HERO — positioning statement (M3 styling) */}
      <section className="py-24">
        <h1 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
          Production generalist. I build the whole system — front end to ops.
        </h1>
        <p className="mt-6 max-w-xl text-lg opacity-70">
          Co-founder of Iano. Seven shipped products, each wired into a real business
          process — CRM, ERP, POS, payments, logistics.
        </p>
      </section>

      {/* THROUGH-LINE 1 — stack evolution 2020 → 2026 (animated timeline at M4) */}
      <section className="border-t border-black/10 py-16 dark:border-white/10">
        <h2 className="text-sm font-mono uppercase tracking-widest opacity-50">
          Stack evolution · 2020 → 2026
        </h2>
        <p className="mt-4 max-w-xl opacity-70">
          [Timeline component] React / Emotion / MUI → Next.js / TypeScript / full-stack.
        </p>
      </section>

      {/* FEATURED WORK — 4 deep case studies */}
      <section id="work" className="border-t border-black/10 py-16 dark:border-white/10">
        <h2 className="text-sm font-mono uppercase tracking-widest opacity-50">
          Selected work
        </h2>
        <ul className="mt-8 grid gap-8 sm:grid-cols-2">
          {deepProjects.map((p) => (
            <li key={p.slug}>
              <Link href={`/work/${p.slug}`} className="group block">
                <h3 className="text-xl font-semibold group-hover:underline">
                  {p.name}
                </h3>
                <p className="mt-2 opacity-70">{p.positioning}</p>
                <p className="mt-2 text-sm opacity-50">
                  {p.client} · {p.year}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* COMPACT WORK — 3 cards, link out to live sites */}
      <section className="border-t border-black/10 py-16 dark:border-white/10">
        <h2 className="text-sm font-mono uppercase tracking-widest opacity-50">
          Also shipped
        </h2>
        <ul className="mt-8 grid gap-6 sm:grid-cols-3">
          {compactProjects.map((p) => (
            <li key={p.name}>
              <a
                href={p.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <h3 className="font-semibold group-hover:underline">{p.name} ↗</h3>
                <p className="mt-2 text-sm opacity-70">{p.positioning}</p>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* ENGINEERING TEASER — inventory-ledger showcase */}
      <section className="border-t border-black/10 py-16 dark:border-white/10">
        <h2 className="text-sm font-mono uppercase tracking-widest opacity-50">
          Engineering
        </h2>
        <p className="mt-4 max-w-xl opacity-70">
          A public, runnable offline-first sync engine — the code my client repos can&apos;t show.
        </p>
        <Link href="/engineering" className="mt-4 inline-block text-sm underline">
          See the deep-dive →
        </Link>
      </section>
    </div>
  );
}
