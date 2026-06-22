import Link from "next/link";
import { deepProjects, compactProjects } from "@/lib/projects";
import { Container, Section, SectionLabel } from "@/components/ui";
import { StackTimeline } from "@/components/StackTimeline";

// The business-operations through-line: every project plugs into a real
// operational domain. Rendered as a structural eyebrow under the hero.
const opsThread = ["CRM", "ERP", "POS", "Payments", "Logistics"];

export default function Home() {
  return (
    <Container>
      {/* HERO — the thesis, stated typographically */}
      <section className="py-24 sm:py-32">
        <h1 className="max-w-4xl font-serif text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
          Production generalist. I build the whole system — front end to ops.
        </h1>
        <p className="mt-8 max-w-xl text-lg text-muted">
          Co-founder of Iano. Seven shipped products, each wired into a real business
          process.
        </p>
        <ul className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs uppercase tracking-widest text-muted">
          {opsThread.map((domain, i) => (
            <li key={domain} className="flex items-center gap-3">
              {i > 0 && <span className="text-accent">·</span>}
              {domain}
            </li>
          ))}
        </ul>
      </section>

      {/* SIGNATURE — stack evolution 2020 → 2026 */}
      <Section bordered>
        <SectionLabel>Stack evolution · 2020 → 2026</SectionLabel>
        <div className="mt-10">
          <StackTimeline />
        </div>
      </Section>

      {/* FEATURED WORK — 4 deep case studies */}
      <Section bordered id="work">
        <SectionLabel>Selected work</SectionLabel>
        <ul className="mt-8 grid gap-px border border-border bg-border sm:grid-cols-2">
          {deepProjects.map((p) => (
            <li key={p.slug} className="bg-background">
              <Link
                href={`/work/${p.slug}`}
                className="group flex h-full flex-col p-6 transition-colors hover:bg-foreground/[0.02]"
              >
                <h3 className="font-serif text-2xl font-semibold transition-colors group-hover:text-accent">
                  {p.name}
                </h3>
                <p className="mt-2 text-muted">{p.positioning}</p>
                <p className="mt-3 font-mono text-xs text-muted">
                  {p.client} · {p.year}
                </p>
                <span className="mt-6 text-sm text-accent">Case study →</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* COMPACT WORK — 3 link-outs, lighter weight than the featured grid */}
      <Section bordered>
        <SectionLabel>Also shipped</SectionLabel>
        <ul className="mt-8 grid gap-8 sm:grid-cols-3">
          {compactProjects.map((p) => (
            <li key={p.name}>
              <a
                href={p.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <h3 className="font-serif text-xl font-semibold transition-colors group-hover:text-accent">
                  {p.name} ↗
                </h3>
                <p className="mt-2 text-sm text-muted">{p.positioning}</p>
                <p className="mt-2 text-sm text-muted">{p.detail}</p>
                <p className="mt-3 font-mono text-xs text-muted">{p.stack.join(" · ")}</p>
              </a>
            </li>
          ))}
        </ul>
      </Section>

      {/* ENGINEERING TEASER — featured callout to the showcase */}
      <Section bordered>
        <SectionLabel>Engineering</SectionLabel>
        <div className="mt-8 border-l-2 border-accent pl-6">
          <p className="max-w-xl font-serif text-2xl leading-snug">
            A public, runnable offline-first sync engine — the code my client repos
            can&apos;t show.
          </p>
          <Link
            href="/engineering"
            className="mt-4 inline-block text-sm text-accent underline underline-offset-4"
          >
            See the deep-dive →
          </Link>
        </div>
      </Section>
    </Container>
  );
}
