import { WhatsAppLink } from "./WhatsAppLink";
import { JourneyGraphic } from "./JourneyGraphic";

// ATO 01 (01_ESTRATEGIA_COPY/site_architecture_master_v6.md).
export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-espresso text-parchment">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 lg:px-10 lg:py-28">
        <div>
          <p className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-brass">
            Engenharia de incêndio e regularização
          </p>

          <h1 className="mt-5 max-w-xl font-display text-4xl font-bold leading-[1.08] tracking-[-0.02em] sm:text-5xl lg:text-[3.4rem]">
            Do imóvel pendente ao imóvel apto.
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-parchment/80">
            A Town Fire desenvolve projetos, responde exigências e conduz
            processos junto ao Corpo de Bombeiros para comércios, galpões e
            indústrias em Goiânia, Anápolis e região.
          </p>

          <WhatsAppLink
            intent="institutional_general"
            placement="home_hero"
            className="mt-10 inline-flex min-h-[52px] items-center rounded-full bg-rose px-7 font-display text-sm font-semibold uppercase tracking-[0.03em] text-espresso transition-colors hover:bg-rose-strong"
          >
            Entender o que meu imóvel precisa
          </WhatsAppLink>

          <p className="mt-6 max-w-md text-sm leading-relaxed text-parchment/60">
            Envie cidade, atividade e área aproximada. Se você recebeu uma
            exigência, pode anexar o documento.
          </p>
        </div>

        <div className="relative hidden sm:block">
          <JourneyGraphic />
        </div>
      </div>
    </section>
  );
}
