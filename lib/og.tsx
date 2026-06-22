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
        background: "#0a0a0a",
        color: "#ededed",
        padding: 80,
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <div style={{ width: 44, height: 6, background: "#3b82f6" }} />
        <div
          style={{
            fontSize: 24,
            letterSpacing: 5,
            color: "#94a3b8",
            textTransform: "uppercase",
          }}
        >
          seifeldinali.com
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 78, fontWeight: 600, lineHeight: 1.05, letterSpacing: -2 }}>
          {title}
        </div>
        <div style={{ fontSize: 32, color: "#94a3b8", marginTop: 28, maxWidth: 960 }}>
          {subtitle}
        </div>
      </div>

      <div style={{ fontSize: 24, color: "#94a3b8" }}>{footer}</div>
    </div>
  );
}
