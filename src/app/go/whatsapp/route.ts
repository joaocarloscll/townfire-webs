import { NextRequest, NextResponse } from "next/server";
import {
  LEAD_REF_PREFIX,
  LEAD_REF_TEMPLATE,
  WHATSAPP_E164,
  WHATSAPP_INTENTS,
  type WhatsappIntent,
} from "@/lib/whatsapp";

/**
 * Endpoint interno de atribuição dos CTAs de WhatsApp
 * (05_WHATSAPP_CONVERSAO/IMPLEMENTACAO_NUMERO_TOWN_FIRE.md): valida intent e
 * placement, gera lead_ref, registra a atribuição permitida e redireciona
 * para o Click to Chat oficial.
 *
 * GCLID, GBRAID, WBRAID e UTMs ficam apenas no log de atribuição. A mensagem
 * visível leva somente o lead_ref, conforme regra do pacote V6.
 *
 * A correlação automática via Meta Cloud API depende de credenciais reais que
 * ainda não existem (whatsapp_config_canonical.json), por isso não há
 * persistência em banco ou CRM aqui.
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

  console.log(
    "[go/whatsapp]",
    JSON.stringify({
      lead_ref: leadRef,
      intent,
      placement,
      utm_source: searchParams.get("utm_source"),
      utm_medium: searchParams.get("utm_medium"),
      utm_campaign: searchParams.get("utm_campaign"),
      utm_term: searchParams.get("utm_term"),
      utm_content: searchParams.get("utm_content"),
      gclid: searchParams.get("gclid"),
      gbraid: searchParams.get("gbraid"),
      wbraid: searchParams.get("wbraid"),
      landing: request.headers.get("referer"),
      ts: new Date().toISOString(),
    })
  );

  const message = `${WHATSAPP_INTENTS[intent]} ${LEAD_REF_TEMPLATE(leadRef)}`;
  const target = `https://wa.me/${WHATSAPP_E164}?text=${encodeURIComponent(message)}`;

  return NextResponse.redirect(target, { status: 302 });
}
