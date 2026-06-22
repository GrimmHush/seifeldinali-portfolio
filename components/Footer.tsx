import { Container } from "@/components/ui";

export function Footer() {
  return (
    <footer className="border-t border-border py-10 text-sm">
      <Container>
        {/* Contact bar component lands here: clickable email / phone / WhatsApp / LinkedIn
            + "Save Contact" vCard + link to the Iano profile card.
            Details are placeholders until confirmed (the screenshot showed the co-founder's card). */}
        <p className="text-muted">
          © {new Date().getFullYear()} Seif El Din Ali · Built with Next.js
        </p>
      </Container>
    </footer>
  );
}
