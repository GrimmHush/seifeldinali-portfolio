import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { deepProjects, getDeepProject } from "@/lib/projects";

// Only the four known slugs are valid; anything else 404s.
export const dynamicParams = false;

export function generateStaticParams() {
  return deepProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getDeepProject(slug);
  if (!project) return {};
  return { title: project.name, description: project.positioning };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getDeepProject(slug);
  if (!project) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-24">
      <p className="font-mono text-sm uppercase tracking-widest opacity-50">
        {project.client} · {project.year}
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight">{project.name}</h1>
      <p className="mt-4 text-lg opacity-70">{project.positioning}</p>
      <p className="mt-2 text-sm opacity-50">{project.status}</p>

      <a
        href={project.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-block text-sm underline"
      >
        Visit live site ↗
      </a>

      {/* M1 fills: Summary · Context · Role & team · Stack · Key decisions ·
          Architecture · Challenges. Esto additionally cross-links to /engineering. */}
      <div className="mt-12 opacity-50">[Deep-dive body — populated in M1 from the case-study doc]</div>
    </article>
  );
}
