import { WhatsAppLink } from "./WhatsAppLink";
import type { WhatsappIntent } from "@/lib/whatsapp";

const SITUATIONS: {
  label: string;
  detail: string;
  intent: WhatsappIntent;
  cta: string;
}[] = [
  {
    label: "Vou abrir um estabelecimento",
    detail: "Quero saber o que o imóvel precisa antes de abrir.",
    intent: "opening",
    cta: "Quero entender esse caminho",
  },
  {
    label: "Preciso regularizar um imóvel existente",
    detail: "A operação já existe e preciso colocar a situação em ordem.",
    intent: "regularization",
    cta: "Quero entender esse caminho",
  },
  {
    label: "Recebi uma exigência",
    detail: "Tenho um documento ou apontamento e preciso saber como responder.",
    intent: "requirement",
    cta: "Quero entender esse caminho",
  },
  {
    label: "Vou reformar ou ampliar",
    detail: "Quero entender o impacto da mudança antes de avançar.",
    intent: "renovation",
    cta: "Quero entender esse caminho",
  },
  {
    label: "Tenho uma indústria ou operação mais complexa",
    detail: "Preciso tratar o tema com visão de operação, risco e continuidade.",
    intent: "industry",
    cta: "Quero entender esse caminho",
  },
  {
    label: "Ainda não sei o que preciso",
    detail: "Quero começar por uma leitura correta do cenário.",
    intent: "unsure",
    cta: "Quero entender esse caminho",
  },
];

export function SituationSection() {
  return (
    <section id="situacao" className="bg-parchment py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <h2 className="font-display text-3xl font-bold leading-[1.15] tracking-[-0.01em] text-espresso sm:text-4xl">
            Em que ponto você está?
          </h2>

          <div className="divide-y divide-brass/30 border-y border-brass/30">
            {SITUATIONS.map((situation) => (
              <details key={situation.label} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-body text-lg text-charcoal marker:content-none">
                  <span>{situation.label}</span>
                  <span
                    aria-hidden
                    className="shrink-0 text-2xl font-normal text-rose transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <div className="mt-3 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="max-w-md text-base leading-relaxed text-charcoal/70">
                    {situation.detail}
                  </p>
                  <WhatsAppLink
                    intent={situation.intent}
                    placement={`situation_${situation.intent}`}
                    className="shrink-0 rounded-full bg-espresso px-5 py-2.5 font-display text-xs font-semibold uppercase tracking-[0.03em] text-parchment transition-colors hover:bg-espresso-2"
                  >
                    {situation.cta}
                  </WhatsAppLink>
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
