const REASONS = [
  "Comunicação direta: você sempre sabe onde o processo está e o que vem a seguir.",
  "Foco em engenharia de conformidade, não em burocracia por burocracia.",
  "Atuação pensada para indústria, comércio, serviços e galpões — não só para pequenos reparos.",
  "Sem promessa de aprovação garantida: só o que é tecnicamente sustentável.",
];

export function WhyTownFireSection() {
  return (
    <section className="bg-espresso py-24 text-parchment">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-10">
        <h2 className="font-display text-3xl font-bold leading-[1.15] tracking-[-0.01em] sm:text-4xl">
          Por que Town Fire
        </h2>

        <ul className="space-y-6">
          {REASONS.map((reason) => (
            <li
              key={reason}
              className="flex gap-4 border-b border-brass/25 pb-6 last:border-b-0"
            >
              <span aria-hidden className="mt-1 h-2 w-2 shrink-0 rounded-full bg-rose" />
              <p className="text-base leading-relaxed text-parchment/85">
                {reason}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
