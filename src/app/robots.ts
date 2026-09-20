import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-config";

// Descoberta em busca tradicional + mecanismos generativos (SEO + GEO/AEO).
// GPTBot e ClaudeBot (crawlers de treinamento) ficam bloqueados: não são
// necessários para aparecer no ChatGPT Search / Claude — isso é
// OAI-SearchBot / Claude-SearchBot / Claude-User, que ficam liberados.
//
// robots.txt não herda regras entre blocos de user-agent: cada bot com
// regra própria precisa repetir o disallow das rotas internas, senão um
// "Allow: /" específico bate por cima do "*" e libera essas rotas.
const DISALLOWED_PATHS = ["/api/", "/go/", "/admin/"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Busca tradicional
      { userAgent: "Googlebot", allow: "/", disallow: DISALLOWED_PATHS },
      { userAgent: "Bingbot", allow: "/", disallow: DISALLOWED_PATHS },

      // ChatGPT Search (não confundir com GPTBot, que é treinamento)
      { userAgent: "OAI-SearchBot", allow: "/", disallow: DISALLOWED_PATHS },
      { userAgent: "OAI-AdsBot", allow: "/", disallow: DISALLOWED_PATHS },

      // Gemini / AI Overviews e AI Mode já dependem do Googlebot acima;
      // Google-Extended controla outros usos do conteúdo no ecossistema Gemini.
      { userAgent: "Google-Extended", allow: "/", disallow: DISALLOWED_PATHS },

      // Claude Search e acesso pedido pelo usuário (não ClaudeBot, treinamento)
      {
        userAgent: "Claude-SearchBot",
        allow: "/",
        disallow: DISALLOWED_PATHS,
      },
      { userAgent: "Claude-User", allow: "/", disallow: DISALLOWED_PATHS },

      // Perplexity
      { userAgent: "PerplexityBot", allow: "/", disallow: DISALLOWED_PATHS },

      // Crawlers de treinamento de modelo — bloqueados; não são o caminho de
      // descoberta em busca desses ecossistemas.
      { userAgent: "GPTBot", disallow: "/" },
      { userAgent: "ClaudeBot", disallow: "/" },

      // Demais crawlers
      { userAgent: "*", allow: "/", disallow: DISALLOWED_PATHS },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
