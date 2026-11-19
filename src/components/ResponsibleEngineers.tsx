import { FOUNDERS } from "./AuthoritySection";

// Apresentação compacta dos engenheiros responsáveis, logo depois da abertura.
// Só mostra dados reais já publicados no site (nome, formação e LinkedIn). Não
// há foto nem registro profissional (CREA) verificados no projeto, então não
// existe espaço reservado para eles: entram aqui quando forem fornecidos.
export function ResponsibleEngineers() {
  return (
    <section
      aria-labelledby="engenheiros-responsaveis"
      className="border-b border-brass/30 bg-parchment py-8 sm:py-12"
    >
      <div className="mx-auto max-w-3xl px-6 lg:px-10">
        <h2
          id="engenheiros-responsaveis"
          className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-rose-strong"
        >
          Engenheiros responsáveis
        </h2>
        <ul className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-8">
          {FOUNDERS.map((person) => (
            <li key={person.name} className="border-l-2 border-espresso pl-4">
              <p className="font-display text-lg font-bold leading-tight text-espresso">
                {person.name}
              </p>
              <p className="mt-1 text-sm leading-snug text-charcoal/70">
                {person.role}
              </p>
              <a
                href={person.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex min-h-[44px] items-center font-display text-xs font-semibold uppercase tracking-[0.06em] text-rose-strong underline decoration-rose/40 underline-offset-4 hover:text-espresso"
              >
                {person.linkLabel}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
