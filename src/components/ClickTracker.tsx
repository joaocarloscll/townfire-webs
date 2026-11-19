"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/tracking";
import { readConsent } from "@/lib/consent";
import { withAttribution } from "@/lib/attribution";

/**
 * Registra cliques nos elementos marcados com `data-event` (WhatsApp,
 * telefone, Instagram). Um único listener delegado no document: não exige
 * handler em cada link e sobrevive a navegação client-side. É o único ponto
 * que emite `whatsapp_click`: um clique, um evento. O evento é enviado antes de
 * o navegador seguir o link (o /go/whatsapp redireciona para o wa.me), e o GA
 * usa beacon na saída da página.
 */
export function ClickTracker() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const el = target.closest<HTMLElement>("[data-event]");
      const name = el?.dataset.event;
      if (!el || !name) return;

      // Contato pelo WhatsApp: leva ao /go/whatsapp os parâmetros de campanha
      // que a escolha de consentimento atual permite (sem duplicar os que o
      // link já tem). Não altera o destino nem atrasa a navegação.
      const href = el.getAttribute("href");
      if (name === "whatsapp_click" && href?.startsWith("/go/whatsapp")) {
        el.setAttribute("href", withAttribution(href, readConsent()?.choice ?? null));
      }

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
