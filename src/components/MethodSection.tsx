import { Reveal } from "./Reveal";

// ATO 04 | Método. O traço vertical conecta as quatro etapas e termina em Rosa.
const STEPS = [
  {
    title: "Entender",
    text: "Imóvel, atividade, momento e material disponível.",
  },
  {
    title: "Definir",
    text: "Enquadramento, escopo, prioridades e responsáveis.",
  },
  {
    title: "Desenvolver",
    text: "Engenharia e documentação necessárias para o caso.",
  },
  {
    title: "Conduzir",
    text: "Protocolo, exigências e etapas previstas na contratação.",
  },
];

export function MethodSection() {
  return (
    <section id="metodo" className="bg-espresso py-24 text-parchment">
      <div className="mx-auto max-w-4xl px-6 lg:px-10">
        <h2 className="font-display text-3xl font-bold leading-[1.15] tracking-[-0.01em] sm:text-4xl">
          Pendência tem caminho.
        </h2>

        <ol className="relative mt-14 border-l border-brass/40 pl-8">
          {STEPS.map((step, i) => (
            <li key={step.title} className="relative pb-12 last:pb-0">
              <span
                aria-hidden
                className={`absolute -left-[35px] top-1.5 block h-3 w-3 rounded-full border ${
                  i === STEPS.length - 1
                    ? "border-rose bg-rose"
                    : "border-brass bg-espresso"
                }`}
              />
              <Reveal delayMs={i * 90}>
                <span className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-brass">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-display text-xl font-semibold">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-md text-base leading-relaxed text-parchment/75">
                  {step.text}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>

        <p className="mt-6 border-t border-brass/30 pt-10 font-display text-xl font-semibold">
          Você sabe onde o processo está e o que vem depois.
        </p>
      </div>
    </section>
  );
}
