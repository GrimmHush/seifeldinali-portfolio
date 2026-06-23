"use client";

import { useRef, type ElementType, type ReactNode } from "react";

// A glass surface with a soft radial highlight that follows the cursor. The
// pointer position is written straight to CSS custom properties (--mx/--my) on
// the element, so tracking causes no React re-render; the highlight itself is
// drawn by the `.spotlight::before` rule in globals.css and fades in on hover.
// Purely a hover affordance — it adds nothing for keyboard/touch users and
// needs no reduced-motion guard (it's an opacity fade, not movement).
type SpotlightProps = {
  children: ReactNode;
  className?: string;
  /** Element to render — defaults to a div; pass "li", "article", etc. */
  as?: ElementType;
};

export function Spotlight({ children, className = "", as: Tag = "div" }: SpotlightProps) {
  const ref = useRef<HTMLElement>(null);

  function onMove(e: React.MouseEvent<HTMLElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
  }

  return (
    <Tag ref={ref} onMouseMove={onMove} className={`spotlight ${className}`}>
      {children}
    </Tag>
  );
}
