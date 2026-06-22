"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

// Shared entrance primitive. Animates opacity + translateY only (GPU-friendly,
// no layout shift). Honours prefers-reduced-motion by rendering a plain element.
// Content is in the SSR'd HTML either way — this only transitions its appearance.

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const tags = {
  div: motion.div,
  li: motion.li,
  section: motion.section,
} as const;

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Element to render. */
  as?: keyof typeof tags;
  /** Stagger offset, seconds. */
  delay?: number;
  /** "view" reveals on scroll-in (default); "load" plays once on mount. */
  on?: "view" | "load";
};

export function Reveal({
  children,
  className,
  as = "div",
  delay = 0,
  on = "view",
}: RevealProps) {
  const reduce = useReducedMotion();
  const Tag = tags[as];

  if (reduce) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  const animateProps =
    on === "load"
      ? { animate: { opacity: 1, y: 0 } }
      : {
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.2 },
        };

  return (
    <Tag
      data-reveal
      className={className}
      initial={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.55, ease, delay }}
      {...animateProps}
    >
      {children}
    </Tag>
  );
}
