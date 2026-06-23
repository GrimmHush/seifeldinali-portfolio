import { ImageResponse } from "next/og";
import { OgFrame, OG_SIZE } from "@/lib/og";

// Site-wide OG image; inherited by any route without its own.
export const alt = "Seifeldin Ali: production generalist and full-stack engineer";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <OgFrame
        title="Seifeldin Ali"
        subtitle="Production generalist. I build the whole system, front end to ops."
        footer="Co-founder of Iano"
      />
    ),
    { ...size },
  );
}
