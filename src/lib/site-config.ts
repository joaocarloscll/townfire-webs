// Domínio final ainda não definido — trocar antes de publicar (afeta SEO,
// OG tags, sitemap e JSON-LD).
export const SITE_URL = "https://townfire.com.br";

// Dados operacionais reais ainda não confirmados pelo cliente (ver PRODUCT.md
// "Capabilities and Constraints"). Placeholders explícitos — substituir antes
// de publicar, nunca preencher com dado inventado. CNPJ: cliente ainda não
// tem, por isso não aparece em lugar nenhum do site (nada de placeholder).
// WhatsApp: ver src/lib/whatsapp.ts (fonte canônica, pacote V5).
export const siteConfig = {
  email: "[EMAIL A DEFINIR]",
  instagram: "[INSTAGRAM A DEFINIR]",
  serviceCities: ["Goiânia", "Anápolis"],
  serviceArea: "Goiânia, Anápolis e região (área de atendimento a confirmar)",
} as const;
