import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { KineticText } from "@/components/KineticText";

export const metadata: Metadata = {
  title: "About",
  description:
    "Saif, a full-stack engineer and entrepreneur in Nairobi, co-founder of Iano, building web platforms wired into real business operations.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <Container width="prose">
      <article className="py-24">
        <Reveal as="section" on="load">
          <header>
            <p className="font-display text-sm font-bold uppercase tracking-[0.15em] text-muted">
              About
            </p>
            <KineticText
              as="h1"
              text="Hi, I’m Saif."
              className="mt-4 font-display text-display font-semibold"
            />
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
            <h2 className="font-display text-title font-semibold">
              My Journey &amp; Experience
            </h2>
            <p className="text-muted">
              My path into software engineering is driven by a deep curiosity for how
              systems work and a desire to build things that create measurable impact. I
              actively expand my architecture skills, recently diving into AWS Cloud
              Practitioner and Cloud Engineer programs to ensure the platforms I
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
            <h2 className="font-display text-title font-semibold">
              Under the Hood
            </h2>
            <p className="text-muted">
              Beyond the code I write for clients, I&rsquo;m deeply passionate about system
              optimization and security. I spend my downtime exploring cybersecurity
              concepts like network security protocols and web vulnerabilities and
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
            <h2 className="font-display text-title font-semibold">
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
