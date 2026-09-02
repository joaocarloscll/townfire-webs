// ATO 05 | Sócios e prova. Composição tipográfica: números grandes, nomes
// menores, linhas técnicas. Sem retratos e sem logos de empregadores.
// Os números entram prontos, sem contador animado (regra do pacote V6).
const FOUNDERS = [
  {
    figure: "+100",
    figureLabel: "Processos aprovados",
    name: "João Carlos Chaves",
    role: "Engenheiro Civil e sócio-proprietário.",
    bio: "Há mais de cinco anos desenvolve projetos complementares, com atuação em segurança contra incêndio, instalações elétricas, BIM e regularização de imóveis.",
    linkLabel: "Conhecer João no LinkedIn",
    linkedin: "https://www.linkedin.com/in/joaocarloscl/",
  },
  {
    figure: "+7",
    figureLabel: "Anos em projetos industriais",
    name: "Jefferson Jesus",
    role: "Engenheiro Mecânico e sócio-proprietário.",
    bio: "Construiu sua experiência entre projetos industriais, sistemas críticos, HVAC, gases, compatibilização multidisciplinar e comissionamento.",
    linkLabel: "Conhecer Jefferson no LinkedIn",
    linkedin: "https://www.linkedin.com/in/jefferson--jesus/",
  },
];

export function AuthoritySection() {
  return (
    <section id="engenheiros" className="bg-parchment py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <p className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-rose">
          Quem está à frente
        </p>
        <h2 className="mt-4 max-w-3xl font-display text-3xl font-bold leading-[1.15] tracking-[-0.01em] text-espresso sm:text-4xl">
          Processos que precisam ser aprovados. Sistemas que não podem falhar.
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-charcoal/70">
          A experiência que forma a Town Fire combina regularização junto ao
          Corpo de Bombeiros com engenharia desenvolvida em ambientes
          industriais de alta exigência.
        </p>

        <div className="mt-14 grid grid-cols-1 gap-12 border-t border-brass/30 pt-12 sm:grid-cols-2">
          {FOUNDERS.map((founder) => (
            <div key={founder.name}>
              <p className="font-display text-5xl font-bold leading-none text-espresso sm:text-6xl">
                {founder.figure}
              </p>
              <p className="mt-3 font-display text-xs font-semibold uppercase tracking-[0.12em] text-rose">
                {founder.figureLabel}
              </p>

              <div className="mt-8 border-l-2 border-espresso pl-6">
                <p className="font-display text-xl font-bold text-espresso">
                  {founder.name}
                </p>
                <p className="mt-1 text-sm text-charcoal/70">{founder.role}</p>
                <p className="mt-4 max-w-md text-base leading-relaxed text-charcoal/70">
                  {founder.bio}
                </p>
                <a
                  href={founder.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex min-h-[44px] items-center font-display text-xs font-semibold uppercase tracking-[0.06em] text-rose hover:text-rose-strong"
                >
                  {founder.linkLabel}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
