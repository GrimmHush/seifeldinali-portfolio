"use client";

import { motion, useReducedMotion } from "motion/react";
import { stackTimeline } from "@/lib/projects";
import { Chip } from "@/components/ui";

// The site's signature element: the deliberate 2020 → 2026 stack evolution.
// The axis line transitions muted → accent, so the accent reads as "the
// evolution converges on the present." On scroll-in, the line draws left→right
// and the eras stagger in beneath it.
const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function StackTimeline() {
  const reduce = useReducedMotion();

  return (
    <ol className="grid gap-10 sm:grid-cols-2">
        {stackTimeline.map((era, i) => {
          const isPresent = i === stackTimeline.length - 1;
          return (
            <motion.li
              key={era.title}
              data-reveal
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, ease, delay: reduce ? 0 : 0.2 + i * 0.12 }}
            >
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
            </motion.li>
          );
        })}
    </ol>
  );
}
