import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-config";

// Rotas indexáveis do manifesto técnico V6 (03_SEO_GEO_AI).
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: SITE_URL, lastModified, changeFrequency: "monthly", priority: 1 },
    {
      url: `${SITE_URL}/regularizacao-comercio-corpo-de-bombeiros-goiania`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/politica-de-privacidade`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}
