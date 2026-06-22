import { ImageResponse } from "next/og";
import { OgFrame, OG_SIZE } from "@/lib/og";
import { deepProjects, getDeepProject } from "@/lib/projects";

export const alt = "Case study — Seifeldin Ali";
export const size = OG_SIZE;
export const contentType = "image/png";

// Prerender one image per known case study.
export function generateStaticParams() {
  return deepProjects.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getDeepProject(slug);

  return new ImageResponse(
    (
      <OgFrame
        title={project?.name ?? "Case study"}
        subtitle={project?.positioning ?? ""}
        footer={project ? `${project.client} · ${project.year}` : ""}
      />
    ),
    { ...size },
  );
}
