import type { ReactNode } from "react";
import { goWhatsapp, type WhatsappIntent } from "@/lib/whatsapp";

export function WhatsAppLink({
  intent,
  placement,
  className,
  children,
}: {
  intent: WhatsappIntent;
  placement: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a href={goWhatsapp(intent, placement)} className={className}>
      {children}
    </a>
  );
}
