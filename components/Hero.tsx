"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "motion/react";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

// Inline CTA links share the footer's link treatment so the call-to-action
// reads as one continuous sentence rather than buttons.
const linkClass =
  "text-accent underline underline-offset-4 transition-opacity hover:opacity-70";

export function Hero() {
  const reduce = useReducedMotion();
  // With reduced motion, skip orchestration entirely — render the final state.
  const motionProps = reduce
    ? {}
    : { variants: container, initial: "hidden" as const, animate: "show" as const };
  const itemVariants = reduce ? undefined : item;

  return (
    <motion.section
      className="grid items-center gap-10 py-24 sm:py-32 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-14"
      {...motionProps}
    >
      {/* PORTRAIT — leads on the left; stacks above the copy on mobile */}
      <motion.div
        data-reveal
        variants={itemVariants}
        className="relative aspect-[4/5] w-full max-w-xs overflow-hidden border border-border lg:max-w-none"
      >
        <Image
          src="/portrait.jpg"
          alt="Seifeldin Ali"
          fill
          priority
          sizes="(min-width: 1024px) 20rem, 100vw"
          className="object-cover"
        />
      </motion.div>

      {/* INTRO — first-person, with inline CTAs */}
      <div>
        <motion.p
          data-reveal
          variants={itemVariants}
          className="font-mono text-xs uppercase tracking-widest text-muted"
        >
          Welcome. I&apos;m Saif.
        </motion.p>
        <motion.h1
          data-reveal
          variants={itemVariants}
          className="mt-4 font-serif text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
        >
          Engineer. Founder. Problem Solver.
        </motion.h1>
        <motion.p
          data-reveal
          variants={itemVariants}
          className="mt-8 max-w-xl text-lg text-muted"
        >
          I specialize in full-stack engineering, bringing a disciplined approach to
          developing powerful, high-performing web platforms. I thrive on translating
          complex business requirements into seamless, scalable digital solutions.
        </motion.p>
        <motion.p
          data-reveal
          variants={itemVariants}
          className="mt-4 max-w-xl text-lg text-muted"
        >
          Currently, I am the Co-founder of Iano. My portfolio includes seven fully
          shipped products, each deeply integrated into real-world business workflows to
          optimize and streamline operations.
        </motion.p>
        <motion.p
          data-reveal
          variants={itemVariants}
          className="mt-8 text-lg"
        >
          Explore my{" "}
          <Link href="/about" className={linkClass}>
            background
          </Link>
          ,{" "}
          <Link href="/contact" className={linkClass}>
            contact me
          </Link>
          , or view my{" "}
          <a
            href="/Seifeldin_Ali_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            resume
          </a>
          .
        </motion.p>
        <motion.p
          data-reveal
          variants={itemVariants}
          className="mt-8 text-muted"
        >
          — Saif
        </motion.p>
      </div>
    </motion.section>
  );
}
