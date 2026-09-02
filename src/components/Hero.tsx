import { WhatsAppLink } from "./WhatsAppLink";
import { JourneyGraphic } from "./JourneyGraphic";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-espresso text-parchment">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:px-10 lg:py-28">
        <div>
          <h1 className="max-w-xl font-display text-4xl font-bold leading-[1.08] tracking-[-0.02em] sm:text-5xl lg:text-[3.4rem]">
            Seu imóvel precisa estar apto. O caminho até lá não precisa ser
            complicado.
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-parchment/80">
            A Town Fire organiza o caminho técnico entre um imóvel pendente e
            um imóvel apto — do diagnóstico à conformidade, com clareza sobre
            onde você está e o que vem a seguir.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <WhatsAppLink
              message="Olá! Vim pelo site e quero analisar a situação do meu imóvel com a Town Fire."
              className="rounded-full bg-rose px-7 py-3.5 font-body text-sm font-semibold text-espresso transition-colors hover:bg-rose-strong"
            >
              Falar no WhatsApp agora
            </WhatsAppLink>
            <a
              href="#situacao"
              className="rounded-full border border-parchment/30 px-7 py-3.5 font-body text-sm font-medium text-parchment transition-colors hover:border-parchment/60"
            >
              Ver minha situação
            </a>
          </div>

          <p className="mt-10 font-display text-sm tracking-[0.02em] text-brass">
            Projeta · Regulariza · Aprova
          </p>
        </div>

        <div className="relative">
          <JourneyGraphic />
        </div>
      </div>
    </section>
  );
}
