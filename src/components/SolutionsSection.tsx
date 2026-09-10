import Image from "next/image";
import { WhatsAppLink } from "./WhatsAppLink";
import { Reveal } from "./Reveal";
import projetoImg from "@/imgs/projeto.jpeg";
import ppciImg from "@/imgs/ppci.jpeg";
import avcbImg from "@/imgs/avcb.jpeg";
import clcbImg from "@/imgs/clcb.jpeg";
import regularizacaoImg from "@/imgs/regularizacao.jpeg";
import vistoriaImg from "@/imgs/vistoria.jpeg";

// ATO 03 | Soluções. Grade de serviços concretos, pensada para caber numa
// única dobra em desktop. Cada card tem um link secundário (texto, sem
// preenchimento) — o CTA primário da seção continua único, no fechamento.
const SERVICES = [
  {
    slug: "projeto",
    title: "Projeto de Incêndio",
    text: "Projeto técnico das medidas de segurança contra incêndio exigidas para o imóvel.",
    image: projetoImg,
    // Ancoragem vertical manual: a foto é 4:3 e o card corta pra 3:1, então o
    // recorte automático (centro) apara quase metade da imagem. Cada valor
    // abaixo foi calibrado olhando o enquadramento real de cada foto — ver
    // referência de enquadramento na PR.
    imagePosition: "50% 40%",
    cta: "Falar sobre projeto",
  },
  {
    slug: "ppci",
    title: "PPCI",
    text: "Sistemas, equipamentos e documentação de prevenção e combate a incêndio.",
    image: ppciImg,
    imagePosition: "50% 52%",
    cta: "Falar sobre PPCI",
  },
  {
    slug: "avcb",
    title: "AVCB",
    text: "Acompanhamento técnico para emissão ou renovação do AVCB.",
    image: avcbImg,
    imagePosition: "50% 50%",
    cta: "Falar sobre AVCB",
  },
  {
    slug: "clcb",
    title: "CLCB",
    text: "Regularização simplificada quando o imóvel se enquadra nesse procedimento.",
    image: clcbImg,
    imagePosition: "50% 28%",
    cta: "Falar sobre CLCB",
  },
  {
    slug: "regularizacao",
    title: "Regularização completa",
    text: "Análise, projeto, documentação, protocolo e acompanhamento do processo.",
    image: regularizacaoImg,
    imagePosition: "50% 45%",
    cta: "Quero regularizar",
  },
  {
    slug: "vistoria",
    title: "Vistoria e Laudo Técnico",
    text: "Inspeção dos sistemas existentes, com testes e emissão de laudo técnico.",
    image: vistoriaImg,
    imagePosition: "50% 58%",
    cta: "Falar sobre vistoria",
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
                  <WhatsAppLink
                    intent="institutional_general"
                    placement={`home_servicos_${service.slug}`}
                    className="mt-2 inline-flex min-h-[28px] items-center font-display text-xs font-semibold uppercase tracking-[0.06em] text-rose hover:text-rose-strong"
                  >
                    {service.cta}
                  </WhatsAppLink>
                </Reveal>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 flex flex-col items-start gap-4 border-t border-brass/30 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-display text-base font-semibold text-espresso">
            Comércios. Serviços. Galpões. Indústrias.
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
