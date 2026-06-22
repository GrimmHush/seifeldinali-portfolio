import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { deepProjects, getDeepProject } from "@/lib/projects";
import { Container, SectionLabel, Chip } from "@/components/ui";

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
    <Container width="prose">
      <article className="py-24">
        <p className="font-mono text-sm uppercase tracking-widest text-muted">
          {project.client} · {project.year}
        </p>
        <h1 className="mt-4 font-serif text-5xl font-semibold tracking-tight">
          {project.name}
        </h1>
        <p className="mt-4 text-lg text-muted">{project.positioning}</p>
        <p className="mt-2 text-sm text-muted">{project.status}</p>

        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block text-sm text-accent underline"
        >
          Visit live site ↗
        </a>

        <div className="mt-16 space-y-12">
          <section>
            <SectionLabel>Summary</SectionLabel>
            <p className="mt-4">{project.summary}</p>
          </section>

          <section>
            <SectionLabel>Context</SectionLabel>
            <p className="mt-4">{project.context}</p>
          </section>

          <section>
            <SectionLabel>Role &amp; team</SectionLabel>
            <p className="mt-4">{project.roleTeam}</p>
          </section>

          <section>
            <SectionLabel>Stack</SectionLabel>
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <Chip key={tech}>{tech}</Chip>
              ))}
            </ul>
          </section>

          <section>
            <SectionLabel>Key decisions</SectionLabel>
            <ul className="mt-4 space-y-4">
              {project.keyDecisions.map((decision) => (
                <li key={decision}>{decision}</li>
              ))}
            </ul>
          </section>

          <section>
            <SectionLabel>Architecture</SectionLabel>
            <p className="mt-4">{project.architecture}</p>
          </section>

          <section>
            <SectionLabel>Challenges</SectionLabel>
            <ul className="mt-4 space-y-4">
              {project.challenges.map((challenge) => (
                <li key={challenge.body}>
                  {challenge.heading && (
                    <span className="font-semibold">{challenge.heading}: </span>
                  )}
                  {challenge.body}
                </li>
              ))}
            </ul>
          </section>

          {project.crossLinkEngineering && (
            <section className="border-t border-border pt-8">
              <p>
                The offline-sync engineering behind this POS is demonstrated in a public,
                runnable proof-of-concept.
              </p>
              <Link
                href="/engineering"
                className="mt-2 inline-block text-sm text-accent underline"
              >
                See the inventory-ledger deep-dive →
              </Link>
            </section>
          )}
        </div>
      </article>
    </Container>
  );
}
