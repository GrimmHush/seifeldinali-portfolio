import type { Metadata } from "next";
import { engineering } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Engineering — inventory-ledger",
  description:
    "A public, runnable offline-first inventory sync engine: append-only movement log, conflict resolution, and a browser client you can take offline.",
};

export default function EngineeringPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="text-4xl font-semibold tracking-tight">{engineering.name}</h1>
      <p className="mt-4 text-lg opacity-70">{engineering.intro}</p>

      {/* LEAD WITH THE LIVE DEMO (standalone-deployed browser client) — wired in M5 */}
      <div className="mt-10 opacity-50">
        [Live demo — toggle offline, queue movements, watch conflict resolution · M5]
      </div>

      <div className="mt-12 space-y-12">
        <section>
          <h2 className="text-sm font-mono uppercase tracking-widest opacity-50">
            How it works
          </h2>
          <p className="mt-4 opacity-80">{engineering.architectureSummary}</p>
        </section>

        <section>
          <h2 className="text-sm font-mono uppercase tracking-widest opacity-50">
            Conflicts &amp; overdraw
          </h2>
          <p className="mt-4 opacity-80">{engineering.conflictNote}</p>
        </section>

        <section>
          <h2 className="text-sm font-mono uppercase tracking-widest opacity-50">
            Known trade-offs
          </h2>
          <p className="mt-4 opacity-80">{engineering.tradeOffs}</p>
        </section>
      </div>

      <a
        href={engineering.repoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-12 inline-block text-sm underline"
      >
        Read the code on GitHub ↗
      </a>
    </article>
  );
}
