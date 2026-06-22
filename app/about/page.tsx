import type { Metadata } from "next";
import { Container } from "@/components/ui";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "Co-founder of Iano, a two-person studio where both founders engineered every build.",
};

export default function AboutPage() {
  return (
    <Container width="prose">
      <article className="py-24">
        <Reveal as="section" on="load">
          <header>
            <p className="font-mono text-sm uppercase tracking-widest text-muted">
              A two-person studio
            </p>
            <h1 className="mt-4 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
              About
            </h1>
          </header>
        </Reveal>
        <div className="mt-10 space-y-6 leading-relaxed">
          <p className="text-xl leading-snug text-foreground">
            I&apos;m Seifeldin Ali, co-founder of Iano — a two-person marketing agency.
            &ldquo;Two-person&rdquo; is the honest framing: there&apos;s no team behind the
            curtain. Both founders engineered every build on this site, end to end.
          </p>
          <p className="text-muted">
            That scope is the point. The same two people handle the marketing site and the
            multi-tenant ERP behind it, the React landing page and the offline-first POS,
            the payment integration and the deploy. Every one of the seven shipped products
            plugs into a real business process — CRM, ERP, POS, payments, logistics —
            because a small studio can&apos;t hand the &ldquo;boring&rdquo; operational half
            to someone else. We build the whole system or it doesn&apos;t ship.
          </p>
          <p className="text-muted">
            The work moved deliberately from client-facing React sites to full-stack Next.js
            and TypeScript products — picking the right tool as the problems got harder, not
            collecting frameworks. This site is built on that same stack, in the open, so the
            claim is something you can read rather than something I assert.
          </p>
        </div>
      </article>
    </Container>
  );
}
