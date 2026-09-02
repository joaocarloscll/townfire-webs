import { WhatsAppLink } from "./WhatsAppLink";
import { WHATSAPP_DISPLAY } from "@/lib/whatsapp";

// ATO 06 | Conversão. O percurso Rosa chega ao fim e o CTA entra junto do
// texto, sem grande vazio antes da ação.
export function ConversionSection() {
  return (
    <section id="contato" className="bg-espresso py-24 text-parchment">
      <div className="mx-auto max-w-3xl px-6 text-center lg:px-10">
        <span
          aria-hidden
          className="mx-auto block h-12 w-px bg-gradient-to-b from-transparent to-rose"
        />

        <p className="mt-8 font-display text-xs font-semibold uppercase tracking-[0.16em] text-brass">
          Próximo passo
        </p>
        <h2 className="mt-4 font-display text-3xl font-bold leading-[1.15] tracking-[-0.01em] sm:text-4xl">
          Seu imóvel tem uma situação. A Town Fire encontra o caminho.
        </h2>
        <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-parchment/80">
          Para começar, envie a cidade, a atividade, a área aproximada e o que
          já existe de documento.
        </p>

        <WhatsAppLink
          intent="institutional_general"
          placement="home_final"
          className="mt-8 inline-flex min-h-[52px] items-center rounded-full bg-rose px-9 font-display text-base font-semibold uppercase tracking-[0.03em] text-espresso transition-colors hover:bg-rose-strong"
        >
          Falar com um engenheiro
        </WhatsAppLink>

        <p className="mt-6 text-sm text-parchment/60">
          WhatsApp oficial: {WHATSAPP_DISPLAY}
        </p>
      </div>
    </section>
  );
}
