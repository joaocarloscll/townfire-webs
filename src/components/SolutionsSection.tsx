import { WhatsAppLink } from "./WhatsAppLink";
import type { WhatsappIntent } from "@/lib/whatsapp";

const SOLUTIONS: {
  title: string;
  text: string;
  cta: string;
  intent: WhatsappIntent;
}[] = [
  {
    title: "Diagnóstico e estratégia de regularização",
    text: "Para entender a condição atual e definir o percurso técnico antes de executar.",
    cta: "Começar pelo diagnóstico",
    intent: "diagnosis",
  },
  {
    title: "Projetos de segurança contra incêndio",
    text: "Desenvolvimento técnico da solução exigida pelo imóvel e pela operação, conforme o enquadramento aplicável.",
    cta: "Preciso de um projeto",
    intent: "project",
  },
  {
    title: "Regularização e tratamento de exigências",
    text: "Condução das etapas contratadas, organização das respostas e acompanhamento do processo.",
    cta: "Quero regularizar",
    intent: "regularization",
  },
  {
    title: "Empresas, indústrias e ativos complexos",
    text: "Engenharia orientada à operação, implantação, expansão, risco e continuidade do negócio.",
    cta: "Falar sobre minha operação",
    intent: "industry",
  },
];

export function SolutionsSection() {
  return (
    <section id="solucoes" className="bg-parchment py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <h2 className="max-w-2xl font-display text-3xl font-bold leading-[1.15] tracking-[-0.01em] text-espresso sm:text-4xl">
          A engenharia traduz o problema em decisão.
        </h2>

        <div className="mt-14 divide-y divide-brass/30 border-y border-brass/30">
          {SOLUTIONS.map((solution) => (
            <div
              key={solution.title}
              className="flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:gap-10"
            >
              <div className="max-w-xl">
                <h3 className="font-display text-xl font-semibold text-espresso">
                  {solution.title}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-charcoal/70">
                  {solution.text}
                </p>
              </div>
              <WhatsAppLink
                intent={solution.intent}
                placement={`solution_${solution.intent}`}
                className="shrink-0 rounded-full border border-espresso px-6 py-3 font-display text-xs font-semibold uppercase tracking-[0.03em] text-espresso transition-colors hover:bg-espresso hover:text-parchment"
              >
                {solution.cta}
              </WhatsAppLink>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
