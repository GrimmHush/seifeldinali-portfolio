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
    <svg aria-hidden viewBox="0 0 24 24" className="h-[18px] w-[18px] shrink-0" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.892c0 2.096.549 4.142 1.595 5.945L0 24l6.335-1.652a12.062 12.062 0 005.71 1.448h.005c6.582 0 11.946-5.335 11.949-11.893a11.821 11.821 0 00-3.484-8.413" />
    </svg>
  ),
  linkedin: (
    <svg aria-hidden viewBox="0 0 24 24" className="h-[18px] w-[18px] shrink-0" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
    </svg>
  ),
  // Official Iano wordmark (iano.marketing), recoloured to currentColor.
  iano: (
    <svg aria-hidden viewBox="0 0 960 560" className="h-[18px] w-auto shrink-0" fill="currentColor">
      <path d="M213.6,281.3c0.3,15.5,2.2,35,11.1,59.6c18.4,51.2,56.7,80.4,69.5,90c46.6,35,109.9,39.6,109.9,39.6V90H213.5C213.5,90,213.5,280.4,213.6,281.3z" />
      <path d="M191.7,281.3c-0.3,15.5-2.2,35-11.1,59.6c-18.4,51.2-56.8,80.4-69.6,90c-46.6,35-110,39.6-110,39.6V90h190.7C191.7,90,191.7,280.4,191.7,281.3z" />
      <path d="M496.2,320.4c-2.7-2.7-4-5.9-4-9.8c0-3.9,1.3-7.1,4-9.8c2.7-2.7,5.9-4,9.8-4c3.7,0,6.9,1.3,9.5,4c2.6,2.7,3.9,5.9,3.9,9.8c0,3.9-1.3,7.1-3.9,9.8c-2.6,2.7-5.8,4-9.5,4C502.1,324.4,498.9,323,496.2,320.4z M519,344v125h-20V344H519z" />
      <path d="M550.4,372c5.1-9.4,12-16.8,20.9-22c8.8-5.2,18.7-7.8,29.6-7.8c10.7,0,20.3,2.3,28.2,6.9c7.9,4.6,14,10.4,18,17.4V344h20v125h-20v-25.3c-4,7.1-10.3,13.1-18.3,17.7c-8,4.7-17.4,7-27.9,7c-10.9,0-20.8-2.7-29.5-8c-8.8-5.4-15.7-12.9-20.8-22.5c-5.1-9.7-7.6-20.7-7.6-33C542.8,392.4,545.3,381.5,550.4,372z M640.8,381c-3.7-6.8-8.7-12.1-15.1-15.7c-6.3-3.6-13.3-5.5-20.9-5.5c-7.6,0-14.5,1.8-20.7,5.4c-6.2,3.6-11.2,8.8-14.9,15.6c-3.7,6.8-5.6,14.9-5.6,24.1c0,9.4,1.9,17.5,5.6,24.4c3.7,6.9,8.7,12.2,14.9,15.8c6.2,3.6,13.2,5.5,20.7,5.5c7.6,0,14.5-1.8,20.9-5.5c6.3-3.6,11.3-8.9,15.1-15.8c3.7-6.9,5.6-15,5.6-24.2C646.3,395.9,644.5,387.9,640.8,381z" />
      <path d="M797.5,355.5c9.2,9,14.5,22,14.5,38.9V469h-20v-71.7c0-12.2-3.7-21.5-9.8-28c-6.1-6.5-14.8-9.7-25.3-9.7c-10.7,0-19.1,3.3-25.5,10c-6.3,6.7-9.4,16.4-9.4,29.2V469h-20V344h20v17.6c5-6.2,9.2-11.1,16.2-14.5c6.9-3.4,14.7-5.1,23.1-5.1C776.1,342,788.3,346.5,797.5,355.5z" />
      <path d="M866.2,460.7c-9.3-5.2-16.6-12.6-21.9-22.2c-5.3-9.6-7.9-20.7-7.9-33.4c0-12.5,2.7-23.5,8.1-33.1c5.4-9.6,12.8-17,22.2-22.1c9.4-5.1,19.9-7.7,31.5-7.7c11.6,0,22.1,2.6,31.5,7.7c9.4,5.1,16.8,12.5,22.2,22c5.4,9.5,8.1,20.6,8.1,33.2c0,12.6-2.8,23.8-8.4,33.4c-5.6,9.6-13.1,17-22.6,22.2c-9.5,5.2-20.1,7.8-31.7,7.8C885.9,468.5,875.5,465.9,866.2,460.7z M917.8,445.5c6.4-3.4,11.6-8.6,15.5-15.4c3.9-6.8,5.9-15.2,5.9-25c0-9.8-1.9-18.1-5.8-25c-3.9-6.8-8.9-11.9-15.2-15.3c-6.2-3.3-13-5-20.3-5c-7.4,0-14.2,1.7-20.4,5c-6.2,3.3-11.1,8.4-14.8,15.3c-3.7,6.8-5.6,15.2-5.6,25c0,10,1.8,18.4,5.5,25.2c3.6,6.8,8.5,11.9,14.6,15.3c6.1,3.3,12.8,5,20.1,5C904.6,450.7,911.4,448.9,917.8,445.5z" />
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
  { icon: icons.iano, label: "Iano profile card", href: contact.ianoProfile, external: true },
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
