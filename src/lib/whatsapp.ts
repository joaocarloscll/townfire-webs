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
    "Olá, quero um orçamento de regularização de comércio no Corpo de Bombeiros. Cidade: [preencher]. Tipo de imóvel: [loja, restaurante, galpão...]. Área aproximada: [preencher]. Recebi exigência dos Bombeiros: [sim ou não].",
  projeto_pscip:
    "Olá, quero um orçamento de projeto de incêndio (PSCIP). Cidade: [preencher]. Tipo de imóvel: [preencher]. Área aproximada: [preencher]. Recebi exigência dos Bombeiros: [sim ou não].",
  regularizacao_cbmgo:
    "Olá, quero um orçamento de regularização no Corpo de Bombeiros (CERCON). Cidade: [preencher]. Tipo de imóvel: [preencher]. Área aproximada: [preencher]. Recebi exigência dos Bombeiros: [sim ou não].",
  save_veiculos_eletricos:
    "Olá, quero um orçamento de regularização de carregadores de veículos elétricos. Cidade: [preencher]. Tipo de imóvel: [condomínio, empresa, estacionamento...]. Área aproximada: [preencher]. Quantidade de pontos de recarga: [preencher]. Recebi exigência dos Bombeiros: [sim ou não].",
  vistoria_laudo:
    "Olá, vim pelo site da Town Fire e quero solicitar uma vistoria e laudo técnico do meu imóvel. Cidade: [preencher]. Atividade: [preencher]. Área aproximada: [preencher].",
  sistema_fotovoltaico:
    "Olá, quero um orçamento de segurança contra incêndio para sistema fotovoltaico. Cidade: [preencher]. Tipo de imóvel: [preencher]. Área aproximada: [preencher]. Situação: [sistema existente ou nova instalação]. Recebi exigência dos Bombeiros: [sim ou não].",
  vistoria_condominio:
    "Olá, quero um orçamento de vistoria contra incêndio para condomínio. Cidade: [preencher]. Tipo de condomínio: [residencial ou comercial]. Área aproximada: [preencher]. Recebi exigência dos Bombeiros: [sim ou não].",
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
