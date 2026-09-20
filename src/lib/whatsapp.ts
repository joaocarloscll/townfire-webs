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
  projeto_pscip:
    "Olá, vim pelo site da Town Fire e quero analisar o projeto de incêndio/PSCIP do meu imóvel. Cidade: [preencher]. Atividade: [preencher]. Área aproximada: [preencher].",
  regularizacao_cbmgo:
    "Olá, vim pelo site da Town Fire e quero analisar a regularização do meu imóvel junto ao CBMGO. Cidade: [preencher]. Atividade: [preencher]. Situação atual: [preencher].",
  save_veiculos_eletricos:
    "Olá, vim pelo site da Town Fire e quero analisar os carregadores de veículos elétricos do meu imóvel. Cidade: [preencher]. Tipo de imóvel: [condomínio, empresa, estacionamento...]. Quantidade de pontos de recarga: [preencher].",
  sistema_fotovoltaico:
    "Olá, vim pelo site da Town Fire e quero analisar o sistema fotovoltaico do meu imóvel. Cidade: [preencher]. Situação: [sistema existente ou nova instalação].",
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
