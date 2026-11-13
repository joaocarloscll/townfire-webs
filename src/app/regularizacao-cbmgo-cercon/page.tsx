import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { QuoteCta } from "@/components/QuoteCta";
import { Footer } from "@/components/Footer";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { TechnicalReference } from "@/components/TechnicalReference";
import { WHATSAPP_DISPLAY } from "@/lib/whatsapp";
import { SITE_URL, siteConfig } from "@/lib/site-config";
import { faqPageSchema, pageSocial } from "@/lib/seo";

const PATH = "/regularizacao-cbmgo-cercon";
const title = "Regularização no Corpo de Bombeiros e CERCON em Goiânia";
const description =
  "Regularização no CBMGO e CERCON em Goiânia e região: análise de pendências, PSCIP, adequações e vistoria contra incêndio para condomínios.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: PATH },
  ...pageSocial({ title, description, path: PATH }),
};

const SITUATIONS = [
  "Vou abrir um estabelecimento",
  "O imóvel já está funcionando",
  "Preciso renovar a regularização",
  "Recebi uma exigência",
  "Houve reforma ou ampliação",
  "Não sei qual procedimento se aplica",
];

const STEPS = [
  "Situação atual",
  "Enquadramento",
  "Documentação e engenharia",
  "Adequações necessárias",
  "Processo e exigências previstas no escopo",
];

const CONDO_AREAS = [
  "Garagens e estacionamentos",
  "Halls, corredores e escadas",
  "Casa de bombas, casa de máquinas e áreas técnicas",
  "Salão de festas, academia e áreas de lazer",
  "Central de gás e depósitos",
  "Pontos de recarga de veículos elétricos, quando houver",
];

const CONDO_SYSTEMS = [
  "Extintores",
  "Hidrantes e mangotinhos",
  "Iluminação de emergência",
  "Sinalização de emergência",
  "Saídas, rotas de fuga e portas corta-fogo",
  "Detecção e alarme de incêndio",
  "Chuveiros automáticos, quando existentes",
  "Central de GLP e rede de gás",
];

const CONDO_DELIVERABLES = [
  "Relatório da vistoria com a condição de cada sistema verificado",
  "Lista das adequações necessárias, em ordem de prioridade",
  "Indicação de quando o caso pede projeto (PSCIP)",
  "Orientação sobre o caminho de regularização no CBMGO e o CERCON",
];

const FAQ = [
  {
    q: "Posso regularizar um imóvel que já está funcionando?",
    a: "Sim, mas o caminho depende das condições atuais da edificação e do procedimento aplicável ao caso.",
  },
  {
    q: "Recebi uma exigência do Corpo de Bombeiros. E agora?",
    a: "Envie o documento. A exigência precisa ser analisada tecnicamente para identificar o que deve ser corrigido, complementado ou esclarecido.",
  },
  {
    q: "A Town Fire faz vistoria em condomínio?",
    a: "Sim. A vistoria avalia garagens e áreas comuns e verifica os sistemas de segurança contra incêndio. O que o síndico recebe depende do serviço contratado e é definido no orçamento.",
  },
  {
    q: "CERCON e PSCIP são a mesma coisa?",
    a: "Não. O PSCIP é o projeto técnico de segurança contra incêndio e pânico. O CERCON é o Certificado de Conformidade emitido no processo de regularização do CBMGO.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    faqPageSchema(FAQ),
    {
      "@type": "Service",
      "@id": `${SITE_URL}${PATH}#service`,
      name: "Regularização no CBMGO e CERCON",
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
          name: "Regularização no Corpo de Bombeiros e CERCON",
          item: `${SITE_URL}${PATH}`,
        },
      ],
    },
  ],
};

