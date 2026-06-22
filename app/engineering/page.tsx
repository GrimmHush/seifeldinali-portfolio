import type { Metadata } from "next";
import { engineering } from "@/lib/projects";
import { Container, SpecRow } from "@/components/ui";

export const metadata: Metadata = {
  title: "Engineering — inventory-ledger",
  description:
    "A public, runnable offline-first inventory sync engine: append-only movement log, conflict resolution, and a browser client you can take offline.",
};

export default function EngineeringPage() {
  return (
    <Container width="prose">
      <article className="py-24">
        <header>
          <p className="font-mono text-sm uppercase tracking-widest text-muted">
            Engineering · public artifact
          </p>
          <h1 className="mt-4 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
            {engineering.name}
          </h1>
          <p className="mt-5 max-w-2xl text-xl leading-snug">{engineering.intro}</p>
        </header>

        {/* LEAD WITH THE LIVE DEMO (standalone-deployed browser client) — wired in M5 */}
        <div className="mt-10 flex min-h-40 items-center justify-center border border-dashed border-border px-4 text-center text-sm text-muted">
          Live demo — toggle offline, queue movements, watch conflict resolution
          <span className="ml-2 font-mono text-xs text-accent">· M5</span>
        </div>

        <hr className="mt-12 border-border" />

        <div className="mt-12 space-y-14">
          <SpecRow label="How it works">
            <p className="leading-relaxed">{engineering.architectureSummary}</p>
          </SpecRow>

          <SpecRow label="Conflicts & overdraw">
            <p className="leading-relaxed">{engineering.conflictNote}</p>
          </SpecRow>

          <SpecRow label="Trade-offs">
            <p className="leading-relaxed">{engineering.tradeOffs}</p>
          </SpecRow>
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
