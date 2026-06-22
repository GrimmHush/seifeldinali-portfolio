import Link from "next/link";
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

      <div className="mt-16 space-y-12">
        <section>
          <h2 className="text-sm font-mono uppercase tracking-widest opacity-50">
            Summary
          </h2>
          <p className="mt-4 opacity-80">{project.summary}</p>
        </section>

        <section>
          <h2 className="text-sm font-mono uppercase tracking-widest opacity-50">
            Context
          </h2>
          <p className="mt-4 opacity-80">{project.context}</p>
        </section>

        <section>
          <h2 className="text-sm font-mono uppercase tracking-widest opacity-50">
            Role &amp; team
          </h2>
          <p className="mt-4 opacity-80">{project.roleTeam}</p>
        </section>

        <section>
          <h2 className="text-sm font-mono uppercase tracking-widest opacity-50">
            Stack
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="rounded border border-black/10 px-2 py-1 text-sm dark:border-white/10"
              >
                {tech}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-sm font-mono uppercase tracking-widest opacity-50">
            Key decisions
          </h2>
          <ul className="mt-4 space-y-4">
            {project.keyDecisions.map((decision) => (
              <li key={decision} className="opacity-80">
                {decision}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-sm font-mono uppercase tracking-widest opacity-50">
            Architecture
          </h2>
          <p className="mt-4 opacity-80">{project.architecture}</p>
        </section>

        <section>
          <h2 className="text-sm font-mono uppercase tracking-widest opacity-50">
            Challenges
          </h2>
          <ul className="mt-4 space-y-4">
            {project.challenges.map((challenge) => (
              <li key={challenge.body} className="opacity-80">
                {challenge.heading && (
                  <span className="font-semibold">{challenge.heading}: </span>
                )}
                {challenge.body}
              </li>
            ))}
          </ul>
        </section>

        {project.crossLinkEngineering && (
          <section className="border-t border-black/10 pt-8 dark:border-white/10">
            <p className="opacity-80">
              The offline-sync engineering behind this POS is demonstrated in a public,
              runnable proof-of-concept.
            </p>
            <Link href="/engineering" className="mt-2 inline-block text-sm underline">
              See the inventory-ledger deep-dive →
            </Link>
          </section>
        )}
      </div>
    </article>
  );
}
