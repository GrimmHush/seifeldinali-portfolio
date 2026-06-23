import type { Metadata } from "next";
import { Bricolage_Grotesque, Hanken_Grotesk, JetBrains_Mono, Sacramento } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Atmosphere } from "@/components/Atmosphere";

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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Seifeldin Ali, full-stack engineer",
    template: "%s · Seifeldin Ali",
  },
  description:
    "Production generalist and co-founder of Iano. Next.js, TypeScript, full-stack, from marketing sites to multi-tenant ERP and offline-first POS.",
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Seifeldin Ali",
    title: "Seifeldin Ali, full-stack engineer",
    description:
      "Production generalist and co-founder of Iano. Next.js, TypeScript, full-stack.",
  },
  twitter: { card: "summary_large_image" },
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
      </body>
    </html>
  );
}
