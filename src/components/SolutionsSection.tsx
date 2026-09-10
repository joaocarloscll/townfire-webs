import Image from "next/image";
import { WhatsAppLink } from "./WhatsAppLink";
import { Reveal } from "./Reveal";
import projetoImg from "@/imgs/projeto.jpeg";
import ppciImg from "@/imgs/ppci.jpeg";
import avcbImg from "@/imgs/avcb.jpeg";
import clcbImg from "@/imgs/clcb.jpeg";
import regularizacaoImg from "@/imgs/regularizacao.jpeg";
import vistoriaImg from "@/imgs/vistoria.jpeg";

// ATO 03 | Soluções. Três frentes, um CTA primário na seção.
const FRONTS = [
  {
    title: "Diagnóstico do imóvel",
    text: "Leitura do imóvel, da atividade e dos documentos disponíveis para definir enquadramento, prioridade e escopo.",
    diagram: <path d="M4 28 H60 M4 28 V8 M18 28 V16 M32 28 V20" />,
  },
  {
    title: "Projeto de segurança contra incêndio",
    text: "Desenvolvimento da solução técnica compatível com a edificação, a operação e as exigências aplicáveis.",
    diagram: <path d="M4 28 H60 M12 28 V10 H44 V28 M28 10 V28" />,
  },
  {
    title: "Regularização e exigências",
    text: "Organização das respostas, dos protocolos e das etapas contratadas até a conclusão do processo.",
    diagram: <path d="M4 24 H24 M24 24 V10 H44 M44 10 H60" />,
  },
];

// Grade de serviços concretos, com foto real de campo. Cada card tem um link
// secundário (texto, sem preenchimento) — o CTA primário da seção continua
// único, no fechamento abaixo da grade.
const SERVICES = [
  {
    slug: "projeto",
    eyebrow: "Projeto",
    title: "Projeto de Incêndio",
    text: "Projeto técnico das medidas de segurança contra incêndio exigidas para o imóvel, pronto para protocolo no Corpo de Bombeiros.",
    image: projetoImg,
    cta: "Falar sobre projeto",
  },
  {
    slug: "ppci",
    eyebrow: "PPCI",
    title: "PPCI",
    text: "Plano de Prevenção e Combate a Incêndio: sistemas, equipamentos e documentação técnica exigidos para a atividade.",
    image: ppciImg,
    cta: "Falar sobre PPCI",
  },
  {
    slug: "avcb",
    eyebrow: "AVCB",
    title: "AVCB",
    text: "Acompanhamento técnico completo para emissão ou renovação do Auto de Vistoria do Corpo de Bombeiros.",
    image: avcbImg,
    cta: "Falar sobre AVCB",
  },
  {
    slug: "clcb",
    eyebrow: "CLCB",
    title: "CLCB",
    text: "Regularização simplificada para imóveis de baixo risco que se enquadram nesse procedimento.",
    image: clcbImg,
    cta: "Falar sobre CLCB",
  },
  {
    slug: "regularizacao",
    eyebrow: "Regularização",
    title: "Regularização completa",
    text: "Análise, projeto, documentação, protocolo e acompanhamento do processo do início ao fim.",
    image: regularizacaoImg,
    cta: "Quero regularizar",
  },
  {
    slug: "vistoria",
    eyebrow: "Vistoria e laudo",
    title: "Vistoria e Laudo Técnico",
    text: "Inspeção dos sistemas e equipamentos existentes, com testes quando previstos no escopo e emissão de laudo técnico.",
    image: vistoriaImg,
    cta: "Falar sobre vistoria",
  },
];

export function SolutionsSection() {
  return (
    <section id="solucoes" className="bg-parchment py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <h2 className="max-w-2xl font-display text-3xl font-bold leading-[1.15] tracking-[-0.01em] text-espresso sm:text-4xl">
          Da primeira leitura à regularização.
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-px border border-brass/30 bg-brass/30 lg:grid-cols-3">
          {FRONTS.map((front, i) => (
            <article key={front.title} className="bg-parchment p-8">
              <Reveal delayMs={i * 90}>
                <svg
                  viewBox="0 0 64 32"
                  className="h-8 w-16 stroke-rose"
                  fill="none"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  aria-hidden
                  focusable="false"
                >
                  {front.diagram}
                </svg>
                <h3 className="mt-6 font-display text-xl font-semibold text-espresso">
                  {front.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-charcoal/70">
                  {front.text}
                </p>
              </Reveal>
            </article>
          ))}
        </div>

        <div className="mt-20">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-rose">
            Serviços
          </p>
          <h3 className="mt-3 max-w-xl font-display text-2xl font-bold leading-[1.15] tracking-[-0.01em] text-espresso sm:text-3xl">
            Escolha o que seu imóvel precisa.
          </h3>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-charcoal/70">
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

        <div className="mt-10 grid grid-cols-1 gap-px border border-brass/30 bg-brass/30 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <article key={service.slug} className="group bg-parchment">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={service.image}
                  alt={`${service.title} — Town Fire`}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-8">
                <Reveal delayMs={i * 60}>
                  <p className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-rose">
                    {service.eyebrow}
                  </p>
                  <h4 className="mt-2 font-display text-xl font-semibold text-espresso">
                    {service.title}
                  </h4>
                  <p className="mt-3 text-base leading-relaxed text-charcoal/70">
                    {service.text}
                  </p>
                  <WhatsAppLink
                    intent="institutional_general"
                    placement={`home_servicos_${service.slug}`}
                    className="mt-5 inline-flex min-h-[44px] items-center font-display text-xs font-semibold uppercase tracking-[0.06em] text-rose hover:text-rose-strong"
                  >
                    {service.cta}
                  </WhatsAppLink>
                </Reveal>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start gap-6 border-t border-brass/30 pt-12 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-display text-lg font-semibold text-espresso">
            Comércios. Serviços. Galpões. Indústrias.
          </p>
          <WhatsAppLink
            intent="institutional_general"
            placement="home_solucoes"
            className="inline-flex min-h-[52px] shrink-0 items-center rounded-full bg-rose px-7 font-display text-sm font-semibold uppercase tracking-[0.03em] text-espresso transition-colors hover:bg-rose-strong"
          >
            Entender o que meu imóvel precisa
          </WhatsAppLink>
        </div>
      </div>
    </section>
  );
}
