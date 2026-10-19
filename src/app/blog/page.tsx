import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MobileStickyCta } from "@/components/MobileStickyCta";
import { CATEGORY_LABELS, formatDatePt, getAllPosts } from "@/lib/blog";
import { pageSocial } from "@/lib/seo";
import { COMPANY_NAME, SITE_URL } from "@/lib/site-config";

const PATH = "/blog";
const title = "Guias de segurança contra incêndio e regularização no CBMGO";
const description =
  "Passo a passo simples sobre regularização no Corpo de Bombeiros de Goiás: CERCON, PSCIP, exigências, vistoria e o que fazer em cada situação do seu imóvel.";

export const metadata: Metadata = {
  title: "Guias de regularização no CBMGO",
  description,
  alternates: {
    canonical: PATH,
    types: { "application/rss+xml": `${SITE_URL}/blog/feed.xml` },
  },
  ...pageSocial({ title, description, path: PATH }),
};

export default function BlogIndex() {
  const posts = getAllPosts();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        "@id": `${SITE_URL}/blog#blog`,
        url: `${SITE_URL}/blog`,
        name: `Guias ${COMPANY_NAME}`,
        description,
        inLanguage: "pt-BR",
        publisher: { "@id": `${SITE_URL}/#organization` },
        blogPost: posts.map((p) => ({
          "@type": "BlogPosting",
          headline: p.title,
          url: `${SITE_URL}/blog/${p.slug}`,
          datePublished: p.date,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Town Fire", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Guias", item: `${SITE_URL}${PATH}` },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header intent="institutional_general" placement="blog_index_header" />

      <main className="flex-1">
        <section id="top" className="bg-espresso py-20 text-parchment lg:py-24">
          <div className="mx-auto max-w-5xl px-6 lg:px-10">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-brass">
              Guias
            </p>
            <h1 className="mt-5 max-w-3xl font-display text-4xl font-bold leading-[1.08] tracking-[-0.02em] sm:text-5xl">
              Bombeiros e regularização, sem rodeio.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-parchment/80">
              Passo a passo para quem precisa abrir, regularizar ou adequar um imóvel em Goiás e
              não sabe por onde começar.
            </p>
          </div>
        </section>

        <section className="bg-parchment py-16">
          <div className="mx-auto max-w-5xl px-6 lg:px-10">
            {posts.length === 0 ? (
              <p className="text-charcoal/70">Os primeiros guias saem em breve.</p>
            ) : (
              <ul className="grid gap-8 sm:grid-cols-2">
                {posts.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/blog/${p.slug}`}
                      className="group block h-full overflow-hidden rounded-[12px] border border-brass/40 bg-white/60 transition-colors hover:border-rose"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`/blog/${p.slug}/opengraph-image`}
                        alt=""
                        width={1200}
                        height={630}
                        loading="lazy"
                        className="aspect-[1200/630] w-full border-b border-brass/30 object-cover"
                      />
                      <div className="p-6">
                        <p className="font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-rose-strong">
                          {CATEGORY_LABELS[p.category]}
                        </p>
                        <h2 className="mt-3 font-display text-xl font-bold leading-snug text-espresso group-hover:text-rose-strong">
                          {p.title}
                        </h2>
                        <p className="mt-3 text-[0.95rem] leading-relaxed text-charcoal/75">
                          {p.description}
                        </p>
                        <p className="mt-4 text-xs text-charcoal/55">
                          {formatDatePt(p.date)} · {p.readingMinutes} min de leitura
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </main>

      <Footer />
      <MobileStickyCta
        intent="institutional_general"
        placement="blog_index_sticky"
        label="Falar com a Town Fire"
      />
    </>
  );
}
