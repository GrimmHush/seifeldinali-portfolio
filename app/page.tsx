import Link from "next/link";
import { deepProjects, compactProjects, stackTimeline } from "@/lib/projects";
import { Container, Section, SectionLabel, Chip } from "@/components/ui";

export default function Home() {
  return (
    <Container>
      {/* HERO — positioning statement */}
      <section className="py-24">
        <h1 className="max-w-2xl font-serif text-5xl font-semibold tracking-tight sm:text-6xl">
          Production generalist. I build the whole system — front end to ops.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted">
          Co-founder of Iano. Seven shipped products, each wired into a real business
          process — CRM, ERP, POS, payments, logistics.
        </p>
      </section>

      {/* THROUGH-LINE 1 — stack evolution 2020 → 2026 (animated at M4) */}
      <Section bordered>
        <SectionLabel>Stack evolution · 2020 → 2026</SectionLabel>
        <ol className="mt-8 grid gap-8 sm:grid-cols-2">
          {stackTimeline.map((era) => (
            <li key={era.title}>
              <p className="font-mono text-sm text-muted">{era.period}</p>
              <h3 className="mt-2 font-serif text-2xl font-semibold">{era.title}</h3>
              <p className="mt-2 text-muted">{era.summary}</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {era.stack.map((tech) => (
                  <Chip key={tech}>{tech}</Chip>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </Section>

      {/* FEATURED WORK — 4 deep case studies */}
      <Section bordered id="work">
        <SectionLabel>Selected work</SectionLabel>
        <ul className="mt-8 grid gap-8 sm:grid-cols-2">
          {deepProjects.map((p) => (
            <li key={p.slug}>
              <Link href={`/work/${p.slug}`} className="group block">
                <h3 className="font-serif text-2xl font-semibold group-hover:text-accent">
                  {p.name}
                </h3>
                <p className="mt-2 text-muted">{p.positioning}</p>
                <p className="mt-2 text-sm text-muted">
                  {p.client} · {p.year}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* COMPACT WORK — 3 cards, link out to live sites */}
      <Section bordered>
        <SectionLabel>Also shipped</SectionLabel>
        <ul className="mt-8 grid gap-6 sm:grid-cols-3">
          {compactProjects.map((p) => (
            <li key={p.name}>
              <a
                href={p.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <h3 className="font-serif text-xl font-semibold group-hover:text-accent">
                  {p.name} ↗
                </h3>
                <p className="mt-2 text-sm text-muted">{p.positioning}</p>
                <p className="mt-2 text-sm text-muted">{p.detail}</p>
                <p className="mt-2 font-mono text-xs text-muted">{p.stack.join(" · ")}</p>
              </a>
            </li>
          ))}
        </ul>
      </Section>

      {/* ENGINEERING TEASER — inventory-ledger showcase */}
      <Section bordered>
        <SectionLabel>Engineering</SectionLabel>
        <p className="mt-4 max-w-xl text-muted">
          A public, runnable offline-first sync engine — the code my client repos can&apos;t
          show.
        </p>
        <Link href="/engineering" className="mt-4 inline-block text-sm text-accent underline">
          See the deep-dive →
        </Link>
      </Section>
    </Container>
  );
}
