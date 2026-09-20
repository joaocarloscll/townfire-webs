import type { ReactNode } from "react";
import { goWhatsapp, type WhatsappIntent } from "@/lib/whatsapp";

export function WhatsAppLink({
  intent,
  placement,
  className,
  "aria-label": ariaLabel,
  children,
}: {
  intent: WhatsappIntent;
  placement: string;
  className?: string;
  "aria-label"?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={goWhatsapp(intent, placement)}
      className={className}
      aria-label={ariaLabel}
      data-event="whatsapp_click"
      data-placement={placement}
      data-intent={intent}
    >
      {children}
    </a>
  );
}
