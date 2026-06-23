import { ImageResponse } from "next/og";

// Build-time favicon: a single bold "S" monogram in the indigo accent on ink,
// matching the dark-dimensional palette. Legible down to 16px in a browser tab.
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#08080b",
          color: "#7c83ff",
          fontSize: 24,
          fontWeight: 800,
          borderRadius: 7,
        }}
      >
        S
      </div>
    ),
    { ...size },
  );
}
