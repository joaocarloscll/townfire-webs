import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-config";

// Fonte: 06_TECHNICAL_TEMPLATES/robots.txt.template (pacote V5).
// Princípio: permitir crawlers de busca/answer engines; decidir
// separadamente os crawlers de treinamento de modelo (GPTBot, ClaudeBot).
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "Claude-SearchBot", allow: "/" },
      { userAgent: "Claude-User", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Perplexity-User", allow: "/" },
      { userAgent: "GPTBot", disallow: "/" },
      { userAgent: "ClaudeBot", disallow: "/" },
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/go/", "/admin/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
