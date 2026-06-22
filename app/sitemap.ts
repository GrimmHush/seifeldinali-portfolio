import type { MetadataRoute } from "next";
import { deepProjects } from "@/lib/projects";

const BASE = "https://seifeldinali.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const staticRoutes = ["", "/engineering", "/about"].map((path) => ({
    url: `${BASE}${path}`,
    lastModified,
  }));
  const workRoutes = deepProjects.map((p) => ({
    url: `${BASE}/work/${p.slug}`,
    lastModified,
  }));
  return [...staticRoutes, ...workRoutes];
}
