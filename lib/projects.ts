// Single source of truth for project content.
// M1 fills the deep-dive bodies; this file already drives routing, nav, and metadata.

export type DeepProject = {
  slug: string;
  name: string;
  positioning: string;
  client: string;
  year: string;
  status: string;
  liveUrl: string;
};

export type CompactProject = {
  name: string;
  positioning: string;
  liveUrl: string;
};

export const deepProjects: DeepProject[] = [
  {
    slug: "octavia-carbon",
    name: "Octavia Carbon",
    positioning:
      "Marketing + integrated e-commerce site for a Direct Air Capture climate-tech company.",
    client: "Octavia Carbon",
    year: "2025",
    status: "Built & handed off — live site has since evolved independently",
    liveUrl: "https://octaviacarbon.com",
  },
  {
    slug: "merx",
    name: "MERX",
    positioning:
      "Self-hosted, multi-tenant ERP platform with pluggable Accounting, Inventory, and Supply modules.",
    client: "MERX Systems — an Iano product",
    year: "2026",
    status: "Built + maintained by Iano",
    liveUrl: "https://merx.systems",
  },
  {
    slug: "esto",
    name: "Esto",
    positioning:
      "Multi-tenant restaurant POS, inventory, and digital-menu platform — offline-first, web + desktop.",
    client: "Esto — an Iano product",
    year: "2025",
    status: "Built + maintained by Iano",
    liveUrl: "https://esto.solutions",
  },
  {
    slug: "amana",
    name: "Amana",
    positioning:
      "Three-sided delivery logistics platform — REST API, web dashboard, and a native rider app in one monorepo.",
    client: "Amana — Ghost Burgers",
    year: "2025",
    status: "Built + maintained by Iano",
    liveUrl: "https://amana.ke",
  },
];

export const compactProjects: CompactProject[] = [
  {
    name: "Iano Marketing",
    positioning:
      "The studio's own agency site and digital portfolio, with per-person profile cards.",
    liveUrl: "https://iano.marketing",
  },
  {
    name: "Namaa",
    positioning: "Marketing + enquiry site for a Kenya-based tropical-fruit exporter.",
    liveUrl: "https://namaafruits.com",
  },
  {
    name: "Sahara Winds",
    positioning:
      "Marketing + enquiry site for a Nairobi-based air & sea freight company.",
    liveUrl: "https://saharawinds.ke",
  },
];

export function getDeepProject(slug: string): DeepProject | undefined {
  return deepProjects.find((p) => p.slug === slug);
}
