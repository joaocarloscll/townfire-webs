import { WhatsAppLink } from "./WhatsAppLink";
import type { WhatsappIntent } from "@/lib/whatsapp";

export const QUOTE_CTA_LABEL = "Solicitar orçamento pelo WhatsApp";

// Diz ao visitante o que mandar na conversa. A mensagem pré-preenchida do
// WhatsApp é curta e não traz esses campos (WHATSAPP_INTENTS): eles são
// pedidos durante o atendimento.
export const QUOTE_CTA_HINT =
  "Conte sua situação. Pedimos os detalhes necessários durante a conversa.";

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
  label = QUOTE_CTA_LABEL,
  hint = QUOTE_CTA_HINT,
  className = "mt-10",
}: {
  intent: WhatsappIntent;
  placement: string;
  size?: keyof typeof SIZES;
  tone?: "dark" | "light";
  label?: string;
  hint?: string;
  className?: string;
}) {
  return (
    <>
      <WhatsAppLink
        intent={intent}
        placement={placement}
        className={`${className} inline-flex min-h-[52px] items-center justify-center rounded-full bg-rose py-3 text-center font-display font-semibold uppercase tracking-[0.03em] text-espresso transition-colors hover:bg-rose-strong ${SIZES[size]}`}
      >
        {label}
      </WhatsAppLink>
      <p
        className={`mt-4 max-w-md text-sm leading-relaxed ${
          tone === "dark" ? "text-parchment/65" : "text-charcoal/65"
        }`}
      >
        {hint}
      </p>
    </>
  );
}
