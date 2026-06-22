import type { Metadata } from "next";
import { engineering } from "@/lib/projects";
import { Container, SpecRow } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { LiveDemo } from "@/components/LiveDemo";

export const metadata: Metadata = {
  title: "Demonstration — inventory-ledger",
  description:
    "A public, runnable offline-first inventory sync engine: append-only movement log, conflict resolution, and a browser client you can take offline.",
};

export default function DemonstrationPage() {
  return (
    <Container width="prose">
      <article className="py-24">
        <Reveal as="section" on="load">
          <header>
            <p className="font-mono text-sm uppercase tracking-widest text-muted">
              Demonstration · public artifact
            </p>
            <h1 className="mt-4 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
              {engineering.name}
            </h1>
            <p className="mt-5 max-w-2xl text-xl leading-snug">{engineering.intro}</p>
          </header>
        </Reveal>

        {/* LEAD WITH THE LIVE DEMO (standalone-deployed browser client) */}
        <div className="mt-10">
          <LiveDemo />
        </div>

        <hr className="mt-12 border-border" />

        <div className="mt-12 space-y-14">
          <Reveal>
            <SpecRow label="How it works">
              <p className="leading-relaxed">{engineering.architectureSummary}</p>
            </SpecRow>
          </Reveal>

          <Reveal>
            <SpecRow label="Conflicts & overdraw">
              <p className="leading-relaxed">{engineering.conflictNote}</p>
            </SpecRow>
          </Reveal>

          <Reveal>
            <SpecRow label="Trade-offs">
              <p className="leading-relaxed">{engineering.tradeOffs}</p>
            </SpecRow>
          </Reveal>
        </div>

        <a
          href={engineering.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-14 inline-block text-sm text-accent underline underline-offset-4"
        >
          Read the code on GitHub ↗
        </a>
      </article>
    </Container>
  );
}