export default function RegularizacaoCbmgoCercon() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header intent="regularizacao_cbmgo" placement="regularizacao_cbmgo_header" />

      <main className="flex-1">
        <section id="top" className="bg-espresso py-20 text-parchment lg:py-28">
          <div className="mx-auto max-w-3xl px-6 lg:px-10">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-brass">
              Regularização junto ao CBMGO
            </p>
            <h1 className="mt-5 font-display text-4xl font-bold leading-[1.08] tracking-[-0.02em] sm:text-5xl">
              Regularização no Corpo de Bombeiros e CERCON em Goiânia
            </h1>
            <p className="mt-6 max-w-xl font-display text-xl font-semibold leading-snug text-parchment/90 sm:text-2xl">
              Regularizar não começa no protocolo. Começa entendendo a
              situação do imóvel.
            </p>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-parchment/80">
              A Town Fire analisa a edificação, identifica o procedimento
              aplicável e organiza o caminho técnico entre a situação atual e
              a regularização junto ao Corpo de Bombeiros Militar do Estado
              de Goiás.
            </p>
            <QuoteCta
              intent="regularizacao_cbmgo"
              placement="regularizacao_cbmgo_hero"
            />
          </div>
        </section>

        <section className="bg-parchment py-20">
          <div className="mx-auto max-w-4xl px-6 lg:px-10">
            <h2 className="font-display text-3xl font-bold leading-[1.15] text-espresso sm:text-4xl">
              Seu imóvel pode estar em momentos diferentes.
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-px border border-brass/30 bg-brass/30 sm:grid-cols-2 lg:grid-cols-3">
              {SITUATIONS.map((item) => (
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
              CERCON
            </h2>
            <p className="mt-4 text-base leading-relaxed text-parchment/80">
              Em Goiás, o CBMGO utiliza o Certificado de Conformidade —
              CERCON — na certificação das edificações regularizadas. A
              necessidade de projeto, vistoria, documentação e adequações
              depende do enquadramento de cada caso.
            </p>

            <div className="mt-10 border-t border-brass/30 pt-8">
              <h3 className="font-display text-lg font-semibold">
                Procurando AVCB em Goiás?
              </h3>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-parchment/75">
                AVCB é uma denominação utilizada em outros estados. Em Goiás,
                a certificação e os procedimentos seguem a regulamentação do
                CBMGO, incluindo PSCIP e CERCON conforme o caso.
              </p>
            </div>
          </div>
        </section>

        <section
          id="licenciamento-facilitado"
          className="bg-parchment py-20"
        >
          <div className="mx-auto max-w-3xl px-6 lg:px-10">
            <h2 className="font-display text-2xl font-bold leading-[1.2] text-espresso sm:text-3xl">
              Licenciamento Facilitado
            </h2>
            <p className="mt-4 text-base leading-relaxed text-charcoal/75">
              O Licenciamento Facilitado é um procedimento previsto pelo
              CBMGO para atividades e edificações que atendem aos critérios
              definidos na regulamentação. O enquadramento deve ser
              verificado antes de assumir que o procedimento simplificado é
              aplicável.
            </p>

            <TechnicalReference
              items={[
                {
                  norma: "NT-01/2026",
                  titulo:
                    "Procedimentos Administrativos e Medidas de Segurança Contra Incêndio e Pânico",
                  url: "https://www.bombeiros.go.gov.br/wp-content/uploads/2026/05/NT-01_2026_-_Procedimentos_Administrativos.pdf",
                },
              ]}
            />
          </div>
        </section>

        <section
          id="vistoria-condominios"
          className="scroll-mt-20 border-y border-brass/30 bg-white py-20"
        >
          <div className="mx-auto max-w-4xl px-6 lg:px-10">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-rose-strong">
              Para síndicos e administradoras
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-[1.15] text-espresso sm:text-4xl">
              Vistoria contra incêndio para condomínios
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-charcoal/75">
              Em condomínios residenciais e comerciais, a Town Fire vistoria
              as garagens e as áreas comuns, verifica os sistemas de
              segurança contra incêndio e organiza o que precisa de atenção
              para manter o condomínio regular junto ao CBMGO.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-px border border-brass/30 bg-brass/30 md:grid-cols-3">
              {[
                { titulo: "Onde avaliamos", itens: CONDO_AREAS },
                { titulo: "Sistemas no escopo", itens: CONDO_SYSTEMS },
                {
                  titulo: "O que o síndico recebe",
                  itens: CONDO_DELIVERABLES,
                },
              ].map((bloco) => (
                <div key={bloco.titulo} className="bg-white p-6">
                  <h3 className="font-display text-base font-semibold text-espresso">
                    {bloco.titulo}
                  </h3>
                  <ul className="mt-4 space-y-2.5">
                    {bloco.itens.map((item) => (
                      <li
                        key={item}
                        className="relative pl-5 text-sm leading-relaxed text-charcoal/75 before:absolute before:left-0 before:top-[0.6em] before:h-1.5 before:w-1.5 before:rounded-[2px] before:bg-rose"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-charcoal/60">
              O conteúdo da entrega depende do serviço contratado e é
              definido no orçamento. Se a garagem tem carregadores de
              veículos elétricos, veja também a{" "}
              <Link
                href="/save-carregadores-veiculos-eletricos"
                className="text-rose-strong underline decoration-rose/40 underline-offset-2 hover:text-espresso"
              >
                regularização de carregadores
              </Link>
              .
            </p>

            <QuoteCta
              intent="vistoria_condominio"
              placement="regularizacao_cbmgo_condominios"
              tone="light"
            />
          </div>
        </section>

        <section className="bg-espresso py-20 text-parchment">
          <div className="mx-auto max-w-3xl px-6 lg:px-10">
            <h2 className="font-display text-3xl font-bold leading-[1.15] sm:text-4xl">
              O caminho
            </h2>
            <ol className="mt-10 border-l border-brass/40 pl-8">
              {STEPS.map((step, i) => (
                <li key={step} className="relative pb-8 last:pb-0">
                  <span
                    aria-hidden
                    className={`absolute -left-[35px] top-1.5 block h-3 w-3 rounded-full border ${
                      i === STEPS.length - 1
                        ? "border-rose bg-rose"
                        : "border-brass bg-espresso"
                    }`}
                  />
                  <span className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-brass">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-2 text-base leading-relaxed text-parchment/75">
                    {step}
                  </p>
                </li>
              ))}
            </ol>

            <p className="mt-10 max-w-md border-t border-brass/30 pt-8 text-base leading-relaxed text-parchment/70">
              Quando o enquadramento exige projeto, conheça como
              desenvolvemos o{" "}
              <Link
                href="/projeto-de-incendio-pscip"
                className="text-rose underline decoration-rose/40 underline-offset-2 hover:text-rose-strong"
              >
                PSCIP
              </Link>
              .
            </p>
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

            <QuoteCta
              intent="regularizacao_cbmgo"
              placement="regularizacao_cbmgo_final"
              size="final"
              tone="light"
            />
            <p className="mt-6 text-sm text-charcoal/60">
              WhatsApp oficial: {WHATSAPP_DISPLAY}
            </p>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFab
        intent="regularizacao_cbmgo"
        placement="regularizacao_cbmgo_fab"
      />
    </>
  );
}
