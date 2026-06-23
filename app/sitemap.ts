import type { MetadataRoute } from "next";
import { deepProjects, compactProjects } from "@/lib/projects";

const BASE = "https://seifeldinali.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE}/demonstration`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/about`, lastModified, changeFrequency: "yearly", priority: 0.6 },
    { url: `${BASE}/contact`, lastModified, changeFrequency: "yearly", priority: 0.6 },
  ];
  const workRoutes: MetadataRoute.Sitemap = [...deepProjects, ...compactProjects].map((p) => ({
    url: `${BASE}/work/${p.slug}`,
    lastModified,
    changeFrequency: "yearly",
    priority: 0.7,
  }));
  return [...staticRoutes, ...workRoutes];
}
