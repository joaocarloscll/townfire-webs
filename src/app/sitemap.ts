import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { SITE_URL } from "@/lib/site-config";

// Só URLs indexáveis. lastModified fica de fora nas páginas de serviço: sem um
// dado real de última edição, preencher com `new Date()` a cada build
// fabricaria o sinal. Nos guias do blog existe a data real (frontmatter
// `date`/`updated`), então ela é usada. A landing de comércio permanece index,follow (ver decisão no
// PR) porque tem intenção e estrutura distintas da página orgânica de
// regularização — por isso continua no sitemap.
export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const blog: MetadataRoute.Sitemap = posts.length
    ? [
        {
          url: `${SITE_URL}/blog`,
          lastModified: posts[0].updated,
          changeFrequency: "weekly",
          priority: 0.8,
        },
        ...posts.map((p) => ({
          url: `${SITE_URL}/blog/${p.slug}`,
          lastModified: p.updated,
          changeFrequency: "monthly" as const,
          priority: 0.6,
        })),
      ]
    : [];
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
    ...blog,
    {
      url: `${SITE_URL}/politica-de-privacidade`,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}
