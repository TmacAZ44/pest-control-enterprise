import type { MetadataRoute } from "next";
import { company } from "@/lib/company";
import { serviceAreas } from "@/lib/locations";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-09-29");
  const staticRoutes = ["", "/services", "/estimate", "/book", "/locations", "/portal"].map((path) => ({
    url: `${company.siteUrl}${path || "/"}`,
    lastModified,
  }));

  const cityRoutes = serviceAreas.map((area) => ({
    url: `${company.siteUrl}/locations/${area.slug}`,
    lastModified,
  }));

  return [...staticRoutes, ...cityRoutes];
}
