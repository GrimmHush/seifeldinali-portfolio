import type { Metadata } from "next";
import { engineering } from "@/lib/projects";
import { Container, SectionLabel } from "@/components/ui";

export const metadata: Metadata = {
  title: "Engineering — inventory-ledger",
  description:
    "A public, runnable offline-first inventory sync engine: append-only movement log, conflict resolution, and a browser client you can take offline.",
};

export default function EngineeringPage() {
  return (
    <Container width="prose">
      <article className="py-24">
        <h1 className="font-serif text-5xl font-semibold tracking-tight">
          {engineering.name}
        </h1>
        <p className="mt-4 text-lg text-muted">{engineering.intro}</p>

        {/* LEAD WITH THE LIVE DEMO (standalone-deployed browser client) — wired in M5 */}
        <div className="mt-10 rounded border border-dashed border-border px-4 py-8 text-center text-sm text-muted">
          [Live demo — toggle offline, queue movements, watch conflict resolution · M5]
        </div>

        <div className="mt-12 space-y-12">
          <section>
            <SectionLabel>How it works</SectionLabel>
            <p className="mt-4">{engineering.architectureSummary}</p>
          </section>

          <section>
            <SectionLabel>Conflicts &amp; overdraw</SectionLabel>
            <p className="mt-4">{engineering.conflictNote}</p>
          </section>

          <section>
            <SectionLabel>Known trade-offs</SectionLabel>
            <p className="mt-4">{engineering.tradeOffs}</p>
          </section>
        </div>

        <a
          href={engineering.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-12 inline-block text-sm text-accent underline"
        >
          Read the code on GitHub ↗
        </a>
      </article>
    </Container>
  );
}
