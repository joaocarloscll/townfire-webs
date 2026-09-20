import Image from "next/image";
import Link from "next/link";
import { WhatsAppLink } from "./WhatsAppLink";
import { Reveal } from "./Reveal";
import projetoImg from "@/imgs/projeto.jpeg";
import ppciImg from "@/imgs/ppci.jpeg";
import avcbImg from "@/imgs/avcb.jpeg";
import clcbImg from "@/imgs/clcb.jpeg";
import regularizacaoImg from "@/imgs/regularizacao.jpeg";
import vistoriaImg from "@/imgs/vistoria.jpeg";

// ATO 03 | Soluções. Grade de serviços concretos, pensada para caber numa
// única dobra em desktop. Cinco dos seis cards levam para a página orgânica
// correspondente (link HTML real, não só WhatsApp — ver seção 18 do
// briefing de arquitetura); vistoria não tem página própria nesta etapa,
// então mantém o CTA de WhatsApp direto.
const SERVICES = [
  {
    slug: "projeto",
    title: "Projeto de Incêndio",
    text: "Projeto técnico das medidas de segurança contra incêndio exigidas para a edificação.",
    image: projetoImg,
    // Ancoragem vertical manual: a foto é 4:3 e o card corta pra 3:1, então o
    // recorte automático (centro) apara quase metade da imagem. Cada valor
    // abaixo foi calibrado olhando o enquadramento real de cada foto.
    imagePosition: "50% 40%",
    href: "/projeto-de-incendio-pscip",
  },
  {
    slug: "pscip",
    title: "PSCIP",
    text: "Projeto de Segurança Contra Incêndio e Pânico desenvolvido conforme o enquadramento e as exigências aplicáveis ao imóvel.",
    image: ppciImg,
    imagePosition: "50% 52%",
    href: "/projeto-de-incendio-pscip",
  },
  {
    slug: "cercon",
    title: "CERCON",
    text: "Acompanhamento técnico para obtenção ou renovação do Certificado de Conformidade junto ao CBMGO.",
    image: avcbImg,
    imagePosition: "50% 50%",
    href: "/regularizacao-cbmgo-cercon",
  },
  {
    slug: "licenciamento-facilitado",
    title: "Licenciamento Facilitado",
    text: "Regularização simplificada para empreendimentos que atendem aos critérios definidos pelo CBMGO.",
    image: clcbImg,
    imagePosition: "50% 28%",
    href: "/regularizacao-cbmgo-cercon#licenciamento-facilitado",
  },
  {
    slug: "regularizacao",
    title: "Regularização completa",
    text: "Análise, projeto, documentação, protocolo, resposta a exigências e acompanhamento das etapas contratadas.",
    image: regularizacaoImg,
    imagePosition: "50% 45%",
    href: "/regularizacao-cbmgo-cercon",
  },
  {
    slug: "vistoria",
    title: "Vistoria e Laudo Técnico",
    text: "Inspeção das condições existentes, identificação de não conformidades e emissão da documentação técnica prevista no escopo contratado.",
    image: vistoriaImg,
    imagePosition: "50% 58%",
    href: null,
  },
];

// Demandas técnicas recentes: bloco editorial leve, sem foto e sem ícone
// novo — texto e link apenas, no mesmo grid hairline do resto da seção.
const DEMANDS = [
  {
    slug: "save",
    title: "Sistemas de recarga de veículos elétricos",
    text: "Avaliação e regularização de instalações com carregadores de veículos eletrificados conforme as exigências de segurança contra incêndio do CBMGO.",
    href: "/save-carregadores-veiculos-eletricos",
    linkLabel: "Entender SAVE e carregadores",
  },
  {
    slug: "fotovoltaico",
    title: "Sistemas fotovoltaicos",
    text: "Análise das exigências de segurança contra incêndio aplicáveis a edificações com sistemas de energia solar fotovoltaica.",
    href: "/sistema-fotovoltaico-cbmgo",
    linkLabel: "Entender sistemas fotovoltaicos",
  },
];

