"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/tracking";

/**
 * Registra cliques nos elementos marcados com `data-event` (WhatsApp,
 * telefone, Instagram). Um único listener delegado no document: não exige
 * handler em cada link e sobrevive a navegação client-side. O evento é
 * enviado antes de o navegador seguir o link (o /go/whatsapp redireciona
 * para o wa.me), e o GA usa beacon na saída da página.
 */
export function ClickTracker() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const el = target.closest<HTMLElement>("[data-event]");
      const name = el?.dataset.event;
      if (!el || !name) return;

      trackEvent(name, {
        placement: el.dataset.placement ?? "unknown",
        intent: el.dataset.intent ?? "none",
        page_path: window.location.pathname,
      });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
