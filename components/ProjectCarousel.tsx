"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { ProjectImage } from "@/lib/projects";

// One image viewer for a project: starts on the cover, pages through the rest
// with left/right arrows (and ←/→ keys). Clicking the image opens a full-
// resolution lightbox over a dimmed backdrop (Escape / backdrop / ✕ to close).
// Images show with object-contain so screenshots are never cropped. The slide
// crossfade and zoom animation are dropped under prefers-reduced-motion.
export function ProjectCarousel({ images }: { images: ProjectImage[] }) {
  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState(false);
  const reduce = useReducedMotion();
  const count = images.length;

  const go = useCallback(
    (dir: number) => setIndex((i) => (i + dir + count) % count),
    [count],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "Escape") setZoom(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [go]);

  useEffect(() => {
    if (!zoom) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [zoom]);

  const current = images[index];

  const controls = count > 1 && (
    <>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          go(-1);
        }}
        aria-label="Previous image"
        className="absolute left-3 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-border bg-background/80 text-lg text-muted backdrop-blur transition-colors hover:border-accent hover:text-accent"
      >
        ‹
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          go(1);
        }}
        aria-label="Next image"
        className="absolute right-3 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-border bg-background/80 text-lg text-muted backdrop-blur transition-colors hover:border-accent hover:text-accent"
      >
        ›
      </button>
      <div className="absolute bottom-3 right-3 z-10 rounded border border-border bg-background/80 px-2 py-1 font-mono text-xs text-muted backdrop-blur">
        {index + 1} / {count}
      </div>
    </>
  );

  return (
    <div>
      <div className="relative aspect-[16/9] overflow-hidden border border-border bg-background">
        <AnimatePresence mode="wait" initial={false}>
          <motion.button
            key={current.src}
            type="button"
            onClick={() => setZoom(true)}
            aria-label={`View full size: ${current.alt}`}
            className="absolute inset-0 h-full w-full cursor-zoom-in"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <Image
              src={current.src}
              alt={current.alt}
              fill
              sizes="48rem"
              className="object-contain"
              priority={index === 0}
            />
          </motion.button>
        </AnimatePresence>
        {controls}
      </div>

      {current.caption && <p className="mt-2 text-sm text-muted">{current.caption}</p>}

      <AnimatePresence>
        {zoom && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={current.alt}
            onClick={() => setZoom(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 p-4 backdrop-blur-sm sm:p-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="relative h-full w-full"
              onClick={(e) => e.stopPropagation()}
              initial={reduce ? false : { scale: 0.96 }}
              animate={{ scale: 1 }}
              exit={reduce ? undefined : { scale: 0.96 }}
              transition={{ duration: 0.2 }}
            >
              <Image
                src={current.src}
                alt={current.alt}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
              {controls}
            </motion.div>
            <button
              type="button"
              onClick={() => setZoom(false)}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 rounded border border-border bg-background/80 px-3 py-1 font-mono text-xs text-muted"
            >
              Esc ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
