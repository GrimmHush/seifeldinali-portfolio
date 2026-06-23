import Link from "next/link";
import Image from "next/image";
import { deepProjects, compactProjects } from "@/lib/projects";
import { Container, Section, SectionLabel, Card } from "@/components/ui";
import { StackTimeline } from "@/components/StackTimeline";
import { Hero } from "@/components/Hero";
import { Reveal } from "@/components/Reveal";

export default function Home() {
  return (
    <Container width="wide">
      {/* HERO — the thesis, stated typographically (staggered load entrance) */}
      <Hero />

      {/* SIGNATURE — stack evolution 2020 → 2026 (self-animating on scroll) */}
      <Section bordered>
        <SectionLabel>Stack evolution · 2020 → 2026</SectionLabel>
        <div className="mt-12">
          <StackTimeline />
        </div>
      </Section>

      {/* FEATURED WORK — 4 deep case studies as glass spotlight cards */}
      <Section bordered id="work">
        <SectionLabel>Selected work</SectionLabel>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2">
          {deepProjects.map((p, i) => (
            <Reveal key={p.slug} as="li" delay={i * 0.08} variant="scale">
              <Card className="group h-full overflow-hidden">
                <Link href={`/work/${p.slug}`} className="flex h-full flex-col">
                  {p.cover && (
                    <div className="relative aspect-16/10 overflow-hidden border-b border-border">
                      <Image
                        src={p.cover.src}
                        alt={p.cover.alt}
                        fill
                        sizes="(min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-title font-semibold transition-colors group-hover:text-accent">
                      {p.name}
                    </h3>
                    <p className="mt-2 text-muted">{p.positioning}</p>
                    <p className="mt-3 font-mono text-xs text-muted">
                      {p.client} · {p.year}
                    </p>
                    <span className="mt-6 text-sm text-accent">Case study →</span>
                  </div>
                </Link>
              </Card>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* COMPACT WORK — 3 link-outs, lighter weight than the featured grid */}
      <Section bordered>
        <SectionLabel>Also shipped</SectionLabel>
        <ul className="mt-10 grid gap-6 sm:grid-cols-3">
          {compactProjects.map((p, i) => (
            <Reveal key={p.name} as="li" delay={i * 0.08}>
              <Card className="group h-full overflow-hidden">
                <Link href={`/work/${p.slug}`} className="flex h-full flex-col">
                  {p.cover && (
                    <div className="relative aspect-16/10 overflow-hidden border-b border-border">
                      <Image
                        src={p.cover.src}
                        alt={p.cover.alt}
                        fill
                        sizes="(min-width: 640px) 33vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-display text-lg font-semibold transition-colors group-hover:text-accent">
                      {p.name}
                    </h3>
                    <p className="mt-2 text-sm text-muted">{p.positioning}</p>
                    <p className="mt-2 text-sm text-muted">{p.detail}</p>
                    <p className="mt-3 font-mono text-xs text-muted">
                      {p.stack.join(" · ")}
                    </p>
                  </div>
                </Link>
              </Card>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* DEMONSTRATION TEASER — featured callout to the showcase */}
      <Section bordered>
        <SectionLabel>Demonstration</SectionLabel>
        <Reveal variant="blur">
          <Card className="mt-10 p-8 sm:p-10">
            <p className="max-w-4xl font-display text-2xl font-semibold leading-snug [text-wrap:normal] sm:text-[1.75rem]">
              A public, runnable offline-first sync engine: the code my client repos
              can&apos;t show.
            </p>
            <Link
              href="/demonstration"
              className="mt-6 inline-block text-sm text-accent underline underline-offset-4"
            >
              See the deep-dive →
            </Link>
          </Card>
        </Reveal>
      </Section>
    </Container>
  );
}
