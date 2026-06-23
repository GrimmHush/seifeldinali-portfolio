import type { ReactNode } from "react";
import { Container } from "@/components/ui";
import { KineticText } from "@/components/KineticText";
import { Magnetic } from "@/components/Magnetic";
import { contact } from "@/lib/contact";

// Inline icons — stroke-based, inherit currentColor, sized 1.1rem.
const iconProps = {
  "aria-hidden": true as const,
  viewBox: "0 0 24 24",
  className: "h-[18px] w-[18px] shrink-0",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const icons = {
  email: (
    <svg {...iconProps}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  ),
  phone: (
    <svg {...iconProps}>
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
    </svg>
  ),
  // Official brand glyphs (simple-icons), filled, monochrome via currentColor.
  whatsapp: (
    <svg aria-hidden viewBox="0 0 24 24" className="h-4.5 w-4.5 shrink-0" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.892c0 2.096.549 4.142 1.595 5.945L0 24l6.335-1.652a12.062 12.062 0 005.71 1.448h.005c6.582 0 11.946-5.335 11.949-11.893a11.821 11.821 0 00-3.484-8.413" />
    </svg>
  ),
  linkedin: (
    <svg aria-hidden viewBox="0 0 24 24" className="h-4.5 w-4.5 shrink-0" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
    </svg>
  ),
  download: (
    <svg {...iconProps}>
      <path d="M12 4v10m0 0 4-4m-4 4-4-4M5 19h14" />
    </svg>
  ),
};

// Links fire an intent; email + phone are written out as plain text beside their icon.
type Item =
  | { icon: ReactNode; label: string; href: string; external?: boolean; download?: boolean }
  | { icon: ReactNode; text: string };

const items: Item[] = [
  { icon: icons.email, text: contact.email },
  { icon: icons.phone, text: contact.phone },
  { icon: icons.whatsapp, label: "WhatsApp", href: `https://wa.me/${contact.whatsapp}`, external: true },
  { icon: icons.linkedin, label: "LinkedIn", href: contact.linkedin, external: true },
  { icon: icons.download, label: "Save contact", href: contact.vcard, download: true },
];

export function Footer() {
  return (
    <footer id="contact" className="mt-32 border-t border-border py-20">
      <Container className="flex flex-col items-center text-center">
        <KineticText
          as="h2"
          on="view"
          text="Get in touch"
          className="font-display text-display font-semibold"
        />
        <p className="mt-4 max-w-md text-muted">
          Building something that needs the whole system handled? Let&apos;s talk.
        </p>

        <ul className="mt-8 flex flex-wrap justify-center gap-x-3 gap-y-2 text-sm">
          {items.map((item, i) => (
            <li key={i}>
              {"href" in item ? (
                <Magnetic strength={8}>
                  <a
                    href={item.href}
                    {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    {...(item.download ? { download: true } : {})}
                    className="glass flex items-center gap-2 rounded-full px-4 py-2 text-foreground transition-colors hover:text-accent"
                  >
                    {item.icon}
                    <span>
                      {item.label}
                      {item.external ? " ↗" : ""}
                    </span>
                  </a>
                </Magnetic>
              ) : (
                <span className="flex items-center gap-2 px-4 py-2 text-muted">
                  {item.icon}
                  {item.text}
                </span>
              )}
            </li>
          ))}
        </ul>

        <p className="mt-14 text-sm text-muted">
          © {new Date().getFullYear()} {contact.name} · Built with Next.js
        </p>
      </Container>
    </footer>
  );
}
