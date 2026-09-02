import { WhatsAppLink } from "./WhatsAppLink";

const SITUATIONS = [
  {
    label: "Vou abrir um estabelecimento",
    message:
      "Olá! Vou abrir um estabelecimento e quero entender o caminho de conformidade com a Town Fire.",
  },
  {
    label: "Preciso regularizar meu imóvel",
    message:
      "Olá! Preciso regularizar meu imóvel e quero falar com a Town Fire sobre o caminho até a conformidade.",
  },
  {
    label: "Recebi uma exigência",
    message:
      "Olá! Recebi uma exigência e quero falar com a Town Fire sobre os próximos passos.",
  },
  {
    label: "Vou reformar ou ampliar",
    message:
      "Olá! Vou reformar ou ampliar meu imóvel e quero entender o que isso muda na conformidade com a Town Fire.",
  },
  {
    label: "Preciso do projeto de incêndio",
    message:
      "Olá! Preciso do projeto de segurança contra incêndio e quero falar com a Town Fire.",
  },
  {
    label: "Não sei exatamente o que preciso",
    message:
      "Olá! Não sei exatamente o que preciso para regularizar meu imóvel — quero falar com a Town Fire para entender.",
  },
];

export function SituationSection() {
  return (
    <section id="situacao" className="bg-parchment py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <h2 className="font-display text-3xl font-bold leading-[1.15] tracking-[-0.01em] text-espresso sm:text-4xl">
            Qual é a sua situação agora?
          </h2>

          <ul className="divide-y divide-brass/30 border-y border-brass/30">
            {SITUATIONS.map((situation) => (
              <li key={situation.label}>
                <WhatsAppLink
                  message={situation.message}
                  className="group flex items-center justify-between gap-6 py-5 font-body text-lg text-charcoal transition-colors hover:text-espresso"
                >
                  <span>{situation.label}</span>
                  <span
                    aria-hidden
                    className="shrink-0 font-display text-rose transition-transform group-hover:translate-x-1"
                  >
                    →
                  </span>
                </WhatsAppLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
