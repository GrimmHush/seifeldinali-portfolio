import type { ReactElement } from "react";

// Shared layout for generated Open Graph images (next/og / Satori).
// Note: Satori requires any element with multiple children to set display:flex.
export const OG_SIZE = { width: 1200, height: 630 } as const;

export function OgFrame({
  title,
  subtitle,
  footer,
}: {
  title: string;
  subtitle: string;
  footer: string;
}): ReactElement {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        // Ink base with a static "mesh" — Satori can't blur, so the glow is
        // approximated with soft radial gradients in the indigo/cyan accents.
        background: "#08080b",
        backgroundImage:
          "radial-gradient(55% 75% at 12% 8%, rgba(124,131,255,0.30), transparent 60%), radial-gradient(50% 70% at 92% 28%, rgba(52,224,232,0.20), transparent 60%)",
        color: "#ededf2",
        padding: 80,
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <div
          style={{
            width: 44,
            height: 6,
            borderRadius: 3,
            backgroundImage: "linear-gradient(90deg, #7c83ff, #34e0e8)",
          }}
        />
        <div
          style={{
            fontSize: 24,
            letterSpacing: 5,
            color: "#8a8aa3",
            textTransform: "uppercase",
          }}
        >
          seifeldinali.com
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 80, fontWeight: 700, lineHeight: 1.02, letterSpacing: -2.5 }}>
          {title}
        </div>
        <div style={{ fontSize: 32, color: "#8a8aa3", marginTop: 28, maxWidth: 960 }}>
          {subtitle}
        </div>
      </div>

      <div style={{ fontSize: 24, color: "#8a8aa3" }}>{footer}</div>
    </div>
  );
}
