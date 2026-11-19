import { NextRequest, NextResponse } from "next/server";
import {
  WHATSAPP_E164,
  WHATSAPP_INTENTS,
  generateLeadRef,
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

// Limite defensivo de tamanho antes de escrever no log: evita payload
// absurdamente grande vindo de querystring manipulada. JSON.stringify já
// escapa aspas/quebras de linha dentro dos valores, então isso é só sobre
// tamanho, não sobre caracteres especiais.
const MAX_PARAM_LENGTH = 200;
const MAX_LANDING_LENGTH = 300;

function truncate(value: string | null, maxLength: number): string | null {
  if (!value) return null;
  return value.length > maxLength ? value.slice(0, maxLength) : value;
}

/**
 * Lê os parâmetros de atribuição permitidos.
 * - Identificadores de clique do Google (gclid, gbraid, wbraid): SOMENTE da
 *   querystring da própria rota. O botão só os acrescenta quando o visitante
 *   permitiu a medição de anúncios; o referer nunca é usado para eles.
 * - UTMs (rótulos de campanha, sem identificar a pessoa): querystring da rota
 *   ou, como fallback, a do referer (a página onde o clique aconteceu).
 * Referer inválido/ausente não quebra nada.
 */
const CLICK_ID_PARAMS = new Set(["gclid", "gbraid", "wbraid"]);

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
    const fromReferer = CLICK_ID_PARAMS.has(key) ? null : refererParams?.get(key);
    const value = routeParams.get(key) ?? fromReferer ?? null;
    result[key] = truncate(value, MAX_PARAM_LENGTH);
  }
  return result;
}

/**
 * Reduz o referer a origin + pathname (ex.: "https://www.townfire.com.br/
 * regularizacao-cbmgo-cercon") para o campo "landing" do log. A querystring
 * completa nunca é gravada ali — os únicos parâmetros persistidos são os da
 * whitelist de atribuição acima, cada um no seu próprio campo.
 */
function sanitizeLandingUrl(refererUrl: string | null): string | null {
  if (!refererUrl) return null;
  try {
    const url = new URL(refererUrl);
    return truncate(`${url.origin}${url.pathname}`, MAX_LANDING_LENGTH);
  } catch {
    return null;
  }
}

/**
 * Endpoint interno de atribuição dos CTAs de WhatsApp: valida intent e
 * placement, gera lead_ref, registra a atribuição permitida (com fallback
 * de referer) e redireciona para o Click to Chat oficial.
 *
 * Privacidade: só a whitelist de UTM/GCLID acima e o path de origem (sem
 * querystring) vão para o log — nunca IP, user-agent, cookies ou dado
 * pessoal. A mensagem visível no WhatsApp leva apenas o texto da intenção, sem
 * referência, origem ou intenção; o lead_ref fica só no log. Não há
 * persistência em banco ou CRM aqui — isso depende de integração futura.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const intentParam = searchParams.get("intent") ?? "";
  const placement = searchParams.get("placement") ?? "unknown";

  const intent: WhatsappIntent =
    intentParam in WHATSAPP_INTENTS
      ? (intentParam as WhatsappIntent)
      : "institutional_general";

  const leadRef = generateLeadRef();
  const referer = request.headers.get("referer");
  const attribution = readAttributionParams(searchParams, referer);

  console.log(
    "[go/whatsapp]",
    JSON.stringify({
      lead_ref: leadRef,
      intent,
      placement,
      ...attribution,
      landing: sanitizeLandingUrl(referer),
      ts: new Date().toISOString(),
    })
  );

  const message = WHATSAPP_INTENTS[intent];
  const target = `https://wa.me/${WHATSAPP_E164}?text=${encodeURIComponent(message)}`;

  return NextResponse.redirect(target, { status: 302 });
}
