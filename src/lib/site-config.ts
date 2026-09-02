// Domínio final ainda não definido — trocar antes de publicar (afeta SEO,
// OG tags, sitemap e JSON-LD).
export const SITE_URL = "https://townfire.com.br";

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
