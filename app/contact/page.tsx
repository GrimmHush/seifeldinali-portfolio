import type { Metadata } from "next";
import { Container } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Send Seifeldin Ali a message — or reach out directly by email, phone, WhatsApp, or LinkedIn.",
};

export default function ContactPage() {
  return (
    <Container width="prose">
      <article className="py-24">
        <Reveal as="section" on="load">
          <header>
            <p className="font-mono text-sm uppercase tracking-widest text-muted">
              Get in touch
            </p>
            <h1 className="mt-4 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
              Contact
            </h1>
            <p className="mt-6 max-w-xl text-xl leading-snug text-foreground">
              Building something that needs the whole system handled or just want to
              reach out? Tell me about it below, or use any of the direct channels in the
              footer.
            </p>
          </header>
        </Reveal>
        <ContactForm />
      </article>
    </Container>
  );
}
