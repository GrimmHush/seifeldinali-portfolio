import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF first (then WebP) — meaningfully smaller than the source PNGs,
    // which run up to ~2.7 MB. Next 16 requires any non-default `quality`
    // value to be listed here before a component may request it.
    formats: ["image/avif", "image/webp"],
    qualities: [75, 90],
  },
};

export default nextConfig;
