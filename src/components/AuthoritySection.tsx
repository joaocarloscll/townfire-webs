const FOUNDERS = [
  {
    name: "Jefferson Jesus",
    role: "Engenheiro Mecânico",
    title: "Sócio-proprietário",
    linkedin: "https://www.linkedin.com/in/jefferson--jesus/",
  },
  {
    name: "João Carlos Chaves",
    role: "Engenheiro Civil",
    title: "Sócio-proprietário",
    linkedin: "https://www.linkedin.com/in/joaocarloscl/",
  },
];

export function AuthoritySection() {
  return (
    <section id="autoridade" className="bg-parchment py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <p className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-rose">
          Quem está por trás
        </p>
        <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold leading-[1.15] tracking-[-0.01em] text-espresso sm:text-4xl">
          Engenharia com nome, formação e responsabilidade.
        </h2>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-charcoal/70">
          A Town Fire é conduzida por dois sócios-proprietários de formações
          complementares.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-10 border-t border-brass/30 pt-10 sm:grid-cols-2">
          {FOUNDERS.map((founder) => (
            <div key={founder.name} className="border-l-2 border-espresso pl-6">
              <p className="font-display text-xl font-bold text-espresso">
                {founder.name}
              </p>
              <p className="mt-1 font-body text-sm text-charcoal/70">
                {founder.role}
              </p>
              <p className="font-body text-sm text-charcoal/70">
                {founder.title}
              </p>
              <a
                href={founder.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block font-display text-xs font-semibold uppercase tracking-[0.03em] text-rose hover:text-rose-strong"
              >
                LinkedIn
              </a>
            </div>
          ))}
        </div>

        <div className="mt-16 border-t border-brass/30 pt-10">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.1em] text-charcoal/50">
            Exemplo ilustrativo de raciocínio
          </p>
          <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-4">
            <div>
              <p className="font-display text-sm font-semibold text-espresso">
                Situação
              </p>
              <p className="mt-2 text-sm leading-relaxed text-charcoal/70">
                Um galpão comercial recebe uma exigência do Corpo de Bombeiros
                antes da renovação do alvará.
              </p>
            </div>
            <div>
              <p className="font-display text-sm font-semibold text-espresso">
                Leitura técnica
              </p>
              <p className="mt-2 text-sm leading-relaxed text-charcoal/70">
                A área de armazenamento mudou desde o projeto original e altera
                a classe de ocupação prevista.
              </p>
            </div>
            <div>
              <p className="font-display text-sm font-semibold text-espresso">
                Decisão
              </p>
              <p className="mt-2 text-sm leading-relaxed text-charcoal/70">
                Reenquadrar o imóvel antes de responder à exigência, para não
                corrigir o mesmo ponto duas vezes.
              </p>
            </div>
            <div>
              <p className="font-display text-sm font-semibold text-espresso">
                Próximo passo
              </p>
              <p className="mt-2 text-sm leading-relaxed text-charcoal/70">
                Protocolar o projeto revisado e acompanhar o retorno do órgão
                responsável.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
