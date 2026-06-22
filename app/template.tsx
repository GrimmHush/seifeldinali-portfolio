"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

// A template re-mounts on every navigation, so this gives each route a subtle
// fade-in. Opacity only — no transform — so it doesn't compete with the hero's
// staggered entrance or shift layout. Reduced motion renders it inert.
export default function Template({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;

  return (
    <motion.div
      data-reveal
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
