import { GTM_ID } from "@/lib/site-config";
import { hasAnyConsent, readConsent } from "@/lib/consent";

export type TrackingParams = Record<string, string | number | boolean>;

/**
 * Envia um evento de interação para a camada de medição.
 *
 * - Só envia com ao menos uma finalidade de medição permitida (Analytics ou
 *   anúncios). Sem escolha ou com recusa nada é enfileirado: o GTM, ao
 *   carregar depois de um aceite, reprocessa o que estiver no dataLayer, e um
 *   clique anterior ao aceite não pode virar evento.
 * - Com GTM (NEXT_PUBLIC_GTM_ID): empurra um objeto `{ event, ...params }` no
 *   dataLayer, que é o contrato que os triggers do container escutam.
 * - Sem GTM: usa gtag('event') direto no GA4.
 * - Nunca bloqueia nem atrasa a navegação do link.
 */
export function trackEvent(name: string, params: TrackingParams = {}) {
  if (typeof window === "undefined") return;
  if (!hasAnyConsent(readConsent()?.choice)) return;
  window.dataLayer = window.dataLayer || [];
  if (GTM_ID) {
    window.dataLayer.push({ event: name, ...params });
  } else if (typeof window.gtag === "function") {
    window.gtag("event", name, params);
  }
}
