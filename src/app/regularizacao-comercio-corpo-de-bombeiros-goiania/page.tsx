import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { Reveal } from "@/components/Reveal";
import { Footer } from "@/components/Footer";
import { MobileStickyCta } from "@/components/MobileStickyCta";
import { WHATSAPP_DISPLAY } from "@/lib/whatsapp";
import { SITE_URL } from "@/lib/site-config";

const PATH = "/regularizacao-comercio-corpo-de-bombeiros-goiania";

const title =
  "Regularização de Comércio no Corpo de Bombeiros em Goiânia | Town Fire";
const description =
  "Regularize seu comércio junto ao Corpo de Bombeiros em Goiânia. Envie atividade, área e situação atual para entender o próximo passo técnico.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: PATH },
  openGraph: { title, description, url: `${SITE_URL}${PATH}` },
};

const SITUATIONS = [
  {
    title: "Vou abrir o comércio",
    text: "Quero saber o que o imóvel precisa antes de iniciar a operação.",
  },
  {
    title: "O comércio já funciona",
    text: "Preciso regularizar a situação atual.",
  },
  {
    title: "Recebi uma exigência",
    text: "Tenho um documento e preciso entender como responder.",
  },
];

const STEPS = [
  "Recebemos as informações disponíveis.",
  "Identificamos o enquadramento e o escopo.",
  "Desenvolvemos a engenharia contratada.",
  "Conduzimos as etapas previstas no processo.",
];

const FAQ = [
  {
    q: "Preciso ter planta do imóvel?",
    a: "Envie o que você possui. A primeira conversa serve para identificar o material necessário.",
  },
  {
    q: "Já recebi uma exigência. Posso mandar o documento?",
    a: "Sim. O documento ajuda a localizar a pendência e o escopo da análise.",
  },
  {
    q: "O acompanhamento do processo está incluído?",
    a: "A proposta informa as etapas incluídas e as responsabilidades de cada parte.",
  },
];

// Schema da rota paga (03_SEO_GEO_AI/technical_seo_manifest_v6.yaml):
// Service + BreadcrumbList + FAQPage espelhando as perguntas visíveis.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Regularização de comércio junto ao Corpo de Bombeiros",
      serviceType: "Regularização e segurança contra incêndio",
      provider: { "@id": `${SITE_URL}/#organization` },
      areaServed: { "@type": "City", name: "Goiânia" },
      description,
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Town Fire", item: SITE_URL },
        {
          "@type": "ListItem",
          position: 2,
          name: "Regularização de comércio em Goiânia",
          item: `${SITE_URL}${PATH}`,
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQ.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ],
};

