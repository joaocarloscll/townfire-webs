import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-config";

// Só URLs indexáveis. lastModified fica de fora: sem um dado real de última
// edição por página, preencher com `new Date()` a cada build fabricaria o
// sinal — mesmo princípio já seguido para os outros dados não confirmados
// do site. A landing de comércio permanece index,follow (ver decisão no
// PR) porque tem intenção e estrutura distintas da página orgânica de
// regularização — por isso continua no sitemap.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    {
      url: `${SITE_URL}/regularizacao-cbmgo-cercon`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/projeto-de-incendio-pscip`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/save-carregadores-veiculos-eletricos`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/sistema-fotovoltaico-cbmgo`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/regularizacao-comercio-corpo-de-bombeiros-goiania`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/politica-de-privacidade`,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}
