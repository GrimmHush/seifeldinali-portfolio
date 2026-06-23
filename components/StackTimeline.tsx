"use client";

import { motion, useReducedMotion } from "motion/react";
import { stackTimeline } from "@/lib/projects";
import { Chip } from "@/components/ui";

// The site's signature: the deliberate 2020 → 2026 stack evolution, staged as a
// drawn axis. The line draws left → right on scroll-in and runs muted → accent,
// and the "present" (2026) node glows as the convergence point — the evolution
// resolving on now. Eras settle in beneath their node. Everything animates
// transform/opacity only and renders to its final state under reduced motion.
const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function StackTimeline() {
  const reduce = useReducedMotion();
  const last = stackTimeline.length - 1;

  return (
    <div className="relative">
      {/* AXIS — a hairline that draws in, with a node anchoring each era. */}
      <div
        aria-hidden
        className="relative mb-10 hidden h-px sm:block"
        style={{ background: "color-mix(in oklab, var(--border) 80%, transparent)" }}
      >
        <motion.div
          className="absolute inset-0 origin-left"
          style={{
            background: "linear-gradient(90deg, var(--muted), var(--accent))",
          }}
          initial={reduce ? false : { scaleX: 0 }}
          whileInView={reduce ? undefined : { scaleX: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.1, ease }}
        />
        {stackTimeline.map((era, i) => {
          const present = i === last;
          const left = `${(i / last) * 100}%`;
          return (
            <span
              key={era.title}
              className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ left }}
            >
              <span
                className={`relative block h-3 w-3 rounded-full ${
                  present ? "bg-accent glow-accent" : "bg-muted"
                }`}
              >
                {present && !reduce && (
                  <motion.span
                    className="absolute inset-0 rounded-full bg-accent"
                    initial={{ scale: 1, opacity: 0.5 }}
                    animate={{ scale: 2.4, opacity: 0 }}
                    transition={{ duration: 2, ease: "easeOut", repeat: Infinity }}
                  />
                )}
              </span>
            </span>
          );
        })}
      </div>

      {/* ERAS — one card per node; the present era carries the accent. */}
      <ol className="grid gap-6 sm:grid-cols-2">
        {stackTimeline.map((era, i) => {
          const present = i === last;
          return (
            <motion.li
              key={era.title}
              data-reveal
              className={`glass rounded-2xl p-6 ${present ? "glow-accent" : ""}`}
              initial={reduce ? false : { opacity: 0, y: 18 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease, delay: reduce ? 0 : 0.3 + i * 0.15 }}
            >
              <p
                className={`font-mono text-sm ${
                  present ? "font-medium text-accent" : "text-muted"
                }`}
              >
                {era.period}
              </p>
              <h3 className="mt-2 font-display text-title font-semibold">{era.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{era.summary}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {era.stack.map((tech) => (
                  <Chip key={tech}>{tech}</Chip>
                ))}
              </ul>
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}
