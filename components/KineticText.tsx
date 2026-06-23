"use client";

import { Fragment } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";

// Word-by-word kinetic heading. The full string is always in the DOM (each word
// is a real text node inside a span), so it's fully readable by assistive tech
// and degrades visible without JS — the words carry data-reveal, which the
// layout's <noscript> rule forces to their final state. Under reduced motion it
// renders a plain element. Animates opacity + y + blur only.

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const container = (stagger: number, delay: number): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

const word: Variants = {
  hidden: { opacity: 0, y: "0.5em", filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease } },
};

type KineticTextProps = {
  /** The heading text. Split on spaces into animated words. */
  text: string;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  /** Per-word stagger, seconds. */
  stagger?: number;
  /** Delay before the first word, seconds. */
  delay?: number;
  /** "load" plays on mount (heroes); "view" on scroll-in (section headers). */
  on?: "load" | "view";
};

export function KineticText({
  text,
  as = "h2",
  className,
  stagger = 0.06,
  delay = 0.05,
  on = "load",
}: KineticTextProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  if (reduce) {
    const Plain = as;
    return <Plain className={className}>{text}</Plain>;
  }

  const words = text.split(" ");
  const play =
    on === "load"
      ? { animate: "show" as const }
      : { whileInView: "show" as const, viewport: { once: true, amount: 0.5 } };

  return (
    <MotionTag
      className={className}
      variants={container(stagger, delay)}
      initial="hidden"
      {...play}
    >
      {words.map((w, i) => (
        <Fragment key={i}>
          <motion.span
            data-reveal
            variants={word}
            style={{ display: "inline-block", willChange: "transform" }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </MotionTag>
  );
}
