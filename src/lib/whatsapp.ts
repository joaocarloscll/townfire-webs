export const WHATSAPP_E164 = "5562992292257";
export const WHATSAPP_DISPLAY = "+55 62 99229-2257";

// Fonte canônica: 05_WHATSAPP_CONVERSAO/whatsapp_cta_map_v6.json.
// O mapa do pacote vem sem acento (ASCII); aqui a mensagem é escrita em
// português correto, porque é texto que o lead lê no WhatsApp.
export const WHATSAPP_INTENTS = {
  institutional_general:
    "Olá, vim pelo site da Town Fire e quero entender o que meu imóvel precisa. Cidade: [preencher]. Atividade: [preencher]. Área aproximada: [preencher].",
  institutional_header:
    "Olá, vim pelo site da Town Fire e quero entender o que meu imóvel precisa. Posso enviar a cidade, a atividade e a área aproximada?",
  regularizacao_comercio_goiania:
    "Olá, vim pelo anúncio sobre regularização de comércio em Goiânia. Atividade: [preencher]. Área aproximada: [preencher]. Situação atual: [abrindo, funcionando ou com exigência].",
} as const;

export type WhatsappIntent = keyof typeof WHATSAPP_INTENTS;

export const LEAD_REF_PREFIX = "TF";
export const LEAD_REF_TEMPLATE = (ref: string) => `Referência Town Fire: ${ref}`;

/**
 * CTAs apontam para o endpoint interno de atribuição (/go/whatsapp), que gera
 * o lead_ref, registra a atribuição permitida e faz o redirect 302 para o
 * wa.me oficial (05_WHATSAPP_CONVERSAO/IMPLEMENTACAO_NUMERO_TOWN_FIRE.md).
 */
export function goWhatsapp(intent: WhatsappIntent, placement: string) {
  const params = new URLSearchParams({ intent, placement });
  return `/go/whatsapp?${params.toString()}`;
}
