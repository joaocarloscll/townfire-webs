import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-config";

// Rotas indexáveis do manifesto técnico V6 (03_SEO_GEO_AI).
// `lastModified` fica de fora: sem um dado real de última edição por página,
// preencher com `new Date()` a cada build seria fabricar o sinal — o mesmo
// princípio já seguido para os outros dados ainda não confirmados do site.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    {
      url: `${SITE_URL}/regularizacao-comercio-corpo-de-bombeiros-goiania`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/politica-de-privacidade`,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}
