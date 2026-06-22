"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
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

export function Nav() {
  const pathname = usePathname();
  // Home is redundant on the landing page; the wordmark already links there.
  const onHome = pathname === "/";

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  return (
    <header className="border-b border-border">
      <Container className="flex items-center justify-between py-5">
        <Link href="/" className="font-mono text-sm font-semibold tracking-tight">
          Seifeldin Ali
        </Link>
        <nav className="flex items-center gap-6 text-sm text-muted">
          {!onHome && (
            <Link href="/" className="transition-colors hover:text-foreground">
              Home
            </Link>
          )}
          <Link href="/about" className="transition-colors hover:text-foreground">
            About
          </Link>

          <div ref={dropdownRef} className="relative">
            <button
              type="button"
              aria-haspopup="menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="flex items-center gap-1 transition-colors hover:text-foreground"
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
            {open && (
              <div
                role="menu"
                className="absolute right-0 z-50 mt-3 w-56 rounded-md border border-border bg-background p-2 shadow-lg"
              >
                {projectGroups.map((group, i) => (
                  <div
                    key={group.label}
                    className={i > 0 ? "mt-2 border-t border-border pt-2" : ""}
                  >
                    <p className="px-3 py-1 font-mono text-xs uppercase tracking-widest text-muted">
                      {group.label}
                    </p>
                    <ul className="flex flex-col">
                      {group.items.map((p) => (
                        <li key={p.slug}>
                          <Link
                            href={`/work/${p.slug}`}
                            role="menuitem"
                            onClick={() => setOpen(false)}
                            className="block rounded px-3 py-2 transition-colors hover:bg-border hover:text-foreground"
                          >
                            {p.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/demonstration"
            className="transition-colors hover:text-foreground"
          >
            Demonstration
          </Link>
          <Link href="/contact" className="transition-colors hover:text-foreground">
            Contact
          </Link>
        </nav>
      </Container>
    </header>
  );
}
