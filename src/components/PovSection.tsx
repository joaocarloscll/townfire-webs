const VARIABLES = ["Uso", "Área", "Ocupação", "Configuração"];

export function PovSection() {
  return (
    <section className="bg-parchment py-24">
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-10">
        <h2 className="font-display text-4xl font-bold leading-[1.1] tracking-[-0.02em] text-espresso sm:text-5xl lg:text-6xl">
          Regularização começa antes do projeto.
        </h2>
        <p className="mt-4 font-display text-xl font-medium text-rose sm:text-2xl">
          Primeiro, leia o imóvel.
        </p>

        <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-charcoal/75">
          Uso, área, ocupação e configuração mudam o enquadramento. A primeira
          decisão boa acontece antes do desenho.
        </p>

        <div className="mx-auto mt-12 flex max-w-lg flex-wrap items-center justify-center gap-x-8 gap-y-4 border-y border-brass/30 py-6">
          {VARIABLES.map((variable, i) => (
            <span
              key={variable}
              className="font-display text-sm font-semibold uppercase tracking-[0.08em] text-espresso/80"
            >
              {i > 0 && <span className="mr-8 text-brass">/</span>}
              {variable}
            </span>
          ))}
        </div>

        <p className="mt-12 font-display text-2xl font-bold text-espresso sm:text-3xl">
          Projeto é consequência de uma decisão técnica bem feita.
        </p>
      </div>
    </section>
  );
}
