import { WhatsAppLink } from "./WhatsAppLink";
import type { WhatsappIntent } from "@/lib/whatsapp";

export const QUOTE_CTA_LABEL = "Solicitar orçamento pelo WhatsApp";

// Diz ao visitante o que mandar na conversa. Os mesmos itens já vêm
// pré-preenchidos na mensagem do WhatsApp (WHATSAPP_INTENTS).
export const QUOTE_CTA_HINT =
  "Envie a cidade, o tipo de imóvel e a área aproximada. Se recebeu uma exigência dos Bombeiros, envie o documento também.";

const SIZES = {
  hero: "px-7 text-sm",
  final: "px-9 text-base",
};

/**
 * Botão principal de orçamento das páginas de serviço, com a orientação
 * logo abaixo. `tone` acompanha o fundo da seção (escuro ou claro).
 */
export function QuoteCta({
  intent,
  placement,
  size = "hero",
  tone = "dark",
}: {
  intent: WhatsappIntent;
  placement: string;
  size?: keyof typeof SIZES;
  tone?: "dark" | "light";
}) {
  return (
    <>
      <WhatsAppLink
        intent={intent}
        placement={placement}
        className={`mt-10 inline-flex min-h-[52px] items-center justify-center rounded-full bg-rose py-3 text-center font-display font-semibold uppercase tracking-[0.03em] text-espresso transition-colors hover:bg-rose-strong ${SIZES[size]}`}
      >
        {QUOTE_CTA_LABEL}
      </WhatsAppLink>
      <p
        className={`mt-4 max-w-md text-sm leading-relaxed ${
          tone === "dark" ? "text-parchment/65" : "text-charcoal/65"
        }`}
      >
        {QUOTE_CTA_HINT}
      </p>
    </>
  );
}
