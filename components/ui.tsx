// Layout primitives — the design system's reusable shells.
// Pages compose these instead of repeating utility strings.
import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  /** "default" centres on max-w-5xl; "prose" narrows to max-w-3xl for reading. */
  width?: "default" | "prose";
  className?: string;
};

export function Container({ children, width = "default", className = "" }: ContainerProps) {
  const max = width === "prose" ? "max-w-3xl" : "max-w-5xl";
  return <div className={`mx-auto ${max} px-6 ${className}`}>{children}</div>;
}

type SectionProps = {
  children: ReactNode;
  /** Adds the hairline top divider that separates landing sections. */
  bordered?: boolean;
  id?: string;
  className?: string;
};

export function Section({ children, bordered = false, id, className = "" }: SectionProps) {
  return (
    <section
      id={id}
      className={`${bordered ? "border-t border-border " : ""}py-16 ${className}`}
    >
      {children}
    </section>
  );
}

/** The small mono eyebrow that titles every section. */
export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-mono text-xs uppercase tracking-widest text-muted">{children}</h2>
  );
}

/**
 * A spec-sheet row: mono label in a fixed left gutter, content on the right;
 * stacks on mobile. Gives reading pages a technical-datasheet rhythm.
 */
export function SpecRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <section className="grid gap-x-8 gap-y-3 sm:grid-cols-[7rem_1fr]">
      <h2 className="font-mono text-xs uppercase tracking-widest text-muted sm:pt-1">
        {label}
      </h2>
      <div>{children}</div>
    </section>
  );
}

/** A single tag in a stack/tech row. Renders as an <li>; wrap in a flex <ul>. */
export function Chip({ children }: { children: ReactNode }) {
  return (
    <li className="rounded border border-border px-2 py-1 text-sm text-muted">
      {children}
    </li>
  );
}
