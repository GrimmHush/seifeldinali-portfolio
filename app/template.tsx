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
      initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
