import { ImageResponse } from "next/og";
import { OgFrame, OG_SIZE } from "@/lib/og";
import { deepProjects, compactProjects, getProject } from "@/lib/projects";

export const alt = "Case study by Seifeldin Ali";
export const size = OG_SIZE;
export const contentType = "image/png";

// Prerender one image per known case study (deep + compact).
export function generateStaticParams() {
  return [...deepProjects, ...compactProjects].map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const resolved = getProject(slug);
  const footer =
    resolved?.kind === "deep"
      ? `${resolved.project.client} · ${resolved.project.year}`
      : "Also shipped";

  return new ImageResponse(
    (
      <OgFrame
        title={resolved?.project.name ?? "Case study"}
        subtitle={resolved?.project.positioning ?? ""}
        footer={resolved ? footer : ""}
      />
    ),
    { ...size },
  );
}
