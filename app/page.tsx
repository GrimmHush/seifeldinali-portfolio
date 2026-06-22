import Link from "next/link";
import Image from "next/image";
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
                className="group flex h-full flex-col transition-colors hover:bg-foreground/[0.02]"
              >
                {p.cover && (
                  <div className="relative aspect-[16/10] overflow-hidden border-b border-border">
                    <Image
                      src={p.cover.src}
                      alt={p.cover.alt}
                      fill
                      sizes="(min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-serif text-2xl font-semibold transition-colors group-hover:text-accent">
                    {p.name}
                  </h3>
                  <p className="mt-2 text-muted">{p.positioning}</p>
                  <p className="mt-3 font-mono text-xs text-muted">
                    {p.client} · {p.year}
                  </p>
                  <span className="mt-6 text-sm text-accent">Case study →</span>
                </div>
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
              <Link href={`/work/${p.slug}`} className="group block">
                {p.cover && (
                  <div className="relative mb-4 aspect-[16/10] overflow-hidden border border-border">
                    <Image
                      src={p.cover.src}
                      alt={p.cover.alt}
                      fill
                      sizes="(min-width: 640px) 33vw, 100vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  </div>
                )}
                <h3 className="font-serif text-xl font-semibold transition-colors group-hover:text-accent">
                  {p.name}
                </h3>
                <p className="mt-2 text-sm text-muted">{p.positioning}</p>
                <p className="mt-2 text-sm text-muted">{p.detail}</p>
                <p className="mt-3 font-mono text-xs text-muted">{p.stack.join(" · ")}</p>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* DEMONSTRATION TEASER — featured callout to the showcase */}
      <Section bordered>
        <SectionLabel>Demonstration</SectionLabel>
        <Reveal className="mt-8 border-l-2 border-accent pl-6">
          <p className="max-w-xl font-serif text-2xl leading-snug">
            A public, runnable offline-first sync engine — the code my client repos
            can&apos;t show.
          </p>
          <Link
            href="/demonstration"
            className="mt-4 inline-block text-sm text-accent underline underline-offset-4"
          >
            See the deep-dive →
          </Link>
        </Reveal>
      </Section>
    </Container>
  );
}
