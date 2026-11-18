export const WHATSAPP_E164 = "5562992292257";
export const WHATSAPP_DISPLAY = "+55 62 99229-2257";

// Mensagens curtas, sem campos para preencher: cidade, área e exigências são
// pedidas durante a conversa. Só os botões de serviços específicos mudam o
// texto; todos os outros usam a mensagem padrão. O texto é o que o lead lê no
// WhatsApp, por isso vai em português correto, com acentuação.
const DEFAULT_MESSAGE =
  "Olá! Preciso de ajuda com a regularização do meu imóvel nos Bombeiros. Podem me orientar?";

export const WHATSAPP_INTENTS = {
  institutional_general: DEFAULT_MESSAGE,
  institutional_header: DEFAULT_MESSAGE,
  regularizacao_comercio_goiania: DEFAULT_MESSAGE,
  regularizacao_cbmgo: DEFAULT_MESSAGE,
  vistoria_laudo: DEFAULT_MESSAGE,
  projeto_pscip:
    "Olá! Preciso de um projeto de incêndio/PSCIP. Podem me orientar?",
  vistoria_condominio:
    "Olá! Preciso de uma vistoria contra incêndio no condomínio. Podem me orientar?",
  save_veiculos_eletricos:
    "Olá! Preciso regularizar carregadores de veículos elétricos. Podem me orientar?",
  sistema_fotovoltaico:
    "Olá! Preciso avaliar a segurança contra incêndio do meu sistema fotovoltaico. Podem me orientar?",
} as const;

export type WhatsappIntent = keyof typeof WHATSAPP_INTENTS;

export const LEAD_REF_PREFIX = "TF";

/**
 * lead_ref não é token de segurança (não protege nada, só correlaciona o
 * log de atribuição com a conversa), mas Math.random() com 4 caracteres
 * tem risco de colisão real conforme o volume cresce. crypto.randomUUID()
 * dá entropia de sobra; só o prefixo de 8 caracteres hex vai pra mensagem —
 * o UUID completo nunca aparece no WhatsApp do lead.
 */
export function generateLeadRef(): string {
  const id = crypto.randomUUID().replace(/-/g, "").slice(0, 8).toUpperCase();
  return `${LEAD_REF_PREFIX}-${id}`;
}

/**
 * CTAs apontam para o endpoint interno de atribuição (/go/whatsapp), que gera
 * o lead_ref, registra a atribuição permitida e faz o redirect 302 para o
 * wa.me oficial (05_WHATSAPP_CONVERSAO/IMPLEMENTACAO_NUMERO_TOWN_FIRE.md).
 */
export function goWhatsapp(intent: WhatsappIntent, placement: string) {
  const params = new URLSearchParams({ intent, placement });
  return `/go/whatsapp?${params.toString()}`;
}