export function SolutionsSection() {
  return (
    <section id="solucoes" className="bg-parchment py-10 sm:py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-rose">
              Serviços
            </p>
            <h2 className="mt-2 max-w-xl font-display text-2xl font-bold leading-[1.15] tracking-[-0.01em] text-espresso sm:text-3xl">
              Escolha o que seu imóvel precisa.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-charcoal/70">
            Se você já sabe o que precisa, escolha abaixo. Se não souber,{" "}
            <WhatsAppLink
              intent="institutional_general"
              placement="home_servicos_intro"
              className="text-rose underline decoration-rose/40 underline-offset-2 hover:text-rose-strong"
            >
              fale com a gente
            </WhatsAppLink>
            .
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <article
              key={service.slug}
              className="group border border-brass/30 bg-parchment"
            >
              <div className="relative aspect-[3/1] overflow-hidden border-b border-brass/30">
                <Image
                  src={service.image}
                  alt={`${service.title} — Town Fire`}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  style={{ objectPosition: service.imagePosition }}
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-4">
                <Reveal delayMs={i * 40}>
                  <h3 className="font-display text-base font-semibold text-espresso">
                    {service.title}
                  </h3>
                  <p className="mt-1.5 text-[13px] leading-snug text-charcoal/70">
                    {service.text}
                  </p>
                  {service.href ? (
                    <Link
                      href={service.href}
                      aria-label={`Entender o serviço: ${service.title}`}
                      className="mt-2 inline-flex min-h-[28px] items-center font-display text-xs font-semibold uppercase tracking-[0.06em] text-rose hover:text-rose-strong"
                    >
                      Entender este serviço
                    </Link>
                  ) : (
                    <div className="mt-2 flex flex-col items-start gap-1">
                      <WhatsAppLink
                        intent="institutional_general"
                        placement={`home_servicos_${service.slug}`}
                        className="inline-flex min-h-[28px] items-center font-display text-xs font-semibold uppercase tracking-[0.06em] text-rose hover:text-rose-strong"
                      >
                        Falar sobre vistoria
                      </WhatsAppLink>
                      <Link
                        href="/regularizacao-cbmgo-cercon"
                        className="inline-flex min-h-[24px] items-center font-body text-xs text-charcoal/50 underline decoration-charcoal/25 underline-offset-2 hover:text-charcoal/80"
                      >
                        Ver regularização completa
                      </Link>
                    </div>
                  )}
                </Reveal>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 border-t border-brass/30 pt-8">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-rose">
            Demandas técnicas atuais
          </p>
          <h3 className="mt-2 max-w-lg font-display text-xl font-semibold leading-[1.2] text-espresso sm:text-2xl">
            Novas exigências também precisam de leitura técnica.
          </h3>

          <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10">
            {DEMANDS.map((item) => (
              <div key={item.slug}>
                <h4 className="font-display text-base font-semibold text-espresso">
                  {item.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-charcoal/70">
                  {item.text}
                </p>
                <Link
                  href={item.href}
                  className="mt-3 inline-flex min-h-[28px] items-center font-display text-xs font-semibold uppercase tracking-[0.06em] text-rose hover:text-rose-strong"
                >
                  {item.linkLabel}
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-col items-start gap-4 border-t border-brass/30 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-display text-base font-semibold text-espresso">
            Comércios. Condomínios. Galpões. Indústrias.
          </p>
          <WhatsAppLink
            intent="institutional_general"
            placement="home_solucoes"
            className="inline-flex min-h-[44px] shrink-0 items-center rounded-full bg-rose px-6 font-display text-xs font-semibold uppercase tracking-[0.03em] text-espresso transition-colors hover:bg-rose-strong"
          >
            Entender o que meu imóvel precisa
          </WhatsAppLink>
        </div>
      </div>
    </section>
  );
}
