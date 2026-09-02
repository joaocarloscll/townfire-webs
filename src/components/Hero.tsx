import { WhatsAppLink } from "./WhatsAppLink";
import { JourneyGraphic } from "./JourneyGraphic";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-espresso text-parchment">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:px-10 lg:py-28">
        <div>
          <p className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-brass">
            Engenharia de incêndio + regularização
          </p>

          <h1 className="mt-5 max-w-xl font-display text-4xl font-bold leading-[1.08] tracking-[-0.02em] sm:text-5xl lg:text-[3.4rem]">
            Do imóvel pendente ao imóvel apto.
          </h1>

          <p className="mt-6 max-w-md text-lg leading-relaxed text-parchment/80">
            A Town Fire lê a situação do imóvel, define o caminho técnico e
            conduz projetos, regularização e exigências com foco em
            conformidade e clareza de processo.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <WhatsAppLink
              intent="hero"
              placement="hero_primary"
              className="rounded-full bg-rose px-7 py-3.5 font-display text-sm font-semibold uppercase tracking-[0.03em] text-espresso transition-colors hover:bg-rose-strong"
            >
              Entender meu caso
            </WhatsAppLink>
            <a
              href="#metodo"
              className="rounded-full border border-parchment/30 px-7 py-3.5 font-display text-sm font-semibold uppercase tracking-[0.03em] text-parchment transition-colors hover:border-parchment/60"
            >
              Ver como funciona
            </a>
          </div>

          <p className="mt-8 max-w-sm text-sm text-parchment/60">
            Você explica a situação. A gente organiza o próximo passo.
          </p>
        </div>

        <div className="relative">
          <JourneyGraphic />
        </div>
      </div>
    </section>
  );
}
