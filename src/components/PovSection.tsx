import { Reveal } from "./Reveal";

const VARIABLES = ["Uso", "Área", "Ocupação", "Configuração"];

// ATO 02 | Tese. As quatro variáveis chegam a um nó Rosa.
export function PovSection() {
  return (
    <section id="tese" className="bg-parchment py-24">
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-10">
        <h2 className="font-display text-4xl font-bold leading-[1.1] tracking-[-0.02em] text-espresso sm:text-5xl lg:text-6xl">
          Regularização começa antes do projeto.
        </h2>

        <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-charcoal/75">
          Uso, área, ocupação e configuração mudam o enquadramento. A Town Fire
          começa lendo o imóvel para definir o que precisa ser feito.
        </p>

        <ul className="mx-auto mt-14 grid max-w-2xl grid-cols-2 gap-px border border-brass/30 bg-brass/30 sm:grid-cols-4">
          {VARIABLES.map((variable, i) => (
            <li key={variable} className="bg-parchment">
              <Reveal delayMs={i * 90}>
                <span className="block px-4 py-6 font-display text-sm font-semibold uppercase tracking-[0.08em] text-espresso">
                  {variable}
                </span>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal delayMs={360}>
          <div className="mt-8 flex flex-col items-center gap-4">
            <span
              aria-hidden
              className="block h-10 w-px bg-gradient-to-b from-brass/40 to-rose"
            />
            <span aria-hidden className="block h-3 w-3 rounded-full bg-rose" />
          </div>
        </Reveal>

        <p className="mt-10 font-display text-2xl font-bold text-espresso sm:text-3xl">
          Projeto é consequência de uma decisão técnica bem feita.
        </p>
      </div>
    </section>
  );
}
