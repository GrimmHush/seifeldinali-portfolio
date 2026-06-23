"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";

// Shared entrance primitive. Animates opacity + transform (+ an optional blur)
// only — GPU-friendly, no layout shift. Honours prefers-reduced-motion by
// rendering a plain element. Content is in the SSR'd HTML either way; this only
// transitions its appearance.

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const tags = {
  div: motion.div,
  li: motion.li,
  section: motion.section,
} as const;

// Entrance flavours. "rise" is the original; "blur" adds a focus-in for headers;
// "scale" suits framed media that should settle into place.
const variants: Record<string, Variants> = {
  rise: {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0 },
  },
  blur: {
    hidden: { opacity: 0, y: 18, filter: "blur(8px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)" },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.97, y: 12 },
    show: { opacity: 1, scale: 1, y: 0 },
  },
};

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Element to render. */
  as?: keyof typeof tags;
  /** Stagger offset, seconds. */
  delay?: number;
  /** "view" reveals on scroll-in (default); "load" plays once on mount. */
  on?: "view" | "load";
  /** Entrance flavour. */
  variant?: keyof typeof variants;
};

export function Reveal({
  children,
  className,
  as = "div",
  delay = 0,
  on = "view",
  variant = "rise",
}: RevealProps) {
  const reduce = useReducedMotion();
  const Tag = tags[as];

  if (reduce) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  const v = variants[variant];
  const animateProps =
    on === "load"
      ? { animate: "show" as const }
      : {
          whileInView: "show" as const,
          viewport: { once: true, amount: 0.2 },
        };

  return (
    <Tag
      data-reveal
      className={className}
      variants={v}
      initial="hidden"
      transition={{ duration: 0.6, ease, delay }}
      {...animateProps}
    >
      {children}
    </Tag>
  );
}
