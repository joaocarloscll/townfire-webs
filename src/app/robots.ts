import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-config";

// Fonte: 06_TECHNICAL_TEMPLATES/robots.txt.template (pacote V5), ampliado
// para descoberta máxima em busca tradicional + mecanismos de IA (SEO +
// GEO/AEO). GPTBot e ClaudeBot (crawlers de treinamento) liberados de
// propósito: a prioridade atual é exposição, não restrição de uso — ver
// discussão no PR.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Busca tradicional
      { userAgent: "Googlebot", allow: "/" },
      { userAgent: "Bingbot", allow: "/" },

      // ChatGPT: OAI-SearchBot indexa para o Search; OAI-AdsBot é para
      // landing pages de anúncios; GPTBot é treinamento.
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "OAI-AdsBot", allow: "/" },
      { userAgent: "GPTBot", allow: "/" },

      // Gemini / ecossistema Google AI (Googlebot já cobre Search e AI
      // Overviews/AI Mode; Google-Extended controla outros usos no Gemini).
      { userAgent: "Google-Extended", allow: "/" },

      // Claude: SearchBot (busca), User (acesso pedido pelo usuário),
      // ClaudeBot (treinamento).
      { userAgent: "Claude-SearchBot", allow: "/" },
      { userAgent: "Claude-User", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },

      // Perplexity
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Perplexity-User", allow: "/" },

      // Demais crawlers — bloqueia apenas rotas internas (redirect de
      // atribuição do WhatsApp e áreas sem conteúdo público).
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/go/", "/admin/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
