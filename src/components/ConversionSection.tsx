import { WhatsAppLink } from "./WhatsAppLink";
import { WHATSAPP_DISPLAY } from "@/lib/whatsapp";

export function ConversionSection() {
  return (
    <section id="contato" className="bg-espresso py-24 text-parchment">
      <div className="mx-auto max-w-3xl px-6 text-center lg:px-10">
        <p className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-brass">
          Próximo passo
        </p>
        <h2 className="mt-4 font-display text-3xl font-bold leading-[1.15] tracking-[-0.01em] sm:text-4xl">
          Conte a situação. A Town Fire organiza o caminho.
        </h2>
        <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-parchment/80">
          A primeira conversa serve para localizar o problema e entender
          quais informações precisamos para avançar.
        </p>

        <WhatsAppLink
          intent="finalCta"
          placement="final_cta"
          className="mt-10 inline-block rounded-full bg-rose px-9 py-4 font-display text-base font-semibold uppercase tracking-[0.03em] text-espresso transition-colors hover:bg-rose-strong"
        >
          Falar com a Town Fire
        </WhatsAppLink>

        <p className="mt-6 text-sm text-parchment/60">
          WhatsApp oficial: {WHATSAPP_DISPLAY}
        </p>
      </div>
    </section>
  );
}
