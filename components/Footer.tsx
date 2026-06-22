import { Container } from "@/components/ui";
import { contact } from "@/lib/contact";

// A horizontal bar of real <a> elements, each firing the right intent. Reuses the
// digital-business-card pattern; "Save contact" downloads the vCard.
const actions = [
  { label: "Email", href: `mailto:${contact.email}` },
  { label: "Phone", href: `tel:${contact.phone}` },
  { label: "WhatsApp", href: `https://wa.me/${contact.whatsapp}`, external: true },
  { label: "LinkedIn", href: contact.linkedin, external: true },
  { label: "Iano profile card", href: contact.ianoProfile, external: true },
  { label: "Save contact", href: contact.vcard, download: true },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border py-16">
      <Container>
        <h2 className="font-serif text-3xl font-semibold tracking-tight">Get in touch</h2>
        <p className="mt-3 max-w-md text-muted">
          Building something that needs the whole system handled? Let&apos;s talk.
        </p>

        <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm">
          {actions.map((a) => (
            <li key={a.label}>
              <a
                href={a.href}
                {...(a.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                {...(a.download ? { download: true } : {})}
                className="text-accent underline underline-offset-4 transition-opacity hover:opacity-70"
              >
                {a.label}
                {a.external ? " ↗" : ""}
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-12 text-sm text-muted">
          © {new Date().getFullYear()} {contact.name} · Built with Next.js
        </p>
      </Container>
    </footer>
  );
}
