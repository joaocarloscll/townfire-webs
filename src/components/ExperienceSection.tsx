const POINTS = [
  {
    label: "Situação atual",
    text: "Onde o processo está.",
  },
  {
    label: "Pendência",
    text: "O que falta para avançar.",
  },
  {
    label: "Responsável",
    text: "Quem precisa agir agora.",
  },
  {
    label: "Próximo passo",
    text: "O que acontece depois.",
  },
];

export function ExperienceSection() {
  return (
    <section className="bg-espresso py-24 text-parchment">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <h2 className="font-display text-3xl font-bold leading-[1.15] tracking-[-0.01em] sm:text-4xl">
              Você sempre sabe o que está acontecendo.
            </h2>
            <p className="mt-6 max-w-sm text-base leading-relaxed text-parchment/75">
              Cada atualização precisa responder quatro pontos.
            </p>
          </div>

          <div className="divide-y divide-brass/25 border-y border-brass/25">
            {POINTS.map((point, i) => (
              <div
                key={point.label}
                className="flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:gap-6"
              >
                <span className="font-display text-sm text-brass">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-base font-semibold sm:w-40 sm:shrink-0">
                  {point.label}
                </span>
                <span className="text-base text-parchment/75">
                  {point.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-16 font-display text-2xl font-bold sm:text-3xl">
          Clareza técnica também é parte da entrega.
        </p>
      </div>
    </section>
  );
}
