import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "Saif — full-stack engineer and entrepreneur in Nairobi, co-founder of Iano, building web platforms wired into real business operations.",
};

export default function AboutPage() {
  return (
    <Container width="prose">
      <article className="py-24">
        <Reveal as="section" on="load">
          <header>
            <p className="font-mono text-sm uppercase tracking-widest text-muted">
              About
            </p>
            <h1 className="mt-4 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
              Hi, I&rsquo;m Saif.
            </h1>
          </header>
        </Reveal>

        <div className="mt-10 space-y-10 leading-relaxed">
          <p className="text-xl leading-snug text-foreground">
            I am a professional full-stack engineer and entrepreneur based in Nairobi,
            Kenya. I specialize in building powerful, scalable web platforms that bridge
            the gap between complex code and real-world operational efficiency. Currently,
            as the Co-founder of Iano, I&rsquo;ve successfully shipped seven distinct
            products, ensuring each one is hardwired directly into an active business
            process to solve concrete problems.
          </p>

          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-semibold tracking-tight">
              My Journey &amp; Experience
            </h2>
            <p className="text-muted">
              My path into software engineering is driven by a deep curiosity for how
              systems work and a desire to build things that create measurable impact. I
              actively expand my architecture skills&mdash;recently diving into AWS Cloud
              Practitioner and Cloud Engineer programs&mdash;to ensure the platforms I
              design are highly available and enterprise-ready.
            </p>
            <p className="text-muted">
              My academic journey began with a foundation in Engineering at IIUM, which
              instilled a disciplined, problem-solving mindset. From there, I earned a
              Diploma in Business Information Technology and am currently a fourth-year
              student at Strathmore University, awaiting my graduation this August with a
              Bachelor&rsquo;s in Business Information Technology. This progression provided
              a rigorous foundation in both software architecture and business operations,
              equipping me with the essential technical skills I rely on daily to build and
              succeed with Iano.
            </p>
            <p className="text-muted">
              To expand my practical knowledge and gain hands-on industry experience, I
              also spent time learning and developing within the developers division at
              CodexSafari. This combination of formal education and applied experience
              across the engineering stack means I don&rsquo;t just write code; I understand
              what businesses actually need their software to accomplish.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-semibold tracking-tight">
              Under the Hood
            </h2>
            <p className="text-muted">
              Beyond the code I write for clients, I&rsquo;m deeply passionate about system
              optimization and security. I spend my downtime exploring cybersecurity
              concepts&mdash;like network security protocols and web vulnerabilities&mdash;and
              configuring Arch Linux environments using tools like Hyprland.
            </p>
            <p className="text-muted">
              My pursuit of high performance extends all the way down to the hardware level.
              Whether I&rsquo;m optimizing a laptop&rsquo;s thermals for peak performance or
              pushing for the best frame rates in competitive gaming, I bring that same
              craftsman&rsquo;s mindset to my engineering. I want the systems I build to run
              faster, smoother, and more securely.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-semibold tracking-tight">
              Let&rsquo;s Connect
            </h2>
            <p className="text-muted">
              I am always looking for the next hard problem to solve. If you&rsquo;re looking
              for an engineer who understands both the architecture and the business
              objective,{" "}
              <Link
                href="/contact"
                className="text-accent underline underline-offset-4 transition-opacity hover:opacity-70"
              >
                let&rsquo;s talk
              </Link>
              .
            </p>
          </section>
        </div>
      </article>
    </Container>
  );
}
