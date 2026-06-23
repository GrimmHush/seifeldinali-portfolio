"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui";
import { deepProjects, compactProjects } from "@/lib/projects";

// The dropdown is split into two groups, mirroring the landing-page sections:
// the four deep case studies, then the three compact link-outs.
const projectGroups = [
  { label: "Selected work", items: deepProjects },
  { label: "Also shipped", items: compactProjects },
].map((g) => ({
  label: g.label,
  items: g.items.map((p) => ({ slug: p.slug, name: p.name })),
}));

// Links that sit after the Projects dropdown.
const trailingLinks = [
  { href: "/demonstration", label: "Demonstration" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  // Home is redundant on the landing page; the wordmark already links there.
  const onHome = pathname === "/";

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // The bar gains a frosted fill + hairline once the page scrolls under it.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the Projects menu on outside pointer / Escape.
  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: PointerEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const onProjects = pathname.startsWith("/work");

  return (
    <header className="sticky top-0 z-40">
      {/* Frosted backdrop on its own layer — keeping backdrop-filter off the
          <header> itself so the dropdown (a descendant) can still blur the page
          behind it rather than being trapped inside the header's filter. */}
      <div
        aria-hidden
        className={`absolute inset-0 border-b transition-colors duration-300 ${
          scrolled
            ? "border-border bg-surface backdrop-blur-md backdrop-saturate-150"
            : "border-transparent"
        }`}
      />
      <Container className="relative flex items-center justify-between py-5">
        <Link
          href="/"
          className="font-display text-lg font-bold tracking-tight transition-colors hover:text-accent"
        >
          Seifeldin Ali
        </Link>
        <nav className="flex items-center gap-6 text-sm text-muted">
          {!onHome && (
            <NavLink href="/" label="Home" active={false} />
          )}
          <NavLink href="/about" label="About" active={pathname === "/about"} />

          <div ref={dropdownRef} className="relative">
            <button
              type="button"
              aria-haspopup="menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className={`flex items-center gap-1 transition-colors hover:text-foreground ${
                onProjects ? "text-foreground" : ""
              }`}
            >
              Projects
              <svg
                aria-hidden="true"
                viewBox="0 0 12 12"
                className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M3 4.5 6 7.5 9 4.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <AnimatePresence>
              {open && (
                <motion.div
                  role="menu"
                  initial={reduce ? false : { opacity: 0, y: -6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={reduce ? undefined : { opacity: 0, y: -6, scale: 0.98 }}
                  transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute right-0 top-full z-50 mt-7 w-60 rounded-xl border border-border bg-surface p-2 shadow-2xl backdrop-blur-md backdrop-saturate-150"
                >
                  {projectGroups.map((group, i) => (
                    <div
                      key={group.label}
                      className={i > 0 ? "mt-2 border-t border-border pt-2" : ""}
                    >
                      <p className="px-3 py-1.5 font-display text-xs font-bold uppercase tracking-[0.12em] text-muted">
                        {group.label}
                      </p>
                      <ul className="flex flex-col">
                        {group.items.map((p) => (
                          <li key={p.slug}>
                            <Link
                              href={`/work/${p.slug}`}
                              role="menuitem"
                              onClick={() => setOpen(false)}
                              className="block rounded-lg px-3 py-2 transition-colors hover:bg-surface-elevated hover:text-accent"
                            >
                              {p.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {trailingLinks.map((l) => (
            <NavLink key={l.href} href={l.href} label={l.label} active={pathname === l.href} />
          ))}
        </nav>
      </Container>
    </header>
  );
}

// A nav link with a quiet accent underline when it's the active route.
function NavLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`relative transition-colors hover:text-foreground ${
        active ? "text-foreground" : ""
      }`}
    >
      {label}
      {active && (
        <span aria-hidden className="absolute -bottom-1.5 left-0 h-px w-full bg-accent" />
      )}
    </Link>
  );
}
