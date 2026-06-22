"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";

// The business-operations through-line: every project plugs into a real
// operational domain. Rendered as a structural eyebrow under the headline.
const opsThread = ["CRM", "ERP", "POS", "Payments", "Logistics"];

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

export function Hero() {
  const reduce = useReducedMotion();
  // With reduced motion, skip orchestration entirely — render the final state.
  const motionProps = reduce
    ? {}
    : { variants: container, initial: "hidden" as const, animate: "show" as const };
  const itemVariants = reduce ? undefined : item;

  return (
    <motion.section className="py-24 sm:py-32" {...motionProps}>
      <motion.h1
        data-reveal
        variants={itemVariants}
        className="max-w-4xl font-serif text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
      >
        Production generalist. I build the whole system — front end to ops.
      </motion.h1>
      <motion.p
        data-reveal
        variants={itemVariants}
        className="mt-8 max-w-xl text-lg text-muted"
      >
        Co-founder of Iano. Seven shipped products, each wired into a real business
        process.
      </motion.p>
      <motion.ul
        data-reveal
        variants={itemVariants}
        className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs uppercase tracking-widest text-muted"
      >
        {opsThread.map((domain, i) => (
          <li key={domain} className="flex items-center gap-3">
            {i > 0 && <span className="text-accent">·</span>}
            {domain}
          </li>
        ))}
      </motion.ul>
    </motion.section>
  );
}
