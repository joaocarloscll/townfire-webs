// Domínio canônico: o apex (townfire.com.br) faz redirect 308 para o www
// na Vercel, então a URL final servida — e a única que deve aparecer em
// sitemap, canonical, OG e JSON-LD — é o www (afeta SEO).
export const SITE_URL = "https://www.townfire.com.br";

// Dados operacionais reais ainda não confirmados pelo cliente (ver PRODUCT.md
// "Capabilities and Constraints"). Placeholders explícitos — substituir antes
// de publicar, nunca preencher com dado inventado. CNPJ: cliente ainda não
// tem, por isso não aparece em lugar nenhum do site (nada de placeholder).
// WhatsApp: ver src/lib/whatsapp.ts (fonte canônica, pacote V5).
// E-mail e redes ainda não confirmados: ficam fora do site público em vez de
// aparecerem como placeholder para o visitante.
export const siteConfig = {
  serviceCities: ["Goiânia", "Anápolis"],
  serviceArea: "Goiânia, Anápolis e região",
} as const;

// Google Analytics (GA4). Script carregado em src/app/layout.tsx.
export const GA_MEASUREMENT_ID = "G-7VSW42JTD9";
