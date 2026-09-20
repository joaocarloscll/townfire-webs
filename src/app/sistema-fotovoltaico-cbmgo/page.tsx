import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { Footer } from "@/components/Footer";
import { MobileStickyCta } from "@/components/MobileStickyCta";
import { TechnicalReference } from "@/components/TechnicalReference";
import { WHATSAPP_DISPLAY } from "@/lib/whatsapp";
import { SITE_URL, siteConfig } from "@/lib/site-config";

const PATH = "/sistema-fotovoltaico-cbmgo";
const title = "Regularização de Sistema Fotovoltaico no CBMGO";
const description =
  "Análise de segurança contra incêndio para edificações com sistemas fotovoltaicos conforme a NT-44/2025 do CBMGO.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: PATH },
  openGraph: { title, description, url: `${SITE_URL}${PATH}` },
};

const FAQ = [
  {
    q: "O Corpo de Bombeiros possui regra específica para fotovoltaico em Goiás?",
    a: "Sim. O CBMGO possui norma técnica específica para segurança em sistemas fotovoltaicos.",
  },
  {
    q: "Preciso alterar todo o sistema?",
    a: "Não necessariamente. Primeiro é preciso comparar a instalação existente com os requisitos aplicáveis e identificar eventuais não conformidades.",
  },
  {
    q: "Pode ser necessária documentação adicional?",
    a: "Sim. Dependendo da configuração da instalação e da edificação, podem existir exigências de documentação e responsabilidade técnica que devem ser verificadas no caso concreto.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${SITE_URL}${PATH}#service`,
      name: "Regularização de Sistema Fotovoltaico no CBMGO",
      url: `${SITE_URL}${PATH}`,
      description,
      provider: { "@id": `${SITE_URL}/#organization` },
      serviceType: "Engenharia de segurança contra incêndio",
      areaServed: siteConfig.serviceCities.map((name) => ({
        "@type": "City",
        name,
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Town Fire", item: SITE_URL },
        {
          "@type": "ListItem",
          position: 2,
          name: "Sistemas fotovoltaicos",
          item: `${SITE_URL}${PATH}`,
        },
      ],
    },
  ],
};

export default function SistemaFotovoltaicoCbmgo() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header />

      <main className="flex-1">
        <section className="bg-espresso py-20 text-parchment lg:py-28">
          <div className="mx-auto max-w-3xl px-6 lg:px-10">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-brass">
              Fotovoltaico e segurança contra incêndio
            </p>
            <h1 className="mt-5 font-display text-4xl font-bold leading-[1.08] tracking-[-0.02em] sm:text-5xl">
              A geração solar também altera a leitura de segurança da
              edificação.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-parchment/80">
              A NT-44/2025 do CBMGO estabelece medidas de segurança contra
              incêndio para edificações e áreas de risco com sistemas
              fotovoltaicos. A Town Fire analisa a situação existente e
              identifica as medidas técnicas e documentais aplicáveis ao
              caso.
            </p>
            <WhatsAppLink
              intent="sistema_fotovoltaico"
              placement="fotovoltaico_hero"
              className="mt-10 inline-flex min-h-[52px] items-center rounded-full bg-rose px-7 font-display text-sm font-semibold uppercase tracking-[0.03em] text-espresso transition-colors hover:bg-rose-strong"
            >
              Analisar meu sistema fotovoltaico
            </WhatsAppLink>
          </div>
        </section>

        <section className="bg-parchment py-20">
          <div className="mx-auto max-w-3xl px-6 lg:px-10">
            <h2 className="font-display text-2xl font-bold leading-[1.2] text-espresso sm:text-3xl">
              Instalar placas não encerra a responsabilidade técnica.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-charcoal/75">
              O sistema fotovoltaico passa a integrar as condições de
              segurança da edificação. Configuração da instalação,
              sinalização, proteção, acesso e documentação precisam ser
              compatíveis com os requisitos aplicáveis.
            </p>

            <div className="mt-10 border-t border-brass/30 pt-8">
              <h3 className="font-display text-lg font-semibold text-espresso">
                Sistema existente ou nova instalação
              </h3>
              <p className="mt-3 text-base leading-relaxed text-charcoal/75">
                A análise pode ser feita tanto em edificações que já possuem
                geração fotovoltaica quanto em situações de implantação ou
                regularização. O escopo depende das características da
                edificação e do sistema.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-espresso py-20 text-parchment">
          <div className="mx-auto max-w-3xl px-6 lg:px-10">
            <h2 className="font-display text-3xl font-bold leading-[1.15] sm:text-4xl">
              Perguntas frequentes
            </h2>
            <WhatsAppLink
              intent="sistema_fotovoltaico"
              placement="fotovoltaico_final"
              className="mt-8 inline-flex min-h-[52px] items-center rounded-full bg-rose px-9 font-display text-base font-semibold uppercase tracking-[0.03em] text-espresso transition-colors hover:bg-rose-strong"
            >
              Avaliar meu sistema fotovoltaico
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

            <p className="mt-10 max-w-md border-t border-brass/25 pt-8 text-base leading-relaxed text-parchment/70">
              A adequação do sistema fotovoltaico costuma andar junto com a{" "}
              <Link
                href="/regularizacao-cbmgo-cercon"
                className="text-rose underline decoration-rose/40 underline-offset-2 hover:text-rose-strong"
              >
                regularização completa junto ao CBMGO
              </Link>
              .
            </p>
          </div>
        </section>

        <section className="bg-parchment py-10">
          <div className="mx-auto max-w-3xl px-6 lg:px-10">
            <TechnicalReference
              items={[
                {
                  norma: "NT-44/2025",
                  titulo: "Segurança em Sistemas Fotovoltaicos",
                },
              ]}
            />
          </div>
        </section>
      </main>

      <Footer />
      <MobileStickyCta
        intent="sistema_fotovoltaico"
        placement="fotovoltaico_sticky"
        label="Falar com a Town Fire"
      />
    </>
  );
}
