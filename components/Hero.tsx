"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { Magnetic } from "@/components/Magnetic";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

// Pass-through wrapper: propagates "show" to motion children and keeps the
// stagger cascading through nested groups.
const group: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

// The thesis, split into three statements that each glow on hover.
const statements = ["Engineer.", "Founder.", "Problem Solver."];

// Inline CTA links share one treatment so the call-to-action reads as a
// continuous sentence rather than buttons.
const linkClass =
  "text-accent underline underline-offset-4 transition-opacity hover:opacity-70";

export function Hero() {
  const reduce = useReducedMotion();
  // With reduced motion, skip orchestration entirely — render the final state.
  const motionProps = reduce
    ? {}
    : { variants: container, initial: "hidden" as const, animate: "show" as const };
  const v = reduce ? undefined : item;
  const g = reduce ? undefined : group;

  return (
    <motion.section className="flex flex-col py-24 sm:py-32" {...motionProps}>
      {/* THESIS — three statements, centered, side by side, each glowing
          white on hover. */}
      <motion.h1
        variants={g}
        className="flex flex-wrap justify-center gap-x-8 gap-y-1 text-center font-display text-hero font-semibold"
      >
        {statements.map((s) => (
          <motion.span
            key={s}
            data-reveal
            variants={v}
            className="cursor-default transition-all duration-300 hover:[text-shadow:0_0_34px_rgba(255,255,255,0.75)]"
          >
            {s}
          </motion.span>
        ))}
      </motion.h1>

      {/* EYEBROW */}
      <motion.p
        data-reveal
        variants={v}
        className="mt-12 flex items-center gap-3 font-display text-sm font-bold uppercase tracking-[0.15em] text-muted"
      >
        <span aria-hidden className="h-0.5 w-7 bg-accent" />
        Welcome. I&apos;m Saif.
      </motion.p>

      {/* PORTRAIT + INTRO — the headline is lifted out, so the text column now
          matches the portrait's height. */}
      <motion.div
        variants={g}
        className="mt-12 grid items-center gap-10 lg:grid-cols-[1fr_minmax(0,20rem)] lg:gap-16"
      >
        {/* INTRO — first-person copy + CTAs. */}
        <motion.div variants={g} className="flex flex-col">
          <motion.p
            data-reveal
            variants={v}
            className="max-w-xl text-lg leading-relaxed text-muted"
          >
            I specialize in full-stack engineering, bringing a disciplined approach to
            developing powerful, high-performing web platforms. I thrive on translating
            complex business requirements into seamless, scalable digital solutions.
          </motion.p>
          <motion.p
            data-reveal
            variants={v}
            className="mt-4 max-w-xl text-lg leading-relaxed text-muted"
          >
            Currently, I am the Co-founder of Iano. My portfolio includes seven fully
            shipped products, each deeply integrated into real-world business workflows to
            optimize and streamline operations.
          </motion.p>

          <motion.p data-reveal variants={v} className="mt-8 text-muted">
            Explore my{" "}
            <Link href="/about" className={linkClass}>
              background
            </Link>{" "}
            and{" "}
            <Link href="#work" className={linkClass}>
              selected work
            </Link>
            .
          </motion.p>

          <motion.div
            data-reveal
            variants={v}
            className="mt-6 flex flex-wrap items-center gap-3"
          >
            <Magnetic>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-contrast transition-shadow hover:glow-accent"
              >
                Let&apos;s talk →
              </Link>
            </Magnetic>
            <Magnetic>
              <a
                href="/Seifeldin_Ali_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="glass inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors hover:text-accent"
              >
                Résumé ↗
              </a>
            </Magnetic>
          </motion.div>

          <motion.p
            data-reveal
            variants={v}
            aria-label="- Saif"
            className="mt-auto pt-8 font-signature text-3xl leading-none text-foreground"
          >
            - Saif
          </motion.p>
        </motion.div>

        {/* PORTRAIT — sits to the right of the text on desktop; natural 4/5
            aspect, kept crisp (no upscaling). */}
        <motion.div
          data-reveal
          variants={v}
          className="glass glow-accent relative aspect-4/5 w-full max-w-xs overflow-hidden rounded-2xl p-1.5 lg:max-w-none"
        >
          <Image
            src="/portrait.jpeg"
            alt="Seifeldin Ali"
            fill
            priority
            quality={90}
            sizes="(min-width: 1024px) 20rem, 100vw"
            className="rounded-xl object-cover"
          />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
