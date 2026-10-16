// Domínio canônico: o apex (townfire.com.br) faz redirect 308 para o www
// na Vercel, então a URL final servida — e a única que deve aparecer em
// sitemap, canonical, OG e JSON-LD — é o www (afeta SEO).
export const SITE_URL = "https://www.townfire.com.br";

// Nome institucional completo (usado em <title>, JSON-LD) vs. marca curta
// (usada na copy corrida do site, em todo o resto). CNPJ ainda não existe
// (empresa não constituída), por isso não aparece em lugar nenhum do site,
// nem como placeholder. Endereço comercial: não há um aberto ao público —
// nunca publicar endereço residencial nem inventar um para schema.
export const COMPANY_NAME = "Town Fire Engenharia";
export const BRAND_NAME = "Town Fire";

// WhatsApp: ver src/lib/whatsapp.ts (fonte canônica).
export const INSTAGRAM_URL = "https://www.instagram.com/townfire.eng/";

// Áreas de atendimento confirmadas. Usar "Goiânia e região" na copy corrida;
// a lista completa fica reservada para footer/schema (não fazer keyword
// stuffing de cidade em cada parágrafo).
export const siteConfig = {
  serviceCities: [
    "Goiânia",
    "Aparecida de Goiânia",
    "Anápolis",
    "Senador Canedo",
    "Trindade",
    "Hidrolândia",
  ],
  serviceArea: "Goiânia e região",
} as const;

// Google Analytics (GA4). Carregado por src/components/Analytics.tsx somente
// após consentimento de medição (ver src/lib/consent.ts).
export const GA_MEASUREMENT_ID = "G-7VSW42JTD9";

// Google Tag Manager (opcional). Defina NEXT_PUBLIC_GTM_ID (ex.: GTM-XXXXXXX)
// no ambiente de build para ativar. Com GTM ativo, o container passa a
// carregar no lugar do gtag.js direto — a configuração do GA4 e das
// conversões vive então no GTM (ver docs/tracking-architecture.md). O
// carregamento continua condicionado ao consentimento de medição.
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "";
