import { NextRequest, NextResponse } from "next/server";
import { WHATSAPP_E164, WHATSAPP_INTENTS, type WhatsappIntent } from "@/lib/whatsapp";

/**
 * Endpoint interno de atribuição para os CTAs de WhatsApp do site.
 * Ver 05_WHATSAPP_CONVERSAO/IMPLEMENTACAO_NUMERO_TOWN_FIRE.md: os CTAs
 * apontam para cá com `intent` e `placement`, o endpoint monta a mensagem
 * canônica e faz o redirect 302 para o wa.me oficial.
 *
 * A integração com CRM/Meta Cloud API depende de credenciais reais que
 * ainda não existem (ver whatsapp_config_canonical.json) — por isso este
 * endpoint apenas registra a atribuição em log de servidor e redireciona,
 * sem inventar persistência em banco/CRM que ainda não foi provisionado.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const intentParam = searchParams.get("intent") ?? "";
  const placement = searchParams.get("placement") ?? "unknown";

  const intent: WhatsappIntent =
    intentParam in WHATSAPP_INTENTS ? (intentParam as WhatsappIntent) : "hero";

  const attribution = {
    intent,
    placement,
    utm_source: searchParams.get("utm_source"),
    utm_medium: searchParams.get("utm_medium"),
    utm_campaign: searchParams.get("utm_campaign"),
    gclid: searchParams.get("gclid"),
    gbraid: searchParams.get("gbraid"),
    wbraid: searchParams.get("wbraid"),
    ref: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    ts: new Date().toISOString(),
  };

  console.log("[go/whatsapp]", JSON.stringify(attribution));

  const message = WHATSAPP_INTENTS[intent];
  const target = `https://wa.me/${WHATSAPP_E164}?text=${encodeURIComponent(message)}`;

  return NextResponse.redirect(target, { status: 302 });
}
