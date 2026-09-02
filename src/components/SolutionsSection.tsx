import { WhatsAppLink } from "./WhatsAppLink";
import { Reveal } from "./Reveal";

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

        <div className="mt-12 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
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
