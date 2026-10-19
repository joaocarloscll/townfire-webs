import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/blog/ArticleBody";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MobileStickyCta } from "@/components/MobileStickyCta";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { CATEGORY_LABELS, formatDatePt, getAllPosts, getPost, getRelated } from "@/lib/blog";
import { faqPageSchema, pageSocial } from "@/lib/seo";
import { COMPANY_NAME, SITE_URL } from "@/lib/site-config";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const path = `/blog/${post.slug}`;
  const cover = `${SITE_URL}${path}/opengraph-image`;
  const social = pageSocial({ title: post.title, description: post.description, path });
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: path },
    openGraph: {
      ...social.openGraph,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated,
      images: [{ url: cover, width: 1200, height: 630, alt: post.title }],
    },
    twitter: { ...social.twitter, images: [cover] },
  };
}

export default async function BlogPost({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const path = `/blog/${post.slug}`;
  const url = `${SITE_URL}${path}`;
  const related = getRelated(post);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#post`,
        headline: post.title,
        description: post.description,
        inLanguage: "pt-BR",
        datePublished: post.date,
        dateModified: post.updated,
        keywords: post.keywords.join(", "),
        image: `${url}/opengraph-image`,
        mainEntityOfPage: url,
        author: { "@id": `${SITE_URL}/#organization` },
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Town Fire", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Guias", item: `${SITE_URL}/blog` },
          { "@type": "ListItem", position: 3, name: post.title, item: url },
        ],
      },
      faqPageSchema(post.faq),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header intent={post.intent} placement="blog_post_header" />

      <main className="flex-1">
        <article>
          <header id="top" className="bg-espresso py-16 text-parchment lg:py-24">
            <div className="mx-auto max-w-3xl px-6 lg:px-10">
              <nav aria-label="Você está em" className="text-xs text-parchment/60">
                <Link href="/blog" className="hover:text-parchment">
                  Guias
                </Link>
                <span aria-hidden> / </span>
                <span>{CATEGORY_LABELS[post.category]}</span>
              </nav>
              <h1 className="mt-5 font-display text-3xl font-bold leading-[1.12] tracking-[-0.02em] sm:text-[2.6rem]">
                {post.title}
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-parchment/80">{post.description}</p>
              <p className="mt-7 text-sm text-parchment/60">
                {COMPANY_NAME} · {formatDatePt(post.date)}
                {post.updated !== post.date ? ` · atualizado em ${formatDatePt(post.updated)}` : ""}
                {" · "}
                {post.readingMinutes} min de leitura
              </p>
            </div>
          </header>

          <div className="bg-parchment pb-20 pt-12">
            <div className="mx-auto max-w-3xl px-6 lg:px-10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${path}/opengraph-image`}
                alt={`Capa do guia: ${post.title}`}
                width={1200}
                height={630}
                className="aspect-[1200/630] w-full rounded-[12px] border border-brass/40"
              />

              <div className="mt-10 rounded-[12px] bg-espresso p-6 text-parchment sm:p-8">
                <p className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-brass">
                  O caminho em poucos passos
                </p>
                <ol className="mt-5 space-y-3">
                  {post.summary.map((step, i) => (
                    <li key={step} className="flex items-start gap-4 text-[1.0625rem] leading-snug">
                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-rose font-display text-sm font-semibold text-espresso">
                        {i + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <nav aria-label="Neste guia" className="mt-8 border-l-2 border-brass/60 pl-5">
                <p className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-charcoal/55">
                  Neste guia
                </p>
                <ul className="mt-3 space-y-1.5">
                  {post.toc.map((item) => (
                    <li key={item.id}>
                      <a href={`#${item.id}`} className="text-[0.95rem] text-charcoal/80 underline-offset-2 hover:text-rose-strong hover:underline">
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              <ArticleBody markdown={post.body} />

              <section className="mt-16 border-t border-brass/40 pt-10">
                <h2 className="font-display text-2xl font-bold text-espresso">Perguntas rápidas</h2>
                <dl className="mt-6 divide-y divide-brass/30 border-t border-brass/30">
                  {post.faq.map((item) => (
                    <div key={item.q} className="py-5">
                      <dt className="font-display text-base font-semibold text-espresso">{item.q}</dt>
                      <dd className="mt-2 text-[1.0625rem] leading-relaxed text-charcoal/80">{item.a}</dd>
                    </div>
                  ))}
                </dl>
              </section>

              <section className="mt-14 rounded-[12px] bg-espresso p-8 text-parchment">
                <h2 className="font-display text-2xl font-bold leading-snug">
                  Quer que a gente olhe o seu caso?
                </h2>
                <p className="mt-3 max-w-xl leading-relaxed text-parchment/80">
                  Mande cidade, atividade e área aproximada do imóvel. A Town Fire analisa a
                  situação e diz qual é o caminho.
                </p>
                <WhatsAppLink
                  intent={post.intent}
                  placement="blog_post_cta"
                  className="mt-6 inline-flex min-h-[52px] items-center rounded-full bg-rose px-7 font-display text-sm font-semibold uppercase tracking-[0.03em] text-espresso transition-colors hover:bg-rose-strong"
                >
                  Falar com a Town Fire
                </WhatsAppLink>
              </section>

              <section className="mt-12 border-t border-brass/25 pt-6">
                <p className="font-display text-[11px] font-semibold uppercase tracking-[0.12em] text-charcoal/50">
                  Onde conferir
                </p>
                <ul className="mt-2 space-y-1 text-sm text-charcoal/65">
                  {post.sources.map((s) => (
                    <li key={s.url}>
                      <a href={s.url} target="_blank" rel="noopener noreferrer" className="underline decoration-charcoal/30 underline-offset-2 hover:text-rose-strong">
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-xs leading-relaxed text-charcoal/55">
                  Este guia explica o caminho de forma geral. Exigências, procedimentos e prazos
                  dependem do seu imóvel e da norma vigente, e não há garantia de aprovação.
                </p>
              </section>

              {related.length > 0 && (
                <section className="mt-14">
                  <h2 className="font-display text-xl font-bold text-espresso">Continue lendo</h2>
                  <ul className="mt-5 grid gap-5 sm:grid-cols-2">
                    {related.map((r) => (
                      <li key={r.slug}>
                        <Link href={`/blog/${r.slug}`} className="block h-full rounded-[12px] border border-brass/40 bg-white/60 p-5 transition-colors hover:border-rose">
                          <p className="font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-rose-strong">
                            {CATEGORY_LABELS[r.category]}
                          </p>
                          <p className="mt-2 font-display text-base font-semibold leading-snug text-espresso">{r.title}</p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          </div>
        </article>
      </main>

      <Footer />
      <MobileStickyCta intent={post.intent} placement="blog_post_sticky" label="Falar com a Town Fire" />
    </>
  );
}
