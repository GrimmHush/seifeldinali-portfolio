import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  deepProjects,
  compactProjects,
  getProject,
  ROLE_TEAM,
  type DeepProject,
  type CompactProject,
  type ProjectImage,
} from "@/lib/projects";
import { Container, Chip, SpecRow } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { KineticText } from "@/components/KineticText";
import { ProjectCarousel } from "@/components/ProjectCarousel";

// Cover first, then gallery shots — one combined reel for the carousel.
function media(project: { cover?: ProjectImage; gallery?: ProjectImage[] }): ProjectImage[] {
  return [...(project.cover ? [project.cover] : []), ...(project.gallery ?? [])];
}

// Only known slugs (deep + compact) are valid; anything else 404s.
export const dynamicParams = false;

export function generateStaticParams() {
  return [...deepProjects, ...compactProjects].map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const resolved = getProject(slug);
  if (!resolved) return {};
  return {
    title: resolved.project.name,
    description: resolved.project.positioning,
    alternates: { canonical: `/work/${slug}` },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resolved = getProject(slug);
  if (!resolved) notFound();

  return (
    <Container width="prose">
      <article className="py-24">
        {resolved.kind === "deep" ? (
          <DeepCaseStudy project={resolved.project} />
        ) : (
          <CompactCaseStudy project={resolved.project} />
        )}
      </article>
    </Container>
  );
}

function DeepCaseStudy({ project }: { project: DeepProject }) {
  return (
    <>
      {/* CaseHero */}
      <Reveal as="section" on="load"><header>
        <p className="font-display text-sm font-bold uppercase tracking-[0.15em] text-muted">
          {project.client} · {project.year}
        </p>
        <KineticText
          as="h1"
          text={project.name}
          className="mt-4 font-display text-display font-semibold"
        />
        <p className="mt-5 max-w-2xl text-xl leading-snug">{project.positioning}</p>
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
          <p className="font-display text-xs font-bold uppercase tracking-[0.15em] text-muted">
            {project.status}
          </p>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-accent underline underline-offset-4"
          >
            Visit live site ↗
          </a>
        </div>
      </header></Reveal>

      <hr className="mt-12 border-border" />

      {media(project).length > 0 && (
        <Reveal className="mt-12">
          <ProjectCarousel images={media(project)} />
        </Reveal>
      )}

      <div className="mt-12 space-y-14">
        <Reveal>
          <SpecRow label="Summary">
            <p className="text-lg leading-relaxed">{project.summary}</p>
          </SpecRow>
        </Reveal>

        <Reveal>
          <SpecRow label="Context">
            <p className="leading-relaxed">{project.context}</p>
          </SpecRow>
        </Reveal>

        <Reveal>
          <SpecRow label="Role & team">
            <p className="leading-relaxed">{project.roleTeam}</p>
          </SpecRow>
        </Reveal>

        <Reveal>
          <SpecRow label="Stack">
            <ul className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <Chip key={tech}>{tech}</Chip>
              ))}
            </ul>
          </SpecRow>
        </Reveal>

        {/* Key decisions get the accent rule — the deliberate, defensible choices. */}
        <Reveal>
          <SpecRow label="Key decisions">
            <ol className="space-y-4">
              {project.keyDecisions.map((decision) => (
                <li
                  key={decision}
                  className="glass rounded-xl border-l-2 border-l-accent p-4 leading-relaxed"
                >
                  {decision}
                </li>
              ))}
            </ol>
          </SpecRow>
        </Reveal>

        <Reveal>
          <SpecRow label="Architecture">
            <p className="leading-relaxed">{project.architecture}</p>
          </SpecRow>
        </Reveal>

        <Reveal>
          <SpecRow label="Challenges">
            <ul className="space-y-5">
              {project.challenges.map((challenge) => (
                <li key={challenge.body} className="leading-relaxed">
                  {challenge.heading && (
                    <span className="font-semibold">{challenge.heading}: </span>
                  )}
                  {challenge.body}
                </li>
              ))}
            </ul>
          </SpecRow>
        </Reveal>
      </div>

      {project.crossLinkEngineering && (
        <Reveal as="section" className="glass mt-14 rounded-xl border-l-2 border-l-accent p-6">
          <p className="leading-relaxed">
            The offline-sync engineering behind this POS is demonstrated in a public,
            runnable proof-of-concept.
          </p>
          <Link
            href="/demonstration"
            className="mt-2 inline-block text-sm text-accent underline underline-offset-4"
          >
            See the inventory-ledger deep-dive →
          </Link>
        </Reveal>
      )}
    </>
  );
}

// A lighter template for the "Also shipped" projects — built from the compact
// fields, with the same cover + gallery treatment as the deep case studies.
function CompactCaseStudy({ project }: { project: CompactProject }) {
  return (
    <>
      <Reveal as="section" on="load"><header>
        <p className="font-display text-sm font-bold uppercase tracking-[0.15em] text-muted">
          Also shipped
        </p>
        <KineticText
          as="h1"
          text={project.name}
          className="mt-4 font-display text-display font-semibold"
        />
        <p className="mt-5 max-w-2xl text-xl leading-snug">{project.positioning}</p>
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
          <p className="font-display text-xs font-bold uppercase tracking-[0.15em] text-muted">
            {project.status}
          </p>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-accent underline underline-offset-4"
          >
            Visit live site ↗
          </a>
        </div>
      </header></Reveal>

      <hr className="mt-12 border-border" />

      {media(project).length > 0 && (
        <Reveal className="mt-12">
          <ProjectCarousel images={media(project)} />
        </Reveal>
      )}

      <div className="mt-12 space-y-14">
        <Reveal>
          <SpecRow label="Summary">
            <p className="text-lg leading-relaxed">{project.detail}</p>
          </SpecRow>
        </Reveal>

        <Reveal>
          <SpecRow label="Role & team">
            <p className="leading-relaxed">{ROLE_TEAM}</p>
          </SpecRow>
        </Reveal>

        <Reveal>
          <SpecRow label="Stack">
            <ul className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <Chip key={tech}>{tech}</Chip>
              ))}
            </ul>
          </SpecRow>
        </Reveal>
      </div>
    </>
  );
}
