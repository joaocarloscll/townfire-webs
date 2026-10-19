import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { WHATSAPP_INTENTS, type WhatsappIntent } from "@/lib/whatsapp";
import {
  CATEGORY_LABELS,
  validatePost,
  type CategoryKey,
  type RawFrontmatter,
} from "@/lib/blog-rules";

export { CATEGORY_LABELS };
export type { CategoryKey };

const POSTS_DIR = path.join(process.cwd(), "content", "blog");

// Rotas internas que os posts podem linkar.
const STATIC_ROUTES = [
  "/",
  "/blog",
  "/projeto-de-incendio-pscip",
  "/regularizacao-cbmgo-cercon",
  "/regularizacao-comercio-corpo-de-bombeiros-goiania",
  "/save-carregadores-veiculos-eletricos",
  "/sistema-fotovoltaico-cbmgo",
  "/politica-de-privacidade",
];

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated: string;
  category: CategoryKey;
  format: "guia" | "noticia";
  keywords: string[];
  intent: WhatsappIntent;
  summary: string[];
  faq: Array<{ q: string; a: string }>;
  sources: Array<{ label: string; url: string }>;
  body: string;
  readingMinutes: number;
  toc: Array<{ id: string; text: string }>;
};

export function slugifyHeading(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const asIso = (v: unknown) => (v instanceof Date ? v.toISOString().slice(0, 10) : v);

let cache: Post[] | null = null;

/**
 * Lê content/blog/*.md, valida cada post contra as regras editoriais
 * (blog-rules.ts) e devolve do mais novo para o mais antigo. Qualquer erro
 * lança e derruba o build, que é a trava de qualidade da publicação
 * automática.
 */
export function getAllPosts(): Post[] {
  if (cache) return cache;
  if (!fs.existsSync(POSTS_DIR)) return (cache = []);

  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md") && !f.startsWith("_"));
  const slugs = files.map((f) => f.replace(/\.md$/, ""));
  const knownRoutes = new Set([...STATIC_ROUTES, ...slugs.map((s) => `/blog/${s}`)]);
  const intents = Object.keys(WHATSAPP_INTENTS);
  const now = new Date();
  const problems: string[] = [];
  const posts: Post[] = [];

  for (const file of files) {
    const slug = file.replace(/\.md$/, "");
    const parsed = matter(fs.readFileSync(path.join(POSTS_DIR, file), "utf8"));
    const fm = parsed.data as RawFrontmatter & Record<string, unknown>;
    fm.date = asIso(fm.date);
    fm.updated = asIso(fm.updated);
    if (fm.news && typeof fm.news === "object")
      (fm.news as Record<string, unknown>).date = asIso((fm.news as Record<string, unknown>).date);

    const body = parsed.content.trim();
    const errors = validatePost({ slug, fm, body, knownRoutes, intents, now });
    if (errors.length) {
      problems.push(`content/blog/${file}:\n  - ${errors.join("\n  - ")}`);
      continue;
    }

    const wordCount = body.split(/\s+/).filter(Boolean).length;
    posts.push({
      slug,
      title: fm.title as string,
      description: fm.description as string,
      date: fm.date as string,
      updated: (fm.updated as string | undefined) ?? (fm.date as string),
      category: fm.category as CategoryKey,
      format: fm.format as "guia" | "noticia",
      keywords: fm.keywords as string[],
      intent: fm.intent as WhatsappIntent,
      summary: fm.summary as string[],
      faq: fm.faq as Post["faq"],
      sources: fm.sources as Post["sources"],
      body,
      readingMinutes: Math.max(3, Math.round(wordCount / 190)),
      toc: [...body.matchAll(/^## (.+)$/gm)].map((m) => ({
        id: slugifyHeading(m[1]),
        text: m[1].trim(),
      })),
    });
  }

  if (problems.length) {
    throw new Error(`Posts do blog fora das regras editoriais:\n\n${problems.join("\n\n")}\n`);
  }

  cache = posts.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.slug.localeCompare(b.slug)));
  return cache;
}

export function getPost(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function getRelated(post: Post, limit = 2): Post[] {
  const others = getAllPosts().filter((p) => p.slug !== post.slug);
  const score = (p: Post) =>
    (p.category === post.category ? 3 : 0) + p.keywords.filter((k) => post.keywords.includes(k)).length;
  return others.sort((a, b) => score(b) - score(a) || (a.date < b.date ? 1 : -1)).slice(0, limit);
}

export function formatDatePt(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const meses = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
  return `${d} de ${meses[m - 1]} de ${y}`;
}
