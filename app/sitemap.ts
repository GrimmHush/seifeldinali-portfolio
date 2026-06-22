import type { MetadataRoute } from "next";
import { deepProjects, compactProjects } from "@/lib/projects";

const BASE = "https://seifeldinali.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const staticRoutes = ["", "/engineering", "/about"].map((path) => ({
    url: `${BASE}${path}`,
    lastModified,
  }));
  const workRoutes = [...deepProjects, ...compactProjects].map((p) => ({
    url: `${BASE}/work/${p.slug}`,
    lastModified,
  }));
  return [...staticRoutes, ...workRoutes];
}
