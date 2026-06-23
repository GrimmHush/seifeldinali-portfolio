import type { Metadata } from "next";
import { Bricolage_Grotesque, Hanken_Grotesk, JetBrains_Mono, Sacramento } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Atmosphere } from "@/components/Atmosphere";
import { Analytics } from "@vercel/analytics/next";
import { contact } from "@/lib/contact";

// Display — a characterful architectural grotesque. Variable: full weight +
// optical-size axes, exploited in the hero and section headers.
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});
// Body — a calm, even humanist sans that lets the display lead.
const hanken = Hanken_Grotesk({ variable: "--font-hanken", subsets: ["latin"] });
// Utility — engineered mono for eyebrows, labels, and data.
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});
// Signature — a single-weight script, used only for the hand-signed sign-off.
const sacramento = Sacramento({
  variable: "--font-sacramento",
  subsets: ["latin"],
  weight: "400",
});

const SITE_URL = "https://seifeldinali.com";

const SHORT_DESCRIPTION =
  "Production generalist and co-founder of Iano. Next.js, TypeScript, full-stack.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Seifeldin Ali, full-stack engineer",
    template: "%s · Seifeldin Ali",
  },
  description:
    "Production generalist and co-founder of Iano. Next.js, TypeScript, full-stack, from marketing sites to multi-tenant ERP and offline-first POS.",
  keywords: [
    "Seifeldin Ali",
    "full-stack engineer",
    "Next.js developer",
    "TypeScript",
    "React",
    "Nairobi",
    "Iano",
    "ERP",
    "offline-first",
    "web developer Kenya",
  ],
  authors: [{ name: "Seifeldin Ali", url: SITE_URL }],
  creator: "Seifeldin Ali",
  publisher: "Seifeldin Ali",
  category: "technology",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Seifeldin Ali",
    title: "Seifeldin Ali, full-stack engineer",
    description: SHORT_DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Seifeldin Ali, full-stack engineer",
    description: SHORT_DESCRIPTION,
  },
};

// Structured data: a Person entity so search engines can build a richer entity
// card (name, role, employer, skills, social profiles) from a single source.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Seifeldin Ali",
  alternateName: "Saif",
  url: SITE_URL,
  jobTitle: "Full-stack engineer",
  description: SHORT_DESCRIPTION,
  worksFor: {
    "@type": "Organization",
    name: "Iano",
    url: "https://iano.marketing",
  },
  homeLocation: { "@type": "Place", name: "Nairobi, Kenya" },
  email: `mailto:${contact.email}`,
  knowsAbout: [
    "Next.js",
    "TypeScript",
    "React",
    "Full-stack engineering",
    "Multi-tenant ERP",
    "Offline-first applications",
  ],
  sameAs: [contact.linkedin],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${hanken.variable} ${jetbrainsMono.variable} ${sacramento.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {/* Degrade-visible fallback: without JS, Framer's inline opacity:0 never
            animates away, so force every entrance element to its final state. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important;filter:none!important}`}</style>
        </noscript>
        <Atmosphere />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-foreground focus:px-4 focus:py-2 focus:text-background"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
