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
  // The mobile sheet — the whole nav collapses behind a toggle under `md`.
  const [mobileOpen, setMobileOpen] = useState(false);
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

  // Escape closes the mobile sheet too.
  useEffect(() => {
    if (!mobileOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);
  const onProjects = pathname.startsWith("/work");

  return (
    <header className="sticky top-0 z-40">
      {/* Frosted backdrop on its own layer — keeping backdrop-filter off the
          <header> itself so the dropdown (a descendant) can still blur the page
          behind it rather than being trapped inside the header's filter. The
          fill also turns on whenever the mobile sheet is open. */}
      <div
        aria-hidden
        className={`absolute inset-0 border-b transition-colors duration-300 ${
          scrolled || mobileOpen
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

        {/* DESKTOP NAV — inline row, collapses to the toggle below `md`. */}
        <nav className="hidden items-center gap-6 text-sm text-muted md:flex">
          {!onHome && <NavLink href="/" label="Home" active={false} />}
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

        {/* MOBILE TOGGLE — a burger that morphs to an X. */}
        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileOpen((v) => !v)}
          className="-mr-2 grid h-10 w-10 place-items-center text-foreground md:hidden"
        >
          <span aria-hidden className="relative block h-4 w-6">
            <span
              className={`absolute left-0 top-1 h-0.5 w-full rounded-full bg-current transition-transform duration-300 ${
                mobileOpen ? "translate-y-1.75 rotate-45" : ""
              }`}
            />
            <span
              className={`absolute bottom-1 left-0 h-0.5 w-full rounded-full bg-current transition-transform duration-300 ${
                mobileOpen ? "-translate-y-1.75 -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </Container>

      {/* MOBILE SHEET — the full nav, expanded. The Projects groups list inline
          rather than nesting a second dropdown, so everything is one tap away. */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            id="mobile-menu"
            key="mobile-menu"
            initial={reduce ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden border-b border-border bg-surface backdrop-blur-md backdrop-saturate-150 md:hidden"
          >
            <Container className="flex flex-col gap-1 py-4 text-sm">
              {!onHome && (
                <MobileLink href="/" label="Home" active={false} onSelect={closeMobile} />
              )}
              <MobileLink
                href="/about"
                label="About"
                active={pathname === "/about"}
                onSelect={closeMobile}
              />

              {projectGroups.map((group) => (
                <div key={group.label} className="mt-2 border-t border-border pt-3">
                  <p className="px-3 pb-1 font-display text-xs font-bold uppercase tracking-[0.12em] text-muted">
                    {group.label}
                  </p>
                  {group.items.map((p) => (
                    <MobileLink
                      key={p.slug}
                      href={`/work/${p.slug}`}
                      label={p.name}
                      active={pathname === `/work/${p.slug}`}
                      onSelect={closeMobile}
                    />
                  ))}
                </div>
              ))}

              <div className="mt-2 border-t border-border pt-3">
                {trailingLinks.map((l) => (
                  <MobileLink
                    key={l.href}
                    href={l.href}
                    label={l.label}
                    active={pathname === l.href}
                    onSelect={closeMobile}
                  />
                ))}
              </div>
            </Container>
          </motion.nav>
        )}
      </AnimatePresence>
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

// Full-width tap target for the mobile sheet — larger hit area than the inline row.
function MobileLink({
  href,
  label,
  active,
  onSelect,
}: {
  href: string;
  label: string;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onSelect}
      aria-current={active ? "page" : undefined}
      className={`block rounded-lg px-3 py-2.5 transition-colors hover:bg-surface-elevated hover:text-accent ${
        active ? "text-foreground" : "text-muted"
      }`}
    >
      {label}
    </Link>
  );
}
