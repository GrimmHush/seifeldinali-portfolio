import { engineering } from "@/lib/projects";

// Leads the /demonstration page. When a standalone deploy URL is configured the
// browser client is embedded live (toggle offline, queue movements, watch
// conflict resolution); until then a fallback card explains how to run it.
export function LiveDemo() {
  const { demoUrl, repoUrl } = engineering;

  if (!demoUrl) {
    return (
      <div className="glass flex min-h-40 flex-col items-center justify-center gap-2 rounded-2xl border-dashed px-6 py-10 text-center">
        <p className="text-sm text-muted">
          Live demo: toggle offline, queue movements, watch conflict resolution.
        </p>
        <p className="text-sm text-muted">
          Run it locally with{" "}
          <code className="font-mono text-xs text-foreground">npm run demo</code>, or{" "}
          <a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline underline-offset-4"
          >
            read the code ↗
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <figure>
      <div className="glass glow-accent overflow-hidden rounded-2xl p-1.5">
        <iframe
          src={demoUrl}
          title="inventory-ledger: live offline-first demo"
          loading="lazy"
          sandbox="allow-scripts allow-same-origin allow-forms"
          className="block h-[32rem] w-full rounded-xl"
        />
      </div>
      <figcaption className="mt-2 text-sm text-muted">
        Live offline-first client.{" "}
        <a
          href={demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent underline underline-offset-4"
        >
          Open in a new tab ↗
        </a>
      </figcaption>
    </figure>
  );
}
