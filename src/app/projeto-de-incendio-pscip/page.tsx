import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { Footer } from "@/components/Footer";
import { MobileStickyCta } from "@/components/MobileStickyCta";
import { WHATSAPP_DISPLAY } from "@/lib/whatsapp";
import { SITE_URL, siteConfig } from "@/lib/site-config";

const PATH = "/projeto-de-incendio-pscip";
const title = "Projeto de Incêndio e PSCIP para o CBMGO";
const description =
  "Projeto de incêndio e PSCIP para regularização de comércios, condomínios, galpões e indústrias junto ao CBMGO em Goiânia e região.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: PATH },
  openGraph: { title, description, url: `${SITE_URL}${PATH}` },
};

const MEASURES = [
  "Saídas e rotas de emergência",
  "Extintores",
  "Hidrantes e mangotinhos",
  "Sinalização de emergência",
  "Iluminação de emergência",
  "Detecção e alarme",
  "Compartimentação",
  "Outras medidas exigidas para o caso",
];

const STEPS = [
  "Entender o imóvel",
  "Definir o enquadramento",
  "Desenvolver o PSCIP",
  "Tratar ajustes e exigências previstas no escopo",
  "Acompanhar as etapas contratadas",
];

const FAQ = [
  {
    q: "O que é PSCIP?",
    a: "PSCIP é o Projeto de Segurança Contra Incêndio e Pânico utilizado no processo técnico do CBMGO para representar e dimensionar as medidas de segurança aplicáveis à edificação.",
  },
  {
    q: "Todo imóvel precisa de PSCIP?",
    a: "Não. O procedimento depende das características e do enquadramento da edificação. A análise inicial serve justamente para identificar o caminho correto.",
  },
  {
    q: "Já tenho um projeto antigo. Ele pode ser aproveitado?",
    a: "Depende da situação do projeto, das características atuais da edificação e das alterações realizadas no imóvel. O material existente deve ser analisado antes de definir o próximo passo.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${SITE_URL}${PATH}#service`,
      name: "Projeto de Incêndio e PSCIP",
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
          name: "Projeto de Incêndio e PSCIP",
          item: `${SITE_URL}${PATH}`,
        },
      ],
    },
  ],
};

export default function ProjetoDeIncendioPscip() {
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
              Projeto de incêndio e PSCIP
            </p>
            <h1 className="mt-5 font-display text-4xl font-bold leading-[1.08] tracking-[-0.02em] sm:text-5xl">
              O projeto começa pelo enquadramento correto do imóvel.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-parchment/80">
              Área, ocupação, altura, riscos e configuração da edificação
              definem quais medidas de segurança contra incêndio precisam ser
              previstas. A Town Fire transforma essa leitura técnica em um
              PSCIP compatível com o processo de regularização no CBMGO.
            </p>
            <WhatsAppLink
              intent="projeto_pscip"
              placement="projeto_pscip_hero"
              className="mt-10 inline-flex min-h-[52px] items-center rounded-full bg-rose px-7 font-display text-sm font-semibold uppercase tracking-[0.03em] text-espresso transition-colors hover:bg-rose-strong"
            >
              Analisar meu imóvel
            </WhatsAppLink>
          </div>
        </section>

        <section className="bg-parchment py-20">
          <div className="mx-auto max-w-3xl px-6 lg:px-10">
            <h2 className="font-display text-3xl font-bold leading-[1.15] text-espresso sm:text-4xl">
              Antes do desenho, vem a decisão.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-charcoal/75">
              Dois imóveis com áreas semelhantes podem exigir soluções
              diferentes. Por isso, o trabalho começa pela leitura da
              ocupação, das características construtivas, dos riscos
              existentes e da situação atual da edificação.
            </p>
          </div>
        </section>

        <section className="bg-espresso py-20 text-parchment">
          <div className="mx-auto max-w-3xl px-6 lg:px-10">
            <h2 className="font-display text-3xl font-bold leading-[1.15] sm:text-4xl">
              O que pode fazer parte do projeto
            </h2>
            <ul className="mt-10 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
              {MEASURES.map((item) => (
                <li
                  key={item}
                  className="border-l-2 border-brass/40 pl-4 text-base leading-relaxed text-parchment/80"
                >
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-parchment/60">
              As medidas aplicáveis dependem do enquadramento da edificação.
            </p>
          </div>
        </section>

        <section className="bg-parchment py-20">
          <div className="mx-auto max-w-3xl px-6 lg:px-10">
            <h2 className="font-display text-3xl font-bold leading-[1.15] text-espresso sm:text-4xl">
              Como a Town Fire conduz
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

            <p className="mt-10 max-w-md border-t border-brass/30 pt-8 text-base leading-relaxed text-charcoal/70">
              Sua regularização não termina no projeto. Conheça a{" "}
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

        <section className="bg-espresso py-20 text-parchment">
          <div className="mx-auto max-w-3xl px-6 lg:px-10">
            <h2 className="font-display text-3xl font-bold leading-[1.15] sm:text-4xl">
              Perguntas frequentes
            </h2>
            <WhatsAppLink
              intent="projeto_pscip"
              placement="projeto_pscip_final"
              className="mt-8 inline-flex min-h-[52px] items-center rounded-full bg-rose px-9 font-display text-base font-semibold uppercase tracking-[0.03em] text-espresso transition-colors hover:bg-rose-strong"
            >
              Enviar meu caso para análise
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
        intent="projeto_pscip"
        placement="projeto_pscip_sticky"
        label="Falar com a Town Fire"
      />
    </>
  );
}
