// Layout primitives — the design system's reusable shells.
// Pages compose these instead of repeating utility strings.
import type { ReactNode } from "react";
import { Spotlight } from "@/components/Spotlight";

type ContainerProps = {
  children: ReactNode;
  /** "default" centres on max-w-5xl; "prose" narrows to max-w-3xl for reading;
   *  "wide" opens to max-w-6xl for the work grid. */
  width?: "default" | "prose" | "wide";
  className?: string;
};

export function Container({ children, width = "default", className = "" }: ContainerProps) {
  const max =
    width === "prose" ? "max-w-3xl" : width === "wide" ? "max-w-6xl" : "max-w-5xl";
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
      className={`${bordered ? "border-t border-border " : ""}py-20 ${className}`}
    >
      {children}
    </section>
  );
}

/** The display eyebrow that titles every section, led by an accent tick. */
export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <h2 className="flex items-center gap-3 font-display text-base font-bold uppercase tracking-[0.12em] text-foreground">
      <span aria-hidden className="h-0.5 w-7 bg-accent" />
      {children}
    </h2>
  );
}

/**
 * A spec-sheet row: mono label in a fixed left gutter, content on the right;
 * stacks on mobile. Gives reading pages a technical-datasheet rhythm.
 */
export function SpecRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <section className="grid gap-x-8 gap-y-3 sm:grid-cols-[7rem_1fr]">
      <h2 className="font-display text-sm font-bold uppercase tracking-[0.12em] text-muted sm:pt-1">
        {label}
      </h2>
      <div>{children}</div>
    </section>
  );
}

/** A single tag in a stack/tech row — a glass pill. Renders as an <li>. */
export function Chip({ children }: { children: ReactNode }) {
  return (
    <li className="glass rounded-full px-3 py-1 text-sm text-muted">{children}</li>
  );
}

/**
 * The dimensional surface — a rounded glass panel with the cursor-tracked
 * spotlight and a hover lift. The shell for work cards and framed callouts.
 */
export function Card({
  children,
  className = "",
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  return (
    <Spotlight
      as={as}
      className={`glass rounded-2xl transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:glow-accent ${className}`}
    >
      {children}
    </Spotlight>
  );
}
