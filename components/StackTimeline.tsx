import { stackTimeline } from "@/lib/projects";
import { Chip } from "@/components/ui";

// The site's signature element: the deliberate 2020 → 2026 stack evolution.
// The axis line transitions muted → accent, so the accent reads as "the
// evolution converges on the present." Scroll-reveal animation lands in M4.
export function StackTimeline() {
  return (
    <div>
      {/* Horizontal axis — the chronology made visual. Desktop only; on mobile
          the per-era period labels carry the order. */}
      <div
        className="mb-10 hidden items-center gap-4 sm:flex"
        aria-hidden="true"
      >
        <span className="font-mono text-sm text-muted">2020</span>
        <span className="h-px flex-1 bg-gradient-to-r from-border to-accent" />
        <span className="text-accent">→</span>
        <span className="font-mono text-sm font-medium text-accent">2026</span>
      </div>

      <ol className="grid gap-10 sm:grid-cols-2">
        {stackTimeline.map((era, i) => {
          const isPresent = i === stackTimeline.length - 1;
          return (
            <li key={era.title}>
              <p
                className={`font-mono text-sm ${
                  isPresent ? "font-medium text-accent" : "text-muted"
                }`}
              >
                {era.period}
              </p>
              <h3 className="mt-2 font-serif text-2xl font-semibold">{era.title}</h3>
              <p className="mt-2 text-muted">{era.summary}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {era.stack.map((tech) => (
                  <Chip key={tech}>{tech}</Chip>
                ))}
              </ul>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
