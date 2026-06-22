import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Engineering — inventory-ledger",
  description:
    "A public, runnable offline-first inventory sync engine: append-only movement log, conflict resolution, and a browser client you can take offline.",
};

export default function EngineeringPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="text-4xl font-semibold tracking-tight">inventory-ledger</h1>
      <p className="mt-4 text-lg opacity-70">
        The general reviewer showcase — shown, not just linked. Client repos are private;
        this one is public so the engineering is legible.
      </p>

      {/* LEAD WITH THE LIVE DEMO (standalone-deployed browser client) */}
      <div className="mt-10 opacity-50">
        [Live demo — toggle offline, queue movements, watch conflict resolution]
      </div>

      {/* Architecture summary in plain language so the signal lands without a click */}
      <div className="mt-10 opacity-50">
        [Architecture: append-only movement log as source of truth (stock derived, never
        stored); three-layer overdraw proof]
      </div>

      <a
        href="https://github.com/GrimmHush/inventory-ledger"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-block text-sm underline"
      >
        Read the code on GitHub ↗
      </a>
    </article>
  );
}
