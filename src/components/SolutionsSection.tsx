const AUDIENCE = [
  "Comércio",
  "Indústria e galpões",
  "Empresas em implantação ou expansão",
  "Proprietários e gestores de imóveis",
];

export function SolutionsSection() {
  return (
    <section id="solucoes" className="bg-espresso py-24 text-parchment">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <h2 className="max-w-2xl font-display text-3xl font-bold leading-[1.15] tracking-[-0.01em] sm:text-4xl">
            Engenharia não deveria aumentar a burocracia. Deveria organizar o
            caminho.
          </h2>

          <ul className="flex flex-col gap-4 border-t border-brass/40 pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            {AUDIENCE.map((item) => (
              <li key={item} className="font-display text-lg text-parchment/90">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
