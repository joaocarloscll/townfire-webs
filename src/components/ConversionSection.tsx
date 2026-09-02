import { WhatsAppLink } from "./WhatsAppLink";

export function ConversionSection() {
  return (
    <section id="contato" className="bg-espresso py-24 text-parchment">
      <div className="mx-auto max-w-3xl px-6 text-center lg:px-10">
        <h2 className="font-display text-3xl font-bold leading-[1.15] tracking-[-0.01em] sm:text-4xl">
          O cliente nunca deveria precisar perguntar &ldquo;e agora?&rdquo;
        </h2>
        <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-parchment/80">
          Conte a situação do seu imóvel direto no WhatsApp. Você recebe o
          caminho recomendado sem burocracia.
        </p>

        <WhatsAppLink
          message="Olá! Vim pelo site e quero contar a situação do meu imóvel para a Town Fire."
          className="mt-10 inline-block rounded-full bg-rose px-9 py-4 font-body text-base font-semibold text-espresso transition-colors hover:bg-rose-strong"
        >
          Falar no WhatsApp agora
        </WhatsAppLink>

        <p className="mt-6 font-display text-sm tracking-[0.02em] text-brass">
          Projeta · Regulariza · Aprova
        </p>
      </div>
    </section>
  );
}
