import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { Footer } from "@/components/Footer";
import { MobileStickyCta } from "@/components/MobileStickyCta";
import { TechnicalReference } from "@/components/TechnicalReference";
import { WHATSAPP_DISPLAY } from "@/lib/whatsapp";
import { SITE_URL, siteConfig } from "@/lib/site-config";

const PATH = "/save-carregadores-veiculos-eletricos";
const title = "Regularização de Carregadores de Veículos Elétricos no CBMGO";
const description =
  "Análise e regularização de sistemas de recarga de veículos eletrificados conforme a NT-45/2026 do CBMGO.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: PATH },
  openGraph: { title, description, url: `${SITE_URL}${PATH}` },
};

const WHERE = [
  "Condomínios residenciais",
  "Estacionamentos",
  "Empresas",
  "Garagens comerciais",
  "Edificações com pontos de recarga existentes",
  "Novas instalações de recarga",
];

const FAQ = [
  {
    q: "O condomínio precisa remover os carregadores?",
    a: "Não existe uma resposta única. A necessidade de intervenção depende das condições da instalação e do atendimento aos requisitos aplicáveis.",
  },
  {
    q: "Uma instalação existente também precisa ser analisada?",
    a: "Sim. A situação precisa ser avaliada considerando a instalação existente, as características da edificação e os requisitos atualmente aplicáveis.",
  },
  {
    q: "Quem instalou o carregador pode resolver toda a regularização?",
    a: "A instalação elétrica e a regularização de segurança contra incêndio envolvem requisitos e responsabilidades próprios. O escopo e a habilitação dos profissionais envolvidos precisam ser verificados em cada caso.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${SITE_URL}${PATH}#service`,
      name: "Regularização de Carregadores de Veículos Elétricos (SAVE)",
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
          name: "SAVE e veículos elétricos",
          item: `${SITE_URL}${PATH}`,
        },
      ],
    },
  ],
};

export default function SaveCarregadoresVeiculosEletricos() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header />

      <main className="flex-1">
        <section id="top" className="bg-espresso py-20 text-parchment lg:py-28">
          <div className="mx-auto max-w-3xl px-6 lg:px-10">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-brass">
              SAVE e veículos elétricos
            </p>
            <h1 className="mt-5 font-display text-4xl font-bold leading-[1.08] tracking-[-0.02em] sm:text-5xl">
              Carregador instalado também passou a fazer parte da segurança
              da edificação.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-parchment/80">
              A NT-45/2026 do CBMGO estabelece requisitos de segurança contra
              incêndio para sistemas de recarga de veículos eletrificados. A
              Town Fire analisa a situação existente e organiza o caminho
              técnico para adequação e regularização.
            </p>
            <WhatsAppLink
              intent="save_veiculos_eletricos"
              placement="save_hero"
              className="mt-10 inline-flex min-h-[52px] items-center rounded-full bg-rose px-7 font-display text-sm font-semibold uppercase tracking-[0.03em] text-espresso transition-colors hover:bg-rose-strong"
            >
              Analisar os carregadores do imóvel
            </WhatsAppLink>
          </div>
        </section>

        <section className="bg-parchment py-20">
          <div className="mx-auto max-w-4xl px-6 lg:px-10">
            <h2 className="font-display text-3xl font-bold leading-[1.15] text-espresso sm:text-4xl">
              Onde essa demanda aparece
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-px border border-brass/30 bg-brass/30 sm:grid-cols-2 lg:grid-cols-3">
              {WHERE.map((item) => (
                <div key={item} className="bg-parchment p-6">
                  <p className="text-base leading-relaxed text-charcoal/75">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-espresso py-20 text-parchment">
          <div className="mx-auto max-w-3xl px-6 lg:px-10">
            <h2 className="font-display text-2xl font-bold leading-[1.2] sm:text-3xl">
              O que precisa ser observado
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-parchment/80">
              A análise pode envolver condições da instalação elétrica,
              posicionamento dos pontos de recarga, dispositivos de proteção,
              desligamento, sinalização, rotas de fuga e documentação técnica
              exigida para o caso.
            </p>

            <div className="mt-10 border-t border-brass/30 pt-8">
              <h3 className="font-display text-lg font-semibold">
                Laudo e responsabilidade técnica
              </h3>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-parchment/75">
                Dependendo da situação, o processo pode exigir documentação
                técnica da instalação e responsabilidade profissional. O
                primeiro passo é identificar o cenário existente e verificar
                quais requisitos se aplicam àquela edificação.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-parchment py-20">
          <div className="mx-auto max-w-3xl px-6 lg:px-10">
            <h2 className="font-display text-3xl font-bold leading-[1.15] text-espresso sm:text-4xl">
              Perguntas frequentes
            </h2>

            <dl className="mt-10 divide-y divide-brass/25 border-t border-brass/25">
              {FAQ.map((item) => (
                <div key={item.q} className="py-6">
                  <dt className="font-display text-base font-semibold text-espresso">
                    {item.q}
                  </dt>
                  <dd className="mt-2 text-base leading-relaxed text-charcoal/70">
                    {item.a}
                  </dd>
                </div>
              ))}
            </dl>

            <WhatsAppLink
              intent="save_veiculos_eletricos"
              placement="save_final"
              className="mt-10 inline-flex min-h-[52px] items-center rounded-full bg-rose px-9 font-display text-base font-semibold uppercase tracking-[0.03em] text-espresso transition-colors hover:bg-rose-strong"
            >
              Avaliar meu sistema de recarga
            </WhatsAppLink>
            <p className="mt-6 text-sm text-charcoal/60">
              WhatsApp oficial: {WHATSAPP_DISPLAY}
            </p>

            <p className="mt-10 max-w-md text-base leading-relaxed text-charcoal/70">
              A adequação de carregadores costuma andar junto com a{" "}
              <Link
                href="/regularizacao-cbmgo-cercon"
                className="text-rose underline decoration-rose/40 underline-offset-2 hover:text-rose-strong"
              >
                regularização completa junto ao CBMGO
              </Link>
              .
            </p>

            <TechnicalReference
              items={[
                {
                  norma: "NT-45/2026",
                  titulo: "Sistemas de Recarga de Veículos Eletrificados",
                  vigencia: "em vigor desde 01/06/2026",
                  url: "https://www.bombeiros.go.gov.br/wp-content/uploads/2026/05/NT-45_2026_-_Sistema_de_recarga_para_veiculos_eletrificados.pdf",
                },
              ]}
            />
          </div>
        </section>
      </main>

      <Footer />
      <MobileStickyCta
        intent="save_veiculos_eletricos"
        placement="save_sticky"
        label="Falar com a Town Fire"
      />
    </>
  );
}
