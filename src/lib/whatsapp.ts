export const WHATSAPP_E164 = "5562992292257";
export const WHATSAPP_DISPLAY = "+55 62 99229-2257";

// Fonte: pacote de handoff V5, 05_WHATSAPP_CONVERSAO/whatsapp_cta_map_v5.json
// + mensagens canônicas de 01_ESTRATEGIA_COPY/site_architecture_master_v5.md.
export const WHATSAPP_INTENTS = {
  hero: "Olá, vim pelo site da Town Fire e quero entender o que meu imóvel precisa. Posso te passar algumas informações?",
  opening:
    "Olá, vim pelo site da Town Fire. Estou abrindo um estabelecimento e quero entender o que o imóvel precisa para ficar regular. Posso te passar a cidade, atividade e área aproximada?",
  regularization:
    "Olá, vim pelo site da Town Fire. Preciso regularizar um imóvel que já está em uso. Posso te explicar a situação atual?",
  requirement:
    "Olá, vim pelo site da Town Fire. Recebi uma exigência relacionada ao imóvel e quero entender como resolver. Posso enviar o documento?",
  renovation:
    "Olá, vim pelo site da Town Fire. Vou reformar ou ampliar um imóvel e quero entender o impacto na regularização. Posso te passar os dados do local?",
  industry:
    "Olá, vim pelo site da Town Fire. Tenho uma operação industrial ou de maior complexidade e quero avaliar o caminho de regularização. Posso te passar as informações principais?",
  unsure:
    "Olá, vim pelo site da Town Fire. Ainda não sei exatamente o que meu imóvel precisa e quero começar por uma leitura correta do cenário.",
  diagnosis:
    "Olá, vim pelo site da Town Fire. Quero começar pelo diagnóstico e pela estratégia de regularização do meu imóvel.",
  project:
    "Olá, vim pelo site da Town Fire. Preciso de um projeto de segurança contra incêndio e quero entender o próximo passo.",
  method:
    "Olá, vim pelo site da Town Fire. Quero mapear o meu caso e entender como o método de vocês funciona na prática.",
  fit: "Olá, vim pelo site da Town Fire. Quero saber se o meu tipo de imóvel e operação se encaixa no que vocês atendem.",
  accounting_partner:
    "Olá, vim pela área de parceiros da Town Fire. Sou da área contábil e quero entender como funciona a parceria para demandas de regularização dos nossos clientes.",
  architect_partner:
    "Olá, vim pela área de parceiros da Town Fire. Trabalho com arquitetura e quero conversar sobre parceria para engenharia de incêndio e regularização.",
  realestate_partner:
    "Olá, vim pela área de parceiros da Town Fire. Trabalho com imóveis e quero entender como vocês podem apoiar análises e regularizações.",
  builder_partner:
    "Olá, vim pela área de parceiros da Town Fire. Trabalho com construção, instalação ou facilities e quero conversar sobre parceria.",
  finalCta:
    "Olá, vim pelo site da Town Fire e quero contar a situação do meu imóvel.",
  floating:
    "Olá, vim pelo site da Town Fire e quero falar com vocês.",
} as const;

export type WhatsappIntent = keyof typeof WHATSAPP_INTENTS;

/**
 * CTAs apontam para o endpoint interno de atribuição (/go/whatsapp), que
 * registra intent/placement e faz o redirect 302 para o wa.me oficial.
 * Ver 05_WHATSAPP_CONVERSAO/IMPLEMENTACAO_NUMERO_TOWN_FIRE.md.
 */
export function goWhatsapp(intent: WhatsappIntent, placement: string) {
  const params = new URLSearchParams({ intent, placement });
  return `/go/whatsapp?${params.toString()}`;
}
