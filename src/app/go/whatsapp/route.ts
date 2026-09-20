import { NextRequest, NextResponse } from "next/server";
import {
  LEAD_REF_PREFIX,
  LEAD_REF_TEMPLATE,
  WHATSAPP_E164,
  WHATSAPP_INTENTS,
  type WhatsappIntent,
} from "@/lib/whatsapp";

const ATTRIBUTION_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "gbraid",
  "wbraid",
] as const;

/**
 * Lê um parâmetro de atribuição com fallback: o CTA que o visitante clicou
 * pode não carregar os parâmetros da URL de entrada (ex.: um clique no
 * header depois de navegar pela home não repete o gclid da landing). Ordem:
 * 1) querystring da própria rota; 2) querystring do referer (a página onde
 * o clique aconteceu); 3) null. Referer inválido/ausente não quebra nada.
 */
function readAttributionParams(
  routeParams: URLSearchParams,
  refererUrl: string | null
): Record<(typeof ATTRIBUTION_PARAMS)[number], string | null> {
  let refererParams: URLSearchParams | null = null;
  if (refererUrl) {
    try {
      refererParams = new URL(refererUrl).searchParams;
    } catch {
      refererParams = null;
    }
  }

  const result = {} as Record<
    (typeof ATTRIBUTION_PARAMS)[number],
    string | null
  >;
  for (const key of ATTRIBUTION_PARAMS) {
    result[key] = routeParams.get(key) ?? refererParams?.get(key) ?? null;
  }
  return result;
}

/**
 * Endpoint interno de atribuição dos CTAs de WhatsApp: valida intent e
 * placement, gera lead_ref, registra a atribuição permitida (com fallback
 * de referer) e redireciona para o Click to Chat oficial.
 *
 * UTMs e GCLID/GBRAID/WBRAID ficam só no log de atribuição. A mensagem
 * visível leva somente o lead_ref, sem dado técnico. Não há persistência em
 * banco ou CRM aqui — isso depende de integração futura.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const intentParam = searchParams.get("intent") ?? "";
  const placement = searchParams.get("placement") ?? "unknown";

  const intent: WhatsappIntent =
    intentParam in WHATSAPP_INTENTS
      ? (intentParam as WhatsappIntent)
      : "institutional_general";

  const leadRef = `${LEAD_REF_PREFIX}-${Math.random()
    .toString(36)
    .slice(2, 6)
    .toUpperCase()}`;

  const attribution = readAttributionParams(
    searchParams,
    request.headers.get("referer")
  );

  console.log(
    "[go/whatsapp]",
    JSON.stringify({
      lead_ref: leadRef,
      intent,
      placement,
      ...attribution,
      landing: request.headers.get("referer"),
      ts: new Date().toISOString(),
    })
  );

  const message = `${WHATSAPP_INTENTS[intent]} ${LEAD_REF_TEMPLATE(leadRef)}`;
  const target = `https://wa.me/${WHATSAPP_E164}?text=${encodeURIComponent(message)}`;

  return NextResponse.redirect(target, { status: 302 });
}
