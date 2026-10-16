import { GTM_ID } from "@/lib/site-config";

export type TrackingParams = Record<string, string | number | boolean>;

/**
 * Envia um evento de interação para a camada de medição.
 *
 * - Com GTM (NEXT_PUBLIC_GTM_ID): empurra um objeto `{ event, ...params }` no
 *   dataLayer, que é o contrato que os triggers do container escutam.
 * - Sem GTM: usa gtag('event') direto no GA4.
 *
 * É seguro chamar antes do consentimento: sem consentimento o script do
 * Google nem foi carregado, então o evento só fica na fila local do
 * dataLayer e nunca sai do navegador.
 */
export function trackEvent(name: string, params: TrackingParams = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  if (GTM_ID) {
    window.dataLayer.push({ event: name, ...params });
  } else if (typeof window.gtag === "function") {
    window.gtag("event", name, params);
  }
}
