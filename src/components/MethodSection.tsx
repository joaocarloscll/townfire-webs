import { WhatsAppLink } from "./WhatsAppLink";

const STEPS = [
  {
    title: "Entender o imóvel",
    text: "Ler uso, condição atual, objetivo e informações disponíveis.",
  },
  {
    title: "Definir o caminho",
    text: "Identificar enquadramento, prioridades e próximas decisões.",
  },
  {
    title: "Desenvolver a solução",
    text: "Produzir a engenharia necessária para o caso.",
  },
  {
    title: "Conduzir a regularização",
    text: "Organizar protocolo, exigências e etapas previstas no escopo.",
  },
  {
    title: "Manter o processo legível",
    text: "Status, pendência e próximo passo sempre visíveis.",
  },
];

export function MethodSection() {
  return (
    <section id="metodo" className="bg-espresso py-24 text-parchment">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <h2 className="max-w-xl font-display text-3xl font-bold leading-[1.15] tracking-[-0.01em] sm:text-4xl">
          Clareza primeiro. Engenharia na sequência certa.
        </h2>

        <ol className="mt-14 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
          {STEPS.map((step, i) => (
            <li key={step.title} className="border-t-2 border-brass/60 pt-5">
              <span className="font-display text-2xl font-bold text-rose">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-display text-base font-semibold">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-parchment/75">
                {step.text}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-16 flex flex-col items-start gap-6 border-t border-brass/30 pt-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-display text-xl font-semibold sm:max-w-sm">
            Você sabe onde está. E sabe o que vem depois.
          </p>
          <WhatsAppLink
            intent="method"
            placement="method_close"
            className="shrink-0 rounded-full bg-rose px-7 py-3.5 font-display text-sm font-semibold uppercase tracking-[0.03em] text-espresso transition-colors hover:bg-rose-strong"
          >
            Quero mapear meu caso
          </WhatsAppLink>
        </div>
      </div>
    </section>
  );
}
