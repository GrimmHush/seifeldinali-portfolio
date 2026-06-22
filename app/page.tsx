import Link from "next/link";
import { deepProjects, compactProjects } from "@/lib/projects";
import { Container, Section, SectionLabel } from "@/components/ui";
import { StackTimeline } from "@/components/StackTimeline";
import { Hero } from "@/components/Hero";
import { Reveal } from "@/components/Reveal";

export default function Home() {
  return (
    <Container>
      {/* HERO — the thesis, stated typographically (staggered load entrance) */}
      <Hero />

      {/* SIGNATURE — stack evolution 2020 → 2026 (self-animating on scroll) */}
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
          {deepProjects.map((p, i) => (
            <Reveal key={p.slug} as="li" delay={i * 0.08} className="bg-background">
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
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* COMPACT WORK — 3 link-outs, lighter weight than the featured grid */}
      <Section bordered>
        <SectionLabel>Also shipped</SectionLabel>
        <ul className="mt-8 grid gap-8 sm:grid-cols-3">
          {compactProjects.map((p, i) => (
            <Reveal key={p.name} as="li" delay={i * 0.08}>
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
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* ENGINEERING TEASER — featured callout to the showcase */}
      <Section bordered>
        <SectionLabel>Engineering</SectionLabel>
        <Reveal className="mt-8 border-l-2 border-accent pl-6">
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
        </Reveal>
      </Section>
    </Container>
  );
}