export default function RegularizacaoComercioGoiania() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="sticky top-0 z-20 border-b border-brass/30 bg-espresso/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 lg:px-10">
          <Image
            src="/brand/logo-horizontal-white.svg"
            alt="Town Fire"
            width={160}
            height={36}
            priority
            className="h-8 w-auto"
          />
          <div className="flex items-center gap-5">
            <Link
              href="/"
              className="hidden min-h-[44px] items-center font-body text-sm text-blush/80 transition-colors hover:text-white sm:inline-flex"
            >
              Conhecer a Town Fire
            </Link>
            <WhatsAppLink
              intent="regularizacao_comercio_goiania"
              placement="lp_comercio_header"
              className="inline-flex min-h-[44px] items-center rounded-full bg-rose px-5 font-display text-xs font-semibold uppercase tracking-[0.04em] text-espresso transition-colors hover:bg-rose-strong"
            >
              Falar com um engenheiro
            </WhatsAppLink>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* ATO 01 | Confirmação da busca */}
        <section id="top" className="bg-espresso py-20 text-parchment lg:py-28">
          <div className="mx-auto max-w-3xl px-6 lg:px-10">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-brass">
              Regularização de comércio em Goiânia
            </p>
            <h1 className="mt-5 font-display text-4xl font-bold leading-[1.08] tracking-[-0.02em] sm:text-5xl">
              Regularização do seu comércio junto ao Corpo de Bombeiros.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-parchment/80">
              A Town Fire analisa o imóvel, identifica o caminho técnico e
              conduz as etapas contratadas para colocar a situação em ordem.
            </p>
            <WhatsAppLink
              intent="regularizacao_comercio_goiania"
              placement="lp_comercio_hero"
              className="mt-10 inline-flex min-h-[52px] items-center rounded-full bg-rose px-7 font-display text-sm font-semibold uppercase tracking-[0.03em] text-espresso transition-colors hover:bg-rose-strong"
            >
              Entender o que está faltando
            </WhatsAppLink>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-parchment/60">
              Envie atividade, área aproximada e o documento recebido, caso
              exista.
            </p>
          </div>
        </section>

        {/* ATO 02 | Reconhecimento */}
        <section className="bg-parchment py-20">
          <div className="mx-auto max-w-4xl px-6 lg:px-10">
            <h2 className="font-display text-3xl font-bold leading-[1.15] text-espresso sm:text-4xl">
              Em qual situação você está?
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-px border border-brass/30 bg-brass/30 sm:grid-cols-3">
              {SITUATIONS.map((item, i) => (
                <div key={item.title} className="bg-parchment p-6">
                  <Reveal delayMs={i * 90}>
                    <h3 className="font-display text-lg font-semibold text-espresso">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-base leading-relaxed text-charcoal/70">
                      {item.text}
                    </p>
                  </Reveal>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ATO 03 | Leitura técnica */}
        <section className="bg-espresso py-20 text-parchment">
          <div className="mx-auto max-w-3xl px-6 lg:px-10">
            <h2 className="font-display text-3xl font-bold leading-[1.15] sm:text-4xl">
              O mesmo comércio pode exigir caminhos diferentes.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-parchment/80">
              Uso, área, ocupação, configuração e condição atual alteram o
              enquadramento. É por isso que o primeiro passo é entender o
              imóvel.
            </p>
            <p className="mt-8 font-display text-xl font-semibold text-brass">
              Regularização começa antes do projeto.
            </p>
          </div>
        </section>

        {/* ATO 04 | Como funciona */}
        <section className="bg-parchment py-20">
          <div className="mx-auto max-w-3xl px-6 lg:px-10">
            <h2 className="font-display text-3xl font-bold leading-[1.15] text-espresso sm:text-4xl">
              Do cenário atual ao próximo passo.
            </h2>
            <ol className="mt-10 border-l border-brass/40 pl-8">
              {STEPS.map((step, i) => (
                <li key={step} className="relative pb-8 last:pb-0">
                  <span
                    aria-hidden
                    className={`absolute -left-[35px] top-1.5 block h-3 w-3 rounded-full border ${
                      i === STEPS.length - 1
                        ? "border-rose bg-rose"
                        : "border-brass bg-parchment"
                    }`}
                  />
                  <span className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-rose">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-2 text-base leading-relaxed text-charcoal/75">
                    {step}
                  </p>
                </li>
              ))}
            </ol>
            <p className="mt-8 font-display text-lg font-semibold text-espresso">
              Você sabe o que está sendo tratado e o que precisa acontecer
              depois.
            </p>
          </div>
        </section>

        {/* ATO 05 | Prova */}
        <section className="bg-parchment pb-20">
          <div className="mx-auto max-w-3xl border-t border-brass/30 px-6 pt-16 lg:px-10">
            <h2 className="font-display text-3xl font-bold leading-[1.15] text-espresso sm:text-4xl">
              João Carlos já conduziu mais de 100 processos aprovados.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-charcoal/75">
              A Town Fire é conduzida por João Carlos Chaves, engenheiro civil
              com mais de cinco anos em projetos complementares, e Jefferson
              Jesus, engenheiro mecânico com mais de sete anos em projetos
              industriais e sistemas críticos.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
              <a
                href="https://www.linkedin.com/in/joaocarloscl/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center font-display text-xs font-semibold uppercase tracking-[0.06em] text-rose hover:text-rose-strong"
              >
                Conhecer João no LinkedIn
              </a>
              <a
                href="https://www.linkedin.com/in/jefferson--jesus/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center font-display text-xs font-semibold uppercase tracking-[0.06em] text-rose hover:text-rose-strong"
              >
                Conhecer Jefferson no LinkedIn
              </a>
            </div>
          </div>
        </section>

        {/* ATO 06 | Conversão e dúvidas */}
        <section className="bg-espresso py-20 text-parchment">
          <div className="mx-auto max-w-3xl px-6 lg:px-10">
            <h2 className="font-display text-3xl font-bold leading-[1.15] sm:text-4xl">
              Envie o que você já sabe. A Town Fire localiza o caminho.
            </h2>
            <WhatsAppLink
              intent="regularizacao_comercio_goiania"
              placement="lp_comercio_final"
              className="mt-8 inline-flex min-h-[52px] items-center rounded-full bg-rose px-9 font-display text-base font-semibold uppercase tracking-[0.03em] text-espresso transition-colors hover:bg-rose-strong"
            >
              Falar com um engenheiro
            </WhatsAppLink>
            <p className="mt-6 text-sm text-parchment/60">
              WhatsApp oficial: {WHATSAPP_DISPLAY}
            </p>

            <dl className="mt-14 divide-y divide-brass/25 border-t border-brass/25">
              {FAQ.map((item) => (
                <div key={item.q} className="py-6">
                  <dt className="font-display text-base font-semibold">
                    {item.q}
                  </dt>
                  <dd className="mt-2 text-base leading-relaxed text-parchment/75">
                    {item.a}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </main>

      <Footer />
      <MobileStickyCta
        intent="regularizacao_comercio_goiania"
        placement="lp_comercio_sticky"
        label="Falar com um engenheiro"
      />
    </>
  );
}
